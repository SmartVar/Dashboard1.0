
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../ui/card"
  
  // import { Overview } from "./overview"
  // import { RecentSales } from "./recent-sales"
  import { auth } from '@clerk/nextjs'
  import { getUserInfo } from '@/lib/actions/user.action'
  import React from 'react'
  import { formatAndDivideNumber } from "@/lib/utils"
  import Link from "next/link"
// import {Piechartdata} from "./Piechartdata"
// import BarChartsActive from "../charts/BarChartsActive"
import BarChartsMultiple from "../charts/BarChartsMultiple"
import PieChartsActive from "../charts/PieChartsActive"
import BarChartsCases from "../charts/BarChartsCases"
import DonutCharts from "../charts/DonutCharts"
// import EventCalendarContainer from "../events/EventCalendarContainer"
  
  const Overviewdash = async () => {
      const { userId } = auth();
    const userInfo = await getUserInfo({ userId});
    return (
      <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-dark200_light900 text-sm font-medium">
            Buildings
          </CardTitle>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="text-muted-foreground h-4 w-4"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg> */}
        </CardHeader>
        <CardContent>
        <Link href="/dopbldg" className="flex justify-start max-sm:w-full">
          <div className="text-dark200_light900 text-xl font-bold">Dop - {formatAndDivideNumber(userInfo.totalDopBldg)} </div>
          </Link>
          <Link href="/rentbldg" className="flex justify-start max-sm:w-full">
          <div className="text-dark200_light900 text-xl font-bold">Rented - {formatAndDivideNumber(userInfo.totalRentBldg)} </div>
           </Link>
          {/* <p className="text-muted-foreground text-xs">
            +20.1% from last month
          </p> */}
        </CardContent>
      </Card>
  
  
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-dark200_light900 text-sm font-medium">
            Plots
          </CardTitle>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg> */}
        </CardHeader>
        <CardContent>
        <Link href="/plot" className="flex justify-start max-sm:w-full">
          <div className="text-dark200_light900 text-xl font-bold">Vacant - {formatAndDivideNumber(userInfo.totalVacantPlots)} </div>
          </Link>
          <Link href="/plot" className="flex justify-start max-sm:w-full">
          <div className="text-dark200_light900 text-xl font-bold">Reserved - {formatAndDivideNumber(userInfo.totalReservedPlots)} </div>
           </Link>
        </CardContent>
      </Card>
  
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-dark200_light900 text-sm font-medium">Staff Quarters</CardTitle>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg> */}
        </CardHeader>
        <CardContent>
        <Link href="/plot" className="flex justify-start max-sm:w-full">
          <div className="text-dark200_light900 text-xl font-bold">SQ - {formatAndDivideNumber(userInfo.totalSQ)} </div>
          </Link>
          <Link href="/plot" className="flex justify-start max-sm:w-full">
          <div className="text-dark200_light900 text-xl font-bold">IQ - {formatAndDivideNumber(userInfo.totalIQ)} </div>
           </Link>
        </CardContent>
      </Card>
  
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-dark200_light900 text-sm font-medium">
            Pendency
          </CardTitle>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg> */}
        </CardHeader>
        <CardContent>
        <Link href="/task" className="flex justify-start max-sm:w-full">
          {/* <div className="text-dark200_light900 text-xl font-bold">Corr - {formatAndDivideNumber(userInfo.totalPendingCorr)} </div> */}
          </Link>
          <Link href="/task" className="flex justify-start max-sm:w-full">
          <div className="text-dark200_light900 text-xl font-bold">Reports- {formatAndDivideNumber(userInfo.totalUsCorr)} </div>
           </Link>
        </CardContent>
      </Card>
      </div>
  
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="text-dark200_light900 col-span-4 text-xl font-bold">
        <CardHeader>
          <CardTitle>Bldgs Info</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <BarChartsMultiple />
        {/* <BarChartsActive /> */}
          {/* <Piechartdata /> */}
        </CardContent>
      </Card>
      {/* <Card className="text-dark200_light900 col-span-4 text-xl font-bold">
        <CardHeader>
          <CardTitle>Pending Corr</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card> */}
      <Card className="text-dark200_light900 col-span-3">
        <CardHeader>
          <CardTitle>Funds</CardTitle>
          <CardDescription>
                      </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <RecentSales /> */}
          <PieChartsActive />
        </CardContent>
      </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="text-dark200_light900 col-span-4 text-xl font-bold">
        <CardHeader>
          <CardTitle>Cases Info</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <BarChartsCases />
        {/* <BarChartsActive /> */}
          {/* <Piechartdata /> */}
        </CardContent>
      </Card>
      <Card className="text-dark200_light900 col-span-3">
        <CardHeader>
          <CardTitle>Non Plan Funds</CardTitle>
          <CardDescription>
            Non Plan Allotment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DonutCharts />
        </CardContent>
      </Card>
      {/* <Card className="text-dark200_light900 col-span-3">
        <CardHeader>
          <CardTitle>Event Managment</CardTitle>
          <CardDescription>
            Manage Your Reminders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EventCalendarContainer searchParams={searchParams}/>
        </CardContent>
      </Card> */}
      </div>
      </>
    )
  }
  
  export default Overviewdash