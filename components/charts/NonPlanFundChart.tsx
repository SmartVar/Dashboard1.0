// FundChart.js
import React, { useState } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

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
};

const NonPlanFundChart = () => {
  const [selectedDivision, setSelectedDivision] = useState("C-Sion");

  const { allotment, utilization } = divisionData[selectedDivision];

  const data = {
    labels: ["Allotment", "Utilization"],
    datasets: [
      {
        label: `Fund Stats for ${selectedDivision}`,
        data: [allotment, utilization],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h3>Select Division</h3>
      <select
        onChange={(e) => setSelectedDivision(e.target.value)}
        value={selectedDivision}
      >
        {Object.keys(divisionData).map((division) => (
          <option key={division} value={division}>
            {division}
          </option>
        ))}
      </select>

      <PolarArea data={data} />
    </div>
  );
};

export default NonPlanFundChart;
