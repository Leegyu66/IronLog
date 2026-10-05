import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { AppText } from './AppText';

export type MacroKind = 'protein' | 'carbs' | 'fat';

const labels: Record<MacroKind, string> = {
  protein: '단백질',
  carbs: '탄수화물',
  fat: '지방',
};

export function MacroStat({ kind, grams }: { kind: MacroKind; grams: number }) {
  return (
    <View style={styles.row} accessibilityLabel={`${labels[kind]} ${grams}그램`}>
      <View style={[styles.dot, { backgroundColor: colors[kind] }]} />
      <AppText variant="caption">{grams}g</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
  },
});
