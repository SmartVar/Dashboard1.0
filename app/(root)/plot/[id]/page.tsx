
/* eslint-disable no-template-curly-in-string */
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InfoRow from "@/components/shared/InfoRow";
import { ParamsProps } from "@/types";
import { getPlotById } from "@/lib/actions/plot.action";
import { PencilLine, Info, FileText, Banknote, Scale, Copy, History, Download } from "lucide-react";

import ExportButton from "@/components/shared/ExportButton";

// eslint-disable-next-line @next/next/no-async-client-component
const Page = async ({ params }: ParamsProps) => {
  const result = await getPlotById({ plotId: params.id });

  const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };




  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
      title="Copy to clipboard"
    >
      <Copy size={16} />
      {copied && <span className="ml-1 text-xs text-green-500">Copied!</span>}
    </button>
  );
};
  
  // Prepare export data
  const exportData = [
    {
      Section: "At a Glance",
      Name: result.name,
      Location: result.location,
      "Purchase Year": result.date_purchase,
      Owner: result.purchase_from,
      Amount: result.amount,
      Area: result.area,
      "Acquisition Mode": result.moa,
    },
    {
      Section: "Fiscal Details",
      "Lease Period": result.lease_period,
      Enchroached: result.enchroached,
      "Boundary Wall": result.boundary_wall,
      "Mutation Doc": result.mut_doc,
      "Fund Type": result.fund_type,
      "Fund Amount": result.fund_amount,
    },
    {
      Section: "Encroachment",
      Enchroached: result.enchroached,
      "Encroached Area": result.enchroached_area,
    },
    {
      Section: "Cases Details",
      "Case Type": result.cases,
      "Case Description": result.case_description || "—",
      "Action Proposed": result.case_action,
      "Current Progress": result.case_divisionaction,
    },
    {
      Section: "Brief History",
      "History": result.brief_history || "—",
    },
  ];

  return (
    <>
      {/* Header with Title and Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {result.name}
        </h1>
      <div className="flex justify-end w-full gap-2 sm:w-auto">
          <Link href={`/plot/edit/${result._id}`}>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
              <PencilLine className="w-4 h-4" /> Edit Records
            </Button>
          </Link>

          <ExportButton data={exportData}>
           <Download className="w-4 h-4" /> Export
          </ExportButton>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* At a Glance */}
        <Card className="col-span-1 lg:col-span-2 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
          <CardHeader className="flex flex-between items-center gap-2 border-b p-4 dark:border-gray-600">
            <Info className="text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              At a Glance
            </CardTitle>
            <CopyButton text={result.po} />
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col sm:w-1/2 space-y-2">
                <InfoRow label="Location:" value={result.location} />
                <InfoRow label="Purchase Year:" value={result.date_purchase} />
                <InfoRow label="Amount (Rs.):" value={result.amount} />
                <InfoRow label="Area (Sq. mtr):" value={result.area} />
                <InfoRow label="Acquisition Mode:" value={result.moa} />
              </div>
              <div className="flex flex-col sm:w-1/2 space-y-2">
                <InfoRow label="Lease Period:" value={result.lease_period} />
                <InfoRow label="Enchroached:" value={result.enchroached} />
                <InfoRow label="Boundary Wall:" value={result.boundary_wall} />
                <InfoRow label="Mutation Doc:" value={result.mut_doc} />
                <InfoRow label="Fund Type:" value={result.fund_type} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Sections */}
        {[
          { key: "mutation", title: "Mutation Details", icon: <FileText className="text-red-600" /> },
          { key: "funds", title: "Funds Details", icon: <Banknote className="text-green-600" /> },
          { key: "encroach", title: "Encroachment", icon: <FileText className="text-orange-600" /> },
          { key: "cases", title: "Cases Details", icon: <Scale className="text-indigo-600" /> },
          { key: "history", title: "Brief History", icon: <History className="text-purple-600" /> },
        ].map(({ key, title, icon }) => (
          <Card key={key} className="shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
            <CardHeader className="flex flex-between items-center gap-2 border-b p-4 dark:border-gray-600 ">
              {icon}
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </CardTitle>
              <CopyButton text={result.po} />
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {key === "mutation" && (
                <>
                  <InfoRow label="Mutation State:" value={result.mut_state} />
                  <InfoRow label="Mutation Doc:" value={result.mut_doc} />
                </>
              )}
              {key === "funds" && (
                <>
                  <InfoRow label="Fund Type:" value={result.fund_type} />
                  <InfoRow label="Fund Allotted (Rs.):" value={result.fund_amount} />
                </>
              )}
              {key === "encroach" && (
                <>
                  <InfoRow label="Enchroachment:" value={result.enchroached} />
                  <InfoRow label="Area Enchroached:" value={result.enchroached_area} />
                </>
              )}
              {key === "cases" && (
                <>
                  <InfoRow label="→ Case Type:" value={result.cases} />
                  <span className="text-primary-gradient">Case Desc:</span>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {result.case_description || "—"}
                  </p>
                  <InfoRow label="Action Proposed:" value={result.case_action} />
                  <InfoRow label="Current Progress:" value={result.case_divisionaction} />
                </>
              )}
              {key === "history" && (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {result.brief_history || "—"}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Page;
