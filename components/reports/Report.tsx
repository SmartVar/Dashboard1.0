
// 'use client';
// import Link from 'next/link';
// import { Button } from '../ui/button';
// import LocalSearchbar from '../shared/search/LocalSearchbar';
// import React, { useEffect, useState } from 'react';
// import { getAllReports, updateReportStatus } from '@/lib/actions/report.action';

// // 1️⃣ Define all report fields as a union type
// type Field =
//   | 'nmd'
//   | 'thn'
//   | 'nsk'
//   | 'rgd'
//   | 'mld'
//   | 'pld'
//   | 'psd'
//   | 'csd'
//   | 'rtc'
//   | 'status';

// // 2️⃣ Define report item type to avoid name conflict with component
// type ReportItem = {
//   _id: string;
//   title: string;
// } & Record<Field, string>;

// const Report = () => {
//   const [reports, setReports] = useState<ReportItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fields: Field[] = ['nmd', 'thn', 'nsk', 'rgd', 'mld', 'pld', 'psd', 'csd', 'rtc', 'status'];

//   useEffect(() => {
//     const fetchReports = async () => {
//       const report = (await getAllReports({})).report.filter(r => r.status === 'Pending');
//       setReports(report || []);
//       setLoading(false);
//     };

//     fetchReports();
//   }, []);

//   const handleCheckboxChange = async (reportId: string, field: Field, isChecked: boolean) => {
//     const newStatus = isChecked ? 'Completed' : 'Pending';

//     // Optimistically update the UI
//     setReports(prev =>
//       prev.map(report =>
//         report._id === reportId ? { ...report, [field]: newStatus } : report
//       )
//     );

//     try {
//       await updateReportStatus(reportId, field, newStatus);
//     } catch (error) {
//       console.error('Failed to update status:', error);
//       // Optionally revert the change here if needed
//     }
//   };

//   if (loading) return <p className="text-gray-400">Loading reports...</p>;

//   return (
//     <div className="overflow-x-auto mt-5">
//       <div className="flex justify-between">
//         <Link href="/add-report" className="flex justify-end max-sm:w-full">
//           <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
//             New Report
//           </Button>
//         </Link>
//         <Link href="/report" className="flex justify-end max-sm:w-full">
//           <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
//             All Report
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

//       <table className="min-w-full divide-y divide-gray-300 border border-gray-200 mt-6">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
//             {fields.map(field => (
//               <th key={field} className="px-4 py-2 text-sm text-gray-700 capitalize text-center">
//                 {field}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100 bg-white">
//           {reports.map(report => (
//             <tr key={report._id}>
//               <td className="px-4 py-2 font-medium text-primary-600 text-gray-700">
//                 {report.title}
//               </td>
//               {fields.map(field => {
//                 const isCompleted = report[field] === 'Completed';
//                 return (
//                   <td key={field} className="px-4 py-2 text-center">
//                     <label className="flex items-center justify-center gap-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={isCompleted}
//                         onChange={e =>
//                           handleCheckboxChange(report._id, field, e.target.checked)
//                         }
//                         className="sr-only" // hide checkbox but keep it accessible
//                       />
//                       <span className="text-sm">{isCompleted ? '✅' : '❌'}</span>
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

'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import LocalSearchbar from '../shared/search/LocalSearchbar';
import React, { useEffect, useState } from 'react';
import { getAllReports, updateReportStatus } from '@/lib/actions/report.action';

type Field =
  | 'nmd' | 'thn' | 'nsk' | 'rgd' | 'mld'
  | 'pld' | 'psd' | 'csd' | 'rtc' | 'status';

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
      const report = (await getAllReports({})).report.filter(r => r.status === 'Pending');
      setReports(report || []);
      setLoading(false);
    };
    fetchReports();
  }, []);

  const handleCheckboxChange = async (reportId: string, field: Field, isChecked: boolean) => {
    const newStatus = isChecked ? 'Completed' : 'Pending';
    setReports(prev =>
      prev.map(report =>
        report._id === reportId ? { ...report, [field]: newStatus } : report
      )
    );
    try {
      await updateReportStatus(reportId, field, newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) return <p className="text-gray-400">Loading reports...</p>;

  return (
    <div className="overflow-x-auto mt-5 px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Report Status
      </h1>

      {/* Top Buttons */}
      <div className="flex justify-between flex-wrap gap-4 mb-4">
        <Link href="/add-report" className="max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 w-full sm:w-auto">
            New Report
          </Button>
        </Link>
        <Link href="/report" className="max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 w-full sm:w-auto">
            All Report
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Report title or Status"
          otherClasses="flex-1"
        />
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-lg border border-gray-700 dark:border-gray-600 bg-[#1e1e2f] dark:bg-gray-900 shadow-lg">
        <table className="min-w-max w-full divide-y divide-gray-700 dark:divide-gray-600 text-sm">
          <thead className="bg-[#2a2a3d] dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100 dark:text-gray-200 break-words w-[200px]">
                Title
              </th>
              {fields.map(field => (
                <th
                  key={field}
                  className="px-4 py-3 text-sm font-medium text-gray-300 dark:text-gray-400 text-center capitalize whitespace-nowrap"
                >
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 dark:divide-gray-700">
            {reports.map((report, rowIndex) => (
              <tr
                key={report._id}
                className="hover:bg-[#2e2e44] dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <td className="px-4 py-3 font-medium text-gray-100 dark:text-white break-words whitespace-normal max-w-[250px]">
                  {report.title}
                </td>
                {fields.map(field => {
                  const isCompleted = report[field] === 'Completed';
                  return (
                    <td
                      key={field}
                      className="px-4 py-3 text-center text-gray-300 dark:text-gray-400 whitespace-nowrap"
                    >
                      <label className="flex items-center justify-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={e =>
                            handleCheckboxChange(report._id, field, e.target.checked)
                          }
                          className="sr-only"
                        />
                        <span className="text-sm">{isCompleted ? '✅' : '❌'}</span>
                      </label>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
