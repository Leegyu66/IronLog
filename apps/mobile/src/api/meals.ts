import { Meal } from '../types/meal';
import { request } from './client';

export const getMeals = () => request<Meal[]>('/meals');

export const createMeal = (body: Omit<Meal, 'id'>) =>
  request<Meal>('/meals', { method: 'POST', body: JSON.stringify(body) });
