"use client"

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
export type TemplateDef = {
    id: string;
    title: string;
    category: string;
    subcategory: string;
    description: string;
    section: string;
    createdOn: Date;
}

export const columns: ColumnDef<TemplateDef>[] = [
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
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "createdOn",
    header: "Date of Creation",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const template = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="background-light850_dark100 relative z-10">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(template.id)}
            >
             <Link href={`/templates/${template._id}`}
          className="flex items-center justify-start gap-1"  >View Content</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(template.id)}
            >
             <Link href={`/templates/edit/${template._id}`}
          className="flex items-center justify-start gap-1">Edit Row</Link></DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(template.id)}>
            <EditDeleteAction type='Edit' itemId={JSON.stringify(template._id)} />
            Edit Row</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(template.id)}>
            <EditDeleteAction type='Delete' itemId={JSON.stringify(template._id)} />
           Delete Row</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  ]
