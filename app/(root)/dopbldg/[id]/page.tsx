/* eslint-disable no-template-curly-in-string */


import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InfoRow from "@/components/shared/InfoRow";
import { ParamsProps } from "@/types";
import { getDopBldgById } from "@/lib/actions/departmentalbldg.action";
import CopyButton from "@/components/shared/CopyButton";
import {
  PencilLine,
  Info,
  FileText,
  Banknote,
  Scale,
  History,
  Download,
} from "lucide-react";
import ExportButton from "@/components/shared/ExportButton";

const Page = async ({ params }: ParamsProps) => {
  const result = await getDopBldgById({ departmentalbldgId : params.id });

  // const CopyButton = ({ text }: { text: string }) => {
  //   const [copied, setCopied] = useState(false);
  //   const handleCopy = () => {
  //     navigator.clipboard.writeText(text);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 1500);
  //   };

  //   return (
  //     <button
  //       onClick={handleCopy}
  //       className="ml-2 p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
  //       title="Copy to clipboard"
  //     >
  //       <Copy size={16} />
  //       {copied && (
  //         <span className="ml-1 text-xs text-green-500">Copied!</span>
  //       )}
  //     </button>
  //   );
  // };

  const exportData = [
    {
      Section: "At a Glance",
      Division: result?.division,
      PO: result.po,
      Class: result.class,
      Location: result.location,
      "Purchase Year": result.purchase_year,
      SOA: result.soa,
      PAQ: result.paq,
    },
    {
      Section: "Building Details",
      Area: result.area,
      "Built-up Area": result.builtup_area,
      "Open Space": result.open_space,
      Floors: result.floors,
      "Estimated Value": result.value,
    },
    {
      Section: "Fiscal Info",
      Year: result.year,
      Expenditure: result.expenditure,
      "Fund Type": result.fund_type,
      "Fund Amount": result.fund_amount,
    },
    {
      Section: "Mutation",
      "Mutation Doc": result.mut_doc,
      "Mutation State": result.mut_state,
    },
    {
      Section: "Cases",
      "Case Type": result.cases,
      "Case Description": result.case_description,
      "Action Proposed": result.case_action,
      "Current Progress": result.case_divisionaction,
    },
    {
      Section: "Brief History",
      History: result.brief_history,
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {result.po}
        </h1>
        <div className="flex justify-end w-full gap-2 sm:w-auto">
          <Link href={`/departmentalbldg/edit/${result._id}`}>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
              <PencilLine className="w-4 h-4" /> Edit Records
            </Button>
          </Link>
          <ExportButton data={exportData}>
            <Download className="w-4 h-4" /> Export
          </ExportButton>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* At a Glance */}
        <Card className="col-span-1 lg:col-span-2 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
<CardHeader className="w-full p-4 border-b dark:border-gray-600">
  <div className="flex items-center justify-between w-full">
    {/* Left side: Icon + Title */}
    <div className="flex items-center gap-2">
      <Info className="text-blue-600 dark:text-blue-400" />
      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
        At a Glance
      </CardTitle>
    </div>

    {/* Right side: Copy Button */}
    <CopyButton text={result.po} />
  </div>
</CardHeader>


          <CardContent className="p-4 space-y-4">

            <div className="grid sm:grid-cols-2 gap-4">

              <div>
                <InfoRow label="Division:" value={result?.division} />
                <InfoRow label="PO:" value={result.po} />
                <InfoRow label="Class:" value={result.class} />
                <InfoRow label="Location:" value={result.location} />
                <InfoRow label="Purchase Year:" value={result.purchase_year} />
              <InfoRow label="Floors:" value={result.floors} />
              <InfoRow label="Fund Type:" value={result.fund_type} />
              </div>
              <div>
                <InfoRow label="Case Type:" value={result.cases} />
                <InfoRow label="Mutation State:" value={result.mut_state} />
                <InfoRow label="SOA:" value={result.soa} />
                <InfoRow label="PAQ:" value={result.paq} />
                <InfoRow label="Area:" value={result.area} />
                <InfoRow label="Built-up Area:" value={result.builtup_area} />
                <InfoRow label="Open Space:" value={result.open_space} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Building Info */}
        <Card>
          <CardHeader className="flex justify-between items-center gap-2 border-b p-4 dark:border-gray-600">
            <FileText className="text-green-600" />

            <CardTitle className="text-lg font-semibold  text-gray-900 dark:text-white">Building Info</CardTitle>
            <CopyButton text={result.po} />
          </CardHeader>
          <CardContent className="space-y-2 p-4">

            <InfoRow label="Floors:" value={result.floors} />
            <InfoRow label="Value:" value={result.value} />
            <InfoRow label="Year:" value={result.year} />
            <InfoRow label="Expenditure:" value={result.expenditure} />
          </CardContent>
        </Card>

        {/* Mutation */}
        <Card>
          <CardHeader className="flex justify-between items-center gap-2 border-b p-4 dark:border-gray-600">
            <FileText className="text-red-600" />

            <CardTitle className="text-lg font-semibold  text-gray-900 dark:text-white">Mutation</CardTitle>
          <CopyButton text={result.po} />
          </CardHeader>
          <CardContent className="space-y-2 p-4">

            <InfoRow label="Mutation Doc:" value={result.mut_doc} />
            <InfoRow label="Mutation State:" value={result.mut_state} />
          </CardContent>
        </Card>

        {/* Fiscal Info */}
        <Card>
          <CardHeader className="flex justify-between items-center gap-2 border-b p-4 dark:border-gray-600">
            <Banknote className="text-yellow-600" />

            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Funds</CardTitle>
          <CopyButton text={result.po} />
          </CardHeader>
          <CardContent className="space-y-2 p-4">

            <InfoRow label="Fund Type:" value={result.fund_type} />
            <InfoRow label="Fund Amount:" value={result.fund_amount} />
          </CardContent>
        </Card>

        {/* Cases */}
        <Card>
          <CardHeader className="flex justify-between items-center gap-2 border-b p-4 dark:border-gray-600">
            <Scale className="text-indigo-600" />

            <CardTitle className="text-lg font-semibold  text-gray-900 dark:text-white">Case Details</CardTitle>
          <CopyButton text={result.po} />
          </CardHeader>
          <CardContent className="space-y-2 p-4">

            <InfoRow label="Case Type:" value={result.cases} />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Description:</strong><br />
              {result.case_description || "—"}
            </p>
            <InfoRow label="Action Proposed:" value={result.case_action} />
            <InfoRow label="Current Progress:" value={result.case_divisionaction} />
          </CardContent>
        </Card>

        {/* History */}
        <Card>
          <CardHeader className="flex items-center gap-2 border-b p-4 dark:border-gray-600">
            <History className="text-purple-600" />

            <CardTitle className="text-lg font-semibold  text-gray-900 dark:text-white">Brief History</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">

              {result.brief_history || "—"}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};


export default Page;
