// @ts-ignore
import React from 'react'
import { URLProps } from '@/types'
// import { SignedIn, auth } from '@clerk/nextjs'
// import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
// import NoResult from "@/components/shared/NoResult";
// import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
// import {  NoFilters, TemplatePageFilters, NotingPageFilters, DraftingPageFilters, BriefHistoryPageFilters } from "@/constants/filters";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";

// import { useRouter, useSearchParams } from "next/navigation";
// import { DataTable }  from '@/components/shared/tables/template/data-table';
// import {  columns } from './columns'
// import { getDopBldgs } from '@/lib/actions/departmentalbldg.action';
import { getAllEvents } from '@/lib/actions/event.action';
import { EventFilters } from '@/constants/filters';
// import EventList from '@/components/events/EventList';
// import { Pagination } from '@tanstack/react-table';


const Page = async ({ searchParams}: URLProps) => {
  // const { userId: clerkId } = auth();
  // const searchParams = useSearchParams();
  // console.log(searchParams.filter)
//   const typefilter = (searchParams.filter);
  // const userInfo = await getUserInfo({ userId: params.id})
  // @ts-ignore
  // const typeFilter =  {searchParams};
  // console.log (typeFilter);
  

const event = await getAllEvents({
  searchQuery: searchParams.q,
  filter: searchParams.filter,
//   pagefilter : searchParams.pagefilter,
  page: searchParams.page ? +searchParams.page : 1,
});

// console.log(division)

// const dopdata = {... dobbldg}
  return (
    <>
    <div className="flex w-full flex-col-reverse 
    justify-between gap-4 overflow-auto rounded-lg sm:flex-row sm:items-center">
      
      <h1 className="h1-bold text-dark100_light900">
          All Events</h1> 
          <Link href="/dashboard" 
                    className="flex justify-end max-sm:w-full">
                    <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                      Dashboard
                    </Button>
                  </Link> 
      </div> 

      <div className="mt-11 flex justify-between gap-5 
      max-sm:flex-col sm:items-center">
      <LocalSearchbar 
        route="/"
        iconPosition="left"
        imgSrc="/assets/icons/search.svg"
        placeholder="Search for Divisions or Post office"
        otherClasses="flex-1"
      />

      <Filter
        filters={EventFilters}
        otherClasses="min-h-[56px] sm:min-w-[170px]"
        // containerClasses="hidden max-md:flex"
      />
    </div>
    {/* <HomeFilters 
    filters={typefilter ==='noting' ? NotingPageFilters : typefilter === 'drafting' ? DraftingPageFilters : typefilter === 'briefhistory' ? BriefHistoryPageFilters : NoFilters}
    />  */}
      

    
    {/* <DataTable columns={columns} data={data} /> */}
   <div>
   {event.event.map((event)=>(
    <>
     <Link href={`/event/${event._id}`}>
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="odd:border-t-lamaSky even:border-t-lamaPurple mt-2 gap-4 rounded-md border-2 border-t-4 border-gray-100 p-5"
     >
    <div className="text-dark400_light700 flex items-center justify-between">

       <h1 className="font-semibold text-primary-500">{event.title}</h1>
       <span className="text-xs text-gray-300">
         {new Date(event.event_date).toLocaleDateString("en-GB",
           {
             day: "2-digit",
             month: "2-digit",
             timeZone: "Asia/Kolkata",
           })}
           {event.status==='Completed' ? '✅' : '⏳'}
       </span>

     </div><p className="mt-2 text-sm text-gray-400">{event.description}</p><div className="text-dark400_light700 flex items-center justify-between">
         <p style={{ color: '#da0ce5' }} className="mt-2 text-sm">{event.division}</p>
         <p className="mt-2 text-sm text-gray-400">{event.section}</p>
       </div>
       </div>
       </Link>
       </>
   ))}
    

      </div>
      {/* <div className="mt-10">
        <Pagination 
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={data.isNext}
        />
      </div> */}
    </>
  )

}

export default Page
