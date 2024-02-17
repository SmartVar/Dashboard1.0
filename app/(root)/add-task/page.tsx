
import Taskform from '@/components/forms/Taskform';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
    const { userId } = auth();

    // console.log(userId);
    // const userId = 'user_2bCX55zAAaS74JAT0pGe59OjuhVCL123'
    if (!userId) redirect('/sign-in');
  
    const mongoUser = await getUserById({ userId });
  return (
    <div>
<<<<<<< HEAD
    <h1 className="h1-bold text-dark100_light900">Enter Task</h1>
=======
    <h1 className="h1-bold text-dark100_light900">Enter New Task</h1>
>>>>>>> 861ca23a92d10eda8532bfdd04476a6e0447c20f

    <div className="mt-9">
      <Taskform mongoUserId={JSON.stringify(mongoUser._id)}/>
    </div>
  </div>
  )
}

export default Page
