import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { formatDateLabel, isSameDay, toDateKey, WEEKDAYS } from '../../utils/date';
import { AppText } from './AppText';
import { DateCircle } from './DateCircle';
import { IconButton } from './IconButton';

/** 해당 월을 일요일 시작 주 단위로 나눈다. 그 달에 속하지 않는 칸은 null. */
function getMonthWeeks(month: Date): (Date | null)[][] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const leading = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells: (Date | null)[] = Array.from({ length: leading }, () => null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, monthIndex, day));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export interface MonthCalendarProps {
  /** 표시할 달. 날짜(일)는 무시한다 */
  month: Date;
  onChangeMonth: (month: Date) => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  /** 기록이 있는 날짜. YYYY-MM-DD */
  markedDates?: string[];
}

export function MonthCalendar({ month, onChangeMonth, selectedDate, onSelectDate, markedDates = [] }: MonthCalendarProps) {
  const today = new Date();
  const marked = new Set(markedDates);
  const shiftMonth = (delta: number) => onChangeMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="heading">
          {month.getFullYear()}년 {month.getMonth() + 1}월
        </AppText>
        <View style={styles.nav}>
          <IconButton icon="chevron-back" accessibilityLabel="이전 달" onPress={() => shiftMonth(-1)} />
          <IconButton icon="chevron-forward" accessibilityLabel="다음 달" onPress={() => shiftMonth(1)} />
        </View>
      </View>

      <View style={styles.week}>
        {WEEKDAYS.map((weekday) => (
          <View key={weekday} style={styles.cell}>
            <AppText variant="label" color="secondary">
              {weekday}
            </AppText>
          </View>
        ))}
      </View>

      {getMonthWeeks(month).map((week, weekIndex) => (
        <View key={weekIndex} style={styles.week}>
          {week.map((day, dayIndex) => {
            if (!day) {
              return <View key={dayIndex} style={styles.cell} />;
            }
            const selected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, today);
            const hasRecord = marked.has(toDateKey(day));
            return (
              <Pressable
                key={dayIndex}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={`${formatDateLabel(day)}${isToday ? ', 오늘' : ''}${hasRecord ? ', 기록 있음' : ''}`}
                onPress={() => onSelectDate(day)}
                style={styles.cell}
              >
                <DateCircle day={day.getDate()} selected={selected} today={isToday} />
                <View style={[styles.mark, hasRecord && styles.markOn]} />
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  nav: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  week: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  mark: {
    width: 5,
    height: 5,
    borderRadius: radius.full,
  },
  markOn: {
    backgroundColor: colors.success,
  },
});
