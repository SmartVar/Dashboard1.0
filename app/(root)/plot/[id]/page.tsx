// /* eslint-disable no-template-curly-in-string */

// import {
//     Card,
//     CardContent,
//     // CardDescription,
//     CardHeader,
//     CardTitle,
//   } from "../../../../components/ui/card"
  
//   // import { Overview } from "./overview"
//   // import { RecentSales } from "./recent-sales"
//   // import { auth } from '@clerk/nextjs'
//   // import { getUserById, getUserInfo } from '@/lib/actions/user.action'
//   import React from 'react'
//   // import { formatAndDivideNumber } from "@/lib/utils"
//   // import Link from "next/link"
// // import {Piechartdata} from "./Piechartdata"
// // import BarChartsActive from "../charts/BarChartsActive"
// // import BarChartsMultiple from "../charts/BarChartsMultiple"
// // import PieChartsActive from "../charts/PieChartsActive"
// // import BarChartsCases from "../charts/BarChartsCases"
// // import DonutCharts from "../charts/DonutCharts"
//   import { ParamsProps } from '@/types';
// import { getPlotById } from "@/lib/actions/plot.action"
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import InfoRow from "@/components/shared/InfoRow";


//   const Page = async ({ params }: ParamsProps) => {
//     // const { userId } = auth();
//   // const userId = 'user_2bCX55zAAaS74JAT0pGe59OjuhVCL123';
//   // const { userId } = auth();
  
//     // if (userId !== 'user_2bYFxpFNNNEJclp29nFXHzrnJCh') return <h1 className="h1-bold text-dark100_light900">"You are not authorized to view the content"</h1>;
//     // if(!userId) return null;
  
//     // const mongoUser = await getUserById({ userId })
//     const result = await getPlotById({ plotId: params.id})
      
//     console.log(result)

//     return (
//       <>
//       <div className="flex w-full flex-col-reverse justify-between gap-4 overflow-auto rounded-lg sm:flex-row sm:items-center">
//         <h1 className="h1-bold text-dark100_light900">
//                 {result.name}</h1> 
//                 <Link href={`/plot/edit/${result._id}`}
//                 className="flex justify-end max-sm:w-full">
//                 <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
//                   Edit Records
//                 </Button>
//               </Link> 
//               </div>
              
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4"> */}
//       {/* <Card className="text-dark200_light900 col-span-4 flex-wrap text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">At a Glance</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2 sm:flex-col">
//           <div className="flex-between flex flex-row text-base">
//             <div className="flex flex-col">
//           <p><span className="primary-text-gradient">➔ Division : </span>{result.division}</p>
//           <p><span className="primary-text-gradient">➔ Post Office : </span>{result.po}</p>
//           <p><span className="primary-text-gradient">➔ Purchase Year : </span>{result.purchase_year}</p>
//           <p><span className="primary-text-gradient">➔ SOA (Sq. ft) : </span>{result.soa}</p>
//           <p><span className="primary-text-gradient">➔ Class : </span>{result.classes}</p>
//           <p><span className="primary-text-gradient">➔ PAQ : </span>{result.paq}</p>
//           </div>
//           <div className=" flex flex-col">
//             <p><span className="primary-text-gradient">➔ Area (Sq. mtr) : </span>{result.area}</p>
//           <p><span className="primary-text-gradient">➔ Floors : </span>{result.floors}</p>
//           <p><span className="primary-text-gradient">➔ Purchase Value : </span>{result.value}</p>
//           <p><span className="primary-text-gradient">➔ Mutation Doc : </span>{result.mut_doc}</p>
//           <p><span className="primary-text-gradient">➔ Fund : </span>{result.fund_type}</p>
//           <p><span className="primary-text-gradient">➔ Cases : </span>{result.cases}</p>
//           </div>
//           </div>
//           </CardContent>
//       </Card> */}
//       <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//   <CardHeader>
//     <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">
//       At a Glance
//     </CardTitle>
//   </CardHeader>

//   <CardContent className="pl-2">
//     <div className="flex flex-col gap-4 sm:flex-row">
//       {/* Left Column */}
//       <div className="flex flex-col sm:w-1/2">
//   <InfoRow label="➔ Division :" value={result.division} />
//   <InfoRow label="➔ Plot Name :" value={result.name} />
//   <InfoRow label="➔ Purchase Year :" value={result.date_purchase} />
//   <InfoRow label="➔ Location :" value={result.location} />
//   <InfoRow label="➔ Owner :" value={result.purchase_from} />
//   <InfoRow label="➔ Amount (in Rs.) :" value={result.amount} />
//   <InfoRow label="➔ Area (Sq. mtr) :" value={result.area} />
//   <InfoRow label="➔ Acquisition Mode :" value={result.moa} />
// </div>

// <div className="flex flex-col sm:w-1/2">
//   <InfoRow label="➔ Lease Period :" value={result.lease_period} />
//   <InfoRow label="➔ Enchroached :" value={result.enchroached} />
//   <InfoRow label="➔ Boundary Wall :" value={result.boundary_wall} />
//   <InfoRow label="➔ Mutation Doc :" value={result.mut_doc} />
//   <InfoRow label="➔ Fund :" value={result.fund_type} />
//   <InfoRow label="➔ Cases :" value={result.cases} />
//   <InfoRow label="➔ Last RO Corr :" value={result.corr_ro} />
//   <InfoRow label="➔ Last Division Corr :" value={result.corr_division} />
// </div>
// </div>
//   </CardContent>
// </Card>

//             <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Mutation Details</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2">
//           <div className="flex flex-col">
//       <InfoRow label="➔ Mutation :" value={result.mut_state} />
// <InfoRow label="➔ Mutation Doc :" value={result.mut_doc} />

//           </div>
//           </CardContent>
//           </Card>
//             <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Funds Details</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2">
//           <div className="flex flex-col">
// <InfoRow label="➔ Proposed Structure :" value={result.purpose} />
// <InfoRow label="➔ Fund Type :" value={result.fund_type} />
// <InfoRow label="➔ Fund Allotted (in Rs.) :" value={result.fund_amount} />

//           </div>
//           </CardContent>
//           </Card>
//             <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Enchroachment</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2">
//           <div className="flex flex-col">
//          <InfoRow label="➔ Enchroachment :" value={result.enchroached} />
// <InfoRow label="➔ Area Enchroached (in sq. mtr) :" value={result.enchroached_area} />
//  </div>
//           </CardContent>
//           </Card>
//             <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Cases Details</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2">
//           <div className="flex flex-col">
// <InfoRow label="➔ Case Type :" value={result.cases} />
// {/* <InfoRow label="➔ Case Description :" value={result.case_description} /> */}
// <span className="primary-text-gradient">➔ Case Desc :</span>
//   <p className="text-dark400_light700 whitespace-pre-line">{result.case_description || '—'}</p>
// <InfoRow label="➔ Action Proposed :" value={result.case_action} />
// <InfoRow label="➔ Current Progress :" value={result.case_divisionaction} />

//           </div>
//           </CardContent>
//           </Card>
//           <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Brief History</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2">
// <div className="flex flex-col gap-2">
//   <span className="primary-text-gradient">➔ Brief History :</span>
//   <p className="text-dark400_light700 whitespace-pre-line">{result.brief_history || '—'}</p>

//           </div>
//           </CardContent>
//           </Card>
//       </div>
//       </>
//     )
//   }
  
//   export default Page

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
        <div className="flex gap-3">
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
          <CardHeader className="flex items-center gap-2 border-b p-4 dark:border-gray-600">
            <Info className="text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              At a Glance
            </CardTitle>
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
