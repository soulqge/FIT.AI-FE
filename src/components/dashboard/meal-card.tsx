import { MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface MealCardProps {
  name: string
  calories: number
  protein: number
  fat: number
  carbs: number
}

export function DashboardMealCard({ name, calories, protein, fat, carbs }: MealCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{name}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="text-lg font-bold">{calories} kcal</div>

          <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-muted-foreground">
            <div>
              <div className="font-medium">Protein</div>
              <div>{protein}g</div>
            </div>
            <div>
              <div className="font-medium">Fat</div>
              <div>{fat}g</div>
            </div>
            <div>
              <div className="font-medium">Carbs</div>
              <div>{carbs}g</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
