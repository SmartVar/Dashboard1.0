// import { promises as fs } from "fs"
// import path from "path"
import { Metadata } from "next"
import Image from "next/image"
// import { z } from "zod"

import { columns } from "./columns"
// import { DataTable } from "../../..//data-table"
import { DataTable } from "../../../components/task/data-table"
import { UserNav } from "../../../components/task/user-nav"
import { TaskSchema } from "@/lib/validations"
import { getTask } from "@/lib/actions/task.action"
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

export default async function TaskPage() {
  const tasks = await getTask()

  return (
    <>
      <div className="md:hidden">
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
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}