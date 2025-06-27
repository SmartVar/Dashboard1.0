// /* eslint-disable tailwindcss/no-contradicting-classname */
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
// import { getDopBldgById } from "@/lib/actions/departmentalbldg.action"
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
// //    const InfoRow = ({ label, value }: InfoRowProps) => (
// //   <div className="flex w-full items-center gap-4">
// //     <span className="primary-text-gradient w-[180px] shrink-0 whitespace-nowrap">{label}</span>
// //     <span
// //       className="text-dark400_light700 truncate text-left"
// //       title={value?.toString() || '—'}
// //     >
// //       {value ?? '—'}
// //     </span>
// //   </div>
// // )
    


// const result = await getDopBldgById({ departmentalbldgId: params.id})
      
    

//     console.log(result)

//     return (
//       <>
//             <div className="flex w-full flex-col-reverse justify-between gap-4 overflow-auto rounded-lg sm:flex-row sm:items-center">
//         <h1 className="h1-bold text-dark100_light900">
//                 {result.po}</h1> 
//                 <Link href={`/dopbldg/edit/${result._id}`}
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
//     {/* <div className="flex flex-col sm:flex-row gap-4">
      
//       <div className="flex flex-col sm:w-1/2">
//         <p><span className="primary-text-gradient">➔ Division : </span>{result.division}</p>
//         <p><span className="primary-text-gradient">➔ Post Office : </span>{result.po}</p>
//         <p><span className="primary-text-gradient">➔ Purchase Year : </span>{result.purchase_year}</p>
//         <p><span className="primary-text-gradient">➔ SOA (Sq. ft) : </span>{result.soa}</p>
//         <p><span className="primary-text-gradient">➔ Class : </span>{result.classes}</p>
//         <p><span className="primary-text-gradient">➔ PAQ : </span>{result.paq}</p>
//         <p><span className="primary-text-gradient">➔ Area (Sq. mtr) : </span>{result.area}</p>
//       </div>

    
//       <div className="flex flex-col sm:w-1/2">
//         <p><span className="primary-text-gradient">➔ Floors : </span>{result.floors}</p>
//         <p><span className="primary-text-gradient">➔ Purchase Value : </span>{result.value}</p>
//         <p><span className="primary-text-gradient">➔ Mutation Doc : </span>{result.mut_doc}</p>
//         <p><span className="primary-text-gradient">➔ Fund : </span>{result.fund_type}</p>
//         <p><span className="primary-text-gradient">➔ Cases : </span>{result.cases}</p>
//         <p><span className="primary-text-gradient">➔ Last RO Corr : </span>{result.corr_ro}</p>
//         <p><span className="primary-text-gradient">➔ Last Division Corr : </span>{result.corr_division}</p>
//       </div>
//     </div> */}

// <div className="flex flex-col gap-4 sm:flex-row">
//       {/* Left Column */}
//       <div className="flex flex-col gap-2 sm:w-1/2">
//         <InfoRow label="➔ Division :" value={result.division} />
//         <InfoRow label="➔ Post Office :" value={result.po} />
//         <InfoRow label="➔ Purchase Year :" value={result.purchase_year} />
//         <InfoRow label="➔ SOA (Sq. ft) :" value={result.soa} />
//         <InfoRow label="➔ Class :" value={result.classes} />
//         <InfoRow label="➔ PAQ :" value={result.paq} />
//         <InfoRow label="➔ Area (Sq. mtr) :" value={result.area} />
//       </div>

//       {/* Right Column */}
//       <div className="flex flex-col gap-2 sm:w-1/2">
//         <InfoRow label="➔ Floors :" value={result.floors} />
//         <InfoRow label="➔ Purchase Value :" value={result.value} />
//         <InfoRow label="➔ Mutation Doc :" value={result.mut_doc} />
//         <InfoRow label="➔ Fund :" value={result.fund_type} />
//         <InfoRow label="➔ Cases :" value={result.cases} />
//         <InfoRow label="➔ Last RO Corr :" value={result.corr_ro} />
//         <InfoRow label="➔ Last Division Corr :" value={result.corr_division} />
//       </div>
//     </div>

//   </CardContent>
// </Card>

//             <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Mutation Details</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2">
//           <div className="flex flex-col">
//             <InfoRow label="➔ Mutation :" value={result.mut_state} />
//             <InfoRow label="➔ Mutation Doc :" value={result.mut_doc} />
//           </div>
//           </CardContent>
//           </Card>
//             <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Funds Details</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2">
//           <div className="flex flex-col">
//           <InfoRow label="➔ Last Exp (Rs.) :" value={result.expenditure} />
//           <InfoRow label="➔ Year of Last Exp :" value={result.year} />
//           <InfoRow label="➔ Fund Type :" value={result.fund_type} />
//           <InfoRow label="➔ Fund Allot (Rs.) :" value={result.fund_amount} />

//           </div>
//           </CardContent>
//           </Card>
//             <Card className="text-dark200_light900 col-span-4 text-base font-bold">
//         <CardHeader>
//           <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Cases Details</CardTitle>
//         </CardHeader>
//         <CardContent className="pl-2">
//           <div className="flex flex-col">
//           <InfoRow label="➔ Case Type :" value={result.cases} />
//           {/* <InfoRow label="➔ Case Description :" value={result.case_description} /> */}
//           <div className="flex flex-col gap-2">
//   <span className="primary-text-gradient">➔ Case Desc :</span>
//   <p className="text-dark400_light700 whitespace-pre-line">{result.case_description || '—'}</p>
// </div>
//           <InfoRow label="➔ Action Proposed :" value={result.case_action} />
//           <InfoRow label="➔ Current Progress :" value={result.case_divisionaction} />

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
// </div>

//           </CardContent>
//           </Card>
//       </div>
//       </>
//     )
//   }
  
//   export default Page

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Info,
  PencilLine,
  FileText,
  Banknote,
  Scale,
  History,
  Copy,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InfoRow from "@/components/shared/InfoRow";
import { getDopBldgById } from "@/lib/actions/departmentalbldg.action";
import { ParamsProps } from "@/types";
// import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip as ChartTooltip } from "recharts";
// import ReactTooltip from "react-tooltip";
import Tooltip from "react-tooltip";
import ExportButton from "@/components/shared/ExportButton";

// Helper: Copy to clipboard
// const CopyButton = ({ text }: { text: string }) => {
//   const [copied, setCopied] = useState(false);
//   const handleCopy = () => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 1500);
//   };

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


//   return (
//     <button
//       onClick={handleCopy}
//       className="ml-2 p-1 text-gray-500 hover:text-blue-600"
//       title="Copy to clipboard"
//     >
//       <Copy size={16} />
//       {copied && <span className="ml-1 text-xs">Copied!</span>}
//     </button>
//   );
// };

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Page = ({ params }: ParamsProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDopBldgById({ departmentalbldgId: params.id }).then(setData);
  }, [params.id]);

  if (!data) return <div className="text-center py-10 text-gray-500">Loading...</div>;

  // const chartData = [
  //   { label: "Allotted", value: Number(data.fund_amount || 0) },
  //   { label: "Expended", value: Number(data.expenditure || 0) },
  // ];
const exportData = [
  {
    Section: "At a Glance",
    "Division": data.division,
    "Post Office": data.po,
    "Lease Period": data.lease_period,
    "SOA (Sq. ft)": data.soa,
    "Class": data.class_po,
    "PAQ": data.paq,
    "Area (Sq. mtr)": data.area,
    "Rent (Rs. per month)": data.rent,
    "Frac Status": data.frac_status,
    "Frac Level": data.frac_level,
    "Fund Type": data.fund_type,
    "Fund Amount": data.fund_amount,
    "Cases": data.cases,
    "Last RO Corr": data.corr_ro,
    "Last Division Corr": data.corr_division,
  },
  {
    Section: "Frac Details",
    "Lease Period": data.lease_period,
    "Frac Status": data.frac_status,
    "Frac Level": data.frac_level,
  },
  {
    Section: "Funds Details",
    "Fund Type": data.fund_type,
    "Fund Amount": data.fund_amount,
  },
  {
    Section: "Cases Details",
    "Case Type": data.cases,
    "Case Desc": data.case_description || "—",
    "Action Proposed": data.case_action,
    "Current Progress": data.case_divisionaction,
  },
  {
    Section: "Brief History",
    "History": data.brief_history || "—",
  }
];

  const cards = [
    {
      key: "at-a-glance",
      title: "At a Glance",
      icon: <Info className="text-blue-600" data-tip="Basic building info" />,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <InfoRow label="Division" value={data.division} />
            <div className="flex items-center">
              <InfoRow label="Post Office" value={data.po} />
            </div>
            <InfoRow label="Purchase Year" value={data.purchase_year} />
            <InfoRow label="SOA (Sq. ft)" value={data.soa} />
            <InfoRow label="Class" value={data.classes} />
            <InfoRow label="PAQ" value={data.paq} />
            <InfoRow label="Area (Sq. mtr)" value={data.area} />
          </div>
          <div>
            <InfoRow label="Floors" value={data.floors} />
            <InfoRow label="Purchase Value" value={data.value} />
            <InfoRow label="Mutation Doc" value={data.mut_doc} />
            <InfoRow label="Fund" value={data.fund_type} />
            <InfoRow label="Cases" value={data.cases} />
            <InfoRow label="Last RO Corr" value={data.corr_ro} />
            <InfoRow label="Last Division Corr" value={data.corr_division} />
          </div>
        </div>
      ),
    },
    {
      key: "mutation",
      title: "Mutation Details",
      icon: <FileText className="text-purple-600" data-tip="Mutation info" />,
      content: (
        <>
          <InfoRow label="Mutation State" value={data.mut_state} />
          <div className="flex items-center">
            <InfoRow label="Mutation Doc" value={data.mut_doc} />
          </div>
        </>
      ),
    },
    // {
    //   key: "funds",
    //   title: "Funds Details",
    //   icon: <Banknote className="text-green-600" data-tip="Financials" />,
    //   content: (
    //     <>
    //       <InfoRow label="Fund Type" value={data.fund_type} />
    //       <InfoRow label="Last Exp (Rs.)" value={data.expenditure} />
    //       <InfoRow label="Year of Last Exp" value={data.year} />
    //       <InfoRow label="Fund Allot (Rs.)" value={data.fund_amount} />
    //       <div className="h-28 mt-4">
    //         <ResponsiveContainer width="100%" height="100%">
    //           <LineChart data={chartData}>
    //             <XAxis dataKey="label" />
    //             <ChartTooltip />
    //             <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
    //           </LineChart>
    //         </ResponsiveContainer>
    //       </div>
    //     </>
    //   ),
    // },
{
  key: "funds",
  title: "Funds Details",
  icon: <Banknote className="text-green-600" data-tip="Financials" />,
  content: (
    <>
      <InfoRow label="Fund Type" value={data.fund_type} />
      <InfoRow label="Last Exp (Rs.)" value={data.expenditure} />
      <InfoRow label="Year of Last Exp" value={data.year} />
      <InfoRow label="Fund Allot (Rs.)" value={data.fund_amount} />
    </>
  ),
},

    {
      key: "cases",
      title: "Case Details",
      icon: <Scale className="text-orange-600" data-tip="Legal or admin cases" />,
      content: (
        <>
          <InfoRow label="Case Type" value={data.cases} />
          <p className="text-gray-600 whitespace-pre-line">
            <span className="font-semibold">Description:</span> {data.case_description || "—"}
          </p>
          <InfoRow label="Action Proposed" value={data.case_action} />
          <InfoRow label="Current Progress" value={data.case_divisionaction} />
        </>
      ),
    },
    {
      key: "history",
      title: "Brief History",
      icon: <History className="text-indigo-600" data-tip="Past summary" />,
      content: (
        <p className="text-gray-600 whitespace-pre-line">{data.brief_history || "—"}</p>
      ),
    },
  ];

//   return (
   
//   <>
//     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//         {data.po}
//       </h1>
//       <Link href={`/dopbldg/edit/${data._id}`}>
//         <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
//           <PencilLine className="w-4 h-4" /> Edit Records
//         </Button>
//       </Link>
//     </div>

//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//       {cards.map((card, i) => (
//         <motion.div
//           key={card.key}
//           custom={i}
//           initial="hidden"
//           animate="visible"
//           variants={cardVariants}
//         >
//           <Card className="shadow-lg border border-gray-200 rounded-lg dark:border-gray-700">
//             <CardHeader className="flex gap-2 items-center border-b p-4 dark:border-gray-600">
//               {card.icon}
//               <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
//                 {card.title}
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4">{card.content}</CardContent>
//           </Card>
//         </motion.div>
//       ))}
//     </div>

//     <Tooltip id="tooltip-id" place="top" className="!bg-gray-800 !text-white !text-sm !px-3 !py-2" />
//   </>
// );

return (
  <>
    {/* Heading Row */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {data.po}
      </h1>
      <div className="flex justify-end w-full sm:w-auto">
        <Link href={`/dopbldg/edit/${data._id}`}>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
            <PencilLine className="w-4 h-4" /> Edit Records
          </Button>
        </Link>
        <ExportButton data={exportData}>
                   <Download className="w-4 h-4" /> Export
                  </ExportButton>
                </div>
              </div>
      

    {/* Cards Grid */}
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map((card, i) => (
        <motion.div
          key={card.key}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className={card.key === "at-a-glance" ? "md:col-span-2" : ""}
        >
          <Card className="shadow-lg border border-gray-200 rounded-lg dark:border-gray-700">
            {/* Card Header */}
            <CardHeader className="flex flex-col gap-2 items-start border-b p-4 dark:border-gray-600">
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center gap-2">
                  {card.icon}
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    {card.title}
                  </CardTitle>
                </div>
                {/* Copy button only in card header */}
                <CopyButton text={data.po} />
              </div>
            </CardHeader>

            {/* Card Body */}
            <CardContent className="p-4 space-y-4">{card.content}</CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* Tooltip Styles */}
    <Tooltip
      id="tooltip-id"
      place="top"
      className="!bg-gray-800 !text-white !text-sm !px-3 !py-2"
    />
  </>
);



};

export default Page;
