"use client"

import * as React from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const divisions = ["SPP", "Renov", "Toilet", "RWH", "Feed", "Braille"] as const
type Division = typeof divisions[number]

interface DivisionData {
  division: Division
  utilization: number // in percent
}

const chartConfig = {
  SPP: "#F97316", // orange shades
  Renov: "#FB923C",
  Toilet: "#FDBA74",
  RWH: "#F59E0B",
  Feed: "#EA580C",
  Braille: "#C2410C",
}

const sampleData: Record<Division, DivisionData[]> = {
  SPP: [{ division: "SPP", utilization: 65 }],
  Renov: [{ division: "Renov", utilization: 80 }],
  Toilet: [{ division: "Toilet", utilization: 55 }],
  RWH: [{ division: "RWH", utilization: 72 }],
  Feed: [{ division: "Feed", utilization: 90 }],
  Braille: [{ division: "Braille", utilization: 50 }],
}

export function PlanFundPieCharts() {
  const [selected, setSelected] = React.useState<Division>("SPP")

  const data = React.useMemo(() => {
    const util = sampleData[selected][0].utilization
    return [
      { name: "Utilized", value: util, fill: chartConfig[selected] },
      { name: "Remaining", value: 100 - util, fill: "var(--tw-bg-opacity)" }, // use Tailwind bg opacity or fallback
    ]
  }, [selected])

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Fund Utilization</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Select division to view utilization %
          </CardDescription>
        </div>
        <Select value={selected} onValueChange={(val) => setSelected(val as Division)}>
          <SelectTrigger className="w-[140px] h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {divisions.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: "8px",
                border: "none",
                color: "white",
                fontSize: "0.875rem",
              }}
              formatter={(value: number) => `${value}%`}
            />
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              cornerRadius={10}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
              <Label
                value={`${data[0].value}%`}
                position="center"
                className="text-xl font-semibold text-gray-900 dark:text-white"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
