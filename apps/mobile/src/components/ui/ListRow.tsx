import { Ionicons } from '@react-native-vector-icons/ionicons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { AppText } from './AppText';

type IconName = ComponentProps<typeof Ionicons>['name'];

const trailingIcons: Record<'chevron' | 'checked' | 'unchecked', { name: IconName; color: string }> = {
  chevron: { name: 'chevron-forward', color: colors.textSecondary },
  checked: { name: 'checkmark-circle', color: colors.primary },
  unchecked: { name: 'ellipse-outline', color: colors.textSecondary },
};

export interface ListRowProps {
  title: string;
  subtitle?: string;
  /** chevron: 다른 화면으로 이동, checked/unchecked: 선택 상태 */
  trailing?: keyof typeof trailingIcons;
  onPress?: () => void;
}

export function ListRow({ title, subtitle, trailing, onPress }: ListRowProps) {
  const icon = trailing && trailingIcons[trailing];
  const selectable = trailing === 'checked' || trailing === 'unchecked';

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={selectable ? { selected: trailing === 'checked' } : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.text}>
        <AppText variant="bodyStrong">{title}</AppText>
        {subtitle ? (
          <AppText variant="caption" color="secondary" numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {icon && <Ionicons name={icon.name} size={22} color={icon.color} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 60,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    flex: 1,
    gap: 2,
  },
});
