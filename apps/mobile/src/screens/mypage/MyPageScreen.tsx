import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppText, ListRow, Screen } from '../../components/ui';
import { useRoutineStore } from '../../store/RoutineStore';
import { spacing } from '../../theme';

export default function MyPageScreen() {
  const router = useRouter();
  const { routines, exercises } = useRoutineStore();

  return (
    <Screen>
      <View style={styles.content}>
        <AppText variant="display">마이페이지</AppText>
        <View style={styles.menu}>
          <ListRow
            title="루틴"
            subtitle={`${routines.length}개의 루틴`}
            trailing="chevron"
            onPress={() => router.push('/routines')}
          />
          <ListRow
            title="종목"
            subtitle={`${exercises.length}개의 종목`}
            trailing="chevron"
            onPress={() => router.push('/exercises')}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  menu: {
    gap: spacing.md,
  },
});
