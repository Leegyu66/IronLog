import { StyleSheet, View } from 'react-native';
import { AppText, Screen } from '../../components/ui';
import { spacing } from '../../theme';

export default function MealListScreen() {
  return (
    <Screen>
      <View style={styles.content}>
        <AppText variant="display">식단기록</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
  },
});
