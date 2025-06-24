// 'use client';

// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import { Button } from '../ui/button';
// import LocalSearchbar from '../shared/search/LocalSearchbar';

// interface ReportStatusGridProps {
//   reports: string[];      // dynamic report titles
//   divisions: string[];    // dynamic division names
// }

// const Report: React.FC<ReportStatusGridProps> = ({ reports, divisions }) => {
//   // Initialize status matrix: reports.length x divisions.length, all false
//   const [statuses, setStatuses] = useState<boolean[][]>(() =>
//     Array.from({ length: reports?.length }, () => Array(divisions.length).fill(false))
//   );

//   // Reset statuses if reports or divisions change (optional)
//   useEffect(() => {
//     setStatuses(Array.from({ length: reports?.length }, () => Array(divisions.length).fill(false)));
//   }, [reports, divisions]);

//   const toggleCheckbox = (reportIndex: number, divisionIndex: number) => {
//     setStatuses((prev) => {
//       const newStatuses = [...prev];
//       newStatuses[reportIndex] = [...newStatuses[reportIndex]];
//       newStatuses[reportIndex][divisionIndex] = !newStatuses[reportIndex][divisionIndex];
//       return newStatuses;
//     });
//   };

//   return (
//     <div className="overflow-x-auto p-4">
//       <div>
//                    <Link href="/add-report" 
//                     className="flex justify-end max-sm:w-full">
//                     <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
//                       New Event
//                     </Button>
//                   </Link> 
//                 </div> 
//                   <div className="mt-11 flex justify-between gap-5 
//                       max-sm:flex-col sm:items-center">
//                       <LocalSearchbar 
//                         route="/"
//                         iconPosition="left"
//                         imgSrc="/assets/icons/search.svg"
//                         placeholder="Search for Report title or Status"
//                         otherClasses="flex-1"
//                       />
                               
//                     </div>
//       <table className="w-full min-w-[600px] border-collapse border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border border-gray-300 px-4 py-2 text-left">Report Title \ Division</th>
//             {divisions.map((division) => (
//               <th key={division} className="border border-gray-300 px-4 py-2 text-center">
//                 {division}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {reports?.map((report, reportIdx) => (
//             <tr key={report}>
//               <td className="border border-gray-300 px-4 py-2 font-semibold">{report}</td>
//               {divisions.map((_, divisionIdx) => (
//                 <td key={divisionIdx} className="border border-gray-300 px-4 py-2 text-center">
//                   <label className="cursor-pointer inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={statuses[reportIdx][divisionIdx]}
//                       onChange={() => toggleCheckbox(reportIdx, divisionIdx)}
//                       className="mr-2"
//                     />
//                     {statuses[reportIdx][divisionIdx] ? '✅' : '❌'}
//                   </label>
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Report;



// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Button } from '../ui/button';
// import LocalSearchbar from '../shared/search/LocalSearchbar';

// interface ReportStatusGridProps {
//   reports: string[];
//   divisions: string[];
// }

// interface StatusMap {
//   [report: string]: {
//     [division: string]: boolean;
//   };
// }

// const Report: React.FC<ReportStatusGridProps> = ({ reports, divisions }) => {
//   const [statuses, setStatuses] = useState<StatusMap>({});

//   // Fetch initial data from the database
//   useEffect(() => {
//     const fetchStatuses = async () => {
//       try {
//         const response = await fetch('/lib/action/report-status');
//         const data: StatusMap = await response.json();
//         setStatuses(data);
//       } catch (error) {
//         console.error('Failed to fetch report statuses:', error);
//       }
//     };

//     fetchStatuses();
//   }, []);

//   const toggleCheckbox = async (report: string, division: string) => {
//     const currentStatus = statuses[report]?.[division] ?? false;
//     const newStatus = !currentStatus;

//     // Update frontend state
//     setStatuses((prev) => ({
//       ...prev,
//       [report]: {
//         ...prev[report],
//         [division]: newStatus,
//       },
//     }));

//     // Send update to the server
//     try {
//       await fetch('/lib/actions/report-status.ts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ report, division, status: newStatus }),
//       });
//     } catch (error) {
//       console.error('Failed to update status:', error);
//     }
//   };

//   return (
//     <div className="overflow-x-auto p-4">
//       <div className="flex justify-end">
//         <Link href="/add-report">
//           <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
//             New Report
//           </Button>
//         </Link>
//       </div>

//       <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
//         <LocalSearchbar
//           route="/"
//           iconPosition="left"
//           imgSrc="/assets/icons/search.svg"
//           placeholder="Search for Report title or Status"
//           otherClasses="flex-1"
//         />
//       </div>

//       <table className="w-full min-w-[600px] border-collapse border border-gray-300 mt-6">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border border-gray-300 px-4 py-2 text-left">Report Title \ Division</th>
//             {divisions.map((division) => (
//               <th key={division} className="border border-gray-300 px-4 py-2 text-center">
//                 {division}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map((report) => (
//             <tr key={report}>
//               <td className="border border-gray-300 px-4 py-2 font-semibold">{report}</td>
//               {divisions.map((division) => {
//                 const isChecked = statuses[report]?.[division] ?? false;
//                 return (
//                   <td key={division} className="border border-gray-300 px-4 py-2 text-center">
//                     <label className="cursor-pointer inline-flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={isChecked}
//                         onChange={() => toggleCheckbox(report, division)}
//                         className="mr-2"
//                       />
//                       {isChecked ? '✅' : '❌'}
//                     </label>
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Report;

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

'use client';

import React, { useEffect, useState } from 'react';
import { getAllReports, updateReportStatus } from '@/lib/actions/report.action';

// 1️⃣ Define all report fields as a union type
type Field =
  | 'nmd'
  | 'thn'
  | 'nsk'
  | 'rgd'
  | 'mld'
  | 'pld'
  | 'psd'
  | 'csd'
  | 'rtc'
  | 'status';

// 2️⃣ Define report item type to avoid name conflict with component
type ReportItem = {
  _id: string;
  title: string;
} & Record<Field, string>;

const Report = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fields: Field[] = ['nmd', 'thn', 'nsk', 'rgd', 'mld', 'pld', 'psd', 'csd', 'rtc', 'status'];

  useEffect(() => {
    const fetchReports = async () => {
      const { report } = await getAllReports({});
      setReports(report || []);
      setLoading(false);
    };

    fetchReports();
  }, []);

  const handleCheckboxChange = async (reportId: string, field: Field, isChecked: boolean) => {
    const newStatus = isChecked ? 'Completed' : 'Pending';

    // Optimistically update the UI
    setReports(prev =>
      prev.map(report =>
        report._id === reportId ? { ...report, [field]: newStatus } : report
      )
    );

    try {
      await updateReportStatus(reportId, field, newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
      // Optionally revert the change here if needed
    }
  };

  if (loading) return <p className="text-gray-400">Loading reports...</p>;
  if (reports.length === 0) return <p className="text-gray-400">No reports found.</p>;

  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
            {fields.map(field => (
              <th key={field} className="px-4 py-2 text-sm text-gray-700 capitalize text-center">
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {reports.map(report => (
            <tr key={report._id}>
              <td className="px-4 py-2 font-medium text-primary-600">{report.title}</td>
              {fields.map(field => {
                const isCompleted = report[field] === 'Completed';
                return (
                  <td key={field} className="px-4 py-2 text-center">
                    <label className="flex items-center justify-center gap-2">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={e =>
                          handleCheckboxChange(report._id, field, e.target.checked)
                        }
                      />
                      <span>{isCompleted ? '✅' : '❌'}</span>
                    </label>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
