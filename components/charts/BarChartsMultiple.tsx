"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis } from "recharts"

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
  { division: "NMD", dop: 186, rent: 80 },
  { division: "THN", dop: 305, rent: 200 },
  { division: "NSK", dop: 237, rent: 120 },
  { division: "RGD", dop: 73, rent: 190 },
  { division: "MLD", dop: 209, rent: 130 },
  { division: "PLG", dop: 214, rent: 140 },
]

const chartConfig = {
  dop: {
    label: "DoP",
    color: "hsl(var(--chart-1))",
  },
  rent: {
    label: "Rent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BarChartsMultiple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="division"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Legend className="text-dark100_light900"/>
            <Bar dataKey="dop" fill="var(--color-dop)" radius={4} />
            <Bar dataKey="rent" fill="var(--color-rent)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
           <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          
        </div>
      </CardFooter>
    </Card>
  )
}

export default BarChartsMultiple;
