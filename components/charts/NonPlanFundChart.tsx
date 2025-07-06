'use client'

import React, { useState } from "react"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const divisionData = {
  "C-Sion": { allotment: 37.53, utilization: 32 },
  "E-Sion": { allotment: 30, utilization: 15 },
  "C-Pune": { allotment: 16, utilization: 1 },
  RO: { allotment: 10, utilization: 0.5 },
  NMD: { allotment: 1, utilization: 0 },
  THN: { allotment: 1, utilization: 0 },
  PLG: { allotment: 1, utilization: 0 },
  NSK: { allotment: 1, utilization: 0 },
  MLD: { allotment: 1, utilization: 0 },
  RGD: { allotment: 1, utilization: 0 },
  // PSD: { allotment: 90, utilization: 88 },
  // CSD: { allotment: 65, utilization: 60 }
}

type Division = keyof typeof divisionData

const NonPlanFundChart = () => {
  const [selectedDivision, setSelectedDivision] = useState<Division>("C-Sion")
  const { allotment, utilization } = divisionData[selectedDivision]

  const utilizationPercent = ((utilization / allotment) * 100).toFixed(2)

  const chartData = {
    labels: ["Utilized", "Remaining"],
    datasets: [
      {
        label: "Fund Utilization",
        data: [utilization, allotment - utilization],
        backgroundColor: [
          "#f97316", // bright orange
          "rgba(253, 230, 138, 0.2)" // very transparent yellow
        ],
        borderColor: [
          "#f97316",
          "rgba(253, 230, 138, 0.2)"
        ],
        borderWidth: 1,
      }
    ]
  }

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#6b7280", // Tailwind gray-500
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.label}: ₹${ctx.raw} Lakhs`,
        },
      },
    },
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Division Fund Utilization</CardTitle>
        <div className="w-48">
          <Label htmlFor="division" className="sr-only">Select Division</Label>
          <Select
            value={selectedDivision}
            onValueChange={(value) => setSelectedDivision(value as Division)}
          >
            <SelectTrigger
              id="division"
              className="bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700"
            >
              <SelectValue placeholder="Select division" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-700">
              {Object.keys(divisionData).map((division) => (
                <SelectItem
                  key={division}
                  value={division}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {division}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Table with Fund Details */}
        <div className="overflow-x-auto border rounded-md p-2 bg-gray-50 dark:bg-gray-800">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2">Division</th>
                <th className="px-4 py-2">Fund Allotted (₹ Lakhs)</th>
                <th className="px-4 py-2">Fund Utilized (₹ Lakhs)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                <td className="px-4 py-2">{selectedDivision}</td>
                <td className="px-4 py-2">{allotment}</td>
                <td className="px-4 py-2">{utilization}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Doughnut Chart with % overlay */}
        <div className="relative w-64 h-64 mx-auto">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
              {utilizationPercent}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NonPlanFundChart
