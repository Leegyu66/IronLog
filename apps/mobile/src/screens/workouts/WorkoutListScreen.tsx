import { StyleSheet, View } from 'react-native';
import { AppText, Screen } from '../../components/ui';
import { spacing } from '../../theme';

export default function WorkoutListScreen() {
  return (
    <Screen>
      <View style={styles.content}>
        <AppText variant="display">운동기록</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
  },
});
