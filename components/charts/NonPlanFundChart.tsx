'use client'

import React, { useState } from "react"
import { PolarArea } from "react-chartjs-2"
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

const divisionData = {
  "C-Sion": { allotment: 80, utilization: 60 },
  "E-Sion": { allotment: 100, utilization: 90 },
  "C-Pune": { allotment: 70, utilization: 50 },
  RO: { allotment: 95, utilization: 85 },
  NMD: { allotment: 60, utilization: 30 },
  THN: { allotment: 50, utilization: 45 },
  PLG: { allotment: 75, utilization: 70 },
  NSK: { allotment: 85, utilization: 80 },
  MLD: { allotment: 40, utilization: 35 },
  RGD: { allotment: 55, utilization: 50 },
  PSD: { allotment: 90, utilization: 88 },
  CSD: { allotment: 65, utilization: 60 }
}

const NonPlanFundChart = () => {
  const [selectedDivision, setSelectedDivision] = useState("C-Sion")
  const { allotment, utilization } = divisionData[selectedDivision]

  const chartData = {
    labels: ["Allotment", "Utilization"],
    datasets: [
      {
        label: `Fund Stats for ${selectedDivision}`,
        data: [allotment, utilization],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderWidth: 1
      }
    ]
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Division Fund Chart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="division">Select Division</Label>
          <Select
            value={selectedDivision}
            onValueChange={(value) => setSelectedDivision(value)}
          >
            <SelectTrigger id="division">
              <SelectValue placeholder="Select division" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(divisionData).map((division) => (
                <SelectItem key={division} value={division}>
                  {division}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <PolarArea data={chartData} />
        </div>
      </CardContent>
    </Card>
  )
}

export default NonPlanFundChart
