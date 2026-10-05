import { Pressable, StyleSheet } from 'react-native';
import { AppText } from './AppText';

export interface TextLinkProps {
  title: string;
  onPress?: () => void;
}

/** 밑줄 그어진 작은 글씨로 된 보조 동작. 주 버튼 아래에 둔다. */
export function TextLink({ title, onPress }: TextLinkProps) {
  return (
    <Pressable accessibilityRole="button" hitSlop={12} onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <AppText variant="caption" color="secondary" style={styles.text}>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.6,
  },
});
