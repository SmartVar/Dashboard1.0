/* eslint-disable no-lone-blocks */
"use client";
// @ts-ignore
// "use server";

import { deletePlot } from "@/lib/actions/plot.action";
import { deleteRentBldg } from "@/lib/actions/rentedbldg.action";
// import { deleteTemplate} from "@/lib/actions/template.action";
import { deleteDopBldg} from "@/lib/actions/departmentalbldg.action";
// import { deletePendency} from "@/lib/actions/pendency.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// import { deleteTask } from "@/lib/actions/task.action";
import { deleteTicket } from "@/lib/actions/ticket.action";
// import { auth } from '@clerk/nextjs'

interface Props {
  type: string;
  itemId: string;
  url: string;
}

const EditDeleteAction = ({ type, itemId, url }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  // console.log(url);
  const handleEdit = () => {
    // const { userId } = auth();

  // if (userId !== 'user_2bYFxpFNNNEJclp29nFXHzrnJCh') return <h1 className="h1-bold text-dark100_light900">"You are not authorized to view the content"</h1>; 

  // if(!userId) return null;
    // router.push(`/templates/edit/${JSON.parse(itemId)}`)
    router.push(`${url}/edit/${JSON.parse(itemId)}`)
  };

  const handleDelete = async () => {
  //   const { userId } = auth();

  // if (userId !== 'user_2bYFxpFNNNEJclp29nFXHzrnJCh') return <h1 className="h1-bold text-dark100_light900">"You are not authorized to view the content"</h1>; 

  // if(!userId) return null;

      // Delete template

{ url === '/rentbldg'
  ? await deleteRentBldg({ 
    rentbldgId: JSON.parse(itemId), 
    path: pathname 
  }
  )
  : url === '/dopbldg'
  ? await deleteDopBldg({ 
    departmentalbldgId: JSON.parse(itemId), 
    path: pathname 
  }
  )
  : url === '/plot'
  ? await deletePlot({ 
    plotId: JSON.parse(itemId), 
    path: pathname 
  }
  )
    : await deleteTicket({ 
    ticketId: JSON.parse(itemId), 
     path: pathname 
  })
        }
    };
  // };

  return (
    <>
    <div className="flex items-center justify-end gap-3 
    max-sm:w-full">
      
     { type==='Edit' && 
     
        <Image 
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
  }
      {type==='Delete' &&
        <Image 
          src="/assets/icons/trash.svg"
          alt="Delete"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleDelete}
        /> 
}
  
  </div>
  </>
  )
}

export default EditDeleteAction

// function deleteDepartmentalBldg(arg0: { rentbldgId: any; path: string; }) {
//   throw new Error("Function not implemented.");
// }
// function deletependency(arg0: { pendencyId: any; path: string; }) {
//   throw new Error("Function not implemented.");
// }