/* eslint-disable camelcase */
// @ts-ignore
"use server"
// import User from "@/database/user.model";
import Pendency from "@/database/pendency.model";
import { connectToDatabase } from "../mongoose"
import { DeletePendencyParams,EditPendencyParams, GetPendencyByIdParams,GetPendencyParams, CreatePendencyParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { PendencyDef } from "@/app/(root)/pendency/columns";
import { FilterQuery } from "mongoose";

export async function getPendency(params: GetPendencyParams): Promise<PendencyDef[]> {
  try {
    connectToDatabase();
    const { searchQuery } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Pendency> = {};

    if(searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { dak_no: { $regex: new RegExp(searchQuery, "i")}},
        { c_no: { $regex: new RegExp(searchQuery, "i")}},
        { subject: { $regex: new RegExp(searchQuery, "i")}},
        { f_no: { $regex: new RegExp(searchQuery, "i")}},
        // { remarks: { $regex: new RegExp(searchQuery, "i")}},
        { status: { $regex: new RegExp(searchQuery, "i")}},
        // { dos: { $regex: new RegExp(searchQuery, "i")}},
        // { dor: { $regex: new RegExp(searchQuery, "i")}},
        
        
      ]
    }
    

    const pendency = await Pendency.find(query)
    // .find(sortOptions)
    // .populate({ path: 'author', model: User });
    

// console.log(pendency);
// @ts-ignore
    return pendency;

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createPendency(params: CreatePendencyParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line camelcase
    const { dak_no, doc, division, c_no, subject, f_no, dos, dor, remarks, status,  path } = params;

    // Create the question
    const pendency = await Pendency.create({
      dak_no,
      doc,
      division,
      c_no,
      subject,
      f_no,
      dos,
      dor,
      remarks,
      status,
      // author
      
    });

       // Create an interaction record for the user's ask_question action
    
    // Increment author's reputation by +5 for creating a question

    // revalidate path inorder to display question wihtout reloading
       
    revalidatePath(path)
    return pendency ;

  } catch (error) {
    
  }
}

export async function getPendencyById(params: GetPendencyByIdParams) {
  try {
    connectToDatabase();

    const { pendencyId } = params;

    const pendency = await Pendency.findById(pendencyId)
      // console.log(template)
      return pendency;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editPendency(params: EditPendencyParams) {
  try {
    connectToDatabase();

    const { pendencyId, dak_no, doc, division, c_no, subject, f_no, dos, dor, remarks, status, path  } = params;

    const pendency = await Pendency.findById(pendencyId).populate("author");

    if(!pendency) {
      throw new Error("Record not found");
    }
    
      
     pendency.dak_no = dak_no;
     pendency.doc = doc;
     pendency.division = division;
     pendency.c_no = c_no;
     pendency.subject = subject;
     pendency.f_no = f_no;
     pendency.dos = dos;
     pendency.dor = dor;
     pendency.remarks = remarks;
     pendency.status = status;

    await pendency.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deletePendency(params: DeletePendencyParams) {
  try {
    connectToDatabase();

    const { pendencyId, path } = params;

    await Pendency.deleteOne({ _id: pendencyId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}