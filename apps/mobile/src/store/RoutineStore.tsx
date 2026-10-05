import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Exercise, Routine, WorkoutSession } from '../types/routine';

// TODO: API 연동 전까지 쓰는 기본 종목
const defaultExercises: Exercise[] = [
  { id: 'squat', name: '스쿼트', category: '하체' },
  { id: 'leg-press', name: '레그 프레스', category: '하체' },
  { id: 'lunge', name: '런지', category: '하체' },
  { id: 'bench-press', name: '벤치프레스', category: '가슴' },
  { id: 'incline-press', name: '인클라인 프레스', category: '가슴' },
  { id: 'push-up', name: '푸시업', category: '가슴' },
  { id: 'deadlift', name: '데드리프트', category: '등' },
  { id: 'pull-up', name: '풀업', category: '등' },
  { id: 'barbell-row', name: '바벨 로우', category: '등' },
  { id: 'overhead-press', name: '오버헤드 프레스', category: '어깨' },
  { id: 'lateral-raise', name: '사이드 레터럴 레이즈', category: '어깨' },
  { id: 'biceps-curl', name: '바이셉스 컬', category: '팔' },
  { id: 'triceps-extension', name: '트라이셉스 익스텐션', category: '팔' },
  { id: 'plank', name: '플랭크', category: '코어' },
];

interface RoutineStore {
  exercises: Exercise[];
  routines: Routine[];
  addRoutine: (routine: Omit<Routine, 'id'>) => void;
  /** 루틴에 담긴 종목 이름을 " · "로 이어 붙인다 */
  describeRoutine: (routine: Routine) => string;
  /** 최근에 시작한 것이 앞에 온다 */
  sessions: WorkoutSession[];
  startSession: (routine: Routine) => void;
}

const RoutineStoreContext = createContext<RoutineStore | null>(null);

/** 루틴, 종목, 운동 세션을 앱 메모리에만 보관한다. 앱을 다시 불러오면 루틴과 세션은 사라진다. */
export function RoutineStoreProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);

  const store = useMemo<RoutineStore>(
    () => ({
      exercises: defaultExercises,
      routines,
      addRoutine: (routine) => setRoutines((prev) => [...prev, { id: String(Date.now()), ...routine }]),
      describeRoutine: (routine) =>
        routine.exerciseIds
          .map((id) => defaultExercises.find((exercise) => exercise.id === id)?.name)
          .filter(Boolean)
          .join(' · '),
      sessions,
      startSession: (routine) => {
        const categories = routine.exerciseIds
          .map((id) => defaultExercises.find((exercise) => exercise.id === id)?.category)
          .filter((category): category is string => Boolean(category));
        const now = Date.now();
        setSessions((prev) => [
          {
            id: String(now),
            routineName: routine.name,
            startedAt: now,
            status: 'active',
            bodyParts: [...new Set(categories)],
            totalVolumeKg: 0,
            caloriesKcal: null,
          },
          ...prev,
        ]);
      },
    }),
    [routines, sessions],
  );

  return <RoutineStoreContext.Provider value={store}>{children}</RoutineStoreContext.Provider>;
}

export function useRoutineStore() {
  const store = useContext(RoutineStoreContext);
  if (!store) {
    throw new Error('useRoutineStore는 RoutineStoreProvider 안에서만 쓸 수 있습니다.');
  }
  return store;
}
