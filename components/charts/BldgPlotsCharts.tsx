"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
//   CardTitle,
} from "@/components/ui/card"

type BldgKey = "dop" | "rent"
type PlotKey = "vacant" | "reserved"
type AllKeys = BldgKey | PlotKey

const divisionData = {
  Bldg: [
    { division: "NMD", dop: 8, rent: 29 },
    { division: "THN", dop: 11, rent: 48 },
    { division: "NSK", dop: 14, rent: 40 },
    { division: "PLD", dop: 2, rent: 40 },
    { division: "RGD", dop: 3, rent: 41 },
    { division: "MLD", dop: 7, rent: 31 },
  ],
  Plot: [
    { division: "NMD", vacant: 3, reserved: 5 },
    { division: "THN", vacant: 8, reserved: 45 },
    { division: "NSK", vacant: 4, reserved: 0 },
    { division: "PLD", vacant: 0, reserved: 0 },
    { division: "RGD", vacant: 2, reserved: 0 },
    { division: "MLD", vacant: 2, reserved: 0 },
  ],
}

const colors: Record<AllKeys, string> = {
  dop: "#2563EB",      // Blue-600
  rent: "#9333EA",     // Purple-600
  vacant: "#10B981",   // Emerald-500
  reserved: "#F59E0B", // Amber-500
}

const labels: Record<AllKeys, string> = {
  dop: "DOP Bldg",
  rent: "Rent Bldg",
  vacant: "Vacant Plot",
  reserved: "Reserved Plot",
}

export function BldgPlotsCharts() {
  const [selection, setSelection] = React.useState<"Bldg" | "Plot">("Bldg")

  const chartData = divisionData[selection]
  const keys: AllKeys[] =
    selection === "Bldg" ? ["dop", "rent"] : ["vacant", "reserved"]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            {/* <CardTitle>Bldg & Plots</CardTitle> */}
            <CardDescription>
              {/* Compare {selection === "Bldg" ? "building" : "plot"} types across divisions. */}
            </CardDescription>
          </div>
          <div className="flex justify-end w-full mb-4">
            <select
              value={selection}
              onChange={(e) => setSelection(e.target.value as "Bldg" | "Plot")}
            //   className="border rounded px-3 py-1 text-sm bg-background text-foreground border-muted focus:outline-none"
              className="border rounded px-3 py-1 text-sm bg-background text-foreground border-muted dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

            >
              <option value="Bldg">Bldg</option>
              <option value="Plot">Plot</option>
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barCategoryGap="30%" // Gap between bars in group
            barGap={8} // Gap between groups
          >
            <XAxis
              dataKey="division"
              stroke="currentColor"
              tick={{ fontSize: 12, fontWeight: 400, fill: "currentColor" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="currentColor"
              tick={{ fontSize: 12, fontWeight: 400, fill: "currentColor" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.65)", // elegant dark transparent
                color: "#fff",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(6px)",
                fontSize: "12px",
              }}
              labelStyle={{ fontWeight: 500, color: "#fff" }}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Legend
              wrapperStyle={{
                fontSize: 12,
                fontWeight: 400,
                color: "var(--foreground)",
              }}
            />
            {keys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[key]}
                name={labels[key]}
                radius={[4, 4, 0, 0]}
                barSize={26}
              >
                <LabelList
                  dataKey={key}
                  position="top"
                  fill="currentColor"
                  style={{ fontSize: 12, fontWeight: 400 }}
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
