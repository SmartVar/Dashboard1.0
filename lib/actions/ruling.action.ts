// @ts-ignore
"use server"
import User from "@/database/user.model";
import Ruling from "@/database/ruling.model";
import { connectToDatabase } from "../mongoose"
import { DeleteRulingParams,EditRulingParams, GetRulingByIdParams,GetRulingsParams, CreateRulingParams } from "./shared.types";
// import { DeleteTemplateParams,EditTemplateParams, GetTemplateByIdParams,GetTemplatesParams, CreateTemplateParams } from "./shared.types";
import { revalidatePath } from "next/cache";
// import { TemplateDef } from "@/app/(root)/templates/columns";
import { RulingDef } from "@/app/(root)/rulings/columns";
import { FilterQuery } from "mongoose";

export async function getRulings(params: GetRulingsParams): Promise<RulingDef[]> {
  try {
    connectToDatabase();
    const { searchQuery, filter, pagefilter} = params;

    // Calculcate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Ruling> = {};

    if(searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i")}},
        // { description: { $regex: new RegExp(searchQuery, "i")}},
        { category: { $regex: new RegExp(searchQuery, "i")}},
        { subcategory: { $regex: new RegExp(searchQuery, "i")}},
        { section: { $regex: new RegExp(searchQuery, "i")}},
      ]
    }
    
    let sortOptions = {};

if (filter=== 'ruling') 
{
  switch (pagefilter) 
  {
      case "dopbldg":
        sortOptions = { title: 'Dop Bldg' }
        break;
      case "rentedbldg":
        sortOptions = { title: 'Rented Bldg' }
        break;
      case "sq":
        sortOptions = { title: 'SQ' }
        break;
    
      default:
        break;
    }
  }
   else 
   {
    if (filter==='sop') 
    {
      switch (pagefilter) 
      {
      case "po":
        sortOptions = { title: 'Post Office' }
        break;
      case "sq":
        sortOptions = { title: 'SQ' }
        break;
   
      default:
        break;
      }
    }
  else 
{
  if (filter==='manual') 
  {
    switch (pagefilter) 
    {
    case "postal":
      sortOptions = { title: 'Postal Manual' }
      break;
    case "handbook":
      sortOptions = { title: 'Postal Handbook' }
      break;
    
    default:
      break;
  }
  }
  else {
    console.log('No selection of filter')
  }
}
   }

    const rulings = await Ruling.find(query)
    .find(sortOptions)
    .populate({ path: 'author', model: User });
    

// console.log(rulings);
// @ts-ignore
    return rulings;

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createRuling(params: CreateRulingParams) {
  try {
    connectToDatabase();

    const { title, category, subcategory, link, section, path } = params;

    // Create the question
    const ruling = await Ruling.create({
      title,
      category,
      subcategory,
      link,
      section
    });

       // Create an interaction record for the user's ask_question action
    
    // Increment author's reputation by +5 for creating a question

    // revalidate path inorder to display question wihtout reloading
       
    revalidatePath(path)
    return ruling ;

  } catch (error) {
    
  }
}

export async function getRulingById(params: GetRulingByIdParams) {
  try {
    connectToDatabase();

    const { rulingId } = params;

    const ruling = await Ruling.findById(rulingId)
      // console.log(ruling)
      return ruling;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editRuling(params: EditRulingParams) {
  try {
    connectToDatabase();

    const { rulingId, title, category, subcategory, link, section, path } = params;

    const ruling = await Ruling.findById(rulingId).populate("author");

    if(!ruling) {
      throw new Error("Record not found");
    }

    ruling.title = title;
    ruling.category = category;
    ruling.subcategory = subcategory;
    ruling.link = link;
    ruling.section = section;

    await ruling.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRuling(params: DeleteRulingParams) {
  try {
    connectToDatabase();

    const { rulingId, path } = params;

    await Ruling.deleteOne({ _id: rulingId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

