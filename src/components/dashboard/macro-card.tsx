import { Card, CardContent } from "@/components/ui/card"

interface MacroCardProps {
  title: string
  current: number
  target: number
  unit: string
}

export function DashboardMacroCard({ title, current, target, unit }: MacroCardProps) {
  const percentage = Math.min(100, (current / target) * 100)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-2xl font-bold mt-1">{current}</div>
        <div className="text-xs text-muted-foreground">
          of {target}
          {unit}
        </div>
        <div className="w-full h-1 bg-muted mt-2 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
        </div>
      </CardContent>
    </Card>
  )
}
