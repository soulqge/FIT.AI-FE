export interface User {
  id: string;
  email: string;
  name: string;
  profile: Profile;
  goals: Goal[];
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  age: number;
  gender: "male" | "female" | "other";
  height: number; // in cm
  weight: number; // in kg
  activityLevel:
    | "sedentary"
    | "lightly_active"
    | "moderately_active"
    | "very_active"
    | "extra_active";
  targetWeight: number;
  targetDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  userId: string;
  type:
    | "weight_loss"
    | "muscle_gain"
    | "maintenance"
    | "endurance"
    | "strength";
  targetValue: number;
  currentValue: number;
  startDate: string;
  targetDate: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  type: "cardio" | "strength" | "flexibility" | "hiit";
  duration: number; // in minutes
  caloriesBurned: number;
  date: string;
  exercises: Exercise[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Exercise {
  id: string;
  workoutId: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in minutes
  restTime?: number; // in seconds
  notes?: string;
}

export interface FoodConsumption {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  foodType: "Breakfast" | "Lunch_Dinner" | "Snack" | "Drink";
}

export interface DailyRecordConsuming {
  id: string;
  date: string;
  foods: FoodConsumption[];
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
}

export interface FoodLogItemProps {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface NutritionGoal {
  id: string;
  userId: string;
  dailyCalories: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface Progress {
  id: string;
  userId: string;
  date: string;
  weight: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
