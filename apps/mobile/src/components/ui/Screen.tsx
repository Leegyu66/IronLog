import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { colors } from '../../theme';

export function Screen({ style, edges = ['top'], ...rest }: SafeAreaViewProps) {
  return <SafeAreaView edges={edges} style={[styles.screen, style]} {...rest} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
