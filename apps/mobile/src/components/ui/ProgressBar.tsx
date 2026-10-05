import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../../theme';

export interface ProgressBarProps {
  /** 0 ~ 1 */
  value: number;
  color?: string;
}

export function ProgressBar({ value, color = colors.success }: ProgressBarProps) {
  const ratio = Math.min(1, Math.max(0, value));
  return (
    <View style={styles.track} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(ratio * 100) }}>
      <View style={[styles.fill, { width: `${ratio * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.track,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.full,
  },
});
