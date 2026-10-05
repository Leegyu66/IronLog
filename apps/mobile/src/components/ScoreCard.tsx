import { StyleSheet, View } from 'react-native';
import { spacing } from '../theme';
import { AppText, Card, ProgressBar } from './ui';

export interface ScoreCardProps {
  title: string;
  score: number;
  max: number;
  message: string;
}

export function ScoreCard({ title, score, max, message }: ScoreCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <AppText variant="heading">{title}</AppText>
        <AppText variant="heading">
          {score}/{max}
        </AppText>
      </View>
      <ProgressBar value={score / max} />
      <AppText color="secondary">{message}</AppText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
