/* eslint-disable camelcase */
import Link from 'next/link';
import React from 'react'
// import RenderTag from '../shared/RenderTag';
import RenderTag from '../shared/RenderTag';
import Metric from '../shared/Metric';
// import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteAction from '../shared/EditDeleteAction';
// import { getTimestamp } from '@/lib/utils';

interface PlotProps {
  _id: string;
  division: string;
  name: string;
    date_purchase: string;
  purchase_from: string;
   area: string;
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
  lease_period: string;
//   views: number;
//   answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const PlotCard = ({
  clerkId,
  _id,
  division,
  name,
  date_purchase,
  purchase_from,
  // eslint-disable-next-line camelcase
  area,
  tags,
  author,
   lease_period,
//   views,
//   answers,
  createdAt
}: PlotProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            YoP - {date_purchase}
          </span>
          <Link href={`/plot/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold line-clamp-1 flex-1 text-primary-500">
              {name} 
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
              unit=""
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
              imgUrl="/assets/icons/rightarrow.svg"
              alt="Class"
              value={purchase_from}
              title="Owner - "
              unit=""
              textStyles="small-medium text-dark400_light800"
            />
            <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
            <Metric 
              imgUrl="/assets/icons/rightarrow.svg"
              alt="area"
              value={area}
              title="Area - "
              unit=" Sq.mtr"
              textStyles="small-medium text-dark400_light800"
            />
            <Metric 
              imgUrl="/assets/icons/rightarrow.svg"
              alt="lease"
              value={lease_period}
              title="Lease - "
              unit=""
              textStyles="small-medium text-dark400_light800"
            />
            {/* <Metric 
              imgUrl="/assets/icons/eye.svg"
              alt="eye"
              value={po}
              title=" Views"
              textStyles="small-medium text-dark400_light800"
            /> */}
          </div>
          </div>
      </div>
      
    </div>
  )
}

export default PlotCard
