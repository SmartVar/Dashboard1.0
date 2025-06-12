"use server"

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetDepartmentalbldgsByTagIdParams, GetPlotsByTagIdParams, GetRentedbldgsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Departmentalbldg from "@/database/departmentalbldg.model";
import Rentedbldg from "@/database/rentedbldg.model";
import Plot from "@/database/plot.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if(!user) throw new Error("User not found");

    // Find interactions for the user and group by tags...
    // Interaction...

    return [ {_id: '1', name: 'tag'}, {_id: '2', name: 'tag2'}]
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if(searchQuery) {
      query.$or = [{name: { $regex: new RegExp(searchQuery, 'i')}}]
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 }
        break;
      case "recent":
        sortOptions = { createdAt: -1 }
        break;
      case "name":
        sortOptions = { name: 1 }
        break;
      case "old":
        sortOptions = { createdAt: 1 }
        break;
    
      default:
        break;
    }

    const totalTags = await Tag.countDocuments(query);

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

      const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext }
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getDopBldgByTagId(params:GetDepartmentalbldgsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId};

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'departmentalbldgs',
      model: Departmentalbldg,
      strictPopulate: false,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' }}
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1 // +1 to check if there is next page
      },
      populate: [
        { path: 'tags', model: Tag, select: "_id name" },
        { path: 'author', model: User, select: '_id clerkId name picture'}
      ]
    })

    if(!tag) {
      throw new Error('Tag not found');
    }


    const isNext = tag.departmentalbldgs?.length > pageSize;
    

       
    const departmentalbldgs = tag.departmentalbldgs;

     return { tagTitle: tag.name, departmentalbldgs, isNext };
    // return { tagTitle: tag.name, departmentalbldgs };

  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getRentBldgByTagId(params:GetRentedbldgsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId};

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'rentedbldgs',
      model: Rentedbldg,
      strictPopulate: false,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' }}
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1 // +1 to check if there is next page
      },
      populate: [
        { path: 'tags', model: Tag, select: "_id name" },
        { path: 'author', model: User, select: '_id clerkId name picture'}
      ]
    })

    if(!tag) {
      throw new Error('Tag not found');
    }


    const isNext = tag.rentedbldgs?.length > pageSize;
    
   
    
    const rentedbldgs = tag.rentedbldgs;

    return { tagTitle: tag.name, rentedbldgs, isNext };
   // return { tagTitle: tag.name, rentedbldgs };

  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getPlotByTagId(params:GetPlotsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId};

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'plots',
      model: Plot,
      strictPopulate: false,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' }}
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1 // +1 to check if there is next page
      },
      populate: [
        { path: 'tags', model: Tag, select: "_id name" },
        { path: 'author', model: User, select: '_id clerkId name picture'}
      ]
    })

    if(!tag) {
      throw new Error('Tag not found');
    }


    const isNext = tag.plots?.length > pageSize;

    
    const plots = tag.plots;

    return { tagTitle: tag.name, plots, isNext };
   // return { tagTitle: tag.name, plots };

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfDepartmentalbldgs: { $size: "$departmentalbldgs" }}},
      { $sort: { numberOfDepartmentalbldgs: -1 }}, 
      { $limit: 5 }
    ])

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
