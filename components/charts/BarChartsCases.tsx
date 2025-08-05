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
  { division: "NMD", legal: 1, dispute: 2 },
  { division: "THN", legal: 8, dispute: 3 },
  { division: "NSK", legal: 1, dispute: 4 },
  { division: "RGD", legal: 0, dispute: 1 },
  { division: "MLD", legal: 0, dispute: 2 },
  { division: "PLG", legal: 2, dispute: 5 },
]

const chartConfig = {
  legal: {
    label: "Legal",
    { /* color: "hsl(var(--chart-1))", */ }
    color: "#F59E0B",
  },
  dispute: {
    label: "dispute",
   { /* color: "hsl(var(--chart-2))", */ }
    color: "#F59E0B",
  },
} satisfies ChartConfig

export function BarChartsCases() {
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
            <Bar dataKey="legal" fill="var(--color-legal)" radius={4} />
            <Bar dataKey="dispute" fill="var(--color-dispute)" radius={4} />
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

export default BarChartsCases;
