"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { deleteTemplate} from "@/lib/actions/template.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/templates/edit/${JSON.parse(itemId)}`)
  };

  const handleDelete = async () => {
    
      // Delete template
      await deleteTemplate({ 
        templateId: JSON.parse(itemId), 
        path: pathname 
      }
      )
  };

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