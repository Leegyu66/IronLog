import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppText, Card, MonthCalendar, Screen } from '../../components/ui';
import { spacing } from '../../theme';
import { formatDateLabel } from '../../utils/date';

export default function WorkoutCalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [month, setMonth] = useState(() => new Date());

  return (
    <Screen edges={[]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <MonthCalendar
            month={month}
            onChangeMonth={setMonth}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </Card>
        <View style={styles.day}>
          <AppText variant="title">{formatDateLabel(selectedDate)}</AppText>
          {/* TODO: 선택한 날짜의 운동 기록 목록 */}
          <AppText color="secondary">기록이 없습니다.</AppText>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  day: {
    gap: spacing.sm,
  },
});
