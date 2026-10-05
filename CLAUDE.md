# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

IronLog — 운동 기록과 식단 기록을 남기는 앱. 한 저장소에 서로 독립된 두 프로젝트가 들어 있다.

- `apps/api` — NestJS 12 API 서버
- `apps/mobile` — Expo SDK 57 / React Native 0.86 앱 (TypeScript)

npm workspaces를 쓰지 않는다. 각 앱이 자기 `node_modules`와 lockfile을 가지며, 루트 `package.json`은 두 앱을 함께 띄우는 스크립트(`concurrently`)만 담는다. 그 외 npm 명령(의존성 추가, 빌드, 테스트 등)은 해당 앱 디렉터리 안에서 실행한다.

## 명령어

### 루트

```bash
npm run dev          # API(3000) + Expo(8081) 동시 실행
npm run dev:api      # API만
npm run dev:mobile   # Expo만 (i/a/w 단축키를 쓰려면 이쪽을 별도 터미널에서)
```

### apps/api

```bash
npm run start:dev                          # watch 모드 (기본 포트 3000, PORT로 변경)
npm run build                              # nest build → dist/
npm run lint                               # oxlint (ESLint 아님)
npm run format                             # prettier
npm test                                   # vitest, **/*.spec.ts
npx vitest run src/app.controller.spec.ts  # 단일 테스트 파일
npx vitest run -t "테스트 이름"             # 이름으로 단일 테스트
npm run test:e2e                           # vitest.config.e2e.ts, test/**/*.e2e-spec.ts
```

### apps/mobile

```bash
npm start                    # expo start
npm run ios                  # iOS 시뮬레이터 (이미 떠 있는 Metro 서버가 있으면 거기에 붙는다)
npm run android              # Android 에뮬레이터 (가상 기기가 먼저 켜져 있어야 함)
npx tsc --noEmit             # 타입 체크
npx expo install <package>   # 의존성 추가는 npm install 대신 항상 이것 사용 (SDK 호환 버전 해석)
```

린트와 테스트는 아직 설정되어 있지 않다 (`npx expo lint`를 처음 실행하면 설정을 생성한다). 웹 실행(`npm run web`)은 `react-dom`, `react-native-web`이 없어 먼저 설치해야 한다.

## 아키텍처

### API (`apps/api/src`)

- 도메인별 Nest 모듈 구조: `workouts/`, `meals/` 각각 `*.module.ts` / `*.controller.ts` / `*.service.ts` / `dto/`. 새 도메인은 같은 형태로 만들고 `app.module.ts`의 `imports`에 등록한다. `common/`은 공통 코드(가드, 필터, 파이프 등) 자리로 비어 있다.
- **영속 계층이 없다.** 각 서비스가 메모리 배열에 저장하므로 재시작하면 데이터가 사라진다. DB/ORM은 아직 정해지지 않았다. 입력 검증(`ValidationPipe`, class-validator)과 인증도 없다.
- **ESM 프로젝트다** (`"type": "module"`, `module: nodenext`). 상대 경로 import에는 반드시 `.js` 확장자를 붙인다: `import { MealsService } from './meals.service.js'`.
- `isolatedModules` + `emitDecoratorMetadata` 조합 때문에, 데코레이터가 붙은 메서드 시그니처에서 참조하는 interface/type은 `import { type Meal, MealsService }`처럼 `type` 한정자로 import해야 한다 (아니면 TS1272). DTO는 런타임 메타데이터가 필요하므로 interface가 아닌 class로 선언하고 일반 import를 쓴다.
- 테스트는 Jest가 아니라 Vitest이며 `globals: true`라 `describe`/`it`/`expect`를 import하지 않는다.

### Mobile (`apps/mobile`)

- 내비게이션은 Expo Router(파일 기반)다. 진입점은 `expo-router/entry`이고 라우트는 `src/app/`에 있다: `_layout.tsx`(루트 Stack) → `(tabs)/_layout.tsx`(하단 탭 5개: 홈, 운동기록, 식단기록, 설정, 마이페이지). 탭을 추가·변경할 때는 `(tabs)/_layout.tsx`의 `NativeTabs.Trigger`와 같은 이름의 라우트 파일을 함께 고친다.
- 탭 바는 JS 탭(`Tabs`)이 아니라 네이티브 탭(`expo-router/unstable-native-tabs`의 `NativeTabs`)이다. iOS 26에서는 떠 있는 리퀴드 글래스 바, Android에서는 Material 탭으로 렌더링된다. SDK 57에서는 unstable API이고 SDK 58부터 import 경로가 `expo-router/native-tabs`로 바뀐다. 탭 아이콘은 iOS는 SF Symbols(`sf`), Android는 Material 아이콘(`md`)을 각각 지정한다. Android는 탭이 최대 5개다.
- 탭 바가 콘텐츠 위에 떠 있으므로 화면 하단에 고정하는 요소는 `useSafeAreaInsets().bottom`(탭 바 높이 포함)만큼 띄운다. `HomeScreen`의 플로팅 버튼 참고.
- 탭 위로 쌓이는 화면(예: `workout-calendar`)은 `src/app/` 바로 아래에 라우트 파일을 두고, 헤더 옵션은 루트 `_layout.tsx`의 `Stack.Screen`에 등록한다. 루트 Stack은 기본적으로 헤더를 숨기므로 뒤로 가기 버튼이 필요한 화면만 `headerShown: true`로 켠다.
- `src/app`의 라우트 파일은 `export { default } from '../../screens/...'` 한 줄짜리다. 화면 구현은 `src/screens/<도메인>/`에 두고, 라우트 파일에는 로직을 넣지 않는다.
- `HomeScreen`은 하드코딩한 샘플 데이터를 쓰고 아직 API를 호출하지 않는다. 나머지 네 탭의 화면은 제목만 있는 자리표시자다.
- 디자인 시스템: `src/theme`이 토큰(색상, 간격, 모서리, 글자, 그림자)의 유일한 출처이고, `src/components/ui`가 이를 쓰는 기본 컴포넌트, `src/components/*.tsx`가 도메인 조합 컴포넌트다. 화면과 조합 컴포넌트에서는 색상 코드·간격 숫자·글자 크기를 직접 쓰지 않고 토큰과 `ui` 컴포넌트를 쓴다. 텍스트는 RN `Text` 대신 `AppText`를 쓴다. 토큰 값, 컴포넌트 props, 레이아웃 규칙은 `docs/design-system.md`에 있으며, UI 작업 전에 읽고 `theme`이나 `ui` 컴포넌트를 바꾸면 이 문서도 함께 갱신한다. 기준 시안은 `reference/home.png`.
- 화면 안의 아이콘은 `@react-native-vector-icons/ionicons`의 `Ionicons`를 쓴다 (`@expo/vector-icons`는 지원 중단 예정이라 쓰지 않는다). 라이트 모드 전용이고 커스텀 폰트는 미정이다.
- 날짜 처리는 라이브러리 없이 `src/utils/date.ts`의 헬퍼를 쓴다. 주는 일요일 시작이고, 날짜 키는 로컬 시간 기준 `YYYY-MM-DD`(`toDateKey`)다.
- `src/api/client.ts`의 `request<T>()`가 유일한 HTTP 경로다. 도메인별 API 함수(`src/api/workouts.ts`, `src/api/meals.ts`)는 이를 감싸고, 화면은 이 함수들만 호출한다. 서버 주소는 `EXPO_PUBLIC_API_URL` (기본 `http://localhost:3000`). Android 에뮬레이터에서는 `http://10.0.2.2:3000`, 실기기에서는 개발 머신의 IP를 써야 한다 (`apps/mobile/.env`, 변경 후 Expo 재시작).
- `src/types/*`는 API의 DTO/응답 형태를 **손으로 복제한 것**이다. 두 앱 사이에 공유 패키지가 없으므로 `apps/api/src/*/dto`를 바꾸면 `apps/mobile/src/types`와 `src/api`도 함께 고쳐야 한다.
- `apps/mobile/AGENTS.md`(Expo 템플릿이 생성, `apps/mobile/CLAUDE.md`가 import)에 Expo 관련 규칙이 있다. 핵심: Expo/RN API는 기억에 의존하지 말고 `package.json`의 SDK 버전에 맞는 문서(`https://docs.expo.dev/versions/v57.0.0/`)를 확인할 것, `ios/`·`android/` 디렉터리를 손으로 만들거나 고치지 말 것.
