// @ts-ignore
import React from 'react'
import { URLProps } from '@/types'
// import { SignedIn, auth } from '@clerk/nextjs'
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
// import NoResult from "@/components/shared/NoResult";
// import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { NoFilters, RulingPageFilters, RulesPageFilters, SopPageFilters, ManualPageFilters } from "@/constants/filters";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";

// import { useRouter, useSearchParams } from "next/navigation";
import { DataTable }  from '@/components/shared/tables/template/data-table';
import {  columns } from './columns'
import { getRulings } from '@/lib/actions/ruling.action';


const Page = async ({ params, searchParams}: URLProps) => {
  // const { userId: clerkId } = auth();
  // const searchParams = useSearchParams();
  // console.log(searchParams.filter)
  const typefilter = (searchParams.filter);
  // const userInfo = await getUserInfo({ userId: params.id})
  // @ts-ignore
  // const typeFilter =  {searchParams};
  // console.log (typeFilter);
  

const data = await getRulings({
  searchQuery: searchParams.q,
  filter: searchParams.filter,
  pagefilter : searchParams.pagefilter,
  page: searchParams.page ? +searchParams.page : 1,
});
// console.log(data)

  return (
    <>
    <div className="flex w-full flex-col-reverse 
    justify-between gap-4 overflow-auto rounded-lg sm:flex-row sm:items-center">
      
      <h1 className="h1-bold text-dark100_light900">
          Rulings</h1> 
          <Link href="/add-rulings" 
          className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            New Records
          </Button>
        </Link> 
      </div> 

      <div className="mt-11 flex justify-between gap-5 
      max-sm:flex-col sm:items-center">
      <LocalSearchbar 
        route="/"
        iconPosition="left"
        imgSrc="/assets/icons/search.svg"
        placeholder="Search for rulings"
        otherClasses="flex-1"
      />

      <Filter
        filters={RulingPageFilters}
        otherClasses="min-h-[56px] sm:min-w-[170px]"
        // containerClasses="hidden max-md:flex"
      />
    </div>
    <HomeFilters 
    filters={typefilter ==='ruling' ? RulesPageFilters : typefilter === 'sop' ? SopPageFilters : typefilter === 'manual' ? ManualPageFilters : NoFilters}
    />
      

    <div className="mt-10 flex w-full flex-col gap-6 overflow-auto shadow">
    <DataTable columns={columns} data={data} />
      </div>
      <div className="mt-10">
        Pagination
      </div>
    </>
  )

}

export default Page