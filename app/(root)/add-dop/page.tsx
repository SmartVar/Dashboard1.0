
import Dopform from '@/components/forms/Dopform';
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
    <h1 className="h1-bold text-dark100_light900">Enter Dop Records</h1>

    <div className="mt-9">
      <Dopform mongoUserId={JSON.stringify(mongoUser._id)}/>
    </div>
  </div>
  )
}

export default Page
