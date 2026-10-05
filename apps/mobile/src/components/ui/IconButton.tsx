import { Ionicons } from '@react-native-vector-icons/ionicons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors, radius } from '../../theme';

export interface IconButtonProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  accessibilityLabel: string;
  onPress?: () => void;
}

export function IconButton({ icon, accessibilityLabel, onPress }: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={22} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: colors.track,
  },
});
