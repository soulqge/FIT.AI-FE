"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

// Mock data - in a real app, this would come from your API
const mockWeeklyData = [
  { day: "Mon", protein: 150, fat: 70, carbs: 220 },
  { day: "Tue", protein: 160, fat: 65, carbs: 230 },
  { day: "Wed", protein: 170, fat: 60, carbs: 240 },
  { day: "Thu", protein: 140, fat: 75, carbs: 210 },
  { day: "Fri", protein: 180, fat: 80, carbs: 250 },
  { day: "Sat", protein: 190, fat: 85, carbs: 260 },
  { day: "Sun", protein: 165, fat: 75, carbs: 235 },
]

const mockMonthlyData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  protein: Math.floor(Math.random() * 50) + 140,
  fat: Math.floor(Math.random() * 30) + 60,
  carbs: Math.floor(Math.random() * 60) + 200,
}))

const mockYearlyData = Array.from({ length: 12 }, (_, i) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return {
    day: months[i],
    protein: Math.floor(Math.random() * 40) + 150,
    fat: Math.floor(Math.random() * 20) + 70,
    carbs: Math.floor(Math.random() * 50) + 210,
  }
})

interface MacroBarChartProps {
  timeRange: "week" | "month" | "year"
}

export function MacroBarChart({ timeRange }: MacroBarChartProps) {
  let data

  switch (timeRange) {
    case "week":
      data = mockWeeklyData
      break
    case "month":
      data = mockMonthlyData
      break
    case "year":
      data = mockYearlyData
      break
    default:
      data = mockWeeklyData
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}g`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Protein</span>
                      <span className="font-bold text-muted-foreground">{payload[0].value}g</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Fat</span>
                      <span className="font-bold text-muted-foreground">{payload[1].value}g</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Carbs</span>
                      <span className="font-bold text-muted-foreground">{payload[2].value}g</span>
                    </div>
                  </div>
                </div>
              )
            }

            return null
          }}
        />
        <Bar dataKey="protein" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="fat" fill="#ef4444" radius={[4, 4, 0, 0]} />
        <Bar dataKey="carbs" fill="#22c55e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
