/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable no-template-curly-in-string */

import {
    Card,
    CardContent,
    // CardDescription,
    CardHeader,
    CardTitle,
  } from "../../../../components/ui/card"
  
  // import { Overview } from "./overview"
  // import { RecentSales } from "./recent-sales"
  // import { auth } from '@clerk/nextjs'
  // import { getUserById, getUserInfo } from '@/lib/actions/user.action'
  import React from 'react'
  // import { formatAndDivideNumber } from "@/lib/utils"
  // import Link from "next/link"
// import {Piechartdata} from "./Piechartdata"
// import BarChartsActive from "../charts/BarChartsActive"
// import BarChartsMultiple from "../charts/BarChartsMultiple"
// import PieChartsActive from "../charts/PieChartsActive"
// import BarChartsCases from "../charts/BarChartsCases"
// import DonutCharts from "../charts/DonutCharts"
  import { ParamsProps } from '@/types';
import { getDopBldgById } from "@/lib/actions/departmentalbldg.action"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InfoRow from "@/components/shared/InfoRow";



  const Page = async ({ params }: ParamsProps) => {
    // const { userId } = auth();
  // const userId = 'user_2bCX55zAAaS74JAT0pGe59OjuhVCL123';
  // const { userId } = auth();
  
    // if (userId !== 'user_2bYFxpFNNNEJclp29nFXHzrnJCh') return <h1 className="h1-bold text-dark100_light900">"You are not authorized to view the content"</h1>;
    // if(!userId) return null;
  
    // const mongoUser = await getUserById({ userId })
//    const InfoRow = ({ label, value }: InfoRowProps) => (
//   <div className="flex w-full items-center gap-4">
//     <span className="primary-text-gradient w-[180px] shrink-0 whitespace-nowrap">{label}</span>
//     <span
//       className="text-dark400_light700 truncate text-left"
//       title={value?.toString() || '—'}
//     >
//       {value ?? '—'}
//     </span>
//   </div>
// )
    


const result = await getDopBldgById({ departmentalbldgId: params.id})
      
    

    console.log(result)

    return (
      <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 overflow-auto rounded-lg sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
                {result.po}</h1> 
                <Link href={`/dopbldg/edit/${result._id}`}
                className="flex justify-end max-sm:w-full">
                <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                  Edit Records
                </Button>
              </Link> 
              </div>
              
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4"> */}
      {/* <Card className="text-dark200_light900 col-span-4 flex-wrap text-base font-bold">
        <CardHeader>
          <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">At a Glance</CardTitle>
        </CardHeader>
        <CardContent className="pl-2 sm:flex-col">
          <div className="flex-between flex flex-row text-base">
            <div className="flex flex-col">
          <p><span className="primary-text-gradient">➔ Division : </span>{result.division}</p>
          <p><span className="primary-text-gradient">➔ Post Office : </span>{result.po}</p>
          <p><span className="primary-text-gradient">➔ Purchase Year : </span>{result.purchase_year}</p>
          <p><span className="primary-text-gradient">➔ SOA (Sq. ft) : </span>{result.soa}</p>
          <p><span className="primary-text-gradient">➔ Class : </span>{result.classes}</p>
          <p><span className="primary-text-gradient">➔ PAQ : </span>{result.paq}</p>
          </div>
          <div className=" flex flex-col">
            <p><span className="primary-text-gradient">➔ Area (Sq. mtr) : </span>{result.area}</p>
          <p><span className="primary-text-gradient">➔ Floors : </span>{result.floors}</p>
          <p><span className="primary-text-gradient">➔ Purchase Value : </span>{result.value}</p>
          <p><span className="primary-text-gradient">➔ Mutation Doc : </span>{result.mut_doc}</p>
          <p><span className="primary-text-gradient">➔ Fund : </span>{result.fund_type}</p>
          <p><span className="primary-text-gradient">➔ Cases : </span>{result.cases}</p>
          </div>
          </div>
          </CardContent>
      </Card> */}
      <Card className="text-dark200_light900 col-span-4 text-base font-bold">
  <CardHeader>
    <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">
      At a Glance
    </CardTitle>
  </CardHeader>

  <CardContent className="pl-2">
    {/* <div className="flex flex-col sm:flex-row gap-4">
      
      <div className="flex flex-col sm:w-1/2">
        <p><span className="primary-text-gradient">➔ Division : </span>{result.division}</p>
        <p><span className="primary-text-gradient">➔ Post Office : </span>{result.po}</p>
        <p><span className="primary-text-gradient">➔ Purchase Year : </span>{result.purchase_year}</p>
        <p><span className="primary-text-gradient">➔ SOA (Sq. ft) : </span>{result.soa}</p>
        <p><span className="primary-text-gradient">➔ Class : </span>{result.classes}</p>
        <p><span className="primary-text-gradient">➔ PAQ : </span>{result.paq}</p>
        <p><span className="primary-text-gradient">➔ Area (Sq. mtr) : </span>{result.area}</p>
      </div>

    
      <div className="flex flex-col sm:w-1/2">
        <p><span className="primary-text-gradient">➔ Floors : </span>{result.floors}</p>
        <p><span className="primary-text-gradient">➔ Purchase Value : </span>{result.value}</p>
        <p><span className="primary-text-gradient">➔ Mutation Doc : </span>{result.mut_doc}</p>
        <p><span className="primary-text-gradient">➔ Fund : </span>{result.fund_type}</p>
        <p><span className="primary-text-gradient">➔ Cases : </span>{result.cases}</p>
        <p><span className="primary-text-gradient">➔ Last RO Corr : </span>{result.corr_ro}</p>
        <p><span className="primary-text-gradient">➔ Last Division Corr : </span>{result.corr_division}</p>
      </div>
    </div> */}

<div className="flex flex-col gap-4 sm:flex-row">
      {/* Left Column */}
      <div className="flex flex-col gap-2 sm:w-1/2">
        <InfoRow label="➔ Division :" value={result.division} />
        <InfoRow label="➔ Post Office :" value={result.po} />
        <InfoRow label="➔ Purchase Year :" value={result.purchase_year} />
        <InfoRow label="➔ SOA (Sq. ft) :" value={result.soa} />
        <InfoRow label="➔ Class :" value={result.classes} />
        <InfoRow label="➔ PAQ :" value={result.paq} />
        <InfoRow label="➔ Area (Sq. mtr) :" value={result.area} />
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-2 sm:w-1/2">
        <InfoRow label="➔ Floors :" value={result.floors} />
        <InfoRow label="➔ Purchase Value :" value={result.value} />
        <InfoRow label="➔ Mutation Doc :" value={result.mut_doc} />
        <InfoRow label="➔ Fund :" value={result.fund_type} />
        <InfoRow label="➔ Cases :" value={result.cases} />
        <InfoRow label="➔ Last RO Corr :" value={result.corr_ro} />
        <InfoRow label="➔ Last Division Corr :" value={result.corr_division} />
      </div>
    </div>

  </CardContent>
</Card>

            <Card className="text-dark200_light900 col-span-4 text-base font-bold">
        <CardHeader>
          <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Mutation Details</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="flex flex-col">
            <InfoRow label="➔ Mutation :" value={result.mut_state} />
            <InfoRow label="➔ Mutation Doc :" value={result.mut_doc} />
          </div>
          </CardContent>
          </Card>
            <Card className="text-dark200_light900 col-span-4 text-base font-bold">
        <CardHeader>
          <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Funds Details</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="flex flex-col">
          <InfoRow label="➔ Last Exp (Rs.) :" value={result.expenditure} />
          <InfoRow label="➔ Year of Last Exp :" value={result.year} />
          <InfoRow label="➔ Fund Type :" value={result.fund_type} />
          <InfoRow label="➔ Fund Allot (Rs.) :" value={result.fund_amount} />

          </div>
          </CardContent>
          </Card>
            <Card className="text-dark200_light900 col-span-4 text-base font-bold">
        <CardHeader>
          <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Cases Details</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="flex flex-col">
          <InfoRow label="➔ Case Type :" value={result.cases} />
          <InfoRow label="➔ Case Description :" value={result.case_description} />
          <InfoRow label="➔ Action Proposed :" value={result.case_action} />
          <InfoRow label="➔ Current Progress :" value={result.case_divisionaction} />

          </div>
          </CardContent>
          </Card>
          <Card className="text-dark200_light900 col-span-4 text-base font-bold">
        <CardHeader>
          <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">Brief History</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
<div className="flex flex-col gap-2">
  <span className="primary-text-gradient">➔ Brief History :</span>
  <p className="text-dark400_light700 whitespace-pre-line">{result.brief_history || '—'}</p>
</div>

          </CardContent>
          </Card>
      </div>
      </>
    )
  }
  
  export default Page