import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Types for your API responses and requests
interface AuthData {
  name?: string;
  email: string;
  password: string;
}

interface ProfileData {
  age: number;
  gender: "MALE" | "FEMALE";
  height: number;
  currentWeight: number;
  goalWeight?: number;
  activityLevel: number;
  goal: string;
}

interface FoodRecommendationsParams {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

function getCurrentDateString(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

// Hook for API functionality
export function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  // Base API configuration
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api/v1/fitai";

  // Helper function for API requests
  const apiRequest = async (method: string, endpoint: string, data?: any) => {
    setIsLoading(true);
    setError(null);

    // Get token for each request
    const token = localStorage.getItem("fitai_token");

    // Configure headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Make request
    const response = await axios({
      method,
      url: `${baseURL}${endpoint}`,
      data,
      headers,
      params: method === "get" && data ? data : undefined,
    });

    if (response.status === 401) {
      localStorage.removeItem("fitai_token");
      router.push("/signin");
    }

    setIsLoading(false);

    response.data = {
      ...response.data,
      success:
        response.data.success !== undefined ? response.data.success : false,
    };

    return response.data;
  };

  // Auth API methods
  const authAPI = {
    register: async (userData: AuthData) => {
      try {
        const response = await apiRequest("post", "/register", userData);
        if (response?.success && response.data?.token) {
          localStorage.setItem("fitai_token", response.data.token);
        }
        return response;
      } catch (err) {
        throw err;
      }
    },

    login: async (credentials: { email: string; password: string }) => {
      try {
        const response = await apiRequest("post", "/login", credentials);
        if (response?.success && response.data?.token) {
          localStorage.setItem("fitai_token", response.data.token);
        }
        return response;
      } catch (err) {
        throw err;
      }
    },

    logout: () => {
      localStorage.removeItem("fitai_token");
      router.push("/signin");
    },
  };

  // User API methods
  const userAPI = {
    getProfile: async () => {
      const response = await apiRequest("get", "/user/me");
      return response.data;
    },

    updateProfile: async (userData: {
      name?: string;
      email?: string;
      password?: string;
    }) => {
      return await apiRequest("put", "/user", userData);
    },

    deleteAccount: async () => {
      return await apiRequest("delete", "/user");
    },
  };

  // Profile API methods
  const profileAPI = {
    createProfile: async (profileData: ProfileData) => {
      return await apiRequest("post", "/profile", profileData);
    },

    getProfile: async () => {
      try {
        const response = await apiRequest("get", "/profile");
        return response.data;
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          return null;
        }
        throw err;
      }
    },

    updateProfile: async (profileData: ProfileData) => {
      return await apiRequest("put", "/profile", profileData);
    },
  };

  // Nutrition API methods
  const nutritionAPI = {
    getNutritionPlan: async () => {
      return await apiRequest("get", "/nutrition/me");
    },
  };

  // Food API methods
  const foodAPI = {
    getDailyFood: async () => {
      return await apiRequest("get", "/dailyfood");
    },
  };

  // Daily records API methods
  const recordAPI = {
    getRecords: async (
      startDate: string = getCurrentDateString(),
      endDate: string = getCurrentDateString()
    ) => {
      return await apiRequest(
        "get",
        `/record/me?start=${startDate}&end=${endDate}`
      );
    },

    addFoodToRecord: async (foodId: string) => {
      return await apiRequest("put", `/record/${foodId}`);
    },

    removeFoodFromRecord: async (foodId: string) => {
      return await apiRequest("put", `/unrecord/${foodId}`);
    },
  };

  // Progress API methods (using mock data)
  const progressAPI = {
    getWeightHistory: async (timeRange: "week" | "month" | "year") => {
      let data = [];

      switch (timeRange) {
        case "week":
          data = [
            { day: "Mon", weight: 75.2 },
            { day: "Tue", weight: 75.0 },
            { day: "Wed", weight: 74.8 },
            { day: "Thu", weight: 74.7 },
            { day: "Fri", weight: 74.5 },
            { day: "Sat", weight: 74.3 },
            { day: "Sun", weight: 74.2 },
          ];
          break;
        case "month":
          data = Array.from({ length: 30 }, (_, i) => ({
            day: `${i + 1}`,
            weight: 75 - i * 0.03,
          }));
          break;
        case "year":
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          data = months.map((month, i) => ({
            day: month,
            weight: 80 - i * 0.5,
          }));
          break;
      }

      return { success: true, data };
    },

    getNutritionHistory: async (timeRange: "week" | "month" | "year") => {
      // Return dummy data based on timeRange
      let data = [];

      switch (timeRange) {
        case "week":
          data = [
            {
              day: "Mon",
              calories: 2100,
              protein: 150,
              fat: 70,
              carbs: 220,
              target: 2500,
            },
            // ... other days
          ];
          break;
        case "month":
          data = Array.from({ length: 30 }, (_, i) => ({
            day: `${i + 1}`,
            calories: Math.floor(Math.random() * 800) + 2000,
            protein: Math.floor(Math.random() * 50) + 140,
            fat: Math.floor(Math.random() * 30) + 60,
            carbs: Math.floor(Math.random() * 60) + 200,
            target: 2500,
          }));
          break;
        case "year":
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          data = months.map((month) => ({
            day: month,
            calories: Math.floor(Math.random() * 500) + 2200,
            protein: Math.floor(Math.random() * 40) + 150,
            fat: Math.floor(Math.random() * 20) + 70,
            carbs: Math.floor(Math.random() * 50) + 210,
            target: 2500,
          }));
          break;
      }

      return { success: true, data };
    },
  };

  // Recommendations API methods
  const recommendationsAPI = {
    getFoodRecommendations: async (params: FoodRecommendationsParams) => {
      // Generate dummy food recommendations based on the parameters
      const recommendations = [
        {
          name: "Grilled Chicken Salad",
          calories: Math.round(params.calories * 0.3),
          protein: Math.round(params.protein * 0.4),
          fat: Math.round(params.fat * 0.2),
          carbs: Math.round(params.carbs * 0.1),
        },
        // ... other recommendations
      ];

      return { success: true, data: recommendations };
    },
  };

  return {
    isLoading,
    error,
    authAPI,
    userAPI,
    profileAPI,
    nutritionAPI,
    foodAPI,
    recordAPI,
    progressAPI,
    recommendationsAPI,
  };
}
