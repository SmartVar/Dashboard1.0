// import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import Link from "next/link";
import { Button } from "../ui/button";
import { EventFilters } from "@/constants/filters";
// import {moreDark} from "../../public/assets/images"
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
// import { URLProps } from "@/types";

const EventCalendarContainer = async ({
  searchParams
  searchParams
}: {
  searchParams: { [keys: string]: string | undefined };
  
}) => {
  // eslint-disable-next-line no-empty-pattern
 

  return (
    <>
    <div>
             <Link href="/add-event" 
              className="flex justify-end max-sm:w-full">
              <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                New Event
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
                         
              </div>
    <div className="text-dark200_light900 col-span-4 flex flex-col gap-4 overflow-hidden rounded-md p-4 text-base font-bold sm:flex-row">
     <span><EventCalendar /></span> 
      <div className="flex flex-col items-center justify-between gap-4 sm:w-1/2">
        <h1 className="my-4 text-xl font-semibold">Events</h1>
        {/* <Image src="moreDark" alt="" width={20} height={20} /> */}
      </div>
      <div className="flex flex-col gap-4 sm:w-1/2">
      <Filter
                  filters={EventFilters}
                  otherClasses="min-h-[56px] sm:min-w-[170px]"
                  // containerClasses="hidden max-md:flex"
                />
                        {/* <EventList searchParams={searchParams} dateParam={date} params={{
            id: ""
          }} /> */}
                        <EventList searchParams={searchParams} params={{
            id: ""
          }} />
              
      </div>
    </div>
    </>
  );
};

export default EventCalendarContainer;
