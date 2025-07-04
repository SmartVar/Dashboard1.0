"use client"
// @ts-ignore

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import EditDeleteAction from "../../../components/shared/EditDeleteAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TicketDef = {
    _id: string;
    division: string;
    po: string;
    // class: string;
    // location: string;
    // purchase_year: string;
    // soa: number;
    // paq: string;
    // area: number;
    // builtup_area: number;
    // open_space: number;
    // floors: string;
    // value: number;
    // year: string;
    // expenditure: number;
    //   mut_doc: string;
    //   mut_state: string;
    //   fund_type: string;
    //   fund_amount: string;
    //   cases: string;
    //   case_description: string;
    //   brief_history: string;
      createdOn: Date;
}

export const columns: ColumnDef<TicketDef>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const ticket = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200'>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className='focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200'>
            <DropdownMenuLabel className="text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400">
              Actions</DropdownMenuLabel>
            <DropdownMenuItem
            className="text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400"
              onClick={() => navigator.clipboard.writeText(ticket._id)}
            >
             <Link href={`/ticket/${ticket._id}`}
          className="flex items-center justify-start gap-1"  >View Content</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(template.id)}
            >
             <Link href={`/templates/edit/${template._id}`}
          className="flex items-center justify-start gap-1">Edit Row</Link></DropdownMenuItem> */}
            <DropdownMenuItem 
            className="text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400"
            onClick={() => navigator.clipboard.writeText(ticket._id)}>
            <EditDeleteAction type='Edit' itemId={JSON.stringify(ticket._id)} url="/ticket" />
            Edit Row</DropdownMenuItem>
            <DropdownMenuItem 
            className="text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400"
            onClick={() => navigator.clipboard.writeText(ticket._id)}>
            <EditDeleteAction type='Delete' itemId={JSON.stringify(ticket._id)} url="/ticket" />
           Delete Row</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
 
  {
    accessorKey: "division",
    // header: "Division",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Division
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "po",
    // header: "Post Office",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Post Office
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "tkttitle",
    // header: "Post Office",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "tktdescription",
    // header: "Post Office",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "tktstatus",
    // header: "Post Office",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
  accessorKey: "tktimage",
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Image
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  },
  cell: ({ row }) => {
    const imageUrl = row.getValue("tktimage") as string;

    if (!imageUrl) return <span className="text-gray-400">No Image</span>;

    return (
      <a href={imageUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={imageUrl}
          alt="Ticket Image"
          className="h-10 w-10 rounded object-cover"
        />
      </a>
    );
  },
},

  // {
  //   accessorKey: "class",
  //   // header: "Class",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Class
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // // {
  // //   accessorKey: "description",
  // //   header: "Description",
  // // },
  // {
  //   accessorKey: "location",
  //   // header: "Rural/Urban",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Rural/Urban
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "purchase_year",
  //   // header: "Purchase Year",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Purchase Year
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "soa",
  //   // header: "SOA (in Sq ft)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         SOA (in Sq ft)
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "paq",
  //   // header: "Post Attached Quarter",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Post Attached Quarter
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "area",
  //   // header: "Area of PO (in Sq. mtr)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Area of PO (in Sq. mtr)
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "builtup_area",
  //   // header: "Builtup Area of PO (in Sq. mtr)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Builtup Area of PO (in Sq. mtr)
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "open_space",
  //   // header: "Open Space Area (in Sq. mtr)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Open Space Area (in Sq. mtr)
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "floors",
  //   // header: "Floors",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Floors
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "value",
  //   // header: "Values of PO bldg (in Rs.)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Value of PO bldg (in Rs.)
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "year",
  //   // header: "Last year of expenditure",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Last year of expenditure
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "expenditure",
  //   // header: "Expenditure incurred (in Rs.)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Expenditure incurred (in Rs.)
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "mut_doc",
  //   // header: "Expenditure incurred (in Rs.)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Mutation Doc Type
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "mut_state",
  //   // header: "Expenditure incurred (in Rs.)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Mutation State
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "fund_type",
  //   // header: "Expenditure incurred (in Rs.)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Fund Type
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "fund_amount",
  //   // header: "Expenditure incurred (in Rs.)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Fund Amount (in Rs.)
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "cases",
  //   // header: "Expenditure incurred (in Rs.)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Case
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "case_description",
  //   // header: "Expenditure incurred (in Rs.)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Case Description
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "brief_history",
  //   // header: "Expenditure incurred (in Rs.)",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Brief History
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "createdOn",
  //   header: "Date of Creation",
  // },

    ]