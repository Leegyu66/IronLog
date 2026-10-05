import { Workout } from '../types/workout';
import { request } from './client';

export const getWorkouts = () => request<Workout[]>('/workouts');

export const createWorkout = (body: Omit<Workout, 'id'>) =>
  request<Workout>('/workouts', { method: 'POST', body: JSON.stringify(body) });
