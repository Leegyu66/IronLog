import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto.js';

export interface Workout extends CreateWorkoutDto {
  id: number;
}

@Injectable()
export class WorkoutsService {
  private readonly workouts: Workout[] = [];

  create(dto: CreateWorkoutDto): Workout {
    const workout = { id: this.workouts.length + 1, ...dto };
    this.workouts.push(workout);
    return workout;
  }

  findAll(): Workout[] {
    return this.workouts;
  }
}
