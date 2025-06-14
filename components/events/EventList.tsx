// import React from 'react';
// import { getAllEvents } from '@/lib/actions/event.action';

// const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
//   const date = dateParam ? new Date(dateParam) : new Date();
//   const startOfDay = new Date(date.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(date.setHours(23, 59, 59, 999));

//   const events = await getAllEvents({
//     event_date: {
//       $gte: startOfDay,
//       $lte: endOfDay,
//     },
//   });

//   if (!events) {
//     return <p className="text-gray-400">No events found for this date.</p>;
//   }

//   return events.event.map((event: any) => (
//     <div
//       // eslint-disable-next-line tailwindcss/no-custom-classname
//       className="odd:border-t-lamaSky even:border-t-lamaPurple rounded-md border-2 border-t-4 border-gray-100 p-5"
//       key={event._id?.toString()}
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="font-semibold text-gray-600">{event.title}</h1>
//         <span className="text-xs text-gray-300">
//           {new Date(event.event_date).toLocaleTimeString("en-UK", {
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: false,
//           })}
//         </span>
//       </div>
//       <p className="mt-2 text-sm text-gray-400">{event.description}</p>
//     </div>
//   ));
// };

// export default EventList;

// import Filter from "@/components/shared                                                                                                                                                                                                                                                                                                                                                                                                        -/Filter";
import { URLProps } from '@/types'
import { format } from 'date-fns';
import React from 'react';
import { getAllEvents } from '@/lib/actions/event.action';
import Link from 'next/link';

// const EventList = async ({ dateParam, searchParams} : URLProps ) => {
const EventList = async ({ searchParams} : URLProps ) => {
  // const inputDate = dateParam ? new Date(dateParam) : new Date();
  const inputDate = searchParams.dateParam ? new Date(searchParams.dateParam) : new Date();

// const DateFormat = 

  // const startOfDay = new Date(inputDate);
  // startOfDay.setHours(0, 0, 0, 0);

  // const endOfDay = new Date(inputDate);
  // endOfDay.setHours(23, 59, 59, 999);

  // const events = await getAllEvents({
  //   // event_date: {
  //   //   $gte: startOfDay,
  //   //   $lte: endOfDay,
  //   // },
  // });
  
  const { event} = await getAllEvents({
    searchQuery: searchParams.q,
  filter: searchParams.filter,
//   pagefilter : searchParams.pagefilter,
  page: searchParams.page ? +searchParams.page : 1,
  })

const events = event.filter(e => {
  const eventDateFormatted = format(new Date(e.event_date), 'yyyy-MM-dd')
  const inputDateFormatted = format(inputDate, 'yyyy-MM-dd')
  return eventDateFormatted === inputDateFormatted
})

  if (!events) {
    return <p className="text-gray-400">No events found for this date.</p>;
  }


  //  if inputDate === validate_date ? inputDate : "Not correct date";

console.log(events)
console.log(inputDate)



  return events.map((event: any) => (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="odd:border-t-lamaSky even:border-t-lamaPurple rounded-md border-2 border-t-4 border-gray-100 p-5"
      key={event._id?.toString()}
    >
      <Link href={`/event/${event._id}`}>
      <div className="text-dark400_light700 flex items-center justify-between">
        
        <h1 className="font-semibold text-primary-500">{event.title}</h1>
        <span className="text-xs text-gray-300">
          {new Date(event.event_date).toLocaleTimeString("en-GB", 
            {
            day: "2-digit",
            month: "2-digit",
            timeZone: "Asia/Kolkata",
          })}
          {event.status==='completed' ? '✅' : '⏳'}
        </span>
        
      </div>
      <p className="mt-2 text-sm text-gray-400">{event.description}</p>
      <div className="text-dark400_light700 flex items-center justify-between">
      <p style={{ color: '#da0ce5' }} className="mt-2 text-sm">{event.division}</p>
      <p className="mt-2 text-sm text-gray-400">{event.section}</p>
      </div>
      </Link>
    </div>
  ));
};

export default EventList;
