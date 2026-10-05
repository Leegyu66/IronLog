import { Pressable, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { AppText } from './AppText';

/** 내비게이션 헤더 오른쪽에 두는 글자 버튼. 예: "추가" */
export function HeaderButton({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" hitSlop={8} onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <AppText variant="bodyStrong">{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  pressed: {
    opacity: 0.6,
  },
});
