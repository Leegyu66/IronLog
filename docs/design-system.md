# IronLog 디자인 시스템

모바일 앱(`apps/mobile`)의 디자인 토큰과 UI 컴포넌트 문서. 기준 시안은 [`reference/home.png`](../reference/home.png)이다.

- 토큰: `apps/mobile/src/theme`
- 기본 컴포넌트: `apps/mobile/src/components/ui`
- 조합 컴포넌트: `apps/mobile/src/components`

## 원칙

- **차분한 바탕, 강한 대비.** 배경과 카드는 밝은 무채색이고, 텍스트와 주요 버튼은 거의 검정이다. 색은 진행 상태(초록)와 영양소 구분(빨강·주황·파랑)에만 쓴다.
- **둥근 카드가 기본 단위.** 정보는 모서리가 둥근 카드에 담는다. 요약은 흰색 그림자 카드, 목록 항목은 회색 테두리 카드.
- **숫자가 주인공.** 카드에서 가장 굵은 글자는 대표 수치(칼로리, 세트·중량)다. 이름과 부가 정보는 한 단계 가볍게 쓴다.
- **토큰만 쓴다.** 화면과 조합 컴포넌트에서는 색상 코드, 간격 숫자, 글자 크기를 직접 쓰지 않는다. `theme`의 토큰과 `ui` 컴포넌트를 사용한다.

현재 라이트 모드 전용이다. 커스텀 폰트는 아직 정해지지 않았다(시스템 폰트 사용).

## 토큰

```ts
import { colors, spacing, radius, typography, shadows } from '../theme';
```

### 색상 (`colors`)

| 토큰 | 값 | 용도 |
|---|---|---|
| `background` | `#F6F6F8` | 화면 배경 |
| `surface` | `#FFFFFF` | 요약 카드, 칩, 보조 버튼 |
| `surfaceMuted` | `#F2F2F6` | 목록 카드 |
| `border` | `#E8E8EE` | 카드·보조 버튼 테두리 |
| `track` | `#EEEEF2` | 진행 바의 빈 구간 |
| `text` | `#0B0B0D` | 기본 텍스트 |
| `textSecondary` | `#8A8A90` | 설명, 보조 텍스트 |
| `textInverse` | `#FFFFFF` | 어두운 배경 위 텍스트 |
| `primary` | `#1C1C1E` | 주요 버튼, 플로팅 버튼 |
| `success` | `#7BD97A` | 진행 바, 긍정 상태 |
| `danger` | `#E5484D` | 오류, 삭제 |
| `protein` | `#E0685B` | 단백질 |
| `carbs` | `#DE9463` | 탄수화물 |
| `fat` | `#5B8FD6` | 지방 |

### 간격 (`spacing`)

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `xs` | 4 | 칩 세로 여백, 아이콘과 글자 사이 |
| `sm` | 8 | 카드 안 요소 사이 |
| `md` | 12 | 요약 카드 안 요소 사이 |
| `lg` | 16 | 카드 안쪽 여백, 카드 사이 |
| `xl` | 24 | 화면 좌우 여백 |
| `xxl` | 32 | 섹션 사이, 플로팅 버튼 하단 여백 |

### 모서리 (`radius`)

| 토큰 | 값 | 용도 |
|---|---|---|
| `sm` | 8 | 작은 요소 |
| `md` | 14 | 입력 필드 등 중간 요소 |
| `lg` | 22 | 카드 |
| `full` | 999 | 칩, 버튼, 진행 바, 플로팅 버튼 |

### 글자 (`typography`)

| variant | 크기 / 줄 높이 | 굵기 | 용도 |
|---|---|---|---|
| `display` | 28 / 34 | 700 | 화면 대표 수치 |
| `title` | 22 / 28 | 700 | 섹션 제목 |
| `heading` | 17 / 22 | 600 | 카드 제목, 카드 대표 수치 |
| `body` | 15 / 21 | 400 | 본문, 항목 이름 |
| `bodyStrong` | 15 / 21 | 600 | 버튼 글자, 강조 본문 |
| `caption` | 13 / 18 | 400 | 영양소 수치 등 부가 정보 |
| `label` | 12 / 16 | 500 | 칩 |

### 그림자 (`shadows`)

| 토큰 | 용도 |
|---|---|
| `card` | 흰색 요약 카드. 넓고 옅은 그림자 |
| `floating` | 플로팅 버튼. 짙은 그림자 |

## 기본 컴포넌트 (`components/ui`)

```ts
import { AppText, Button, Card, Chip, Fab, IconButton, MacroStat, MonthCalendar, PageDots, ProgressBar, Screen, WeekStrip } from '../components/ui';
```

### AppText

모든 텍스트에 RN `Text` 대신 사용한다.

| prop | 타입 | 기본값 |
|---|---|---|
| `variant` | `typography`의 키 | `'body'` |
| `color` | `'primary' \| 'secondary' \| 'inverse'` | `'primary'` |

그 외 `TextProps`를 그대로 받는다.

```tsx
<AppText variant="title">최근 기록</AppText>
<AppText color="secondary">단백질을 조금 더 챙겨 보세요.</AppText>
```

### Card

| prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `variant` | `'elevated' \| 'muted'` | `'elevated'` | `elevated`: 흰색 + 그림자(요약). `muted`: 회색 + 테두리(목록 항목) |
| `padded` | `boolean` | `true` | 안쪽 여백(`lg`) 적용 여부. 이미지가 가장자리까지 닿아야 하면 `false` |

### Button

| prop | 타입 | 기본값 |
|---|---|---|
| `title` | `string` | 필수 |
| `onPress` | `() => void` | - |
| `variant` | `'primary' \| 'secondary'` | `'primary'` |
| `disabled` | `boolean` | `false` |

`primary`는 검정 배경에 흰 글자, `secondary`는 흰 배경에 테두리. 높이 52의 알약 모양이다. 한 화면에 `primary`는 하나만 둔다.

### Fab

화면의 대표 추가 동작에 쓰는 지름 64의 검정 원형 버튼(+ 표시). 아이콘만 있으므로 `accessibilityLabel`이 필수다.

```tsx
<Fab accessibilityLabel="기록 추가" onPress={openAddSheet} />
```

### IconButton

글자 없이 아이콘만 있는 작은 버튼(36x36, 아이콘 22). 화면 제목 오른쪽의 보조 동작에 쓴다. `accessibilityLabel`이 필수다.

| prop | 타입 |
|---|---|
| `icon` | Ionicons 아이콘 이름 |
| `accessibilityLabel` | `string` |
| `onPress` | `() => void` |

```tsx
<IconButton icon="calendar-outline" accessibilityLabel="운동 캘린더 열기" onPress={openCalendar} />
```

### Chip

시간·태그 같은 짧은 메타 정보를 담는 흰색 알약. `label: string`.

### ProgressBar

| prop | 타입 | 기본값 |
|---|---|---|
| `value` | `number` (0~1, 범위를 벗어나면 잘림) | 필수 |
| `color` | `string` | `colors.success` |

### MacroStat

영양소 한 종류의 그램 수. 종류는 색 점으로 구분한다.

| prop | 타입 |
|---|---|
| `kind` | `'protein' \| 'carbs' \| 'fat'` |
| `grams` | `number` |

### PageDots

가로로 넘기는 카드의 현재 위치 표시. `count`, `activeIndex`.

### WeekStrip

선택된 날짜가 속한 한 주(일~토)를 가로로 보여 주는 날짜 선택 줄. 화면 상단에 둔다.

| prop | 타입 | 설명 |
|---|---|---|
| `selectedDate` | `Date` | 선택된 날짜. 표시되는 주도 이 값으로 정해진다 |
| `onSelectDate` | `(date: Date) => void` | 날짜를 누르면 그 날짜(자정 기준)로 호출 |

상태를 갖지 않으므로 선택된 날짜는 화면이 관리한다. 선택된 날짜는 검정 원에 흰 글자, 오늘은 검정 테두리 원으로 표시한다.

```tsx
const [selectedDate, setSelectedDate] = useState(() => new Date());
<WeekStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />
```

### MonthCalendar

한 달을 일요일 시작 격자로 보여 주는 달력. 위쪽에 "2026년 10월"과 이전·다음 달 버튼이 있다. `WeekStrip`과 같은 규칙으로 선택된 날짜는 검정 원, 오늘은 검정 테두리 원이고, 기록이 있는 날짜에는 숫자 아래에 초록 점이 붙는다. 그 달에 속하지 않는 칸은 비워 둔다.

| prop | 타입 | 설명 |
|---|---|---|
| `month` | `Date` | 표시할 달 (일은 무시) |
| `onChangeMonth` | `(month: Date) => void` | 이전·다음 달 버튼을 누르면 그 달의 1일로 호출 |
| `selectedDate` | `Date` | 선택된 날짜 |
| `onSelectDate` | `(date: Date) => void` | 날짜를 누르면 호출 |
| `markedDates` | `string[]` (선택) | 기록이 있는 날짜. `YYYY-MM-DD` (`utils/date`의 `toDateKey` 형식) |

상태를 갖지 않으므로 표시할 달과 선택된 날짜는 화면이 관리한다. 보통 `Card` 안에 넣어 쓴다.

```tsx
<Card>
  <MonthCalendar month={month} onChangeMonth={setMonth} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
</Card>
```

### DateCircle

날짜 숫자 하나를 그리는 원(38). `WeekStrip`과 `MonthCalendar`가 공유한다. `day`, `selected`, `today`.

### Screen

모든 화면의 최상위 컨테이너. 배경색과 안전 영역(기본은 상단만)을 처리한다. `react-native-safe-area-context`의 `SafeAreaView` props를 그대로 받는다. 앱 루트(`App.tsx`)가 `SafeAreaProvider`로 감싸져 있어야 한다.

## 조합 컴포넌트 (`components`)

### ScoreCard

제목, 점수, 진행 바, 한 줄 코멘트로 이루어진 요약 카드.

| prop | 타입 |
|---|---|
| `title` | `string` |
| `score`, `max` | `number` |
| `message` | `string` |

### LogCard

식단과 운동 기록에 공통으로 쓰는 목록 카드.

| prop | 타입 | 설명 |
|---|---|---|
| `title` | `string` | 항목 이름. 한 줄을 넘으면 말줄임 |
| `time` | `string` | 오른쪽 위 칩에 표시 |
| `headline` | `string` | 굵게 표시되는 대표 수치. 예: `"782 kcal"`, `"5세트 · 100kg"` |
| `macros` | `{ protein, carbs, fat }` (선택) | 있으면 아래에 영양소 줄 표시. 운동 기록은 생략 |
| `imageUri` | `string` (선택) | 있으면 카드 왼쪽에 사진 표시 |

## 아이콘

화면 안의 아이콘은 `@react-native-vector-icons/ionicons`의 `Ionicons`를 쓴다(탭 바 아이콘은 아래 참고). 기본은 외곽선(`-outline`) 모양이고, 선택·활성 상태에서만 채워진 모양을 쓴다. 색은 `colors.text`(활성) 또는 `colors.textSecondary`(비활성).

```tsx
import { Ionicons } from '@react-native-vector-icons/ionicons';

<Ionicons name="barbell-outline" size={24} color={colors.textSecondary} />
```

## 하단 탭 바

`src/app/(tabs)/_layout.tsx`에 네이티브 탭(`NativeTabs`)으로 정의한다. 모양은 OS가 그린다: iOS 26에서는 콘텐츠 위에 떠 있는 리퀴드 글래스 바, Android에서는 Material 탭. 색은 `tintColor`(`colors.text`)만 지정하고 배경·모양은 직접 꾸미지 않는다.

| 탭 | 라우트 | iOS (SF Symbols, 기본 / 선택) | Android (Material) |
|---|---|---|---|
| 홈 | `index` | `house` / `house.fill` | `home` |
| 운동기록 | `workouts` | `dumbbell` / `dumbbell.fill` | `fitness_center` |
| 식단기록 | `meals` | `fork.knife` | `restaurant` |
| 설정 | `settings` | `gearshape` / `gearshape.fill` | `settings` |
| 마이페이지 | `mypage` | `person` / `person.fill` | `person` |

탭 바가 콘텐츠를 덮으므로, 화면 하단에 고정하는 요소와 스크롤 영역의 아래 여백은 `useSafeAreaInsets().bottom`(탭 바 높이 포함)을 더해 잡는다.

## 화면 구성 예시

`screens/home/HomeScreen.tsx`가 기준 구현이다.

```tsx
<Screen>
  <ScrollView contentContainerStyle={{ padding: spacing.xl, gap: spacing.lg }}>
    <WeekStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />
    <ScoreCard title="오늘의 점수" score={7} max={10} message="..." />
    <AppText variant="title">최근 기록</AppText>
    <LogCard title="고구마" time="오전 10:55" headline="150 kcal" macros={{ protein: 1, carbs: 16, fat: 9 }} />
    <LogCard title="스쿼트" time="오전 10:53" headline="5세트 · 100kg" />
  </ScrollView>
  <Fab accessibilityLabel="기록 추가" />
</Screen>
```

- 화면 좌우 여백은 `xl`(24), 카드 사이 간격은 `lg`(16).
- 플로팅 버튼은 오른쪽 `xl`, 아래는 하단 inset + `lg` 위치에 절대 배치하고, 스크롤 영역 아래쪽에 버튼에 가려지지 않을 만큼 여백을 둔다.

## 확장할 때

- 새 색·간격이 필요하면 컴포넌트에 값을 직접 쓰지 말고 `theme`에 토큰을 먼저 추가한 뒤 이 문서의 표를 갱신한다.
- 두 화면 이상에서 쓰는 UI는 `components/ui`(도메인과 무관) 또는 `components`(도메인 조합)로 올린다.
- 누를 수 있는 요소에는 `accessibilityRole`을 지정하고, 글자가 없는 요소에는 `accessibilityLabel`을 붙인다.

## 미정 사항

- 커스텀 폰트 (시안은 둥근 기하학적 산세리프)
- 다크 모드
