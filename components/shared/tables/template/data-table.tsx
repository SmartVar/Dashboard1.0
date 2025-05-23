/* eslint-disable no-redeclare */
"use client"
// @ts-ignore
// @ts-nocheck
import * as React from "react"
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  
} from "@tanstack/react-table"
// import EditableCell from "../EditableCell";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTablePagination } from "./DataTablePagination"
// import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
 
  const [columnVisibility, setColumnVisibility] =
  React.useState<VisibilityState>({})
 
  const [sorting, setSorting] = React.useState<SortingState>([])
  
  // const [data, setData] = useState(data);
  const table = useReactTable({
    // @ts-ignore
   
    setData,
    

    // @ts-ignore
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnVisibility,
      sorting,
    },
    // meta: {
    //   updateData: (rowIndex: string | number, columnId: any, value: any) =>
    //     setData((prev: any[]) =>
    //       prev.map((row: any, index: string | number) =>
    //         index === rowIndex
    //           ? {
    //             // @ts-ignore
    //               ...prev[rowIndex],
    //               [columnId]: value,
    //             }
    //           : row
    //       )
    //     ),
    // },

  })

  return (
    <div>
       <div className="flex items-center py-4">
       <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline" className="ml-auto"> */}
            <Button variant="ghost" className="text-dark500_light700 small-regular border-none bg-light-900 capitalize  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="text-dark500_light700 small-regular border-none bg-light-900 capitalize  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    <div className="overflow-auto rounded-lg border shadow">
   
      <Table>
        <TableHeader className='paragraph-semibold text-dark300_light700'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="paragraph-semibold text-dark300_light700"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="mt-10 flex-wrap gap-6">
                    
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="paragraph-semibold text-dark300_light700">
              <TableCell colSpan={columns.length} className="h-12 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="body-medium text-dark200_light800 flex w-full items-center justify-center gap-2" >
    <DataTablePagination table={table} />

        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="light-border-2 btn flex min-h-[36px] 
        items-center justify-center gap-2 border  bg-primary-500"
        >
          <p className="body-medium text-dark200_light800">Previous</p>
        </Button>
      
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="light-border-2 btn flex min-h-[36px] 
        items-center justify-center gap-2 border  bg-primary-500"
        >
          <p className="body-medium text-dark200_light800">Next</p>
        </Button> */}
      </div>
    </div>
  )
}
function setData(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}