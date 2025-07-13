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
// import { getRentBldgById } from "@/lib/actions/rentedbldg.action"
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
//     const result = await getRentBldgById({ rentbldgId: params.id})
      
//     console.log(result)

//     return (
//       <>
//       <div className="flex w-full flex-col-reverse justify-between gap-4 overflow-auto rounded-lg sm:flex-row sm:items-center">
//         <h1 className="h1-bold text-dark100_light900">
//                 {result.po}</h1> 
//                 <Link href={`/rentbldg/edit/${result._id}`}
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
//     <div className="flex flex-col sm:flex-row gap-4">
//       {/* Left Column */}
//       <div className="flex flex-col sm:w-1/2">
//   <InfoRow label="➔ Division :" value={result.division} />
//   <InfoRow label="➔ Post Office :" value={result.po} />
//   <InfoRow label="➔ Lease Period :" value={result.lease_period} />
//   <InfoRow label="➔ SOA (Sq. ft) :" value={result.soa} />
//   <InfoRow label="➔ Class :" value={result.class_po} />
//   <InfoRow label="➔ PAQ :" value={result.paq} />
//   <InfoRow label="➔ Area (Sq. mtr) :" value={result.area} />
// </div>

// <div className="flex flex-col sm:w-1/2">
//   <InfoRow label="➔ Rent (Rs. per month) :" value={result.rent} />
//   <InfoRow label="➔ Frac Status :" value={result.frac_status} />
//   <InfoRow label="➔ Frac Level :" value={result.frac_level} />
//   <InfoRow label="➔ Fund Type :" value={result.fund_type} />
//   <InfoRow label="➔ Fund Amount :" value={result.fund_amount} />
//   <InfoRow label="➔ Cases :" value={result.cases} />
//   <InfoRow label="➔ Last RO Corr :" value={result.corr_ro} />
//   <InfoRow label="➔ Last Division Corr :" value={result.corr_division} />
// </div>

//     </div>
//   </CardContent>
// </Card>

//             <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Frac Details</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2">
//           <div className="flex flex-col">
//          <InfoRow label="➔ Lease Period :" value={result.lease_period} />
// <InfoRow label="➔ Frac Status :" value={result.frac_status} />
// <InfoRow label="➔ Frac Level :" value={result.frac_level} />

//           </div>
//           </CardContent>
//           </Card>
//             <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Funds Details</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2">
//           <div className="flex flex-col">
// <InfoRow label="➔ Fund Type :" value={result.fund_type} />
// <InfoRow label="➔ Fund Amount :" value={result.fund_amount} />
// </div>
//           </CardContent>
//           </Card>
//             <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>


/* eslint-disable no-template-curly-in-string */

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Info,
  PencilLine,
  FileText,
  Banknote,
  Scale,
  History,
 
} from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import InfoRow from "@/components/shared/InfoRow";
import CopyButton from "@/components/shared/CopyButton";
import { ParamsProps } from "@/types";
import { getRentBldgById } from "@/lib/actions/rentedbldg.action";

// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

import ExportButton from "@/components/shared/ExportButton";
import EditDeleteAction from "@/components/shared/EditDeleteAction";


const Page = async ({ params }: ParamsProps) => {
  const result = await getRentBldgById({ rentbldgId: params.id });

  // Prepare data for Excel export
  const exportData = [
    {
      Section: "At a Glance - Left",
      "Division": result.division,
      "Post Office": result.po,
      "Lease Period": result.lease_period,
      "SOA (Sq. ft)": result.soa,
      "Class": result.class_po,
      "PAQ": result.paq,
      "Area (Sq. mtr)": result.area,
    },
    {
      Section: "At a Glance - Right",
      "Rent (Rs. per month)": result.rent,
      "Frac Status": result.frac_status,
      "Frac Level": result.frac_level,
      "Fund Type": result.fund_type,
      "Fund Amount": result.fund_amount,
      "Cases": result.cases,
      "Last RO Corr": result.corr_ro,
      "Last Division Corr": result.corr_division,
    },
    {
      Section: "Frac Details",
      "Lease Period": result.lease_period,
      "Frac Status": result.frac_status,
      "Frac Level": result.frac_level,
    },
    {
      Section: "Funds Details",
      "Fund Type": result.fund_type,
      "Fund Amount": result.fund_amount,
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
      "Brief History": result.brief_history || "—",
    },
  ];



 return (
  <>
    {/* Header row with title + buttons */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{result.po}</h1>

      <div className="flex justify-end w-full gap-2 sm:w-auto">
        {/* Edit button */}
        <Link href={`/rentbldg/edit/${result._id}`} className="flex-shrink-0">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
            <PencilLine className="w-4 h-4" /> Edit Records
          </Button>
        </Link>

        {/* Export button */}
        <ExportButton data={exportData} />
        <EditDeleteAction type='Delete' itemId={JSON.stringify(result?._id)} url="/rentbldg" />
      </div>
    </div>

    {/* Cards container */}
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {/* At a Glance card spans full width on desktop */}
      <Card className="col-span-1 lg:col-span-2 shadow-lg border border-gray-200 rounded-lg dark:border-gray-700">
       <CardHeader className="border-b p-4 dark:border-gray-600">
  <div className="flex items-center justify-between w-full">
    {/* Left side: Icon + Title */}
    <div className="flex items-center gap-2">
      <Info className="text-blue-600 dark:text-blue-400" />
      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white m-0">
        At a Glance
      </CardTitle>
    </div>

    {/* Right side: Copy Button */}
    <CopyButton text={result.po} />
  </div>
</CardHeader>


        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Left Column */}
            <div className="flex flex-col sm:w-1/2 space-y-2">
              <InfoRow label="Division :" value={result.division} />
              <InfoRow label="Post Office :" value={result.po} />
              <InfoRow label="Lease Period :" value={result.lease_period} />
              <InfoRow label="SOA (Sq. ft) :" value={result.soa} />
              <InfoRow label="Class :" value={result.class_po} />
              <InfoRow label="PAQ :" value={result.paq} />
              <InfoRow label="Area (Sq. mtr) :" value={result.area} />
            </div>

            <div className="flex flex-col sm:w-1/2 space-y-2">
              <InfoRow label="Rent (Rs. per month) :" value={result.rent} />
              <InfoRow label="Frac Status :" value={result.frac_status} />
              <InfoRow label="Frac Level :" value={result.frac_level} />
              <InfoRow label="Fund Type :" value={result.fund_type} />
              <InfoRow label="Fund Amount :" value={result.fund_amount} />
              <InfoRow label="Cases :" value={result.cases} />
              <InfoRow label="Last RO Corr :" value={result.corr_ro} />
              <InfoRow label="Last Division Corr :" value={result.corr_division} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other cards */}
      {[
        { key: "frac-details", title: "Frac Details", icon: <FileText className="text-orange-600" /> },
        { key: "funds-details", title: "Funds Details", icon: <Banknote className="text-green-600" /> },
        { key: "cases-details", title: "Cases Details", icon: <Scale className="text-indigo-600" /> },
        { key: "brief-history", title: "Brief History", icon: <History className="text-purple-600" /> },
      ].map(({ key, title, icon }) => (
        <Card key={key} className="shadow-lg border border-gray-200 rounded-lg dark:border-gray-700">
<CardHeader className="w-full p-4 border-b dark:border-gray-600">
  <div className="flex items-center justify-between w-full">
    {/* Left: Icon + Title */}
    <div className="flex items-center gap-2">
      {icon}
      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </CardTitle>
    </div>

    {/* Right: Copy Button */}
    <CopyButton text={result.po} />
  </div>
</CardHeader>

          <CardContent className="p-4 space-y-4">
            {key === "frac-details" && (
              <>
                <InfoRow label="Lease Period :" value={result.lease_period} />
                <InfoRow label="Frac Status :" value={result.frac_status} />
                <InfoRow label="Frac Level :" value={result.frac_level} />
              </>
            )}
            {key === "funds-details" && (
              <>
                <InfoRow label="Fund Type :" value={result.fund_type} />
                <InfoRow label="Fund Amount :" value={result.fund_amount} />
              </>
            )}
            {key === "cases-details" && (
              <>
                <InfoRow label="Case Type :" value={result.cases} />
                <span className="primary-text-gradient">Case Desc :</span>
                <p className="text-dark400_light700 whitespace-pre-line">
                  {result.case_description || "—"}
                </p>
                <InfoRow label="Action Proposed :" value={result.case_action} />
                <InfoRow label="Current Progress :" value={result.case_divisionaction} />
              </>
            )}
            {key === "brief-history" && (
              <div className="flex flex-col gap-2">
                <span className="primary-text-gradient">➔ Brief History :</span>
                <p className="text-dark400_light700 whitespace-pre-line">
                  {result.brief_history || "—"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </>
);
};

export default Page;
