import { Pressable, StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { formatDateLabel, isSameDay, WEEKDAYS } from '../../utils/date';
import { AppText } from './AppText';
import { DateCircle } from './DateCircle';

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
            accessibilityLabel={`${formatDateLabel(day)}${isToday ? ', 오늘' : ''}`}
            onPress={() => onSelectDate(day)}
            style={styles.day}
          >
            <AppText variant="label" color={selected || isToday ? 'primary' : 'secondary'}>
              {WEEKDAYS[day.getDay()]}
            </AppText>
            <DateCircle day={day.getDate()} selected={selected} today={isToday} />
          </Pressable>
        );
      })}
    </View>
  );
}

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
});
