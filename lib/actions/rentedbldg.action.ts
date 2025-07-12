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
export async function getAllRentBldgs(params: GetRentBldgParams) {
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
    if (filter) {
      query.division = new RegExp(`^${filter}$`, "i"); // ✅ filter by division
    }
    const sortOptions = {};
    
  // switch (filter) 
  // {
  //     case "ro":
  //       sortOptions = { division: 'RO' }
  //       break;
  //     case "nmd":
  //       sortOptions = { division: 'Navi Mumbai' }
  //       break;
  //     case "thn":
  //       sortOptions = { division: 'Thane' }
  //       break;
  //     case "nsk":
  //       sortOptions = { division: 'Nashik' }
  //       break;
  //     case "mld":
  //       sortOptions = { division: 'Malegaon' }
  //       break;
  //     case "plg":
  //       sortOptions = { division: 'Palgahar' }
  //       break;
  //     case "rgd":
  //       sortOptions = { division: 'Raigad' }
  //       break;
  //     case "psd":
  //       sortOptions = { division: 'PSD' }
  //       break;
  //     case "csd":
  //       sortOptions = { division: 'CSD' }
  //       break;
  //     case "rtc":
  //       sortOptions = { division: 'RTC' }
  //       break;
    
  //     default:
  //       break;
  //   }

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
  
// export async function createRentBldg(params: CreateRentBldgParams) {
//   try {
//     connectToDatabase();

//     // eslint-disable-next-line camelcase
//     const { division, po, class_po, date_po_function, class_city, soa, area, paq, lease_period, rent, frac_status, frac_level, fund_type, fund_amount, cases, case_description, case_action, case_divisionaction, brief_history, corr_ro, corr_division, tags, path } = params;

//     // Create the question
//     const rentbldg = await Rentedbldg.create({
//       division,
//       po,
//       class_po,
//       date_po_function,
//       // eslint-disable-next-line camelcase
//       class_city,
//       soa,
//       area,
//       paq,
//       lease_period,
//       rent,
//       frac_status,
//       frac_level,
//       fund_type,
//       fund_amount,
//       cases,
//       case_description,
//       case_action,
//       case_divisionaction,
//       brief_history,
//       corr_ro,
//       corr_division,
//     });
//  const tagDocuments = [];

//  for (const tag of tags) {
//        const existingTag = await Tag.findOneAndUpdate(
//          { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
//          { $setOnInsert: { name: tag }, $push: { rentedbldgs: rentbldg._id } },
//          { upsert: true, new: true }
//        )
 
//        tagDocuments.push(existingTag._id);
//      }
 
//      await Rentedbldg.findByIdAndUpdate(rentbldg._id, {
//        $push: { tags: { $each: tagDocuments }}
//      });

//        // Create an interaction record for the user's ask_question action
    
//     // Increment author's reputation by +5 for creating a question

//     // revalidate path inorder to display question wihtout reloading
       
//     revalidatePath(path)
//     return rentbldg ;

//   } catch (error) {
    
//   }
// }

export async function createRentBldg(params: CreateRentBldgParams) {
  try {
    await connectToDatabase();

    const {
      division,
      po,
      class_po,
      date_po_function,
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
      tags,
      path
    } = params;

    // 1. Create the rented building
    const rentbldg = await Rentedbldg.create({
      division,
      po,
      class_po,
      date_po_function,
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

    // 2. Attach tags properly
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOne({ name: new RegExp(`^${tag}$`, 'i') });

      if (existingTag) {
        await Tag.findByIdAndUpdate(existingTag._id, {
          $addToSet: { rentedbldgs: rentbldg._id }
        });
        tagDocuments.push(existingTag._id);
      } else {
        const newTag = await Tag.create({
          name: tag,
          rentedbldgs: [rentbldg._id]
        });
        tagDocuments.push(newTag._id);
      }
    }

    // 3. Update the rented building with tag IDs
    await Rentedbldg.findByIdAndUpdate(rentbldg._id, {
      $addToSet: { tags: { $each: tagDocuments } }
    });

    // 4. Revalidate the path for cache busting
    revalidatePath(path);

    return rentbldg;

  } catch (error) {
    console.error("Error creating rented building:", error);
    throw error;
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

// export async function editRentBldg(params: EditRentBldgParams) {
//   try {
//     connectToDatabase();

//     const { rentbldgId, division, po, class_po, date_po_function, class_city, soa, area, paq, lease_period, rent, frac_status, frac_level, fund_type, fund_amount, cases, case_description,case_action, case_divisionaction, brief_history,corr_ro, corr_division, tags, path  } = params;

//     const rentbldg = await Rentedbldg.findById(rentbldgId).populate("tags");

//     if(!rentbldg) {
//       throw new Error("Record not found");
//     }
    
//       rentbldg.division = division;
//       rentbldg.po = po;
//       rentbldg.class_po = class_po;
//       rentbldg.date_po_function = date_po_function;
//       // eslint-disable-next-line camelcase
//       rentbldg.class_city = class_city;
//       rentbldg.soa = soa;
//       rentbldg.area = area;
//       rentbldg.paq = paq;
//       rentbldg.lease_period = lease_period;
//       rentbldg.rent = rent;
//       rentbldg.frac_status = frac_status;
//       rentbldg.frac_level = frac_level;
//           rentbldg.fund_type =fund_type;
//     rentbldg.fund_amount =fund_amount;
//     rentbldg.cases =cases;
//     rentbldg.case_description =case_description;
//     rentbldg.case_action =case_action;
//     rentbldg.case_divisionaction =case_divisionaction;
//     rentbldg.brief_history =brief_history;
//     rentbldg.corr_ro =corr_ro;
//     rentbldg.corr_division =corr_division;

// // Handle tags 
// const tagDocuments = [];

//  for (const tag of tags) {
//        const existingTag = await Tag.findOneAndUpdate(
//          { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
//          { $setOnInsert: { name: tag }, $push: { rentedbldgs: rentbldg._id } },
//          { upsert: true, new: true }
//        )
 
//        tagDocuments.push(existingTag._id);
//      }
 
//      await Rentedbldg.findByIdAndUpdate(rentbldg._id, {
//        $push: { tags: { $each: tagDocuments }}
//      });

//     await rentbldg.save();

//     revalidatePath(path);
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function editRentBldg(params: EditRentBldgParams) {
  try {
    await connectToDatabase();

    const {
      rentbldgId, division, po, class_po, date_po_function, class_city, soa,
      area, paq, lease_period, rent, frac_status, frac_level,
      fund_type, fund_amount, cases, case_description, case_action,
      case_divisionaction, brief_history, corr_ro, corr_division,
      tags, path
    } = params;

    const rentbldg = await Rentedbldg.findById(rentbldgId).populate("tags");

    if (!rentbldg) {
      throw new Error("Record not found");
    }

    // Update fields
    Object.assign(rentbldg, {
      division, po, class_po, date_po_function, class_city, soa, area, paq,
      lease_period, rent, frac_status, frac_level, fund_type, fund_amount,
      cases, case_description, case_action, case_divisionaction, brief_history,
      corr_ro, corr_division
    });

    // Handle tags
    const existingTagIds = rentbldg.tags.map((tag: { _id: { toString: () => any; }; }) => tag._id.toString());
    const tagDocuments: string[] = [];

    for (const tag of tags) {
      const tagDoc = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $addToSet: { rentedbldgs: rentbldg._id } },
        { upsert: true, new: true }
      );
      const tagId = tagDoc._id.toString();
      if (!existingTagIds.includes(tagId)) {
        tagDocuments.push(tagId);
      }
    }

    // Merge and assign tags
    rentbldg.tags = Array.from(new Set([...existingTagIds, ...tagDocuments]));

    await rentbldg.save();
    revalidatePath(path);
  } catch (error) {
    console.error("Error editing rented building:", error);
    throw error;
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

