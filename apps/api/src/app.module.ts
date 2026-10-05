import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MealsModule } from './meals/meals.module.js';
import { WorkoutsModule } from './workouts/workouts.module.js';

@Module({
  imports: [WorkoutsModule, MealsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
