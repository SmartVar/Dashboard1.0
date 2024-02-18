// import { promises as fs } from "fs"
// import path from "path"
import { Metadata } from "next"
// import Image from "next/image"
// import { z } from "zod"
import { URLProps } from '@/types'
import Filter from "@/components/shared/Filter";
import { columns } from "./columns"
// import { DataTable } from "../../..//data-table"
import { DataTable } from "../../../components/task/data-table"
// import { UserNav } from "../../../components/task/user-nav"
// import { TaskSchema } from "@/lib/validations"
import { getTask } from "@/lib/actions/task.action"
// import LocalSearchbar from "@/components/shared/search/LocalSearchbar"
import { DivisionFilters } from "@/constants/filters";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { taskSchema } from "./data/schema"

// export type TaskSchema = {
//   _id: string;
//   title: string;
//   status: string;
//   label: string;
//   priority: string;
//   createdOn: Date;
// }

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
// async function getTask() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "components/task/tasks.json")
//   )
// // "../../../components/task/tasks.json"
//   const tasks = JSON.parse(data.toString())

//   return z.array(TaskSchema).parse(tasks)
// }

export default async function TaskPage({ searchParams}: URLProps) {
  const tasks = await getTask({
    searchQuery: searchParams.q,
  filter: searchParams.filter,
//   pagefilter : searchParams.pagefilter,
  page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        
      
      </div> */}
                <div className="flex-end flex w-full flex-col-reverse justify-end gap-4 overflow-auto rounded-lg sm:flex-row sm:items-center">
      
      <Link href="/add-task" 
    className="flex justify-end max-sm:w-full">
    <Button className="primary-gradient flex-end min-h-[46px] px-4 py-3 !text-light-900">
      New Task
    </Button>
  </Link> 
</div> 
      <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-dark100_light900">Welcome back!</h2>
            <p className="text-muted-foreground text-dark100_light900">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="mt-11 flex justify-evenly w-full gap-5 max-sm:flex-col sm:items-center">
      {/* <LocalSearchbar 
        route="/task"
        iconPosition="left"
        imgSrc="/assets/icons/search.svg"
        placeholder="Search for Divisions or Post office"
        otherClasses="flex-1"
      /> */}

      <Filter
        filters={DivisionFilters}
        otherClasses="min-h-[56px] sm:min-w-[170px]"
        // containerClasses="hidden max-md:flex"
      />
    </div>


         
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <div className="mt-10 flex w-full flex-col gap-6 overflow-auto shadow">
    <DataTable columns={columns} data={tasks} />
      </div>
        {/* <DataTable data={tasks} columns={columns} /> */}
      </div>
    </>
  )
}