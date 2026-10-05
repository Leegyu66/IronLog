import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppText, IconButton, Screen } from '../../components/ui';
import { spacing } from '../../theme';

export default function WorkoutListScreen() {
  const router = useRouter();

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
});
