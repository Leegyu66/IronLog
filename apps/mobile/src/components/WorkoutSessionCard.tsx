import { StyleSheet, View } from 'react-native';
import { spacing } from '../theme';
import { WorkoutSession, WorkoutStatus } from '../types/routine';
import { AppText, Card, Chip } from './ui';

const statusLabels: Record<WorkoutStatus, string> = {
  before: '운동 전',
  active: '운동 중',
  done: '운동 후',
};

function formatDuration(ms: number) {
  const minutes = Math.max(0, Math.floor(ms / 60000));
  return minutes < 60 ? `${minutes}분` : `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <AppText variant="caption" color="secondary">
        {label}
      </AppText>
      <AppText variant="bodyStrong">{value}</AppText>
    </View>
  );
}

export interface WorkoutSessionCardProps {
  session: WorkoutSession;
  /** 운동 시간을 계산할 기준 시각 (ms) */
  now: number;
}

export function WorkoutSessionCard({ session, now }: WorkoutSessionCardProps) {
  const startedAt = new Date(session.startedAt);

  return (
    <Card variant="muted" style={styles.card}>
      <View style={styles.header}>
        <AppText variant="heading" style={styles.title}>
          {startedAt.getMonth() + 1}월 {startedAt.getDate()}일 운동
        </AppText>
        <Chip label={statusLabels[session.status]} />
      </View>
      <AppText color="secondary">루틴 · {session.routineName}</AppText>
      <View style={styles.stats}>
        <Stat label="운동시간" value={formatDuration(now - session.startedAt)} />
        <Stat label="총 볼륨" value={`${session.totalVolumeKg.toLocaleString()} kg`} />
        <Stat label="운동부위" value={session.bodyParts.join(' · ') || '-'} />
        <Stat label="소모칼로리" value={session.caloriesKcal === null ? '-' : `${session.caloriesKcal} kcal`} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.md,
    marginTop: spacing.sm,
  },
  stat: {
    width: '50%',
    gap: 2,
  },
});
