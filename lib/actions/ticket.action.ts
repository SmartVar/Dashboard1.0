/* eslint-disable camelcase */
// @ts-ignore
"use server"
// import Tag from "@/database/tag.model";
import User from "@/database/user.model";
// import Departmentalbldg from "@/database/departmentalbldg.model";
import Ticket from "@/database/ticket.model";
import { connectToDatabase } from "../mongoose"
import { DeleteTicketParams,EditTicketParams, GetTicketByIdParams,GetTicketsParams, CreateTicketParams } from "./shared.types";
import { revalidatePath } from "next/cache";
// import { DopBldgDef } from "@/app/(root)/dopbldg/columns";
import { TicketDef } from "@/app/(root)/ticket/columns";
import { FilterQuery } from "mongoose";
import cloudinary from "@/lib/cloudinary";


export async function getTickets(params: GetTicketsParams): Promise<TicketDef[]> {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Ticket> = {};

    if(searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { po: { $regex: new RegExp(searchQuery, "i")}},
        { tkttitle: { $regex: new RegExp(searchQuery, "i")}},
        
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
  

    const ticket = await Ticket.find(query)
    .find(sortOptions)
    .sort({createdAt: - 1})
    .populate({ path: 'author', model: User })
    // .populate({ path: 'tags', model: Tag });
    // .populate({ path: 'tags', model: Tag });    

    // const totalDepartmentalbldgs = await dopbldg.countDocuments(query);

// console.log(dopbldg);
// @ts-ignore
    return ticket;

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createTicket(params: CreateTicketParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line camelcase
    // const { division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, brief_history, path } = params;
    const { division, po, tkttitle, tktdescription, tktpriority, tktstatus, tktimage, path } = params;

  let uploadedImageUrl = "";

    if (tktimage) {
      const result = await cloudinary.uploader.upload(tktimage, {
        folder: "tickets",
      });

      uploadedImageUrl = result.secure_url;
    }

    // Create the ticket
    const ticket = await Ticket.create({
      division,
      po,
      tkttitle,
      tktdescription,
      tktpriority,
      tktstatus,
      tktimage: uploadedImageUrl,
    });
//  const tagDocuments = [];

 // Create the tags or get them if they already exist
    // for (const tag of tags) {
    //   const existingTag = await Tag.findOneAndUpdate(
    //     { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
    //     { $setOnInsert: { name: tag }, $push: { departmentalbldgs: dopbldg._id } },
    //     { upsert: true, new: true }
    //   )

    //   tagDocuments.push(existingTag._id);
    // }

    await Ticket.findByIdAndUpdate(ticket._id, {
    //   $push: { tags: { $each: tagDocuments }}
    });
       // Create an interaction record for the user's ask_question action
    
    // Increment author's reputation by +5 for creating a question

    // revalidate path inorder to display question wihtout reloading
       
    revalidatePath(path)
    return ticket ;

  } catch (error) {
      console.log(error);
    throw error;
  }
}

export async function getTicketById(params: GetTicketByIdParams) {
  try {
    connectToDatabase();

    const { ticketId } = params;

    const ticket = await Ticket.findById(ticketId)
    //   .populate({ path: 'tags', model: Tag, select: '_id name'})
      .populate({ path: 'author', model: User, select: '_id clerkId name picture'})
      // console.log(template)
      return ticket;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editTicket(params: EditTicketParams) {
  try {
    connectToDatabase();

    // const { departmentalbldgId, division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, brief_history, path } = params;
    const { ticketId, division, po, tkttitle, tktdescription, tktpriority, tktstatus, tktimage, path } = params;

    const ticket = await Ticket.findById(ticketId);

    if(!ticket) {
      throw new Error("Record not found");
    }
    ticket.division = division;
    ticket.po = po;
    ticket.tkttitle = tkttitle;
      ticket.tktdescription = tktdescription;
      ticket.tktpriority = tktpriority;
      ticket.tktstatus = tktstatus;
      ticket.tktimage = tktimage;
   
      if (tktimage) {
      const result = await cloudinary.uploader.upload(tktimage, {
        folder: "tickets",
      });
      ticket.tktimage = result.secure_url;
    }

    await ticket.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTicket(params: DeleteTicketParams) {
  try {
    connectToDatabase();

    const { ticketId, path } = params;

    await Ticket.deleteOne({ _id: ticketId });
    // await Tag.updateMany({ departmentalbldgs: departmentalbldgId }, { $pull: { departmentalbldgs: departmentalbldgId }});

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}


