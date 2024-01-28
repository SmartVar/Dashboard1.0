/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable no-undef */
// @ts-nocheck
// "use client"

import ParseHTML from '@/components/shared/ParseHTML';
// import {CopyToClipboard} from 'react-copy-to-clipboard';


import { getTemplateById } from '@/lib/actions/template.action';
// import { getUserById } from '@/lib/actions/user.action';

import { auth } from '@clerk/nextjs';

import {React} from 'react'

const Page = async ({ params }) => {
  const { userId: clerkId } = auth();

//   let mongoUser;

  if(clerkId) {
    // mongoUser = await getUserById({ userId: clerkId })
  }

  const result = await getTemplateById({ templateId: params.id });
  // const [copied, setcopied] = useState(false);

  // const copyToClipboard = () => {
  //   setcopied(true);

  //   navigator.clipboard.writeText(result.descriptiion).then(
  //     () => {
  //       // console.log('copied');
  //     },
  //     (err) => {
  //       console.error(err);
  //     }
  //   );

  //   setTimeout(() => {
  //     setcopied(false);
  //   }, 500);
  // };
  return (
    <>
      <div className="flex-start w-full flex-col">
        {/* <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          {/* <Link href={`/profile/${result.author.clerkId}`}
          className="flex items-center justify-start gap-1"  >
            <Image 
              // src={result.author.picture}
              src="/assets/icons/message.svg"
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link> */}
          {/* <div className="flex justify-end">
            <Votes 
              type="Question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div> 
        </div> */}
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      {/* <div className="mb-8 mt-5 flex flex-wrap gap-4">
          <Metric 
            imgUrl="/assets/icons/clock.svg"
            alt="clock icon"
            value={` asked ${getTimestamp(result.createdAt)}`}
            title=" Asked"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric 
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatAndDivideNumber(result.answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric 
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(result.views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
      </div> */}

       <ParseHTML data={result.description} />;

       {/* {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-5 w-5"
          onClick={copyToClipboard}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
          />
        </svg>
      )} */}
      {/* // eslint-disable-next-line no-undef
      <CopyToClipboard text={text} onCopy={(_text, result) => (result)}>
   <button>Copy</button>
</CopyToClipboard> */}

      {/* <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag 
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div> */}
{/* 
      <AllAnswers 
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      <Answer 
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      /> */}
    </>
  )
}

export default Page