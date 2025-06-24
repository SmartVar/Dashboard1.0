// components/shared/ExportButton.tsx
"use client";

import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ReactNode } from "react";

export interface ExportButtonProps {
  data: object[];
  children?: ReactNode; // ✅ Accept children
}

const ExportButton = ({ data, children }: ExportButtonProps) => {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "exported_data.xlsx");
  };

  return (
    <Button onClick={handleExport} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
      {children ?? (
        <>
          <Download className="w-4 h-4" /> Export
        </>
      )}
    </Button>
  );
};

export default ExportButton;
