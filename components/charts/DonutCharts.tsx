"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { units: "Civil-Sion", amount: 50, fill: "var(--color-civilsion)" },
  { units: "Civil-Pune", amount: 20, fill: "var(--color-civilpune)" },
  { units: "Elect-Sion", amount: 20, fill: "var(--color-electsion)" },
  { units: "Division", amount: 6, fill: "var(--color-division)" },
  { units: "RO-NMR", amount: 4, fill: "var(--color-ronmr)" },
]

const chartConfig = {
  amount: {
    label: "Amount in Cr",
  },
  civilsion: {
    label: "Civil-Sion",
    color: "hsl(var(--chart-1))",
  },
  civilpune: {
    label: "Civil-Pune",
    color: "hsl(var(--chart-2))",
  },
  electsion: {
    label: "Elect-Sion",
    color: "hsl(var(--chart-3))",
  },
  division: {
    label: "Division",
    color: "hsl(var(--chart-4))",
  },
  ronmr: {
    label: "RO-NMR",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function DonutCharts() {
  const totalAmounts = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="units"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ₹{totalAmounts.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                        Amounts (Lakhs)
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
           <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          
        </div>
      </CardFooter>
    </Card>
  )
}

export default DonutCharts;