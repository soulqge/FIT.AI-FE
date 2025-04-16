"use client";

import { AIFoodRecommendations } from "@/components/food-log/ai-food-recommendations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApi } from "@/hooks/use-api";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const foodSchema = z.object({
  name: z.string().min(2, { message: "Food name is required" }),
  calories: z.coerce
    .number()
    .min(0, { message: "Calories must be a positive number" }),
  protein: z.coerce
    .number()
    .min(0, { message: "Protein must be a positive number" }),
  fat: z.coerce.number().min(0, { message: "Fat must be a positive number" }),
  carbs: z.coerce
    .number()
    .min(0, { message: "Carbs must be a positive number" }),
  foodType: z.enum(["Breakfast", "Lunch_Dinner", "Snack", "Drink"]),
});

type FoodFormValues = z.infer<typeof foodSchema>;

interface AddFoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddFoodDialog({ open, onOpenChange }: AddFoodDialogProps) {
  const { foodAPI, recordAPI } = useApi();
  const [activeTab, setActiveTab] = useState<"manual" | "ai">("manual");

  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: "",
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      foodType: "Breakfast",
    },
  });

  async function onSubmit(data: FoodFormValues) {
    try {
      // First, we need to get the available foods
      const foodResponse = await foodAPI.getDailyFood();

      if (!foodResponse.success) {
        throw new Error("Failed to get available foods");
      }

      // Find the food that matches our criteria or is closest
      let selectedFoodId = null;

      if (foodResponse.data && Array.isArray(foodResponse.data)) {
        // Try to find an exact match first
        const exactMatch = foodResponse.data.find(
          (item) =>
            item.food.name.toLowerCase() === data.name.toLowerCase() &&
            item.type === data.foodType
        );

        if (exactMatch) {
          selectedFoodId = exactMatch.food.id;
        } else {
          // If no exact match, find the closest match by name
          const closestMatch = foodResponse.data.find((item) =>
            item.food.name.toLowerCase().includes(data.name.toLowerCase())
          );

          if (closestMatch) {
            selectedFoodId = closestMatch.food.id;
          }
        }
      }

      if (!selectedFoodId) {
        throw new Error("No matching food found in the database");
      }

      // Add the food to the user's record
      await recordAPI.addFoodToRecord(selectedFoodId);

      toast({
        title: "Food added",
        description: `${data.name} has been added to your food log.`,
      });

      form.reset();
      onOpenChange(false);

      // Refresh the page to show the new food item
      window.location.reload();
    } catch (error: any) {
      console.error("Error adding food:", error);
      toast({
        title: "Error adding food",
        description:
          error.message ||
          "There was an error adding your food. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Food</DialogTitle>
          <DialogDescription>
            Log your food intake to track your nutrition goals.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "manual" | "ai")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="ai">AI Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Chicken Salad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calories (kcal)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="protein"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Protein (g)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fat (g)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="carbs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carbs (g)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="foodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meal type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Breakfast">Breakfast</SelectItem>
                          <SelectItem value="Lunch_Dinner">
                            Lunch/Dinner
                          </SelectItem>
                          <SelectItem value="Snack">Snack</SelectItem>
                          <SelectItem value="Drink">Drink</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Add Food</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="ai">
            <AIFoodRecommendations
              onSelectFood={(food) => {
                form.setValue("name", food.name);
                form.setValue("calories", food.calories);
                form.setValue("protein", food.protein);
                form.setValue("fat", food.fat);
                form.setValue("carbs", food.carbs);
                setActiveTab("manual");
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
