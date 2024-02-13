import Taskform from '@/components/forms/Taskform'
import { getTaskById } from '@/lib/actions/task.action';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs'

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
// const userId = 'user_2bCX55zAAaS74JAT0pGe59OjuhVCL123';
// const { userId } = auth();

  if (userId !== 'user_2bYFxpFNNNEJclp29nFXHzrnJCh') return <h1 className="h1-bold text-dark100_light900">"You are not authorized to view the content"</h1>;
  if(!userId) return null;

  const mongoUser = await getUserById({ userId })
  const result = await getTaskById({ taskId: params.id})
  
  // console.log(result);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">
        Edit Record</h1>

      <div className="mt-9">
        <Taskform
          type="Edit"
          mongoUserId={mongoUser._id}
          taskDetails={JSON.stringify(result)}
        />
      </div>
    </>
  )
}

export default Page