import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto.js';
import { type Workout, WorkoutsService } from './workouts.service.js';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Body() dto: CreateWorkoutDto): Workout {
    return this.workoutsService.create(dto);
  }

  @Get()
  findAll(): Workout[] {
    return this.workoutsService.findAll();
  }
}
