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
    .populate({ path: 'author', model: User });
    

// console.log(plot);
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
    const { division, name, district, location, local_body, area, moa, date_purchase, purchase_from, amount, purpose, lease_period, enchroached, enchroached_area, boundary_wall,  po_constructed, path } = params;

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
        // author
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

