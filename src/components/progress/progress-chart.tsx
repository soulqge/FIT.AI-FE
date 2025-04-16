"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

// Mock data - in a real app, this would come from your API
const mockWeeklyData = [
  { day: "Mon", calories: 2100, target: 2500 },
  { day: "Tue", calories: 2300, target: 2500 },
  { day: "Wed", calories: 2450, target: 2500 },
  { day: "Thu", calories: 2200, target: 2500 },
  { day: "Fri", calories: 2600, target: 2500 },
  { day: "Sat", calories: 2800, target: 2500 },
  { day: "Sun", calories: 2400, target: 2500 },
]

const mockMonthlyData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  calories: Math.floor(Math.random() * 800) + 2000,
  target: 2500,
}))

const mockYearlyData = Array.from({ length: 12 }, (_, i) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return {
    day: months[i],
    calories: Math.floor(Math.random() * 500) + 2200,
    target: 2500,
  }
})

interface ProgressChartProps {
  timeRange: "week" | "month" | "year"
  dataType: "calories" | "protein" | "fat" | "carbs"
}

export function ProgressChart({ timeRange, dataType }: ProgressChartProps) {
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
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{dataType}</span>
                      <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Target</span>
                      <span className="font-bold text-muted-foreground">{payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }

            return null
          }}
        />
        <Line type="monotone" dataKey="calories" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="target" stroke="#dc2626" strokeWidth={2} strokeDasharray="4 4" />
      </LineChart>
    </ResponsiveContainer>
  )
}
