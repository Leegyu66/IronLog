import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { AppText } from './AppText';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** date가 속한 주의 일요일부터 토요일까지 */
function getWeekDays(date: Date): Date[] {
  return WEEKDAYS.map((_, i) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + i));
}

export interface WeekStripProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function WeekStrip({ selectedDate, onSelectDate }: WeekStripProps) {
  const today = new Date();

  return (
    <View style={styles.row}>
      {getWeekDays(selectedDate).map((day) => {
        const selected = isSameDay(day, selectedDate);
        const isToday = isSameDay(day, today);
        return (
          <Pressable
            key={day.getTime()}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={`${day.getMonth() + 1}월 ${day.getDate()}일 ${WEEKDAYS[day.getDay()]}요일${isToday ? ', 오늘' : ''}`}
            onPress={() => onSelectDate(day)}
            style={styles.day}
          >
            <AppText variant="label" color={selected || isToday ? 'primary' : 'secondary'}>
              {WEEKDAYS[day.getDay()]}
            </AppText>
            <View style={[styles.date, isToday && styles.today, selected && styles.selected]}>
              <AppText variant="bodyStrong" color={selected ? 'inverse' : 'primary'}>
                {day.getDate()}
              </AppText>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const DATE_SIZE = 38;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  day: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  date: {
    width: DATE_SIZE,
    height: DATE_SIZE,
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
