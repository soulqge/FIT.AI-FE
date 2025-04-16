"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardMacroCard } from "@/components/dashboard/macro-card";
import { DashboardMealCard } from "@/components/dashboard/meal-card";
import { AddFoodButton } from "@/components/food-log/add-food-button";
import { useApi } from "@/hooks/use-api";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { userAPI, nutritionAPI, recordAPI } = useApi();
  const [user, setUser] = useState({ name: "User" });
  const [nutritionPlan, setNutritionPlan] = useState({
    dailyCalories: 0,
    dailyProtein: 0,
    dailyFat: 0,
    dailyCarbs: 0,
  });
  const [dailyRecord, setDailyRecord] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalFat: 0,
    totalCarbs: 0,
  });
  const [foodItems, setFoodItems] = useState({
    Breakfast: [],
    Lunch_Dinner: [],
    Snack: [],
    Drink: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch user info
        const userResponse = await userAPI.getProfile();
        if (userResponse.success) {
          setUser({ name: userResponse.name || "User" });
        }

        // Fetch nutrition plan
        const nutritionPlanResponse = await nutritionAPI.getNutritionPlan();
        if (nutritionPlanResponse.success) {
          setNutritionPlan({
            dailyCalories: nutritionPlanResponse.data.dailyCalories || 0,
            dailyProtein: nutritionPlanResponse.data.dailyProtein || 0,
            dailyFat: nutritionPlanResponse.data.dailyFat || 0,
            dailyCarbs: nutritionPlanResponse.data.dailyCarbohydrate || 0,
          });
        }

        // Fetch today's food log with current date
        const today = new Date();
        const dateString = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        const recordResponse = await recordAPI.getRecords(
          dateString,
          dateString
        );

        if (recordResponse.success) {
          // Set daily record from the API response
          setDailyRecord({
            totalCalories: recordResponse.data.caloriesConsumption || 0,
            totalProtein: recordResponse.data.proteinConsumtion || 0,
            totalFat: recordResponse.data.fatConsumption || 0,
            totalCarbs: recordResponse.data.carbohydrateConsumption || 0,
          });

          // Group food items by type
          const groupedFoodItems = {
            Breakfast: [],
            Lunch_Dinner: [],
            Snack: [],
            Drink: [],
          };

          if (
            recordResponse.data.foods &&
            Array.isArray(recordResponse.data.foods)
          ) {
            recordResponse.data.foods.forEach((item) => {
              if (groupedFoodItems[item.type]) {
                groupedFoodItems[item.type].push({
                  id: item.food.id,
                  name: item.food.name,
                  calories: item.food.calories,
                  protein: item.food.proteins,
                  fat: item.food.fat,
                  carbs: item.food.carbo,
                });
              }
            });
          }

          setFoodItems(groupedFoodItems);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate percentages for progress bars
  const caloriesPercentage = Math.min(
    100,
    (dailyRecord.totalCalories / (nutritionPlan.dailyCalories || 1)) * 100
  );
  const proteinPercentage = Math.min(
    100,
    (dailyRecord.totalProtein / (nutritionPlan.dailyProtein || 1)) * 100
  );
  const fatPercentage = Math.min(
    100,
    (dailyRecord.totalFat / (nutritionPlan.dailyFat || 1)) * 100
  );
  const carbsPercentage = Math.min(
    100,
    (dailyRecord.totalCarbs / (nutritionPlan.dailyCarbs || 1)) * 100
  );

  if (isLoading) {
    return (
      <div className="container max-w-md mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-64 w-full mb-6" />
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hello, {user.name}</h1>
        <AddFoodButton />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Today&apos;s Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Calories</span>
                <span>
                  {dailyRecord.totalCalories} / {nutritionPlan.dailyCalories}{" "}
                  kcal
                </span>
              </div>
              <Progress value={caloriesPercentage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Protein</span>
                <span>
                  {dailyRecord.totalProtein}g / {nutritionPlan.dailyProtein}g
                </span>
              </div>
              <Progress value={proteinPercentage} className="h-2 bg-muted" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fat</span>
                <span>
                  {dailyRecord.totalFat}g / {nutritionPlan.dailyFat}g
                </span>
              </div>
              <Progress value={fatPercentage} className="h-2 bg-muted" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Carbs</span>
                <span>
                  {dailyRecord.totalCarbs}g / {nutritionPlan.dailyCarbs}g
                </span>
              </div>
              <Progress value={carbsPercentage} className="h-2 bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <DashboardMacroCard
          title="Calories"
          current={dailyRecord.totalCalories}
          target={nutritionPlan.dailyCalories}
          unit="kcal"
        />
        <DashboardMacroCard
          title="Protein"
          current={dailyRecord.totalProtein}
          target={nutritionPlan.dailyProtein}
          unit="g"
        />
        <DashboardMacroCard
          title="Fat"
          current={dailyRecord.totalFat}
          target={nutritionPlan.dailyFat}
          unit="g"
        />
        <DashboardMacroCard
          title="Carbs"
          current={dailyRecord.totalCarbs}
          target={nutritionPlan.dailyCarbs}
          unit="g"
        />
      </div>

      <Tabs defaultValue="breakfast" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
        </TabsList>

        <TabsContent value="breakfast" className="space-y-4">
          {foodItems.Breakfast.length > 0 ? (
            foodItems.Breakfast.map((item, index) => (
              <DashboardMealCard
                key={item.id || index}
                name={item.name}
                calories={item.calories}
                protein={item.protein}
                fat={item.fat}
                carbs={item.carbs}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No breakfast items logged today
            </p>
          )}
        </TabsContent>

        <TabsContent value="lunch" className="space-y-4">
          {foodItems.Lunch_Dinner.filter((_, idx) => idx % 2 === 0).length >
          0 ? (
            foodItems.Lunch_Dinner.filter((_, idx) => idx % 2 === 0).map(
              (item, index) => (
                <DashboardMealCard
                  key={item.id || index}
                  name={item.name}
                  calories={item.calories}
                  protein={item.protein}
                  fat={item.fat}
                  carbs={item.carbs}
                />
              )
            )
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No lunch items logged today
            </p>
          )}
        </TabsContent>

        <TabsContent value="dinner" className="space-y-4">
          {foodItems.Lunch_Dinner.filter((_, idx) => idx % 2 === 1).length >
          0 ? (
            foodItems.Lunch_Dinner.filter((_, idx) => idx % 2 === 1).map(
              (item, index) => (
                <DashboardMealCard
                  key={item.id || index}
                  name={item.name}
                  calories={item.calories}
                  protein={item.protein}
                  fat={item.fat}
                  carbs={item.carbs}
                />
              )
            )
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No dinner items logged today
            </p>
          )}
        </TabsContent>

        <TabsContent value="snacks" className="space-y-4">
          {[...foodItems.Snack, ...foodItems.Drink].length > 0 ? (
            [...foodItems.Snack, ...foodItems.Drink].map((item, index) => (
              <DashboardMealCard
                key={item.id || index}
                name={item.name}
                calories={item.calories}
                protein={item.protein}
                fat={item.fat}
                carbs={item.carbs}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No snacks or drinks logged today
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
