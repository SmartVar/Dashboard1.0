import Link from 'next/link';
import React from 'react'
// import RenderTag from '../shared/RenderTag';
// import RenderTag from '../shared/RenderTag';
import Metric from '../shared/Metric';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteAction from '../shared/EditDeleteAction';

interface TicketProps {
  _id: string;
  division: string;
    author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  po: string[];
    tkttitle: string;
  tktdescription: string;
  tktstatus: string;
  tktpriority: string;
//   views: number;
//   answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const TicketCard = ({
  clerkId,
  _id,
  division,
//   tags,
  author,
  po,
  tkttitle,
  tktdescription,
  tktstatus,
  tktpriority,
//   views,
//   answers,
  createdAt
}: TicketProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/ticket/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {division} 
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Ticket" itemId={JSON.stringify(_id)} url={''} />
          )}
        </SignedIn>
      </div>
      
      {/* <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div> */}

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric 
            imgUrl={author.picture}
            alt="user"
            value={author.name}
            title={` - asked ${getTimestamp(createdAt)}`}
            href={`/profile/${author._id}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
          />
          <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
            <Metric 
              imgUrl="/assets/icons/like.svg"
              alt="po"
              value={formatAndDivideNumber(po.length)}
              title=" Votes"
              textStyles="small-medium text-dark400_light800"
            />
            <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/icons/like.svg"
            alt="title"
            value={tkttitle}
            title=" Title"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/like.svg"
            alt="description"
            value={tktdescription}
            title=" Description"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/like.svg"
            alt="status"
            value={tktstatus}
            title=" Status"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/message.svg"
            alt="priority"
            value={tktpriority}
            title=" Priority"
            textStyles="small-medium text-dark400_light800"
          />
          
      </div>
      </div>
      
    </div>
    </div>
  );
};

export default TicketCard;