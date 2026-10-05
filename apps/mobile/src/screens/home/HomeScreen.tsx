import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogCard, LogCardProps } from '../../components/LogCard';
import { ScoreCard } from '../../components/ScoreCard';
import { AppText, Fab, PageDots, Screen, WeekStrip } from '../../components/ui';
import { spacing } from '../../theme';

// TODO: API 연동 전까지 쓰는 샘플 데이터
const sampleLogs: LogCardProps[] = [
  { title: '고구마', time: '오전 10:55', headline: '150 kcal', macros: { protein: 1, carbs: 16, fat: 9 } },
  { title: '스쿼트', time: '오전 10:53', headline: '5세트 · 100kg' },
  { title: '땅콩버터', time: '오전 10:52', headline: '94 kcal', macros: { protein: 4, carbs: 3, fat: 8 } },
];

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  // 하단 inset에는 떠 있는 탭 바 높이가 포함된다
  const fabBottom = useSafeAreaInsets().bottom + spacing.lg;

  return (
    <Screen>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: fabBottom + FAB_CLEARANCE }]}>
        <WeekStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <ScoreCard
          title="오늘의 점수"
          score={7}
          max={10}
          message="칼로리와 지방은 목표를 넘었어요. 단백질을 조금 더 챙겨 보세요."
        />
        <PageDots count={3} activeIndex={1} />
        <AppText variant="title" style={styles.sectionTitle}>
          최근 기록
        </AppText>
        <View style={styles.list}>
          {sampleLogs.map((log) => (
            <LogCard key={`${log.title}-${log.time}`} {...log} />
          ))}
        </View>
      </ScrollView>
      <View style={[styles.fab, { bottom: fabBottom }]}>
        <Fab accessibilityLabel="기록 추가" />
      </View>
    </Screen>
  );
}

// 플로팅 버튼(64)과 그 위 여백
const FAB_CLEARANCE = 64 + spacing.lg;

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  sectionTitle: {
    marginTop: spacing.lg,
  },
  list: {
    gap: spacing.lg,
  },
  fab: {
    position: 'absolute',
    right: spacing.xl,
  },
});
