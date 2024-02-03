import { formatAndDivideNumber } from "@/lib/utils"
// import { BadgeCounts } from "@/types";
import Image from "next/image";
import Link from "next/link";

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

const Stats = ({ totalDopBldg, totalRentBldg, totalSQ, totalIQ, totalVacantPlots, totalReservedPlots, totalPendingCorr, totalUsCorr, badges=200,  reputation }: Props) => {
  return (
    
    <>
    <div className="mt-10">
    <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
      <StatsCard
        imgUrl="/assets/icons/gold-medal.svg"
        value={reputation}
        title="Reputation" />
      {/* <StatsCard
        imgUrl="/assets/icons/silver-medal.svg"
        value={badges}
        title="Silver Badges" /> */}
      {/* <h4 className="h3-semibold text-dark200_light900">Stats - {reputation}</h4> */}

     

        
          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <Link href="/dopbldg" className="flex justify-start max-sm:w-full">
            <div>
              <p className="paragraph-semibold text-dark200_light900">

                {formatAndDivideNumber(totalDopBldg)}

              </p>
              <p className="body-medium text-dark400_light700">Dop Bldg</p>
            </div>
            </Link>
            <Link href="/rentbldg" className="flex justify-start max-sm:w-full">
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {formatAndDivideNumber(totalRentBldg)}
              </p>
              <p className="body-medium text-dark400_light700">Rented Bldg</p>
            </div>
            </Link>
          </div>
        
          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <Link href="/plot" className="flex justify-start max-sm:w-full">
            <div>
              <p className="paragraph-semibold text-dark200_light900">

              {formatAndDivideNumber(totalVacantPlots)}

              </p>
              <p className="body-medium text-dark400_light700">Vacant Plots</p>
            </div>
            </Link>
            <Link href="/plot" className="flex justify-start max-sm:w-full">
            <div>
              <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalReservedPlots)}
              </p>
              <p className="body-medium text-dark400_light700">Reserved Plots</p>
            </div>
            </Link>
          </div>
          
          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <Link href="https://docs.google.com/spreadsheets/d/1yu6KyEb5AKWT9dqwxngUgdYhFnWULncR/edit?usp=sharing&ouid=111668525627032573578&rtpof=true&sd=true" className="flex justify-start max-sm:w-full">
            <div>
              <p className="paragraph-semibold text-dark200_light900">

              {formatAndDivideNumber(totalSQ)}

              </p>
              <p className="body-medium text-dark400_light700">Total Staff Quarters</p>
            </div>
            </Link>
            <Link href="https://docs.google.com/spreadsheets/d/1yu6KyEb5AKWT9dqwxngUgdYhFnWULncR/edit?usp=sharing&ouid=111668525627032573578&rtpof=true&sd=true" className="flex justify-start max-sm:w-full">
            <div>
              <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalIQ)}
              </p>
              <p className="body-medium text-dark400_light700">Total Inspection Quarters</p>
            </div>
            </Link>
          </div>
          
          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <Link href="/pendency" className="flex justify-start max-sm:w-full">
            <div>
              <p className="paragraph-semibold text-dark200_light900">

              {formatAndDivideNumber(totalPendingCorr)}

              </p>
              <p className="body-medium text-dark400_light700">Pending Corr</p>
            </div>
            </Link>
            <Link href="/pendency" className="flex justify-start max-sm:w-full">
            <div>
              <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalUsCorr)}
              </p>
              <p className="body-medium text-dark400_light700">Under Submission Corr</p>
            </div>
            </Link>
          </div>
        
        
        
    </div>    
  
</div>
    </>
  )
}

export default Stats