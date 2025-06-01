
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


  const Page = async ({ params }: ParamsProps) => {
    // const { userId } = auth();
  // const userId = 'user_2bCX55zAAaS74JAT0pGe59OjuhVCL123';
  // const { userId } = auth();
  
    // if (userId !== 'user_2bYFxpFNNNEJclp29nFXHzrnJCh') return <h1 className="h1-bold text-dark100_light900">"You are not authorized to view the content"</h1>;
    // if(!userId) return null;
  
    // const mongoUser = await getUserById({ userId })
    const result = await getDopBldgById({ departmentalbldgId: params.id})
      
    // const userInfo = await getUserInfo({ userId});
    return (
      <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="text-dark200_light900 col-span-4 text-xl font-bold">
        <CardHeader>
          <CardTitle>Bldgs Info</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="flex flex-row flex-between">
            <div className="flex flex-col">
          <p>Division - {result.division}</p>
          <p>Post Office - {result.po}</p>
          <p>Purchase Year - {result.purchase_year}</p>
          <p>SOA (Sq. ft) - {result.soa}</p>
          <p>Class - {result.classes}</p>
          <p>PAQ - {result.paq}</p>
          </div>
          <div className=" flex flex-col">
            <p>Area (Sq. mtr) - {result.area}</p>
          <p>Floors - {result.floors}</p>
          <p>Purchase Value - {result.value}</p>
          <p>Mutation Doc- {result.mut_doc}</p>
          <p>Fund - {result.fund_type}</p>
          <p>Cases - {result.cases}</p>
          </div>
          </div>
          </CardContent>
      </Card>
            <Card className="text-dark200_light900 col-span-4 text-xl font-bold">
        <CardHeader>
          <CardTitle>Mutation Details</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="flex flex-col">
          <p>Mutation - {result.mut_state}</p>
          <p>Mutation Doc - {result.mut_doc}</p>
          </div>
          </CardContent>
          </Card>
            <Card className="text-dark200_light900 col-span-4 text-xl font-bold">
        <CardHeader>
          <CardTitle>Funds Details</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="flex flex-col">
          <p>Last Expenditure (in Rs.)- {result.expenditure}</p>
          <p>Year of Last Expenditure - {result.year}</p>
          <p>Fund Type- {result.fund_type}</p>
          <p>Fund Allotted (in Rs.) - {result.fund_amount}</p>
          </div>
          </CardContent>
          </Card>
            <Card className="text-dark200_light900 col-span-4 text-xl font-bold">
        <CardHeader>
          <CardTitle>Cases Details</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="flex flex-col">
          <p>Case Type - {result.cases}</p>
          <p>Case Description - {result.case_description}</p>
          </div>
          </CardContent>
          </Card>
          <Card>
        <CardHeader>
          <CardTitle>Brief History</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="flex flex-col">
          <p>{result.brief_history}</p>
          </div>
          </CardContent>
          </Card>
      </div>
      </>
    )
  }
  
  export default Page