/* eslint-disable camelcase */
// @ts-ignore
"use server"
import User from "@/database/user.model";
import Departmentalbldg from "@/database/departmentalbldg.model";
import { connectToDatabase } from "../mongoose"
import { DeleteDopBldgParams,EditDopBldgParams, GetDopBldgByIdParams,GetDopBldgParams, CreateDopBldgParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { DopBldgDef } from "@/app/(root)/dopbldg/columns";
import { FilterQuery } from "mongoose";

export async function getDopBldg(params: GetDopBldgParams): Promise<DopBldgDef[]> {
  try {
    connectToDatabase();
    const { searchQuery } = params;

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
    
//     let sortOptions = {};

// if (filter=== 'division') 
// {
//   switch (pagefilter) 
//   {
//       case "navimumbai":
//         sortOptions = { title: 'Funds' }
//         break;
//       case "reports":
//         sortOptions = { title: 'Reports' }
//         break;
//       case "forwardings":
//         sortOptions = { title: 'Forwardings' }
//         break;
//       case "Proposals":
//         sortOptions = { title: 'Proposals' }
//         break;
//       case "officenote":
//         sortOptions = { title: 'Office Note' }
//         break;
//       case "others":
//         sortOptions = { title: 'Others' }
//         break;
    
//       default:
//         break;
//     }
//   }
//    else 
//    {
//     if (filter==='drafting') 
//     {
//       switch (pagefilter) 
//       {
//         case "funds":
//           sortOptions = { title: 'Funds' }
//           break;
//         case "fracs":
//           sortOptions = { title: 'FRAC' }
//           break;
//         case "rti":
//           sortOptions = { title: 'RTI' }
//           break;
//         case "reports":
//           sortOptions = { title: 'Reports' }
//           break;
//         case "do":
//           sortOptions = { title: 'DO' }
//           break;
//         case "others":
//           sortOptions = { title: 'Others' }
//           break;
   
//       default:
//         break;
//       }
//     }
//   else 
// {
//   if (filter==='briefhistory') 
//   {
//     switch (pagefilter) 
//     {
//     case "dopbldg":
//       sortOptions = { title: 'Dop Bldg' }
//       break;
//     case "rentedbldg":
//       sortOptions = { title: 'Rented Bldg' }
//       break;
//     case "plots":
//       sortOptions = { title: 'Plots' }
//       break;
//     case "others":
//       sortOptions = { title: 'Others' }
//       break;
        
//     default:
//       break;
//   }
//   }
//   else {
//     console.log('No selection of filter')
//   }
// }
//    }

    const dopbldg = await Departmentalbldg.find(query)
    // .find(sortOptions)
    .populate({ path: 'author', model: User });
    

console.log(dopbldg);
// @ts-ignore
    return dopbldg;

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createDopBldg(params: CreateDopBldgParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line camelcase
    const { division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, path } = params;

    // Create the question
    const dopbldg = await Departmentalbldg.create({
      division,
      po,
      class : classes,
      location,
      // eslint-disable-next-line camelcase
      purchase_year,
      soa,
      paq,
      area,
      builtup_area,
      open_space,
      floors,
      value,
      year,
      expenditure
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
      // console.log(template)
      return dopbldg;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editDopBldg(params: EditDopBldgParams) {
  try {
    connectToDatabase();

    const { departmentalbldgId, division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, path } = params;

    const dopbldg = await Departmentalbldg.findById(departmentalbldgId).populate("author");

    if(!dopbldg) {
      throw new Error("Record not found");
    }
    dopbldg.division = division;
    dopbldg.po = po;
    dopbldg.class = classes;
    dopbldg.location = location;
    dopbldg.purchase_year = purchase_year;
    dopbldg.soa = soa;
    dopbldg.paq = paq;
    dopbldg.area = area;
   dopbldg.builtup_area = builtup_area;
    dopbldg.open_space = open_space;
    dopbldg.floors = floors;
    dopbldg.value = value;
    dopbldg.year =year;
    dopbldg.expenditure =expenditure;
    

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

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

