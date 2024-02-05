import { Button } from '@/components/ui/button'
import { getUserInfo } from '@/lib/actions/user.action'
import { URLProps } from '@/types'
import { SignedIn, auth } from '@clerk/nextjs'
// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getJoinedDate } from '@/lib/utils'
import DashboardLink from '@/components/shared/DashboardLink'
import Stats from '@/components/shared/Stats'


const Page = async ({ params, searchParams}: URLProps) => {
  const { userId } = auth();
  const userInfo = await getUserInfo({ userId});
// console.log(userInfo);
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          {/* <Image 
            src={userInfo?.user.picture }
            // src="/assets/icons/avtar.svg"
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          /> */}

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{userInfo.user.username}</h2>
            {/* <p className="paragraph-regular text-dark200_light800">@{userInfo.user.role}</p> */}
            <p className="paragraph-regular text-dark200_light800">@{userInfo.user.section}</p>
            {/* <p className="paragraph-regular text-dark200_light800">@{userInfo.user.location}</p> */}
            {/* <p className="paragraph-regular text-dark200_light800">@{userInfo.user.section}</p> */}

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
             

              {userInfo.user.location && (
                <DashboardLink 
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )}

                <DashboardLink 
                  imgUrl="/assets/icons/calendar.svg"
                  title={getJoinedDate(userInfo.user.joinedAt)}
                />
            </div>

            
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {userId === userInfo.user.clerkId && (
              <Link href="/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Dashboard
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      
      <Stats
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
      />

      
    </>
  )
}

export default Page