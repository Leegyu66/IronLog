import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText, Button, IconButton, Screen, TextLink } from '../../components/ui';
import { WorkoutSessionCard } from '../../components/WorkoutSessionCard';
import { useRoutineStore } from '../../store/RoutineStore';
import { spacing } from '../../theme';

export default function WorkoutListScreen() {
  const router = useRouter();
  const { sessions } = useRoutineStore();
  const bottomInset = useSafeAreaInsets().bottom;

  // 진행 중인 운동의 운동시간을 30초마다 갱신한다
  const [now, setNow] = useState(() => Date.now());
  const hasActive = sessions.some((session) => session.status === 'active');
  useEffect(() => {
    if (!hasActive) {
      return;
    }
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, [hasActive, sessions.length]);

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="display">운동기록</AppText>
        <IconButton
          icon="calendar-outline"
          accessibilityLabel="운동 캘린더 열기"
          onPress={() => router.push('/workout-calendar')}
        />
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          sessions.length === 0 && styles.contentEmpty,
          { paddingBottom: bottomInset + spacing.xl },
        ]}
      >
        {sessions.map((session) => (
          <WorkoutSessionCard key={session.id} session={session} now={now} />
        ))}
        <View style={styles.actions}>
          <Button title="운동 시작하기" onPress={() => router.push('/workout-start')} />
          <View style={styles.rest}>
            {/* TODO: 휴식일 기록 동작 연결 */}
            <TextLink title="하루 쉬어가기" />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.xl,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  contentEmpty: {
    justifyContent: 'center',
  },
  actions: {
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  rest: {
    alignItems: 'center',
  },
});
