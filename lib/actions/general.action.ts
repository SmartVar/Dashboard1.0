// "use server"

// // @ts-nocheck
// // import Template from "@/database/template.model";
// import { connectToDatabase } from "../mongoose";
// import { SearchParams } from "./shared.types";
// // import User from "@/database/user.model";
// // import Ruling from "@/database/ruling.model";
// import Departmentalbldg from "@/database/departmentalbldg.model";
// import Rentedbldg from "@/database/rentedbldg.model";
// import Plot from "@/database/plot.model";
// import Event from "@/database/event.model";
// import Ticket from "@/database/ticket.model";
// import Tag from "@/database/tag.model";
// // import Pendency from "@/database/pendency.model";

// const SearchableTypes = [ "departmentalbldg", "rentedbldg", "plot", "event", "ticket", "tags"];

// export async function globalSearch(params: SearchParams) {
//   try {
//     await connectToDatabase();

//     const { query, type } = params;
//     const regexQuery = { $regex: query, $options: "i" };

//     let results = [];

//     const modelsAndTypes = [
//       { model: Departmentalbldg, searchField: 'po', type: 'departmentalbldg'},
//       { model: Rentedbldg, searchField: 'po', type: 'rentedbldg'},
//       { model: Plot, searchField: 'name', type: 'plot'},
//       { model: Event, searchField: 'title', type: 'event'},
//       { model: Ticket, searchField: 'title', type: 'ticket'},
//       { model: Tag, searchField: 'name', type: 'tag'},
//       // { model: User, searchField: 'name', type: 'user'},
//       // { model: Ruling, searchField: 'title', type: 'ruling'},
//       // { model: Pendency, searchField: 'title', type: 'pendency'},
//     ]

//     const typeLower = type?.toLowerCase();

//     if(!typeLower || !SearchableTypes.includes(typeLower)) {
//       // SEARCH ACROSS EVERYTHING

//       for (const { model, searchField, type } of modelsAndTypes) {
//         const queryResults = await model
//           .find({ [searchField]: regexQuery })
//           .limit(2);

//           results.push(
//             ...queryResults.map((item) => ({
//               title: type === 'template' 
//               ? `Template containing ${query}` 
//               : item[searchField],
//               type,
//               id: type === 'user'
//                 ? item.clerkId
//                 : type==='template'
//                   ? item.template
//                   : item._id
//               }))
//           )
//       }
//     } else {
//       // SEARCH IN THE SPECIFIED MODEL TYPE
//       const modelInfo = modelsAndTypes.find((item) => item.type === type);

//       console.log({modelInfo, type});
//       if (!modelInfo) {
//         throw new Error("Invalid search type");
//       }

//       const queryResults = await modelInfo.model
//         .find({ [modelInfo.searchField]: regexQuery })
//         .limit(8);

//       results = queryResults.map((item) => ({
//         title:
//           type === "ruling"
//             ? `Ruling containing ${query}`
//             : item[modelInfo.searchField],
//         type,
//         id:
//           type === "user"
//             ? item.clerkId
//             : type === "ruling"
//             ? item.ruling
//             : item._id,
//       }));
//     }

//     return JSON.stringify(results);
//   } catch (error) {
//     console.log(`Error fetching global results, ${error}`);
//     throw error;
//   }
// }


"use server";

// @ts-nocheck
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";

import Departmentalbldg from "@/database/departmentalbldg.model";
import Rentedbldg from "@/database/rentedbldg.model";
import Plot from "@/database/plot.model";
import Event from "@/database/event.model";
import Ticket from "@/database/ticket.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["departmentalbldg", "rentedbldg", "plot", "event", "ticket", "tag"];

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Departmentalbldg, searchField: 'po', type: 'dopbldgs' },
      { model: Rentedbldg, searchField: 'po', type: 'rentedbldgs' },
      { model: Plot, searchField: 'name', type: 'plots' },
      { model: Event, searchField: 'title', type: 'events' },
      { model: Ticket, searchField: 'title', type: 'tkts' },
      { model: Tag, searchField: 'name', type: 'tags' },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // GLOBAL SEARCH ACROSS ALL MODELS
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title: item[searchField],
            type,
            id: item._id,
          }))
        );
      }
    } else {
      // TYPE-SPECIFIC SEARCH
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);
      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResults.map((item) => ({
        title: item[modelInfo.searchField],
        type: typeLower,
        id: item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.error(`Error in globalSearch: ${error}`);
    throw error;
  }
}
