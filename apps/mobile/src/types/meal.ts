export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealItem {
  name: string;
  calories: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
}

export interface Meal {
  id: number;
  date: string;
  type: MealType;
  items: MealItem[];
  memo?: string;
}
