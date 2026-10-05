import { Text, TextProps } from 'react-native';
import { colors, TextVariant, typography } from '../../theme';

const textColors = {
  primary: colors.text,
  secondary: colors.textSecondary,
  inverse: colors.textInverse,
} as const;

export interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: keyof typeof textColors;
}

export function AppText({ variant = 'body', color = 'primary', style, ...rest }: AppTextProps) {
  return <Text style={[typography[variant], { color: textColors[color] }, style]} {...rest} />;
}
