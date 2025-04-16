"use client";

import { Edit, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FoodLogItemProps {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function FoodLogItem({
  name,
  calories,
  protein,
  fat,
  carbs,
  onEdit,
  onDelete,
}: FoodLogItemProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <div className="text-sm text-muted-foreground mt-1">
              {calories} kcal | P: {protein}g | F: {fat}g | C: {carbs}g
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={onDelete}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
