/* eslint-disable camelcase */
// @ts-ignore
"use server"

import User from "@/database/user.model";
import Fund, { IFund } from "@/database/fund.model";
import { connectToDatabase } from "../mongoose";
import {
  GetFundsParams,
  GetFundByIdParams,
  CreateFundParams,
  EditFundParams,
  DeleteFundParams
} from "./shared.types";
import { revalidatePath } from "next/cache";

import { FilterQuery } from "mongoose";

export async function getFunds(params: GetFundsParams): Promise<IFund[]> {
  try {
    connectToDatabase();
    const { searchQuery } = params;

    const query: FilterQuery<typeof Fund> = {};

    if (searchQuery) {
      query.$or = [
        { division: { $regex: new RegExp(searchQuery, "i") } },
        { po: { $regex: new RegExp(searchQuery, "i") } },
        { fund_type: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

const funds = await Fund.find(query)
  .sort({ createdOn: -1 })
  .populate({ path: "author", model: User }) as unknown as IFund[];

    return funds;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFundById(params: GetFundByIdParams): Promise<IFund | null> {
  try {
    connectToDatabase();
    const { fundId } = params;

    return await Fund.findById(fundId)
      .populate({ path: "author", model: User }) as unknown as IFund | null;

  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function createFund(params: CreateFundParams): Promise<IFund> {
  try {
    connectToDatabase();
    const {
      fund_type,
      division,
      po,
      work,
      pe_amount,
      be_allot,
      re_allot,
      add_allot,
      tot_allot,
      tender_amount,
      progress,
      balance,
      author,
      path,
 
    } = params;

    

    const newFund = await Fund.create({
      fund_type,
      division,
      po,
      work,
      pe_amount,
      be_allot,
      re_allot,
      add_allot,
      tot_allot,
      tender_amount,
      progress,
      balance,
      author,
    
    });

    revalidatePath(path);
    return newFund;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editFund(params: EditFundParams): Promise<void> {
  try {
    connectToDatabase();
    const {
      fundId,
      fund_type,
      division,
      po,
      work,
      pe_amount,
      be_allot,
      re_allot,
      add_allot,
      tot_allot,
      tender_amount,
      progress,
      balance,
      
      path,
    } = params;

    const fund = await Fund.findById(fundId);
    if (!fund) throw new Error("Fund record not found");

    fund.fund_type = fund_type;
    fund.division = division;
    fund.po = po;
    fund.work = work;
    fund.pe_amount = pe_amount;
    fund.be_allot = be_allot;
    fund.re_allot = re_allot;
    fund.add_allot = add_allot;
    fund.tot_allot = tot_allot;
    fund.tender_amount = tender_amount;
    fund.progress = progress;
    fund.balance = balance;

 

    await fund.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFund(params: DeleteFundParams): Promise<void> {
  try {
    connectToDatabase();
    const { fundId, path } = params;
    await Fund.deleteOne({ _id: fundId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
