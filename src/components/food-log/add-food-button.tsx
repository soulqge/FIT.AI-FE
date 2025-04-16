"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddFoodDialog } from "@/components/food-log/add-food-dialog"

export function AddFoodButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="sm" className="rounded-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Food
      </Button>
      <AddFoodDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
