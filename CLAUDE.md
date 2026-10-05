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
npx tsc --noEmit             # 타입 체크
npx expo install <package>   # 의존성 추가는 npm install 대신 항상 이것 사용 (SDK 호환 버전 해석)
```

린트는 아직 설정되어 있지 않다 (`npx expo lint`를 처음 실행하면 설정을 생성한다).

## 아키텍처

### API (`apps/api/src`)

- 도메인별 Nest 모듈 구조: `workouts/`, `meals/` 각각 `*.module.ts` / `*.controller.ts` / `*.service.ts` / `dto/`. 새 도메인은 같은 형태로 만들고 `app.module.ts`의 `imports`에 등록한다. `common/`은 공통 코드(가드, 필터, 파이프 등) 자리로 비어 있다.
- **영속 계층이 없다.** 각 서비스가 메모리 배열에 저장하므로 재시작하면 데이터가 사라진다. DB/ORM은 아직 정해지지 않았다. 입력 검증(`ValidationPipe`, class-validator)과 인증도 없다.
- **ESM 프로젝트다** (`"type": "module"`, `module: nodenext`). 상대 경로 import에는 반드시 `.js` 확장자를 붙인다: `import { MealsService } from './meals.service.js'`.
- `isolatedModules` + `emitDecoratorMetadata` 조합 때문에, 데코레이터가 붙은 메서드 시그니처에서 참조하는 interface/type은 `import { type Meal, MealsService }`처럼 `type` 한정자로 import해야 한다 (아니면 TS1272). DTO는 런타임 메타데이터가 필요하므로 interface가 아닌 class로 선언하고 일반 import를 쓴다.
- 테스트는 Jest가 아니라 Vitest이며 `globals: true`라 `describe`/`it`/`expect`를 import하지 않는다.

### Mobile (`apps/mobile`)

- 진입점은 `index.ts` → `App.tsx`. 현재 `App.tsx`가 화면 하나를 직접 렌더링하며 내비게이션 라이브러리는 설치되어 있지 않다.
- `src/api/client.ts`의 `request<T>()`가 유일한 HTTP 경로다. 도메인별 API 함수(`src/api/workouts.ts`, `src/api/meals.ts`)는 이를 감싸고, 화면은 이 함수들만 호출한다. 서버 주소는 `EXPO_PUBLIC_API_URL` (기본 `http://localhost:3000`). 실기기에서는 localhost 대신 개발 머신의 IP를 써야 한다.
- `src/types/*`는 API의 DTO/응답 형태를 **손으로 복제한 것**이다. 두 앱 사이에 공유 패키지가 없으므로 `apps/api/src/*/dto`를 바꾸면 `apps/mobile/src/types`와 `src/api`도 함께 고쳐야 한다.
- `apps/mobile/AGENTS.md`(Expo 템플릿이 생성, `apps/mobile/CLAUDE.md`가 import)에 Expo 관련 규칙이 있다. 핵심: Expo/RN API는 기억에 의존하지 말고 `package.json`의 SDK 버전에 맞는 문서(`https://docs.expo.dev/versions/v57.0.0/`)를 확인할 것, `ios/`·`android/` 디렉터리를 손으로 만들거나 고치지 말 것.
- 주의: AGENTS.md는 Expo Router와 `src/app/` 라우트 디렉터리를 전제로 하지만 이 프로젝트는 blank 템플릿이라 `expo-router`가 없고 화면은 `src/screens/`에 있다. 내비게이션을 도입할 때 Expo Router로 전환할지 먼저 결정해야 한다.
