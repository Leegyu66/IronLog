import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../../theme';
import { AppText } from './AppText';

export interface DateCircleProps {
  day: number;
  selected?: boolean;
  today?: boolean;
}

/** 날짜 숫자 하나. 선택되면 검정 원, 오늘이면 검정 테두리. */
export function DateCircle({ day, selected = false, today = false }: DateCircleProps) {
  return (
    <View style={[styles.circle, today && styles.today, selected && styles.selected]}>
      <AppText variant="bodyStrong" color={selected ? 'inverse' : 'primary'}>
        {day}
      </AppText>
    </View>
  );
}

const SIZE = 38;

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  today: {
    borderColor: colors.text,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
