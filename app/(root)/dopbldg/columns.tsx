"use client"
// @ts-ignore

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
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
export type DopBldgDef = {
    _id: string;
    division: string;
    po: string;
    class: string;
    location: string;
    purchase_year: string;
    soa: number;
    paq: string;
    area: number;
    builtup_area: number;
    open_space: number;
    floors: string;
    value: number;
    year: string;
    expenditure: number;
    createdOn: Date;
}

export const columns: ColumnDef<DopBldgDef>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const departmentalbldg = row.original
 
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
              onClick={() => navigator.clipboard.writeText(departmentalbldg._id)}
            >
             <Link href={`/dopbldg/${departmentalbldg._id}`}
          className="flex items-center justify-start gap-1"  >View Content</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(template.id)}
            >
             <Link href={`/templates/edit/${template._id}`}
          className="flex items-center justify-start gap-1">Edit Row</Link></DropdownMenuItem> */}
            <DropdownMenuItem 
            className="text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400"
            onClick={() => navigator.clipboard.writeText(departmentalbldg._id)}>
            <EditDeleteAction type='Edit' itemId={JSON.stringify(departmentalbldg._id)} />
            Edit Row</DropdownMenuItem>
            <DropdownMenuItem 
            className="text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400"
            onClick={() => navigator.clipboard.writeText(departmentalbldg._id)}>
            <EditDeleteAction type='Delete' itemId={JSON.stringify(departmentalbldg._id)} />
           Delete Row</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
 
  {
    accessorKey: "division",
    header: "Division",
  },
  {
    accessorKey: "po",
    header: "Post Office",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    accessorKey: "location",
    header: "Rural/Urban",
  },
  {
    accessorKey: "purchase_year",
    header: "Purchase Year",
  },
  {
    accessorKey: "soa",
    header: "SOA (in Sq ft)",
  },
  {
    accessorKey: "paq",
    header: "Post Attached Quarter",
  },
  {
    accessorKey: "area",
    header: "Area of PO (in Sq. mtr)",
  },
  {
    accessorKey: "builtup_area",
    header: "Builtup Area of PO (in Sq. mtr)",
  },
  {
    accessorKey: "open_space",
    header: "Open Space Area (in Sq. mtr)",
  },
  {
    accessorKey: "floors",
    header: "Floors",
  },
  {
    accessorKey: "value",
    header: "Values of PO bldg (in Rs.)",
  },
  {
    accessorKey: "year",
    header: "Last year of expenditure",
  },
  {
    accessorKey: "expenditure",
    header: "Expenditure incurred (in Rs.)",
  },
  // {
  //   accessorKey: "createdOn",
  //   header: "Date of Creation",
  // },

    ]
