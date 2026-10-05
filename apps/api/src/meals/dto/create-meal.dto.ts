export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export class MealItemDto {
  name: string;
  calories: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
}

export class CreateMealDto {
  date: string;
  type: MealType;
  items: MealItemDto[];
  memo?: string;
}
