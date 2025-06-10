import Eventform from '@/components/forms/Eventform'
import { getEventById } from '@/lib/actions/event.action';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs'

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
// const userId = 'user_2bCX55zAAaS74JAT0pGe59OjuhVCL123';


  // if (userId !== 'user_2xE0rOdHAhwFougKDM5i3LWAzUn') return <h1 className="h1-bold text-dark100_light900">"You are not authorized to view the content"</h1>;
  if(!userId) return null;

  const mongoUser = await getUserById({ userId })
  const result = await getEventById({ eventId: params.id})
  
  // console.log(result);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">
        Edit Record</h1>

      <div className="mt-9">
        <Eventform
          type="Edit"
          mongoUserId={mongoUser._id}
          eventDetails={JSON.stringify(result)}
        />
      </div>
    </>
  )
}

export default Page