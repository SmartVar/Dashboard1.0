// "use client"

// import { TrendingUp } from "lucide-react"
// import { Bar, BarChart, CartesianGrid, Legend, XAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// const chartData = [
//   { division: "NMD", legal: 1, dispute: 2 },
//   { division: "THN", legal: 8, dispute: 3 },
//   { division: "NSK", legal: 1, dispute: 4 },
//   { division: "RGD", legal: 0, dispute: 1 },
//   { division: "MLD", legal: 0, dispute: 2 },
//   { division: "PLG", legal: 2, dispute: 5 },
// ]

// const chartConfig = {
//   legal: {
//     label: "Legal",
//     color: "#F59E0B",
//   },
//   dispute: {
//     label: "dispute",
//     color: "#F59E0B",
//   },
// } satisfies ChartConfig

// export function BarChartsCases() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle></CardTitle>
//         <CardDescription></CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={chartData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="division"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="dashed" />}
//             />
//             <Legend className="text-dark100_light900"/>
//             <Bar dataKey="legal" fill="var(--color-legal)" radius={4} />
//             <Bar dataKey="dispute" fill="var(--color-dispute)" radius={4} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//            <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
          
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }

// export default BarChartsCases;


"use client"

import { TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    color: "#10B981", // Green
  },
  dispute: {
    label: "Dispute",
    color: "#EF4444", // Red
  },
}

// Totals
const totalCases = chartData.reduce(
  (acc, curr) => {
    acc.legal += curr.legal
    acc.dispute += curr.dispute
    return acc
  },
  { legal: 0, dispute: 0 }
)

// ✅ Label renderer
const renderCustomLabel = (props: any) => {
  const { x, y, value, width } = props
  if (value === 0) return null
  return (
    <Text
      x={x + width / 2}
      y={y - 6}
      textAnchor="middle"
      fill="#000"
      fontSize={12}
    >
      {value}
    </Text>
  )
}

export function BarChartsCases() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Division Case Overview</CardTitle>
        <CardDescription>
          Breakdown of Legal and Dispute cases by division
        </CardDescription>
      </CardHeader>

      <CardContent>
        <BarChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="division"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="legal"
            fill={chartConfig.legal.color}
            radius={4}
            label={renderCustomLabel}
          />
          <Bar
            dataKey="dispute"
            fill={chartConfig.dispute.color}
            radius={4}
            label={renderCustomLabel}
          />
        </BarChart>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 items-center font-medium leading-none">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span>
            Total Legal: {totalCases.legal} | Total Dispute: {totalCases.dispute}
          </span>
        </div>
        <div className="text-muted-foreground">
          THN has the highest number of legal cases.
        </div>
      </CardFooter>
    </Card>
  )
}

export default BarChartsCases

