/* eslint-disable no-template-curly-in-string */

import {
    Card,
    CardContent,
    // CardDescription,
    // CardHeader,
    // CardTitle,
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
import { getEventById } from "@/lib/actions/event.action"
import Link from "next/link";
import { Button } from "@/components/ui/button";


  const Page = async ({ params }: ParamsProps) => {
    // const { userId } = auth();
  // const userId = 'user_2bCX55zAAaS74JAT0pGe59OjuhVCL123';
  // const { userId } = auth();
  
    // if (userId !== 'user_2bYFxpFNNNEJclp29nFXHzrnJCh') return <h1 className="h1-bold text-dark100_light900">"You are not authorized to view the content"</h1>;
    // if(!userId) return null;
  
    // const mongoUser = await getUserById({ userId })
    const result = await getEventById({ eventId: params.id})
      
    //console.log(result)

    return (
      <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 overflow-auto rounded-lg sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
                {result.title}</h1> 
                <Link href={`/event/edit/${result._id}`}
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
  {/* <CardHeader>
    <CardTitle className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none">
      At a Glance
    </CardTitle>
  </CardHeader> */}

  <CardContent className="pl-2">
    <div className="flex flex-col gap-4">
      {/* Left Column */}
        <p><span className="primary-text-gradient">➔ Division : </span>{result.division}</p>
        <p><span className="primary-text-gradient">➔ Event Title : </span>{result.title}</p>
        <p><span className="primary-text-gradient">➔ Event Description : </span>{result.description}</p>
        <p><span className="primary-text-gradient">➔ Section : </span>{result.section}</p>
        <p><span className="primary-text-gradient">➔ Event Date : </span>{result.event_date}</p>
        <p><span className="primary-text-gradient">➔ RO Corr : </span>{result.ro_corr}</p>
        <p><span className="primary-text-gradient">➔ Dn Corr : </span>{result.division_corr}</p>
        <p><span className="primary-text-gradient">➔ Status : </span>{result.status}</p>
        <p><span className="primary-text-gradient">➔ Total Reminder Issued : </span>{result.tot_reminder}</p>
        {/* <p><span className="primary-text-gradient">➔ Area (Sq. mtr) : </span>{result.area}</p> */}
           
    </div>
  </CardContent>
</Card>
      </div>
      </>
    )
  }
  
  export default Page