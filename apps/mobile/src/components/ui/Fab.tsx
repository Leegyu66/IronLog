import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, shadows } from '../../theme';

export interface FabProps {
  onPress?: () => void;
  accessibilityLabel: string;
}

export function Fab({ onPress, accessibilityLabel }: FabProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
    >
      <View style={styles.barHorizontal} />
      <View style={styles.barVertical} />
    </Pressable>
  );
}

const SIZE = 64;
const PLUS = 22;
const STROKE = 2.5;

const styles = StyleSheet.create({
  fab: {
    width: SIZE,
    height: SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.floating,
  },
  pressed: {
    opacity: 0.85,
  },
  barHorizontal: {
    position: 'absolute',
    width: PLUS,
    height: STROKE,
    borderRadius: STROKE,
    backgroundColor: colors.textInverse,
  },
  barVertical: {
    position: 'absolute',
    width: STROKE,
    height: PLUS,
    borderRadius: STROKE,
    backgroundColor: colors.textInverse,
  },
});
