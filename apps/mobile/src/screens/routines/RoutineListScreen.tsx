import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { AppText, HeaderButton, ListRow, Screen } from '../../components/ui';
import { useRoutineStore } from '../../store/RoutineStore';
import { spacing } from '../../theme';

export default function RoutineListScreen() {
  const router = useRouter();
  const { routines, describeRoutine } = useRoutineStore();

  return (
    <Screen edges={[]}>
      <Stack.Screen
        options={{ headerRight: () => <HeaderButton title="추가" onPress={() => router.push('/routines/new')} /> }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {routines.length === 0 ? (
          <AppText color="secondary">아직 루틴이 없습니다. 오른쪽 위의 추가를 눌러 만들어 보세요.</AppText>
        ) : (
          routines.map((routine) => (
            <ListRow key={routine.id} title={routine.name} subtitle={describeRoutine(routine)} />
          ))
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    gap: spacing.md,
  },
});
