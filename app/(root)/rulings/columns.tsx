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
export type RulingDef = {
    _id: string;
    title: string;
    category: string;
    subcategory: string;
    link: string;
    section: string;
    createdOn: Date;
}

export const columns: ColumnDef<RulingDef>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const ruling = row.original
 
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
              onClick={() => navigator.clipboard.writeText(ruling._id)}
            >
             <Link href={`/rulings/${ruling._id}`}
          className="flex items-center justify-start gap-1"  >View Content</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(template.id)}
            >
             <Link href={`/templates/edit/${template._id}`}
          className="flex items-center justify-start gap-1">Edit Row</Link></DropdownMenuItem> */}
            <DropdownMenuItem 
            className="text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400"
            onClick={() => navigator.clipboard.writeText(ruling._id)}>
            <EditDeleteAction type='Edit' itemId={JSON.stringify(ruling._id)} />
            Edit Row</DropdownMenuItem>
            <DropdownMenuItem 
            className="text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400"
            onClick={() => navigator.clipboard.writeText(ruling._id)}>
            <EditDeleteAction type='Delete' itemId={JSON.stringify(ruling._id)} />
           Delete Row</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "subcategory",
    header: "Sub Category",
  },
  {
    accessorKey: "link",
    header: "Link",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "createdOn",
    header: "Date of Creation",
  },

    ]
