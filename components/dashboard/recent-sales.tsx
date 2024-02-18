import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar"
import { getDashTask} from "@/lib/actions/task.action"

export async  function RecentSales() {
  // eslint-disable-next-line no-undef
  // const tasks = await getTask({});
  const tasks = await getDashTask({});
 
  return (
    <div className="space-y-8">
      
      
      { tasks.map((task)=>(
        <>
         <div className="flex items-center overflow-hidden">

<Avatar className="h-9 w-9">
  <AvatarImage src="/avatars/01.png" alt="Avatar" />
  <AvatarFallback>{task.division}</AvatarFallback>
</Avatar>
<div className="ml-4 space-y-1">
  <p className="text-sm font-medium leading-none">{task.title}</p>
  {/* <p className="text-sm text-muted-foreground">
  {counttasks.dashtasklow}
  </p> */}
</div>
<div className="align-right ml-auto space-y-1 font-medium">{task.doc}</div>

</div>
        </>

      ))
       
      }
      </div>
      )}