"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodLogItem } from "@/components/food-log/food-log-item";
import { AddFoodDialog } from "@/components/food-log/add-food-dialog";
import { useApi } from "@/hooks/use-api";
import { Skeleton } from "@/components/ui/skeleton";

export default function FoodLogPage() {
  const { recordAPI } = useApi();
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [foodItems, setFoodItems] = useState({
    Breakfast: [],
    Lunch_Dinner: [],
    Snack: [],
    Drink: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFoodData() {
      try {
        // Fetch today's food log
        const response = await recordAPI.getRecords();

        // Group food items by type
        const groupedFoodItems = {
          Breakfast: [],
          Lunch_Dinner: [],
          Snack: [],
          Drink: [],
        };

        if (
          response.success &&
          response.data.foods &&
          Array.isArray(response.data.foods)
        ) {
          response.data.foods.forEach((item) => {
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
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFoodData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteFood = async (foodId: string) => {
    try {
      await recordAPI.removeFoodFromRecord(foodId);

      // Refresh the food list
      const response = await recordAPI.getRecords();

      // Group food items by type
      const groupedFoodItems = {
        Breakfast: [],
        Lunch_Dinner: [],
        Snack: [],
        Drink: [],
      };

      if (
        response.success &&
        response.data.foods &&
        Array.isArray(response.data.foods)
      ) {
        response.data.foods.forEach((item) => {
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
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-md mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-12 w-full mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-6 w-32 mt-6" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Food Log</h1>
        <Button onClick={() => setIsAddFoodOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Food
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {Object.entries(foodItems).map(
            ([category, items]) =>
              items.length > 0 && (
                <div key={category} className="space-y-2">
                  <h2 className="text-lg font-semibold capitalize">
                    {category === "Lunch_Dinner" ? "Lunch & Dinner" : category}
                  </h2>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <FoodLogItem
                        key={item.id}
                        name={item.name}
                        calories={item.calories}
                        protein={item.protein}
                        fat={item.fat}
                        carbs={item.carbs}
                        onDelete={() => handleDeleteFood(item.id)}
                      />
                    ))}
                  </div>
                </div>
              )
          )}

          {Object.values(foodItems).every((items) => items.length === 0) && (
            <p className="text-center text-muted-foreground py-8">
              No food items logged today
            </p>
          )}
        </TabsContent>

        <TabsContent value="breakfast" className="space-y-2">
          {foodItems.Breakfast.length > 0 ? (
            foodItems.Breakfast.map((item) => (
              <FoodLogItem
                key={item.id}
                name={item.name}
                calories={item.calories}
                protein={item.protein}
                fat={item.fat}
                carbs={item.carbs}
                onDelete={() => handleDeleteFood(item.id)}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No breakfast items logged today
            </p>
          )}
        </TabsContent>

        <TabsContent value="lunch" className="space-y-2">
          {foodItems.Lunch_Dinner.filter((_, index) => index % 2 === 0).length >
          0 ? (
            foodItems.Lunch_Dinner.filter((_, index) => index % 2 === 0).map(
              (item) => (
                <FoodLogItem
                  key={item.id}
                  name={item.name}
                  calories={item.calories}
                  protein={item.protein}
                  fat={item.fat}
                  carbs={item.carbs}
                  onDelete={() => handleDeleteFood(item.id)}
                />
              )
            )
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No lunch items logged today
            </p>
          )}
        </TabsContent>

        <TabsContent value="dinner" className="space-y-2">
          {foodItems.Lunch_Dinner.filter((_, index) => index % 2 === 1).length >
          0 ? (
            foodItems.Lunch_Dinner.filter((_, index) => index % 2 === 1).map(
              (item) => (
                <FoodLogItem
                  key={item.id}
                  name={item.name}
                  calories={item.calories}
                  protein={item.protein}
                  fat={item.fat}
                  carbs={item.carbs}
                  onDelete={() => handleDeleteFood(item.id)}
                />
              )
            )
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No dinner items logged today
            </p>
          )}
        </TabsContent>

        <TabsContent value="snacks" className="space-y-2">
          {[...foodItems.Snack, ...foodItems.Drink].length > 0 ? (
            [...foodItems.Snack, ...foodItems.Drink].map((item) => (
              <FoodLogItem
                key={item.id}
                name={item.name}
                calories={item.calories}
                protein={item.protein}
                fat={item.fat}
                carbs={item.carbs}
                onDelete={() => handleDeleteFood(item.id)}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No snacks or drinks logged today
            </p>
          )}
        </TabsContent>
      </Tabs>

      <AddFoodDialog open={isAddFoodOpen} onOpenChange={setIsAddFoodOpen} />
    </div>
  );
}
