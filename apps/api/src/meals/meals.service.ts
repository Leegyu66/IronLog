import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto.js';

export interface Meal extends CreateMealDto {
  id: number;
}

@Injectable()
export class MealsService {
  private readonly meals: Meal[] = [];

  create(dto: CreateMealDto): Meal {
    const meal = { id: this.meals.length + 1, ...dto };
    this.meals.push(meal);
    return meal;
  }

  findAll(): Meal[] {
    return this.meals;
  }
}
