import { StyleSheet, View } from 'react-native';
import { AppText, Screen } from '../../components/ui';
import { spacing } from '../../theme';

export default function SettingsScreen() {
  return (
    <Screen>
      <View style={styles.content}>
        <AppText variant="display">설정</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
  },
});
