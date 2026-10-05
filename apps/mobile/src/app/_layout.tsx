import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="workout-calendar"
          options={{
            headerShown: true,
            title: '운동 캘린더',
            headerBackTitle: '운동기록',
            headerTintColor: colors.text,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.background },
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
