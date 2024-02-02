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
export type PlotDef = {
    _id: string;
    division: string;
    name: string;
    district: string;
    location: string;
    local_body: string;
    area: string;
    moa: string;
    date_purchase: string;
    purchase_from: string;
    amount: string;
    purpose: string;
    lease_period: string;
    enchroached: string;
    enchroached_area: string;
    boundary_wall: string;
    po_constructed: string;
    createdOn: Date;
}

export const columns: ColumnDef<PlotDef>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const plot = row.original
 
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
              onClick={() => navigator.clipboard.writeText(plot._id)}
            >
             <Link href={`/plot/${plot._id}`}
          className="flex items-center justify-start gap-1"  >View Content</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(template.id)}
            >
             <Link href={`/templates/edit/${template._id}`}
          className="flex items-center justify-start gap-1">Edit Row</Link></DropdownMenuItem> */}
            <DropdownMenuItem 
            className="text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400"
            onClick={() => navigator.clipboard.writeText(plot._id)}>
            <EditDeleteAction type='Edit' itemId={JSON.stringify(plot._id)} url="/plot"/>
            Edit Row</DropdownMenuItem>
            <DropdownMenuItem 
            className="text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400"
            onClick={() => navigator.clipboard.writeText(plot._id)}>
            <EditDeleteAction type='Delete' itemId={JSON.stringify(plot._id)} url="/plot"/>
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
    accessorKey: "name",
    header: "Plot Name",
  },
  {
    accessorKey: "district",
    header: "District/Panchayat",
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "local_body",
    header: "Local Body",
  },
  {
    accessorKey: "area",
    header: "Area of plot (Sq. mtr)",
  },
  {
    accessorKey: "moa",
    header: "Mode of Acquisition",
  },
  {
    accessorKey: "date_purchase",
    header: "Date of Purchase",
  },
  {
    accessorKey: "purchase_from",
    header: "PLot purchased from",
  },
  {
    accessorKey: "amount",
    header: "Amount of Plot (in Rs.)",
  },
  {
    accessorKey: "purpose",
    header: "Purpose of plot purchased",
  },
  {
    accessorKey: "lease_period",
    header: "Lease Period of Plot",
  },
  {
    accessorKey: "enchroached",
    header: "Whether Plot is enchorached?",
  },
  {
    accessorKey: "enchroached_area",
    header: "If enchroached than Area (in Sq. mtr)",
  },
  {
    accessorKey: "boundary_wall",
    header: "Boundary wall constructed",
  },
  {
    accessorKey: "po_constructed",
    header: "Is PO constructed",
  },
  
    ]
