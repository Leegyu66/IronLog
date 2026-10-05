import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppText, Button, HeaderButton, ListRow, Screen } from '../../components/ui';
import { useRoutineStore } from '../../store/RoutineStore';
import { spacing } from '../../theme';

export default function RoutineSelectScreen() {
  const router = useRouter();
  const { routines, describeRoutine, startSession } = useRoutineStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const start = () => {
    const routine = routines.find((item) => item.id === selectedId);
    if (!routine) {
      return;
    }
    startSession(routine);
    router.back();
  };

  // 루틴이 있든 없든 이 화면에서 바로 새 루틴을 만들 수 있게 한다
  const header = (
    <Stack.Screen
      options={{ headerRight: () => <HeaderButton title="추가" onPress={() => router.push('/routines/new')} /> }}
    />
  );

  if (routines.length === 0) {
    return (
      <Screen edges={['bottom']}>
        {header}
        <View style={styles.empty}>
          <AppText color="secondary">아직 루틴이 없습니다. 먼저 루틴을 만들어 주세요.</AppText>
          <Button title="루틴 만들기" onPress={() => router.push('/routines/new')} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={['bottom']}>
      {header}
      <ScrollView contentContainerStyle={styles.content}>
        {routines.map((routine) => (
          <ListRow
            key={routine.id}
            title={routine.name}
            subtitle={describeRoutine(routine)}
            trailing={routine.id === selectedId ? 'checked' : 'unchecked'}
            onPress={() => setSelectedId(routine.id)}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Button title="이 루틴으로 시작" disabled={!selectedId} onPress={start} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  empty: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
});
