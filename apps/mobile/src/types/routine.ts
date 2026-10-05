export interface Exercise {
  id: string;
  name: string;
  /** 부위. 예: 하체, 가슴 */
  category: string;
}

export interface Routine {
  id: string;
  name: string;
  exerciseIds: string[];
}

export type WorkoutStatus = 'before' | 'active' | 'done';

/** 루틴 하나로 진행하는 그날의 운동 */
export interface WorkoutSession {
  id: string;
  routineName: string;
  /** 시작 시각 (ms) */
  startedAt: number;
  status: WorkoutStatus;
  /** 루틴에 담긴 종목의 부위. 중복 없음 */
  bodyParts: string[];
  totalVolumeKg: number;
  /** 아직 계산하지 않으면 null */
  caloriesKcal: number | null;
}
