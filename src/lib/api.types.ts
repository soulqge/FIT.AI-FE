import {
  User,
  Profile,
  Goal,
  Workout,
  Exercise,
  DailyRecordConsuming,
  NutritionGoal,
  Progress,
} from "../types";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface ILoginResponse {
  token: string;
  user: User;
}

export interface IRegisterResponse {
  user: User;
}

// API Response types for each entity
export type LoginResponse = ApiResponse<ILoginResponse>;
export type RegisterResponse = ApiResponse<IRegisterResponse>;
export type UserResponse = ApiResponse<User>;
export type ProfileResponse = ApiResponse<Profile>;
export type GoalsResponse = ApiResponse<Goal[]>;
export type WorkoutsResponse = ApiResponse<Workout[]>;
export type ExercisesResponse = ApiResponse<Exercise[]>;
export type FoodLogResponse = ApiResponse<DailyRecordConsuming>;
export type NutritionGoalResponse = ApiResponse<NutritionGoal>;
export type ProgressResponse = ApiResponse<Progress[]>;
