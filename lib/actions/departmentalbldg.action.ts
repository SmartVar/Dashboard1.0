/* eslint-disable camelcase */
// @ts-ignore
"use server"
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import Departmentalbldg from "@/database/departmentalbldg.model";
import { connectToDatabase } from "../mongoose"
import { DeleteDopBldgParams,EditDopBldgParams, GetDopBldgByIdParams,GetDopBldgsParams, CreateDopBldgParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { DopBldgDef } from "@/app/(root)/dopbldg/columns";
import { FilterQuery } from "mongoose";

export async function getDopBldgs(params: GetDopBldgsParams): Promise<DopBldgDef[]> {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Departmentalbldg> = {};

    if(searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { po: { $regex: new RegExp(searchQuery, "i")}},
        { location: { $regex: new RegExp(searchQuery, "i")}},
        
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
  

    const dopbldg = await Departmentalbldg.find(query)
    .find(sortOptions)
    .sort({createdAt: - 1})
    .populate({ path: 'author', model: User })
    .populate({ path: 'tags', model: Tag });
    // .populate({ path: 'tags', model: Tag });    

    // const totalDepartmentalbldgs = await dopbldg.countDocuments(query);

// console.log(dopbldg);
// @ts-ignore
    return dopbldg;

  } catch (error) {
    console.log(error)
    throw error;
  }
}
export async function getAllDopBldgs(params: GetDopBldgsParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Departmentalbldg> = {};

    if(searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { po: { $regex: new RegExp(searchQuery, "i")}},
        { location: { $regex: new RegExp(searchQuery, "i")}},
        
      ]
    }
    
    let sortOptions = {};
    
    switch (filter) 
    {
        case "RO":
          sortOptions = { division: 'RO' }
          break;
        case "nmd":
          sortOptions = { division: 'Navi Mumbai' }
          break;
        case "thn":
          sortOptions = { division: 'Thane Dn' }
          break;
        case "nsk":
          sortOptions = { division: 'Nashik Dn' }
          break;
        case "mld":
          sortOptions = { division: 'Malegaon' }
          break;
        case "plg":
          sortOptions = { division: 'Palgahar Dn' }
          break;
        case "rgd":
          sortOptions = { division: 'Raigad Dn' }
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
  

    const dopbldg = await Departmentalbldg.find(query)
    .sort(sortOptions)
    .populate({ path: 'author', model: User })
    .populate({ path: 'tags', model: Tag })
    // eslint-disable-next-line no-undef
    .skip(skipAmount);
    // eslint-disable-next-line no-unused-vars
    const totalDepartmentalbldgs = await Departmentalbldg.countDocuments(query);
const isNext = totalDepartmentalbldgs > skipAmount + dopbldg.length;

// console.log(dopbldg);
// @ts-ignore
    return {dopbldg,isNext};

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createDopBldg(params: CreateDopBldgParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line camelcase
    // const { division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, brief_history, path } = params;
    const { division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, case_action, case_divisionaction, brief_history, corr_ro, corr_division, tags, path } = params;
    // const { division, po, tags, classes, soa, area, path } = params;

    // Create the question
    const dopbldg = await Departmentalbldg.create({
      division,
      po,
      classes : classes,
      location,
      // // eslint-disable-next-line camelcase
      purchase_year,
      soa,
      paq,
      area,
      builtup_area,
      open_space,
      floors,
      value,
      year,
      expenditure,
      mut_doc,
      mut_state,
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

 // Create the tags or get them if they already exist
    // eslint-disable-next-line no-undef
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
        { $setOnInsert: { name: tag }, $push: { departmentalbldgs: dopbldg._id } },
        { upsert: true, new: true }
      )

      tagDocuments.push(existingTag._id);
    }

    await Departmentalbldg.findByIdAndUpdate(dopbldg._id, {
      $push: { tags: { $each: tagDocuments }}
    });
       // Create an interaction record for the user's ask_question action
    
    // Increment author's reputation by +5 for creating a question

    // revalidate path inorder to display question wihtout reloading
       
    revalidatePath(path)
    return dopbldg ;

  } catch (error) {
    
  }
}

export async function getDopBldgById(params: GetDopBldgByIdParams) {
  try {
    connectToDatabase();

    const { departmentalbldgId } = params;

    const dopbldg = await Departmentalbldg.findById(departmentalbldgId)
      .populate({ path: 'tags', model: Tag, select: '_id name'})
      .populate({ path: 'author', model: User, select: '_id clerkId name picture'})
      // console.log(template)
      return dopbldg;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function editDopBldg(params: EditDopBldgParams) {
//   try {
//     connectToDatabase();

//     // const { departmentalbldgId, division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, brief_history, path } = params;
//     const { departmentalbldgId, division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description,case_action, case_divisionaction, brief_history,corr_ro, corr_division, path } = params;
//     // const { departmentalbldgId, division, po, classes, soa, area, path } = params;

//     const dopbldg = await Departmentalbldg.findById(departmentalbldgId).populate("tags");

//     if(!dopbldg) {
//       throw new Error("Record not found");
//     }
//     dopbldg.division = division;
//     dopbldg.po = po;
//     dopbldg.classes = classes;
//     dopbldg.location = location;
//     dopbldg.purchase_year = purchase_year;
//     dopbldg.soa = soa;
//     dopbldg.paq = paq;
//     dopbldg.area = area;
//    dopbldg.builtup_area = builtup_area;
//     dopbldg.open_space = open_space;
//     dopbldg.floors = floors;
//     dopbldg.value = value;
//     dopbldg.year =year;
//     dopbldg.expenditure =expenditure;
//     dopbldg.mut_doc =mut_doc;
//     dopbldg.mut_state =mut_state;
//     dopbldg.fund_type =fund_type;
//     dopbldg.fund_amount =fund_amount;
//     dopbldg.cases =cases;
//     dopbldg.case_description =case_description;
//     dopbldg.case_action =case_action;
//     dopbldg.case_divisionaction =case_divisionaction;
//     dopbldg.brief_history =brief_history;
//     dopbldg.corr_ro =corr_ro;
//     dopbldg.corr_division =corr_division;
    
//     // if (tags) {
//     //   dopbldg.tags = tags;
//     // }

//     await dopbldg.save();

//     revalidatePath(path);
//   } catch (error) {
//     console.log(error);
//   }
// }



export async function editDopBldg(params: EditDopBldgParams) {
  try {
    connectToDatabase();

    const { departmentalbldgId, division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, case_action, case_divisionaction, brief_history, corr_ro, corr_division, path, tags } = params;

    const dopbldg = await Departmentalbldg.findById(departmentalbldgId).populate("tags");

    if (!dopbldg) {
      throw new Error("Record not found");
    }

    // Update fields
    dopbldg.division = division;
    dopbldg.po = po;
    dopbldg.classes = classes;
    dopbldg.location = location;
    dopbldg.purchase_year = purchase_year;
    dopbldg.soa = soa;
    dopbldg.paq = paq;
    dopbldg.area = area;
    dopbldg.builtup_area = builtup_area;
    dopbldg.open_space = open_space;
    dopbldg.floors = floors;
    dopbldg.value = value;
    dopbldg.year = year;
    dopbldg.expenditure = expenditure;
    dopbldg.mut_doc = mut_doc;
    dopbldg.mut_state = mut_state;
    dopbldg.fund_type = fund_type;
    dopbldg.fund_amount = fund_amount;
    dopbldg.cases = cases;
    dopbldg.case_description = case_description;
    dopbldg.case_action = case_action;
    dopbldg.case_divisionaction = case_divisionaction;
    dopbldg.brief_history = brief_history;
    dopbldg.corr_ro = corr_ro;
    dopbldg.corr_division = corr_division;

    // Handle tags
   const tagDocuments = [];

 // Create the tags or get them if they already exist
    // eslint-disable-next-line no-undef
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
        { $setOnInsert: { name: tag }, $push: { departmentalbldgs: dopbldg._id } },
        { upsert: true, new: true }
      )

      tagDocuments.push(existingTag._id);
    }

    await Departmentalbldg.findByIdAndUpdate(dopbldg._id, {
      $push: { tags: { $each: tagDocuments }}
    });

    await dopbldg.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}


export async function deleteDopBldg(params: DeleteDopBldgParams) {
  try {
    connectToDatabase();

    const { departmentalbldgId, path } = params;

    await Departmentalbldg.deleteOne({ _id: departmentalbldgId });
    await Tag.updateMany({ departmentalbldgs: departmentalbldgId }, { $pull: { departmentalbldgs: departmentalbldgId }});

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}


