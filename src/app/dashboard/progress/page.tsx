"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressChart } from "@/components/progress/progress-chart";
import { WeightChart } from "@/components/progress/weight-chart";
import { MacroBarChart } from "@/components/progress/macro-bar-chart";
import { GoalProgress } from "@/components/progress/goal-progress";

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  return (
    <div className="container max-w-md mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Progress & Analytics</h1>
        <p className="text-muted-foreground">
          Track your nutrition and fitness journey
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Weight Tracking</CardTitle>
            <CardDescription>
              Monitor your weight changes over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={timeRange}
              onValueChange={(value) =>
                setTimeRange(value as "week" | "month" | "year")
              }
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>

              <div className="h-[200px]">
                <WeightChart timeRange={timeRange} />
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Calorie Intake</CardTitle>
            <CardDescription>
              Daily calorie consumption vs. target
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={timeRange}
              onValueChange={(value) =>
                setTimeRange(value as "week" | "month" | "year")
              }
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>

              <div className="h-[200px]">
                <ProgressChart timeRange={timeRange} dataType="calories" />
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Macronutrient Breakdown</CardTitle>
            <CardDescription>
              Daily protein, fat, and carb intake
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={timeRange}
              onValueChange={(value) =>
                setTimeRange(value as "week" | "month" | "year")
              }
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>

              <div className="h-[250px]">
                <MacroBarChart timeRange={timeRange} />
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Goal Progress</CardTitle>
            <CardDescription>
              Track progress towards your fitness goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GoalProgress />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
