"use client"

// import * as React from "react"
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Label,
//   ResponsiveContainer,
// } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card"

// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select"

// const divisions = ["SPP", "Renov", "Toilet", "RWH", "Feed", "Braille"] as const
// type Division = typeof divisions[number]

// interface DivisionData {
//   division: Division
//   utilization: number // in percent
// }

// const chartConfig = {
//   SPP: "#F97316", // orange shades
//   Renov: "#FB923C",
//   Toilet: "#FDBA74",
//   RWH: "#F59E0B",
//   Feed: "#EA580C",
//   Braille: "#C2410C",
// }

// const sampleData: Record<Division, DivisionData[]> = {
//   SPP: [{ division: "SPP", utilization: 65 }],
//   Renov: [{ division: "Renov", utilization: 80 }],
//   Toilet: [{ division: "Toilet", utilization: 55 }],
//   RWH: [{ division: "RWH", utilization: 72 }],
//   Feed: [{ division: "Feed", utilization: 90 }],
//   Braille: [{ division: "Braille", utilization: 50 }],
// }

// export function PlanFundPieCharts() {
//   const [selected, setSelected] = React.useState<Division>("SPP")

//   const data = React.useMemo(() => {
//     const util = sampleData[selected][0].utilization
//     return [
//       { name: "Utilized", value: util, fill: chartConfig[selected] },
//       { name: "Remaining", value: 100 - util, fill: "var(--tw-bg-opacity)" }, // use Tailwind bg opacity or fallback
//     ]
//   }, [selected])

//   return (
//     <Card className="max-w-md mx-auto">
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <div>
//           <CardTitle className="text-lg font-semibold">Fund Utilization</CardTitle>
//           <CardDescription className="text-sm text-muted-foreground">
//             Select division to view utilization %
//           </CardDescription>
//         </div>
//         <Select value={selected} onValueChange={(val) => setSelected(val as Division)}>
//           <SelectTrigger className="w-[140px] h-8 text-sm">
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent align="end">
//             {divisions.map((d) => (
//               <SelectItem key={d} value={d}>
//                 {d}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent className="flex justify-center items-center">
//         <ResponsiveContainer width={200} height={200}>
//           <PieChart>
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgba(0, 0, 0, 0.7)",
//                 borderRadius: "8px",
//                 border: "none",
//                 color: "white",
//                 fontSize: "0.875rem",
//               }}
//               formatter={(value: number) => `${value}%`}
//             />
//             <Pie
//               data={data}
//               innerRadius={70}
//               outerRadius={90}
//               dataKey="value"
//               startAngle={90}
//               endAngle={-270}
//               cornerRadius={10}
//               stroke="none"
//             >
//               {data.map((entry, index) => (
//                 <Cell key={index} fill={entry.fill} />
//               ))}
//               <Label
//                 value={`${data[0].value}%`}
//                 position="center"
//                 className="text-xl font-semibold text-gray-900 dark:text-white"
//               />
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   )
// }


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

const divisions = ["SPP", "Renov", "Toilet", "Braille"] as const
type Division = typeof divisions[number]

// Now supports multiple subdivisions
interface SubdivisionData {
  division: string // can be NMD, THN, etc.
  utilization: number // in percent
  allotment: number // in ₹ Lakhs
}

const chartColors = {
  SPP: "#F97316",
  Renov: "#FB923C",
  Toilet: "#FDBA74",
  RWH: "#F59E0B",
  Feed: "#EA580C",
  Braille: "#C2410C",
}

// Updated sample data
const sampleData: Record<Division, SubdivisionData[]> = {
  SPP: [
    { division: "Malegaon HO", utilization: 0, allotment: 3 },
    { division: "Manmad SO", utilization: 0, allotment: 3 },
  ],
  Renov: [
    { division: "Kalyan HO", utilization: 20.16104, allotment: 50 }
  ],
  Toilet: [
    { division: "Devlali MDG SO", utilization: 0, allotment: 2 }

  ],
  Braille: [
    { division: "Chandwad SO", utilization: 0.1, allotment: 0.1 },
    { division: "Igatpuri SO", utilization: 0.1, allotment: 0.1 },
    { division: "Murbad SO", utilization: 0.1, allotment: 0.1 },
    { division: "Ulhasnagar-5 SO", utilization: 0.1, allotment: 0.1 },
    { division: "Taloja AV SO", utilization: 0.1, allotment: 0.1 }
  ],
}

export function PlanFundPieCharts() {
  const [selected, setSelected] = React.useState<Division>("SPP")

  const subdivisions = sampleData[selected]

  const totalUtil = subdivisions.reduce((acc, curr) => acc + curr.utilization, 0)
    

  const totalAllot = subdivisions.reduce((acc, curr) => acc + curr.allotment, 0)

  const utilizationPercent = totalAllot > 0 ? (totalUtil / totalAllot) * 100 : 0

  const remainingColor = `${chartColors[selected]}33` // 20% transparent version of the primary color

const chartData = [
  {
    name: "Utilized",
    value: Number(utilizationPercent.toFixed(2)),
    fill: chartColors[selected],
  },
  {
    name: "Remaining",
    value: Number((100 - utilizationPercent).toFixed(2)),
    fill: remainingColor,
  },
]


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
         <SelectContent
  align="end"
  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-black dark:text-white"
>
  {divisions.map((d) => (
    <SelectItem
      key={d}
      value={d}
      className="hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {d}
    </SelectItem>
  ))}
</SelectContent>

        </Select>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Fund Allotment Table */}
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="text-left px-4 py-2">Division</th>
              <th className="text-left px-4 py-2">Allotment (₹ Lakhs)</th>
              <th className="text-left px-4 py-2">Utilized (₹ Lakhs)</th>
            </tr>
          </thead>
          <tbody>
            {subdivisions.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">{item.division}</td>
                <td className="px-4 py-2">{item.allotment}</td>
                <td className="px-4 py-2">
                  { /* {((item.utilization * item.allotment) / 100).toFixed(2)} */}
                  {item.utilization}
                </td>
              </tr>
            ))}
            {subdivisions.length > 1 && (
              <tr className="font-semibold border-t border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900">
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2">{totalAllot}</td>
                <td className="px-4 py-2">{totalUtil.toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pie Chart */}
        <div className="flex justify-center items-center">
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
                data={chartData}
                innerRadius={70}
                outerRadius={90}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                cornerRadius={10}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
                <Label
                  value={`${chartData[0].value.toFixed(0)}%`}
                  position="center"
                  className="text-xl font-semibold text-gray-900 dark:text-white"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
