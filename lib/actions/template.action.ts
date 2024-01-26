// @ts-ignore
"use server"

import Template from "@/database/template.model";import { connectToDatabase } from "../mongoose"
import { CreateQuestionParams,DeleteTemplateParams,EditTemplateParams, GetTemplateByIdParams,GetTemplatesParams, CreateTemplateParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { TemplateDef } from "@/app/(root)/templates/columns";
import { FilterQuery } from "mongoose";

export async function getTemplates(params: GetTemplatesParams): Promise<TemplateDef[]> {
  try {
    connectToDatabase();
    const { searchQuery, filter, pagefilter, page = 1, pageSize = 2 } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Template> = {};

    if(searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i")}},
        { description: { $regex: new RegExp(searchQuery, "i")}},
      ]
    }
    
    let sortOptions = {};

if (filter=== 'noting') 
{
  switch (pagefilter) 
  {
      case "funds":
        sortOptions = { title: 'Funds' }
        break;
      case "reports":
        sortOptions = { title: 'Reports' }
        break;
      case "forwardings":
        sortOptions = { title: 'Forwardings' }
        break;
    
      default:
        break;
    }
  }
   else 
   {
    if (filter==='drafting') 
    {
      switch (pagefilter) 
      {
      case "fundsdraft":
        sortOptions = { title: 'Funds Draft' }
        break;
      case "reportdraft":
        sortOptions = { title: 'Report Draft' }
        break;
   
      default:
        break;
      }
    }
  else 
{
  if (filter==='briefhistory') 
  {
    switch (pagefilter) 
    {
    case "fundsbh":
      sortOptions = { title: 'Funds BH' }
      break;
    case "reportsbh":
      sortOptions = { title: 'Reports BH' }
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

    const templates = await Template.find(query)
    .find(sortOptions)
    

console.log(templates)

    return templates ;

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createTemplate(params: CreateTemplateParams) {
  try {
    connectToDatabase();

    const { title, category, subcategory, description, section, path } = params;

    // Create the question
    const template = await Template.create({
      title,
      category,
      subcategory,
      description,
      section
    });

       // Create an interaction record for the user's ask_question action
    
    // Increment author's reputation by +5 for creating a question

    //revalidate path inorder to display question wihtout reloading
       
    revalidatePath(path)
    return template ;

  } catch (error) {
    
  }
}

export async function getTemplateById(params: GetTemplateByIdParams) {
  try {
    connectToDatabase();

    const { templateId } = params;

    const template = await Template.findById(templateId)
      // console.log(template)
      return template;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editTemplate(params: EditTemplateParams) {
  try {
    connectToDatabase();

    const { templateId, title, category, subcategory, description, section, path } = params;

    const template = await Template.findById(templateId);

    if(!template) {
      throw new Error("Record not found");
    }

    template.title = title;
    template.category = category;
    template.subcategory = subcategory;
    template.description = description;
    template.section = section;

    await template.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTemplate(params: DeleteTemplateParams) {
  try {
    connectToDatabase();

    const { templateId, path } = params;

    await Template.deleteOne({ _id: templateId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

