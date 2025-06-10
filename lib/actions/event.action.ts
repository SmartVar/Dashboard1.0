/* eslint-disable camelcase */
// @ts-ignore
"use server"
// import Tag from "@/database/tag.model";
// import User from "@/database/user.model";
// import Departmentalbldg from "@/database/departmentalbldg.model";
import Event from "@/database/event.model";
import { connectToDatabase } from "../mongoose"
// import { DeleteDopBldgParams,EditDopBldgParams, GetDopBldgByIdParams,GetDopBldgsParams, CreateDopBldgParams } from "./shared.types";
import { DeleteEventParams,EditEventParams, GetEventByIdParams,GetEventsParams, CreateEventParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";


export async function getAllEvents(params: GetEventsParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // Calculcate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Event> = {};

    if(searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i")}},
        { title: { $regex: new RegExp(searchQuery, "i")}},
        { section: { $regex: new RegExp(searchQuery, "i")}},
        
      ]
    }
    
    let sortOptions = {};
    
    switch (filter) 
    {
        case "all":
          sortOptions = { section: 'all' }
          break;
        case "bldg-1":
          sortOptions = { section: 'Bldg-1' }
          break;
        case "bldg-2":
          sortOptions = { section: 'Bldg-2' }
          break;
        case "bldg-3":
          sortOptions = { section: 'Bldg-3' }
          break;
        case "other":
          sortOptions = { section: 'other' }
          break;
         default:
          break;
      }
  

    const event = await Event.find(query)
    .sort(sortOptions)
    // .populate({ path: 'author', model: User })
    // .populate({ path: 'tags', model: Tag })
    // eslint-disable-next-line no-undef
    .skip(skipAmount)
    // eslint-disable-next-line no-unused-vars
    const totalEvents = await Event.countDocuments(query);
const isNext = totalEvents > skipAmount + event.length;

// console.log(dopbldg);
// @ts-ignore
    return {event,isNext};

  } catch (error) {
    console.log(error)
    throw error;
  }
}
  
export async function createEvent(params: CreateEventParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line camelcase
    // const { division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, brief_history, path } = params;
    const { division, title, description, section, event_date, ro_corr, division_corr, status, tot_reminder, path } = params;
    // const { division, po, tags, classes, soa, area, path } = params;

    // Create the question
    const event = await Event.create({
      division,
      title,
      description,
      section,
      event_date,
      ro_corr,
      division_corr,
      status,
      tot_reminder,
    });

    revalidatePath(path)
    return event ;

  } catch (error) {
    
  }
}

export async function getEventById(params: GetEventByIdParams) {
  try {
    connectToDatabase();

    const { eventId } = params;

    const event = await Event.findById(eventId)
      return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editEvent(params: EditEventParams) {
  try {
    connectToDatabase();

    // const { departmentalbldgId, division, po, classes, location, purchase_year, soa, paq, area, builtup_area, open_space, floors, value, year, expenditure, mut_doc, mut_state, fund_type, fund_amount, cases, case_description, brief_history, path } = params;
    const { eventId, division, title, description, section, event_date, ro_corr, division_corr, status, tot_reminder, path } = params;
    // const { departmentalbldgId, division, po, classes, soa, area, path } = params;

    const event = await Event.findById(eventId);

    if(!event) {
      throw new Error("Event not found");
    }
    event.division = division;
    event.title = title;
    event.description = description;
    event.section = section;
    event.event_date = event_date;
    event.ro_corr = ro_corr;
    event.division_corr = division_corr;
    event.status = status;
    event.tot_reminder = tot_reminder;
    await event.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteEvent(params: DeleteEventParams) {
  try {
    connectToDatabase();

    const { eventId, path } = params;

    await Event.deleteOne({ _id: eventId });
   
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}


