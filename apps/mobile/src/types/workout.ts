export interface WorkoutSet {
  reps: number;
  weightKg: number;
}

export interface WorkoutExercise {
  name: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: number;
  date: string;
  exercises: WorkoutExercise[];
  memo?: string;
}
