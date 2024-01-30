"use server"

// @ts-nocheck
import Template from "@/database/template.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import User from "@/database/user.model";
import Ruling from "@/database/ruling.model";
import Pendency from "@/database/pendency.model";

const SearchableTypes = ["template", "ruling", "pendency", "user"];

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Template, searchField: 'title', type: 'template'},
      { model: User, searchField: 'name', type: 'user'},
      { model: Ruling, searchField: 'title', type: 'ruling'},
      { model: Pendency, searchField: 'title', type: 'pendency'},
    ]

    const typeLower = type?.toLowerCase();

    if(!typeLower || !SearchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERYTHING

      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

          results.push(
            ...queryResults.map((item) => ({
              title: type === 'template' 
              ? `Template containing ${query}` 
              : item[searchField],
              type,
              id: type === 'user'
                ? item.clerkId
                : type==='template'
                  ? item.template
                  : item._id
              }))
          )
      }
    } else {
      // SEARCH IN THE SPECIFIED MODEL TYPE
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      console.log({modelInfo, type});
      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === "ruling"
            ? `Ruling containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "ruling"
            ? item.ruling
            : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error fetching global results, ${error}`);
    throw error;
  }
}
