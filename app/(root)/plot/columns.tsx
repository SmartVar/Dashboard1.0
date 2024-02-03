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
    accessorKey: "name",
    // header: "Plot Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plot Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "date_purchase",
    // header: "Date of Purchase",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Purchase
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "purchase_from",
    header: "Plot purchased from",
  },
  {
    accessorKey: "amount",
    // header: "Amount of Plot (in Rs.)",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount of Plot (in Rs.)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "lease_period",
    // header: "Lease Period of Plot",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lease Period of Plot
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "enchroached",
    // header: "Whether Plot is enchorached?",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Whether Plot is enchroached
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "enchroached_area",
    // header: "If enchroached than Area (in Sq. mtr)",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          If enchroached, Area (in Sq. mtr)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "boundary_wall",
    // header: "Boundary wall constructed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Boundary wall constructed
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "po_constructed",
    // header: "Is PO constructed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is PO Constructed
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "area",
    // header: "Area of plot (Sq. mtr)",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Area of plot (Sq. mtr)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "moa",
    // header: "Mode of Acquisition",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mode of Acquisition
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  
  {
    accessorKey: "purpose",
    header: "Purpose of plot purchased",
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
    // header: "Location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "local_body",
    // header: "Local Body",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Local Body
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  
  
    ]
