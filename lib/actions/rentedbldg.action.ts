/* eslint-disable camelcase */
// @ts-ignore
"use server"
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import Rentedbldg from "@/database/rentedbldg.model";
import { connectToDatabase } from "../mongoose"
import { DeleteRentBldgParams,EditRentBldgParams, GetRentBldgByIdParams,GetRentBldgParams, CreateRentBldgParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { RentBldgDef } from "@/app/(root)/rentbldg/columns";
import { FilterQuery } from "mongoose";

export async function getRentBldg(params: GetRentBldgParams): Promise<RentBldgDef[]> {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Rentedbldg> = {};

    if(searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { po: { $regex: new RegExp(searchQuery, "i")}},
        
        
      ]
    }
    
    let sortOptions = {};
    
  switch (filter) 
  {
      case "ro":
        sortOptions = { division: 'RO' }
        break;
      case "nmd":
        sortOptions = { division: 'Navi Mumbai' }
        break;
      case "thn":
        sortOptions = { division: 'Thane' }
        break;
      case "nsk":
        sortOptions = { division: 'Nashik' }
        break;
      case "mld":
        sortOptions = { division: 'Malegaon' }
        break;
      case "plg":
        sortOptions = { division: 'Palgahar' }
        break;
      case "rgd":
        sortOptions = { division: 'Raigad' }
        break;
      case "psd":
        sortOptions = { division: 'PSD' }
        break;
      case "csd":
        sortOptions = { division: 'CSD' }
        break;
      case "rtc":
        sortOptions = { division: 'RTC' }
        break;
    
      default:
        break;
    }

    const rentbldg = await Rentedbldg.find(query)
    .find(sortOptions)
    .sort({createdAt: - 1})
    .populate({ path: 'author', model: User })
    .populate({ path: 'tags', model: Tag });

// console.log(rentbldg);
// @ts-ignore
    return rentbldg;

  } catch (error) {
    console.log(error)
    throw error;
  }
}
export async function getAllRentBldg(params: GetRentBldgParams) {
  try {
    connectToDatabase();
    const {searchQuery, filter, page = 1, pageSize = 10 } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Rentedbldg> = {};

    if(searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { po: { $regex: new RegExp(searchQuery, "i")}},
        
        
      ]
    }
    
    let sortOptions = {};
    
  switch (filter) 
  {
      case "ro":
        sortOptions = { division: 'RO' }
        break;
      case "nmd":
        sortOptions = { division: 'Navi Mumbai' }
        break;
      case "thn":
        sortOptions = { division: 'Thane' }
        break;
      case "nsk":
        sortOptions = { division: 'Nashik' }
        break;
      case "mld":
        sortOptions = { division: 'Malegaon' }
        break;
      case "plg":
        sortOptions = { division: 'Palgahar' }
        break;
      case "rgd":
        sortOptions = { division: 'Raigad' }
        break;
      case "psd":
        sortOptions = { division: 'PSD' }
        break;
      case "csd":
        sortOptions = { division: 'CSD' }
        break;
      case "rtc":
        sortOptions = { division: 'RTC' }
        break;
    
      default:
        break;
    }

    const rentbldg = await Rentedbldg.find(query)
    .find(sortOptions)
    .sort({createdAt: - 1})
    .populate({ path: 'author', model: User })
    .populate({ path: 'tags', model: Tag })
        // eslint-disable-next-line no-undef
    .skip(skipAmount);
    const totalRentedbldgs = await Rentedbldg.countDocuments(query);
    const isNext = totalRentedbldgs > skipAmount + rentbldg.length;

// console.log(rentbldg);
// @ts-ignore
    return {rentbldg,isNext};

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createRentBldg(params: CreateRentBldgParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line camelcase
    const { division, po, class_po, date_po_function, class_city, soa, area, paq, lease_period, rent, frac_status, frac_level, fund_type, fund_amount, cases, case_description, case_action, case_divisionaction, brief_history, corr_ro, corr_division, tags, path } = params;

    // Create the question
    const rentbldg = await Rentedbldg.create({
      division,
      po,
      class_po,
      date_po_function,
      // eslint-disable-next-line camelcase
      class_city,
      soa,
      area,
      paq,
      lease_period,
      rent,
      frac_status,
      frac_level,
      fund_type,
      fund_amount,
      cases,
      case_description,
      case_action,
      case_divisionaction,
      brief_history,
      corr_ro,
      corr_division,
    });
 const tagDocuments = [];

 for (const tag of tags) {
       const existingTag = await Tag.findOneAndUpdate(
         { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
         { $setOnInsert: { name: tag }, $push: { rentedbldgs: rentbldg._id } },
         { upsert: true, new: true }
       )
 
       tagDocuments.push(existingTag._id);
     }
 
     await Rentedbldg.findByIdAndUpdate(rentbldg._id, {
       $push: { tags: { $each: tagDocuments }}
     });

       // Create an interaction record for the user's ask_question action
    
    // Increment author's reputation by +5 for creating a question

    // revalidate path inorder to display question wihtout reloading
       
    revalidatePath(path)
    return rentbldg ;

  } catch (error) {
    
  }
}

export async function getRentBldgById(params: GetRentBldgByIdParams) {
  try {
    connectToDatabase();

    const { rentbldgId } = params;

    const rentbldg = await Rentedbldg.findById(rentbldgId)
      .populate({ path: 'tags', model: Tag, select: '_id name'})
      .populate({ path: 'author', model: User, select: '_id clerkId name picture'})
      // console.log(template)
      return rentbldg;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editRentBldg(params: EditRentBldgParams) {
  try {
    connectToDatabase();

    const { rentbldgId, division, po, class_po, date_po_function, class_city, soa, area, paq, lease_period, rent, frac_status, frac_level, fund_type, fund_amount, cases, case_description,case_action, case_divisionaction, brief_history,corr_ro, corr_division, tags, path  } = params;

    const rentbldg = await Rentedbldg.findById(rentbldgId).populate("tags");

    if(!rentbldg) {
      throw new Error("Record not found");
    }
    
      rentbldg.division = division;
      rentbldg.po = po;
      rentbldg.class_po = class_po;
      rentbldg.date_po_function = date_po_function;
      // eslint-disable-next-line camelcase
      rentbldg.class_city = class_city;
      rentbldg.soa = soa;
      rentbldg.area = area;
      rentbldg.paq = paq;
      rentbldg.lease_period = lease_period;
      rentbldg.rent = rent;
      rentbldg.frac_status = frac_status;
      rentbldg.frac_level = frac_level;
          rentbldg.fund_type =fund_type;
    rentbldg.fund_amount =fund_amount;
    rentbldg.cases =cases;
    rentbldg.case_description =case_description;
    rentbldg.case_action =case_action;
    rentbldg.case_divisionaction =case_divisionaction;
    rentbldg.brief_history =brief_history;
    rentbldg.corr_ro =corr_ro;
    rentbldg.corr_division =corr_division;

// Handle tags
<<<<<<< HEAD
=======
    if (tags && Array.isArray(tags)) {
>>>>>>> 7c979bec270280837ad3584d0fdd2bddf5428740
    const tagDocuments = [];

 for (const tag of tags) {
       const existingTag = await Tag.findOneAndUpdate(
         { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
         { $setOnInsert: { name: tag }, $push: { rentedbldgs: rentbldg._id } },
         { upsert: true, new: true }
       )
 
       tagDocuments.push(existingTag._id);
     }
 
     await Rentedbldg.findByIdAndUpdate(rentbldg._id, {
       $push: { tags: { $each: tagDocuments }}
     });

    await rentbldg.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRentBldg(params: DeleteRentBldgParams) {
  try {
    connectToDatabase();

    const { rentbldgId, path } = params;

    await Rentedbldg.deleteOne({ _id: rentbldgId });
 await Tag.updateMany({ rentedbldgs: rentbldgId }, { $pull: { rentedbldgs: rentbldgId }});

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

