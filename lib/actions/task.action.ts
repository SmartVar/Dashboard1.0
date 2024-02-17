/* eslint-disable camelcase */
// @ts-ignore
"use server"
import User from "@/database/user.model";
import Task from "@/database/task.model";
import { connectToDatabase } from "../mongoose"
import { DeleteTaskParams,EditTaskParams, GetTaskByIdParams,GetTaskParams, CreateTaskParams } from "./shared.types";
import { revalidatePath } from "next/cache";
// import { TaskSchema } from "@/app/(root)/task/columns";
import { TaskDef } from "@/app/(root)/task/columns";
import { FilterQuery } from "mongoose";

export async function getTask(params: GetTaskParams): Promise<TaskDef[]> {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Task> = {};

    if(searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i")}},
        { task: { $regex: new RegExp(searchQuery, "i")}},
        { label: { $regex: new RegExp(searchQuery, "i")}},
        { remark: { $regex: new RegExp(searchQuery, "i")}},
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { c_no: { $regex: new RegExp(searchQuery, "i")}},
        { subject: { $regex: new RegExp(searchQuery, "i")}},
        { f_no: { $regex: new RegExp(searchQuery, "i")}},
        
        
      ]
    }
    
    let sortOptions = {};
    
  switch (filter) 
  {
      case "ro":
        sortOptions = { division: 'RO' }
        break;
      case "nmd":
        sortOptions = { division: 'NMD' }
        break;
      case "thn":
        sortOptions = { division: 'THN' }
        break;
      case "nsk":
        sortOptions = { division: 'NSK' }
        break;
      case "mld":
        sortOptions = { division: 'MLD' }
        break;
      case "plg":
        sortOptions = { division: 'PLG' }
        break;
      case "rgd":
        sortOptions = { division: 'RGD' }
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

    // const task = await Task.find(query)
    const task = await Task.find(query)
    .find(sortOptions)
    .sort({createdAt: - 1})
    .populate({ path: 'author', model: User });
    

// console.log(rentbldg);
// @ts-ignore
    return task;

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createTask(params: CreateTaskParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line camelcase
    const { title, doc, division, c_no, f_no, dod, status, label, priority, remark, path } = params;

    // Create the question
    const task = await Task.create({
      
      title,
      doc,
      division,
      c_no,
      f_no,
      dod,
      status,
      label,
      // eslint-disable-next-line camelcase
      priority,
      remark,
    });

       // Create an interaction record for the user's ask_question action
    
    // Increment author's reputation by +5 for creating a question

    // revalidate path inorder to display question wihtout reloading
       console.log (task);
    revalidatePath(path)
    return task ;

  } catch (error) {
    
  }
}

export async function getTaskById(params: GetTaskByIdParams) {
  try {
    connectToDatabase();

    const { taskId } = params;

    const task = await Task.findById(taskId)
      // console.log(template)
      return task;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editTask(params: EditTaskParams) {
  try {
    connectToDatabase();

    const { taskId, title, doc, division, c_no, f_no, dod, status, label, priority, remark, path  } = params;

    const task = await Task.findById(taskId).populate("author");

    if(!task) {
      throw new Error("Record not found");
    }
    
      
      task.title = title;
      task.doc = doc;
      task.division = division;
      task.c_no = c_no;
      task.f_no = f_no;
      task.dod = dod;
      task.status = status;
      task.label = label;
      // eslint-disable-next-line camelcase
      task.priority = priority;
      task.remark = remark;
      
    await task.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTask(params: DeleteTaskParams) {
  try {
    connectToDatabase();

    const { taskId, path } = params;
    console.log(taskId)

    await Task.deleteOne({ _id: taskId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

