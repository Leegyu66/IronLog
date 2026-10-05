import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';

export function PageDots({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }, (_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex && styles.active]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  active: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
});
