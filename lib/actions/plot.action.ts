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
import Tag from "@/database/tag.model";


export async function getPlot(params: GetPlotParams): Promise<PlotDef[]> {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Plot> = {};

    if(searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { name: { $regex: new RegExp(searchQuery, "i")}},
        
        
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

    const plot = await Plot.find(query)
    .find(sortOptions)
    .populate({ path: 'author', model: User })
    .populate({ path: 'tags', model: Tag }); 

// console.log(plot);
// @ts-ignore
    return plot;

  } catch (error) {
    console.log(error)
    throw error;
  }
}
export async function getAllPlot(params: GetPlotParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Plot> = {};

    if(searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { name: { $regex: new RegExp(searchQuery, "i")}},
        
        
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

    const plot = await Plot.find(query)
    .sort(sortOptions)
    .populate({ path: 'author', model: User })
    .populate({ path: 'tags', model: Tag })
        // eslint-disable-next-line no-undef
    .skip(skipAmount);
    
 const totalPlots = await Plot.countDocuments(query);
const isNext = totalPlots > skipAmount + plot.length;

// console.log(plot);
// @ts-ignore
    return {plot, isNext};

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createPlot(params: CreatePlotParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line camelcase
    const { division, name, district, location, local_body, area, moa, date_purchase, purchase_from, amount, purpose, lease_period, enchroached, enchroached_area, boundary_wall,  po_constructed, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, case_action, case_divisionaction, brief_history, corr_ro, corr_division, tags, path } = params;

    // Create the question
    const plot = await Plot.create({
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
        po_constructed,
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
        // author
    });
 const tagDocuments = [];

 for (const tag of tags) {
       const existingTag = await Tag.findOneAndUpdate(
         { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
         { $setOnInsert: { name: tag }, $push: { plots: plot._id } },
         { upsert: true, new: true }
       )
 
       tagDocuments.push(existingTag._id);
     }
 
     await Plot.findByIdAndUpdate(plot._id, {
       $push: { tags: { $each: tagDocuments }}
     });
     
       // Create an interaction record for the user's ask_question action
    
    // Increment author's reputation by +5 for creating a question

    // revalidate path inorder to display question wihtout reloading
       
    revalidatePath(path)
    return plot ;

  } catch (error) {
    
  }
}

export async function getPlotById(params: GetPlotByIdParams) {
  try {
    connectToDatabase();

    const { plotId } = params;

    const plot = await Plot.findById(plotId)
      .populate({ path: 'tags', model: Tag, select: '_id name'})
      .populate({ path: 'author', model: User, select: '_id clerkId name picture'})
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

    const { plotId, division, name, district, location, local_body, area, moa, date_purchase, purchase_from, amount, purpose, lease_period, enchroached, enchroached_area, boundary_wall, po_constructed, mut_doc, mut_state, fund_type, fund_amount, cases, case_description,case_action, case_divisionaction, brief_history,corr_ro, corr_division, tags, path  } = params;

    const plot = await Plot.findById(plotId).populate("tags");

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
   plot.mut_doc =mut_doc;
  plot.mut_state =mut_state;
    plot.fund_type =fund_type;
    plot.fund_amount =fund_amount;
    plot.cases =cases;
    plot.case_description =case_description;
    plot.case_action =case_action;
    plot.case_divisionaction =case_divisionaction;
  plot.brief_history =brief_history;
    plot.corr_ro =corr_ro;
    plot.corr_division =corr_division;
    
    // Handle tags
        const tagDocuments = [];

 for (const tag of tags) {
       const existingTag = await Tag.findOneAndUpdate(
         { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
         { $setOnInsert: { name: tag }, $push: { plots: plot._id } },
         { upsert: true, new: true }
       )
 
       tagDocuments.push(existingTag._id);
     }
 
     await Plot.findByIdAndUpdate(plot._id, {
       $push: { tags: { $each: tagDocuments }}
     });
     
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
await Tag.updateMany({ plots: plotId }, { $pull: { plots: plotId }});

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}



