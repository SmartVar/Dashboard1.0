import React from 'react'
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";


const NotingsTab = () => {
  return (
    <>
    <div className="mt-11 flex justify-between gap-5 
      max-sm:flex-col sm:items-center">
      <LocalSearchbar 
        route="/"
        iconPosition="left"
        imgSrc="/assets/icons/search.svg"
        placeholder="Search for noting"
        otherClasses="flex-1"
      />

      <Filter
        filters={HomePageFilters}
        otherClasses="min-h-[56px] sm:min-w-[170px]"
        // containerClasses="hidden max-md:flex"
      />
    </div>
   

    <div className="mt-10 flex w-full flex-col gap-6">
        Noting
      </div>
      <div className="mt-10">
        Pagination
      </div>
      </>
  )
}

export default NotingsTab