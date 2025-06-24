// components/shared/ExportButton.tsx
"use client";

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

interface ExportButtonProps {
  data: any[];
}

const ExportButton = ({ data }: ExportButtonProps) => {
  const exportAllToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dashboard Data");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type: "application/octet-stream",
    });
    saveAs(blob, "dashboard-data.xlsx");
  };

  return (
    <Button
      onClick={exportAllToExcel}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Export All to Excel
    </Button>
  );
};

export default ExportButton;
