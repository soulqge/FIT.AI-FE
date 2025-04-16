"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useApi } from "@/hooks/use-api";
import { toast } from "@/hooks/use-toast";

const recommendationSchema = z.object({
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
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface AIFoodRecommendationsProps {
  onSelectFood: (food: FoodItem) => void;
}

export function AIFoodRecommendations({
  onSelectFood,
}: AIFoodRecommendationsProps) {
  const { recommendationsAPI } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<FoodItem[]>([]);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      calories: 500,
      protein: 30,
      fat: 15,
      carbs: 50,
    },
  });

  async function onSubmit(data: RecommendationFormValues) {
    setIsLoading(true);

    try {
      // Call the recommendations API (which uses dummy data since this endpoint doesn't exist in the API guide)
      const response = await recommendationsAPI.getFoodRecommendations({
        calories: data.calories,
        protein: data.protein,
        fat: data.fat,
        carbs: data.carbs,
      });

      // Process the recommendations from the API
      if (response.success && Array.isArray(response.data)) {
        setRecommendations(
          response.data.map((item) => ({
            name: item.name,
            calories: item.calories,
            protein: item.protein,
            fat: item.fat,
            carbs: item.carbs,
          }))
        );
      } else {
        // Fallback to empty array if response format is unexpected
        setRecommendations([]);
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setRecommendations([]);
      toast({
        title: "Error getting recommendations",
        description:
          "There was an error getting food recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting recommendations...
              </>
            ) : (
              "Get AI Recommendations"
            )}
          </Button>
        </form>
      </Form>

      {recommendations.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Recommended Foods</h3>
          <div className="space-y-2">
            {recommendations.map((food, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onSelectFood(food)}
              >
                <CardContent className="p-3">
                  <div className="font-medium">{food.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {food.calories} kcal | P: {food.protein}g | F: {food.fat}g |
                    C: {food.carbs}g
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
