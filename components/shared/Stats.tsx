import { formatAndDivideNumber } from "@/lib/utils"
import { BadgeCounts } from "@/types";
import Image from "next/image";

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value=2, title }: StatsCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className="paragraph-semibold text-dark200_light900">
          {value}
          
        </p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  )
}

interface Props {
  totalDopBldg: number
  totalRentBldg: number
  totalSQ: number
  totalIQ: number
  totalVacantPlots: number
  totalReservedPlots: number
  totalPendingCorr: number
  totalUsCorr: number
  // badges: BadgeCounts
  badges: number
  reputation: number
}

const Stats = ({ totalDopBldg, totalRentBldg, totalSQ, totalIQ, totalVacantPlots, totalReservedPlots, totalPendingCorr, totalUsCorr, badges=2,  reputation }: Props) => {
  return (
    
    <div className="mt-10">
       <StatsCard 
          imgUrl="/assets/icons/gold-medal.svg"
          value={reputation}
          title="Reputation"
        />
        <StatsCard 
          imgUrl="/assets/icons/silver-medal.svg"
          value={badges}
          title="Silver Badges"
        />
      {/* <h4 className="h3-semibold text-dark200_light900">Stats - {reputation}</h4> */}

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalDopBldg)}
            </p>
            <p className="body-medium text-dark400_light700">Dop Bldg</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalRentBldg)}
            </p>
            <p className="body-medium text-dark400_light700">Rented Bldg</p>
          </div>
          </div>

          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalSQ)}
            </p>
            <p className="body-medium text-dark400_light700">Staff Quarters</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalIQ)}
            </p>
            <p className="body-medium text-dark400_light700">Inspection Quarters</p>
          </div>
        </div>

        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalVacantPlots)}
            </p>
            <p className="body-medium text-dark400_light700">Vacant Plots</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalReservedPlots)}
            </p>
            <p className="body-medium text-dark400_light700">Reserved Plots</p>
          </div>
         </div> 

         <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalPendingCorr)}
            </p>
            <p className="body-medium text-dark400_light700">Pending Corr</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalUsCorr)}
            </p>
            <p className="body-medium text-dark400_light700">US Corr</p>
          </div>
        </div>

       

        {/* 

        <StatsCard 
          imgUrl="/assets/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badges"
        /> */}
      </div>
    </div>
  )
}

export default Stats