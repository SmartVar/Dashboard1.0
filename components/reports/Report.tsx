'use client';

import React, { useState, useEffect } from 'react';

interface ReportStatusGridProps {
  reports: string[];      // dynamic report titles
  divisions: string[];    // dynamic division names
}

const Report: React.FC<ReportStatusGridProps> = ({ reports, divisions }) => {
  // Initialize status matrix: reports.length x divisions.length, all false
  const [statuses, setStatuses] = useState<boolean[][]>(() =>
    Array.from({ length: reports.length }, () => Array(divisions.length).fill(false))
  );

  // Reset statuses if reports or divisions change (optional)
  useEffect(() => {
    setStatuses(Array.from({ length: reports.length }, () => Array(divisions.length).fill(false)));
  }, [reports, divisions]);

  const toggleCheckbox = (reportIndex: number, divisionIndex: number) => {
    setStatuses((prev) => {
      const newStatuses = [...prev];
      newStatuses[reportIndex] = [...newStatuses[reportIndex]];
      newStatuses[reportIndex][divisionIndex] = !newStatuses[reportIndex][divisionIndex];
      return newStatuses;
    });
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="border-collapse border border-gray-300 w-full min-w-[600px]">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Report Title \ Division</th>
            {divisions.map((division) => (
              <th key={division} className="border border-gray-300 px-4 py-2 text-center">
                {division}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports.map((report, reportIdx) => (
            <tr key={report}>
              <td className="border border-gray-300 px-4 py-2 font-semibold">{report}</td>
              {divisions.map((_, divisionIdx) => (
                <td key={divisionIdx} className="border border-gray-300 px-4 py-2 text-center">
                  <label className="cursor-pointer inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={statuses[reportIdx][divisionIdx]}
                      onChange={() => toggleCheckbox(reportIdx, divisionIdx)}
                      className="mr-2"
                    />
                    {statuses[reportIdx][divisionIdx] ? '✅' : '❌'}
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
