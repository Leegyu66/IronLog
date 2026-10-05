export class WorkoutSetDto {
  reps: number;
  weightKg: number;
}

export class WorkoutExerciseDto {
  name: string;
  sets: WorkoutSetDto[];
}

export class CreateWorkoutDto {
  date: string;
  exercises: WorkoutExerciseDto[];
  memo?: string;
}
