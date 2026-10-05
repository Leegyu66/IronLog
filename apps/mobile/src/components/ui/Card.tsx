import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, radius, shadows, spacing } from '../../theme';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'muted';
  padded?: boolean;
}

export function Card({ variant = 'elevated', padded = true, style, ...rest }: CardProps) {
  return <View style={[styles.base, styles[variant], padded && styles.padded, style]} {...rest} />;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
  },
  padded: {
    padding: spacing.lg,
  },
  elevated: {
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  muted: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
