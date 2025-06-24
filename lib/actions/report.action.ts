/* eslint-disable camelcase */
// @ts-ignore
"use server"
// import Tag from "@/database/tag.model";
// import User from "@/database/user.model";
// import Departmentalbldg from "@/database/departmentalbldg.model";
// import Event from "@/database/event.model";
import { connectToDatabase } from "../mongoose"
// import { DeleteDopBldgParams,EditDopBldgParams, GetDopBldgByIdParams,GetDopBldgsParams, CreateDopBldgParams } from "./shared.types";
import { DeleteReportParams,EditReportParams, GetReportByIdParams,GetReportParams, CreateReportParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";
import Report from "@/database/report.model";


// export async function getAllReports(params: GetReportParams) {
//   try {
//     connectToDatabase();
//     const { searchQuery, filter, page = 1, pageSize = 10 } = params;

//     // Calculcate the number of posts to skip based on the page number and page size
//     const skipAmount = (page - 1) * pageSize;

//     const query: FilterQuery<typeof Event> = {};

//     if(searchQuery) {
//       query.$or = [
//         // { division: { $regex: new RegExp(searchQuery, "i")}},
//         { title: { $regex: new RegExp(searchQuery, "i")}},
//         // { section: { $regex: new RegExp(searchQuery, "i")}},
//         { status: { $regex: new RegExp(searchQuery, "i")}},
        
//       ]
//     }
    
//     let sortOptions = {};
    
//     switch (filter) 
//     {
//         case "all":
//           sortOptions = { section: 'All' }
//           break;
//         case "completed":
//           sortOptions = { section: 'Completed' }
//           break;
//         case "pending":
//           sortOptions = { section: 'Pending' }
//           break;
//           default:
//           break;
//       }
  

//     const report = await Report.find(query)
//     .find(sortOptions)
//     // .populate({ path: 'author', model: User })
//     // .populate({ path: 'tags', model: Tag })
//     // eslint-disable-next-line no-undef
//     .skip(skipAmount)
//     // eslint-disable-next-line no-unused-vars
//     const totalReports = await Report.countDocuments(query);
// const isNext = totalReports > skipAmount + report.length;

// // console.log(dopbldg);
// // @ts-ignore
//     return {report,isNext};

//   } catch (error) {
//     console.log(error)
//     throw error;
//   }
// }
export async function getAllReports(params: GetReportParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Event> = {};

    if(searchQuery) {
      query.$or = [
        // { division: { $regex: new RegExp(searchQuery, "i")}},
        { title: { $regex: new RegExp(searchQuery, "i")}},
        // { section: { $regex: new RegExp(searchQuery, "i")}},
        { status: { $regex: new RegExp(searchQuery, "i")}},
        
      ]
    }
    
    let sortOptions = {};
    
    switch (filter) 
    {
        case "all":
          sortOptions = { section: 'All' }
          break;
        case "completed":
          sortOptions = { section: 'Completed' }
          break;
        case "pending":
          sortOptions = { section: 'Pending' }
          break;
          default:
          break;
      }
  

    const report = await Report.find(query)
    .find(sortOptions)
    // .populate({ path: 'author', model: User })
    // .populate({ path: 'tags', model: Tag })
    // eslint-disable-next-line no-undef
    .skip(skipAmount)
    // eslint-disable-next-line no-unused-vars
    const totalReports = await Report.countDocuments(query);
const isNext = totalReports > skipAmount + report.length;

// console.log(dopbldg);
// @ts-ignore
    return {report,isNext};

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createReport(params: CreateReportParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line camelcase
    // const { division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, brief_history, path } = params;
    const { title, nmd, thn, nsk, rgd, mld, pld, psd, csd, rtc, c_sion, c_pune, e_sion, remark, status, path } = params;
    // const { division, po, tags, classes, soa, area, path } = params;

    // Create the question
    const report = await Report.create({
      title,
      nmd,
      thn,
      nsk,
      rgd,
      mld,
      pld,
      psd,
      csd,
      rtc,
      c_sion,
      c_pune,
      e_sion,
      remark,
      status,
    });

    revalidatePath(path)
    return report ;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getReportById(params: GetReportByIdParams) {
  try {
    connectToDatabase();

    const { reportId } = params;

    const report = await Report.findById(reportId)
      return report;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editReport(params: EditReportParams) {
  try {
    connectToDatabase();

    // const { departmentalbldgId, division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, brief_history, path } = params;
    const { reportId, title, nmd, thn, nsk, rgd, mld, pld, psd, csd, rtc, c_sion, c_pune, e_sion, remark, status, path } = params;
    
    // const { eventId, division, title, description, section, event_date, ro_corr, division_corr, status, reminders, tot_reminder, path } = params;
    // const { departmentalbldgId, division, po, classes, soa, area, path } = params;

    const report = await Report.findById(reportId);

    if(!report) {
      throw new Error("Event not found");
    }
    report.title = title;
    report.nmd = nmd;
    report.thn = thn;
    report.nsk = nsk;
    report.rgd = rgd;
    report.mld = mld;
    report.pld = pld;
    report.psd = psd;
    report.csd = csd;
    report.rtc = rtc;
    report.c_sion = c_sion;
    report.c_pune = c_pune;
    report.e_sion = e_sion;
    report.remark = remark;
    report.status = status;
    await report.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteReport(params: DeleteReportParams) {
  try {
    connectToDatabase();

    const { reportId, path } = params;

    await Report.deleteOne({ _id: reportId });
   
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function updateReportStatus(reportId: string, field: string, value: 'Completed' | 'Pending') {
  try {
    await connectToDatabase();

    const allowedFields = ['nmd', 'thn', 'nsk', 'rgd', 'mld', 'pld', 'psd', 'csd', 'rtc', 'status'];

    if (!allowedFields.includes(field)) {
      throw new Error(`Invalid field name: ${field}`);
    }

    const updateObj: Record<string, string> = {};
    updateObj[field] = value;

    await Report.findByIdAndUpdate(reportId, updateObj);

    // Optional: you could revalidate a path here if needed
    // revalidatePath("/your-path"); 
  } catch (error) {
    console.error("Failed to update report status:", error);
    throw error;
  }
