

'use client';
import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import LocalSearchbar from '../shared/search/LocalSearchbar';

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
    //  const { report } = await getAllReports({});
     const report = (await getAllReports({})).report.filter(r => r.status === 'Pending');
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
      <div>
                   <Link href="/add-report" 
                    className="flex justify-end max-sm:w-full">
                     <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                       New Report
                     </Button>
                   </Link> 
                 </div> 
                   <div className="mt-11 flex justify-between gap-5 
                       max-sm:flex-col sm:items-center">
                       <LocalSearchbar 
                         route="/"
                         iconPosition="left"
                      imgSrc="/assets/icons/search.svg"
                        placeholder="Search for Report title or Status"
                        otherClasses="flex-1"
                       />
                               
                   </div>
                        
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
              <td className="px-4 py-2 font-medium text-primary-600 text-gray-700">{report.title}</td>
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
                      { /* <span>{isCompleted ? '✅' : '❌'}</span> */}
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
