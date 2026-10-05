import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { RoutineStoreProvider } from '../store/RoutineStore';
import { colors } from '../theme';

// 탭 위로 쌓이는 화면의 공통 헤더
const stackedHeader = {
  headerShown: true,
  headerBackButtonDisplayMode: 'minimal',
  headerTintColor: colors.text,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: colors.background },
} as const;

export default function RootLayout() {
  return (
    <RoutineStoreProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="workout-calendar" options={{ ...stackedHeader, title: '운동 캘린더' }} />
        <Stack.Screen name="workout-start" options={{ ...stackedHeader, title: '루틴 선택' }} />
        <Stack.Screen name="routines/index" options={{ ...stackedHeader, title: '루틴' }} />
        <Stack.Screen name="routines/new" options={{ ...stackedHeader, title: '루틴 추가' }} />
        <Stack.Screen name="exercises" options={{ ...stackedHeader, title: '종목' }} />
      </Stack>
      <StatusBar style="dark" />
    </RoutineStoreProvider>
  );
}
