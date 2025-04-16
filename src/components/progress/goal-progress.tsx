"use client"

import { Progress } from "@/components/ui/progress"

// Mock data - in a real app, this would come from your API
const mockGoalData = {
  currentWeight: 74.2,
  startWeight: 80,
  goalWeight: 70,
  daysElapsed: 45,
  totalDays: 90,
}

export function GoalProgress() {
  // Calculate weight progress
  const totalWeightToLose = mockGoalData.startWeight - mockGoalData.goalWeight
  const weightLostSoFar = mockGoalData.startWeight - mockGoalData.currentWeight
  const weightProgressPercentage = Math.min(100, (weightLostSoFar / totalWeightToLose) * 100)

  // Calculate time progress
  const timeProgressPercentage = Math.min(100, (mockGoalData.daysElapsed / mockGoalData.totalDays) * 100)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Weight Goal Progress</span>
          <span>
            {mockGoalData.currentWeight}kg / {mockGoalData.goalWeight}kg
          </span>
        </div>
        <Progress value={weightProgressPercentage} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {weightLostSoFar.toFixed(1)}kg lost of {totalWeightToLose.toFixed(1)}kg goal (
          {weightProgressPercentage.toFixed(0)}%)
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Time Progress</span>
          <span>
            {mockGoalData.daysElapsed} / {mockGoalData.totalDays} days
          </span>
        </div>
        <Progress value={timeProgressPercentage} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {mockGoalData.daysElapsed} days completed ({timeProgressPercentage.toFixed(0)}% of timeline)
        </p>
      </div>

      <div className="rounded-lg bg-muted p-4">
        <h3 className="font-medium mb-2">Goal Summary</h3>
        <p className="text-sm text-muted-foreground">
          You&apos;re making great progress! You&apos;ve lost {weightLostSoFar.toFixed(1)}kg in{" "}
          {mockGoalData.daysElapsed} days, which is{" "}
          {weightProgressPercentage > timeProgressPercentage ? "ahead of" : "on"} schedule. Keep up the good work to
          reach your goal weight of {mockGoalData.goalWeight}kg.
        </p>
      </div>
    </div>
  )
}
