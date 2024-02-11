import Records from '@/components/forms/Records'
import { getTemplateById } from '@/lib/actions/template.action';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs'

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
// const userId = 'user_2bCX55zAAaS74JAT0pGe59OjuhVCL123';


  if (userId !== 'user_2bYFxpFNNNEJclp29nFXHzrnJCh') return <h1 className="h1-bold text-dark100_light900">"You are not authorized to view the content"</h1>;
  if(!userId) return null;

  const mongoUser = await getUserById({ userId })
  const result = await getTemplateById({ templateId: params.id})
  
  // console.log(result);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">
        Edit Record</h1>

      <div className="mt-9">
        <Records
          type="Edit"
          mongoUserId={mongoUser._id}
          templateDetails={JSON.stringify(result)}
        />
      </div>
    </>
  )
}

export default Page