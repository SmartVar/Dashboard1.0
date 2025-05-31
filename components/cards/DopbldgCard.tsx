import Link from 'next/link';
import React from 'react'
// import RenderTag from '../shared/RenderTag';
import RenderTag from '../shared/RenderTag';
import Metric from '../shared/Metric';
// import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteAction from '../shared/EditDeleteAction';
import { getTimestamp } from '@/lib/utils';

interface DepartmentalbldgProps {
  _id: string;
  division: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  po: string;
//   views: number;
//   answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const DopbldgCard = ({
  clerkId,
  _id,
  division,
  tags,
  author,
  po,
//   views,
//   answers,
  createdAt
}: DepartmentalbldgProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/dopbldg/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {po} 
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Departmentalbldg" itemId={JSON.stringify(_id)} url={''} />
          )}
        </SignedIn>
      </div>
      
      <div className="mt-3.5 flex flex-wrap gap-2">
        {Array.isArray(tags) && tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
          {/* <Metric 
            // imgUrl={author.picture}
            imgUrl="/assets/icons/like.svg"
            alt="user"
            value={author.name}
            title={` - asked ${getTimestamp(createdAt)}`}
            href={`/profile/${author._id}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
          /> */}
          <Metric 
              imgUrl="/assets/icons/message.svg"
              alt="division"
              value={division}
              title=" Dn"
              textStyles="small-medium text-dark400_light800"
            />
          <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
            {/* <Metric 
              imgUrl="/assets/icons/like.svg"
              alt="po"
              value={formatAndDivideNumber(po.length)}
              title=" Votes"
              textStyles="small-medium text-dark400_light800"
            /> */}
            
            <Metric 
              imgUrl="/assets/icons/eye.svg"
              alt="post office"
              value={po}
              title=" Post office"
              textStyles="small-medium text-dark400_light800"
            />
            <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
            <Metric 
              imgUrl="/assets/icons/like.svg"
              alt="Upvotes"
              value={po}
              title=" Votes"
              textStyles="small-medium text-dark400_light800"
            />
            <Metric 
              imgUrl="/assets/icons/message.svg"
              alt="message"
              value={division}
              title=" Answers"
              textStyles="small-medium text-dark400_light800"
            />
            <Metric 
              imgUrl="/assets/icons/eye.svg"
              alt="eye"
              value={po}
              title=" Views"
              textStyles="small-medium text-dark400_light800"
            />
          </div>
          </div>
      </div>
      
    </div>
  )
}

export default DopbldgCard