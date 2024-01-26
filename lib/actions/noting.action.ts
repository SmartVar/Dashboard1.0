"use server"

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateNotingsParams, GetNotingsParams, EditNotingParams } from "./shared.types";
import Noting, { INoting } from "@/database/noting.model";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

export async function getNotings(params: GetNotingsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Noting> = {};

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

    const totalNotings = await Noting.countDocuments(query);

    const notings = await Noting.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

      const isNext = totalNotings > skipAmount + notings.length;

    return { notings, isNext }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createNoting(notingData: CreateNotingsParams) {
  try {
    connectToDatabase();

    const newNoting = await Noting.create(notingData);

    return newNoting;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if(!user) {
      throw new Error('User not found');
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

    // delete user questions
    await Noting.deleteMany({ author: user._id });
    await Drafting.deleteMany({ author: user._id });
    await Briefhistory.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editNoting(params: EditNotingParams) {
  try {
    connectToDatabase();

    const { notingId, title, category, description, section, path } = params;

    const noting = await Noting.findById(notingId);

    if(!noting) {
      throw new Error("Question not found");
    }

    noting.title = title;
    noting.category = category;
    noting.description = description;
    noting.section = section;

    await noting.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}