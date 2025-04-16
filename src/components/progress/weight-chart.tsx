"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

// Mock data - in a real app, this would come from your API
const mockWeeklyData = [
  { day: "Mon", weight: 75.2 },
  { day: "Tue", weight: 75.0 },
  { day: "Wed", weight: 74.8 },
  { day: "Thu", weight: 74.7 },
  { day: "Fri", weight: 74.5 },
  { day: "Sat", weight: 74.3 },
  { day: "Sun", weight: 74.2 },
]

const mockMonthlyData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  weight: 75 - i * 0.03,
}))

const mockYearlyData = Array.from({ length: 12 }, (_, i) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return {
    day: months[i],
    weight: 80 - i * 0.5,
  }
})

interface WeightChartProps {
  timeRange: "week" | "month" | "year"
}

export function WeightChart({ timeRange }: WeightChartProps) {
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
      <LineChart data={data}>
        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}kg`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">Weight</span>
                    <span className="font-bold text-muted-foreground">{payload[0].value}kg</span>
                  </div>
                </div>
              )
            }

            return null
          }}
        />
        <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
