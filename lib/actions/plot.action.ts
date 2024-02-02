/* eslint-disable camelcase */
// @ts-ignore
"use server"
import User from "@/database/user.model";
import Plot from "@/database/plot.model";
import { connectToDatabase } from "../mongoose"
import { DeletePlotParams,EditPlotParams, GetPlotByIdParams,GetPlotParams, CreatePlotParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { PlotDef } from "@/app/(root)/plot/columns";
import { FilterQuery } from "mongoose";

export async function getPlot(params: GetPlotParams): Promise<PlotDef[]> {
  try {
    connectToDatabase();
    const { searchQuery } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Plot> = {};

    if(searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { name: { $regex: new RegExp(searchQuery, "i")}},
        
        
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

    const plot = await Plot.find(query)
    // .find(sortOptions)
    .populate({ path: 'author', model: User });
    

console.log(plot);
// @ts-ignore
    return plot;

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createPlot(params: CreatePlotParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line camelcase
    const { division, name, district, location, local_body, area, moa, date_purchase, purchase_from, amount, purpose, lease_period, enchroached, enchroached_area, boundary_wall, po_constructed, path } = params;

    // Create the question
    const rentbldg = await Plot.create({
        division,
        name,
        district,
        location,
        local_body,
        area,
        moa,
        date_purchase,
        purchase_from,
        amount,
        purpose,
        lease_period,
        enchroached,
        enchroached_area,
        boundary_wall,
        po_constructed
    });

       // Create an interaction record for the user's ask_question action
    
    // Increment author's reputation by +5 for creating a question

    // revalidate path inorder to display question wihtout reloading
       
    revalidatePath(path)
    return rentbldg ;

  } catch (error) {
    
  }
}

export async function getPlotById(params: GetPlotByIdParams) {
  try {
    connectToDatabase();

    const { plotId } = params;

    const plot = await Plot.findById(plotId)
      // console.log(template)
      return plot;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editPlot(params: EditPlotParams) {
  try {
    connectToDatabase();

    const { plotId, division, name, district, location, local_body, area, moa, date_purchase, purchase_from, amount, purpose, lease_period, enchroached, enchroached_area, boundary_wall, po_constructed, path  } = params;

    const plot = await Plot.findById(plotId).populate("author");

    if(!plot) {
      throw new Error("Record not found");
    }
      plot.division =division;
  plot.name = name;
    plot.district = district;
  plot.location = location;
  plot.local_body = local_body;
  plot.area = area;
  plot.moa = moa;
  plot.date_purchase = date_purchase;
  plot.purchase_from = purchase_from;
  plot.amount = amount;
  plot.purpose = purpose;
  plot.lease_period = lease_period;
 plot.enchroached = enchroached;
 plot.enchroached_area = enchroached_area;
 plot.boundary_wall = boundary_wall;
 plot.po_constructed = po_constructed;
      
    await plot.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deletePlot(params: DeletePlotParams) {
  try {
    connectToDatabase();

    const { plotId, path } = params;

    await Plot.deleteOne({ _id: plotId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

