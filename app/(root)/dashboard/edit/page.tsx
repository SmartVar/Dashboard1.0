import Dashboard from '@/components/forms/Dashboard';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs'

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (userId !== 'user_2bYFxpFNNNEJclp29nFXHzrnJCh') return <h1 className="h1-bold text-dark100_light900">"You are not authorized to view the content"</h1>; 

  if(!userId) return null;

  const mongoUser = await getUserById({ userId })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Dashboard</h1>
      
      <div className="mt-9">
        <Dashboard 
          clerkId={userId}
          user={JSON.stringify(mongoUser)}
        />
      </div>
    </>
  )
}

export default Page