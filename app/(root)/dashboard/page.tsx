// import { Button } from '@/components/ui/button'
// import { getUserInfo } from '@/lib/actions/user.action'
import { URLProps } from '@/types'
// import { SignedIn, auth } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
// import Image from 'next/image'
// import Link from 'next/link'
import React from 'react'
// import { getJoinedDate } from '@/lib/utils'
// import DashboardLink from '@/components/shared/DashboardLink'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs"
import Overviewdash from "../../../components/dashboard/Overviewdash"
import EventCalendarContainer from '@/components/events/EventCalendarContainer'
import Report from '@/components/reports/Report'
import Fund from '@/components/fund/fund'
// import { getAllReports } from '@/lib/actions/report.action'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import BarChartsActive from "../../../components/charts/BarChartsActive"
// import Stats from '@/components/shared/Stats'

  // const reports = [
  //   'Monthly Report',
  //   'Quarterly Summary',
  //   'Annual Review',
  //   'Special Audit',
  // ];
 

const Page = async ({ searchParams}: URLProps) => {
  // const { userId } = auth();
  // const userInfo = await getUserInfo({ userId});
// console.log(userInfo);


  // console.log(reports.report)

  // const divisions = ['NMD', 'THN', 'NSK', 'RGD', 'MLD', 'PLD', 'PSD', 'CSD', 'RTC', 'C_SION', 'C_PUNE', 'E_SION'];

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          {/* <Image 
            // src={userInfo?.user.picture}
            src="/assets/icons/avtar.svg"
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          /> */}

          <div className="mt-3">
            {/* <h2 className="h2-bold text-dark100_light900">{userInfo.user.name}</h2> */}
            <h2 className="h2-bold text-dark100_light900">Dealing Assistant</h2>
            {/* <p className="paragraph-regular text-dark200_light800">@{userInfo.user.section}</p> */}
            <p className="paragraph-regular text-dark200_light800">Bldg</p>
            <p className="paragraph-regular text-dark200_light800">Reputation-50%</p>
            <p className="paragraph-regular text-dark200_light800">
              {/* {userInfo.user.reputation <= '50' ?               
                <DashboardLink 
                  imgUrl="/assets/icons/bronze-medal.svg"
                  title="Bronze Badge"
                />
                
                : userInfo.user.reputation === '75' ?
                  <DashboardLink 
                  imgUrl="/assets/icons/silver-medal.svg"
                  title="Silver Badge"
                />
                  : userInfo.user.reputation === '100' ?
                  <DashboardLink 
                  imgUrl="/assets/icons/gold-medal.svg"
                  title="Gold Badge"
                />
                :'no selection'
                } */}
                
                </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {/* {userInfo.user.portfolioWebsite && (
                <DashboardLink 
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {userInfo.user.location && (
                <DashboardLink 
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )} */}

                {/* <DashboardLink 
                  imgUrl="/assets/icons/calendar.svg"
                  title={getJoinedDate(userInfo.user.joinedAt)}
                /> */}
            </div>

            {/* {userInfo.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo.user.bio}
              </p>
            )} */}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {/* {userId === userInfo.user.clerkId && (
              <Link href="/dashboard/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Dashboard
                </Button>
              </Link>
            )} */}
          </SignedIn>
        </div>
      </div>
      
      {/* <Stats
        reputation={userInfo.reputation}
        totalDopBldg={userInfo.totalDopBldg}
        totalRentBldg={userInfo.totalRentBldg}
        totalSQ={userInfo.totalSQ}
        totalIQ={userInfo.totalIQ}
        totalVacantPlots={userInfo.totalVacantPlots}
        totalReservedPlots={userInfo.totalReservedPlots}
        totalPendingCorr={userInfo.totalPendingCorr}
        totalUsCorr={userInfo.totalUsCorr}
        badges={userInfo.badgeCounts}
      /> */}

<Tabs defaultValue="overview" className="flex-1 flex-wrap">
<div className="flex-row-reverse">
            <TabsList className="background-light800_dark400 min-h-[42px] p-1  ">
              <TabsTrigger value="overview" className="tab">
                Stats
                </TabsTrigger>
              <TabsTrigger value="funds" className="tab">
                Funds
              </TabsTrigger>
              <TabsTrigger value="reports" className="tab">
                Reports
              </TabsTrigger>
              <TabsTrigger value="reminders" className="tab">
                Reminders
              </TabsTrigger>
              {/* <TabsTrigger value="nashik" className="tab">
                Mails
              </TabsTrigger>
              <TabsTrigger value="malegaon" className="tab">
                Tech
              </TabsTrigger> */}
              {/* <TabsTrigger value="raigad" className="tab">
                SB/IPPB
              </TabsTrigger>
              <TabsTrigger value="palghar" className="tab">
                PG
              </TabsTrigger> */}
            </TabsList>
            </div>

            <TabsContent value="overview" className="mt-5 flex w-full flex-col gap-6">
              <Overviewdash />
              {/* <BarChartsActive /> */}
              </TabsContent>
            <TabsContent value="funds" className="mt-5 flex w-full flex-col gap-6">
            {/* <Stats
        reputation={userInfo.reputation}
        totalDopBldg={userInfo.totalDopBldg}
        totalRentBldg={userInfo.totalRentBldg}
        totalSQ={userInfo.totalSQ}
        totalIQ={userInfo.totalIQ}
        totalVacantPlots={userInfo.totalVacantPlots}
        totalReservedPlots={userInfo.totalReservedPlots}
        totalPendingCorr={userInfo.totalPendingCorr}
        totalUsCorr={userInfo.totalUsCorr}
        badges={userInfo.badgeCounts}
      /> */}
      {/* <Overviewdash /> */}
      <Fund searchParams={searchParams} params={{
            id: ''
          }} />
              </TabsContent>
            <TabsContent value="reports" className="text-dark200_light900 space-y-4 text-sm font-medium">
              <Report />

              </TabsContent>
            <TabsContent value="reminders" className="text-dark200_light900 space-y-4 text-sm font-medium">
              <EventCalendarContainer searchParams={searchParams}/>

              </TabsContent>
            {/* <TabsContent value="nashik" className="text-dark200_light900 space-y-4 text-sm font-medium">
              <Overviewdash />
              </TabsContent>
            <TabsContent value="malegaon" className="text-dark200_light900 space-y-4 text-sm font-medium">
              <Overviewdash />
              </TabsContent>
            <TabsContent value="raigad" className="text-dark200_light900 space-y-4 text-sm font-medium">
              <Overviewdash />
              </TabsContent>
            <TabsContent value="palghar" className="text-dark200_light900 space-y-4 text-sm font-medium">
              <Overviewdash />
              </TabsContent> */}
          </Tabs>
    </>
  )
}

export default Page
