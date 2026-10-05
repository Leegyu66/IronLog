import { Image, StyleSheet, View } from 'react-native';
import { radius, spacing } from '../theme';
import { AppText, Card, Chip, MacroStat } from './ui';

export interface LogCardProps {
  title: string;
  time: string;
  /** 굵게 표시되는 대표 수치. 예: "782 kcal", "5 x 100kg" */
  headline: string;
  macros?: { protein: number; carbs: number; fat: number };
  imageUri?: string;
}

export function LogCard({ title, time, headline, macros, imageUri }: LogCardProps) {
  return (
    <Card variant="muted" padded={false} style={styles.card}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <View style={styles.body}>
        <View style={styles.header}>
          <AppText variant="body" numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
          <Chip label={time} />
        </View>
        <AppText variant="heading">{headline}</AppText>
        {macros && (
          <View style={styles.macros}>
            <MacroStat kind="protein" grams={macros.protein} />
            <MacroStat kind="carbs" grams={macros.carbs} />
            <MacroStat kind="fat" grams={macros.fat} />
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {
    width: 116,
    borderTopLeftRadius: radius.lg,
    borderBottomLeftRadius: radius.lg,
  },
  body: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
  },
  macros: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
});
