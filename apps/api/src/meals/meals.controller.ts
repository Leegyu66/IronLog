import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto.js';
import { type Meal, MealsService } from './meals.service.js';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  create(@Body() dto: CreateMealDto): Meal {
    return this.mealsService.create(dto);
  }

  @Get()
  findAll(): Meal[] {
    return this.mealsService.findAll();
  }
}
