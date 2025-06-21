// import QuestionCard from '@/components/cards/QuestionCard'
import DopbldgCard from '@/components/cards/DopbldgCard'
import PlotCard from '@/components/cards/PlotCard'
import RentbldgCard from '@/components/cards/RentbldgCard'
// import QuestionCard from '@/components/cards/QuestionCard'
// import DopbldgCard from '@/components/cards/DopbldgCard'
// import NoResult from '@/components/shared/NoResult'
// import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { getDopBldgByTagId, getRentBldgByTagId, getPlotByTagId } from '@/lib/actions/tag.action'
// import { getDopBldgByTagId } from '@/lib/actions/tag.action'
import { URLProps } from '@/types'

const Page = async ({ params, searchParams }: URLProps) => {
  const dop = await getDopBldgByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q
  })

  const rent = await getRentBldgByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q
  })
  const plot = await getPlotByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q
  })

  return (
    
    <div>
      <h1 className="h1-bold text-dark100_light900">{dop.tagTitle ? dop.tagTitle : rent.tagTitle ? rent.tagTitle : plot.tagTitle }</h1> 

      <div className="mt-11 w-full">
        <LocalSearchbar 
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {dop.departmentalbldgs.length > 0 ?
          dop.departmentalbldgs.map((departmentalbldg: any) => (
            <DopbldgCard 
              key={departmentalbldg._id}
              _id={departmentalbldg._id}
              division={departmentalbldg.division}
              classes={departmentalbldg.classes}
              purchase_year={departmentalbldg.purchase_year}
              soa={departmentalbldg.soa}
              area={departmentalbldg.area}
             tags={departmentalbldg.tags}
              author={departmentalbldg.author}
              po={departmentalbldg.po}
              createdAt={departmentalbldg.createdAt}  />
          ))
          : <div></div>}
      </div>

      {/* </div> */}
      {/* <div>
            <h1 className="h1-bold text-dark100_light900">Rent - {rent.tagTitle}</h1> 
      <div className="mt-10 flex w-full flex-col gap-6"> */}
        {rent.rentedbldgs?.length > 0 ?
          rent.rentedbldgs.map((rentedbldg: any) => (
            
             <RentbldgCard
                          key={rentedbldg._id}
                          _id={rentedbldg._id}
                          division={rentedbldg.division}
                          rent={rentedbldg.rent}
                          tags={rentedbldg.tags}
                          class_po={rentedbldg.class_po}
                          lease_period={rentedbldg.lease_period}
                          soa={rentedbldg.soa}
                          area={rentedbldg.area}
                          author={rentedbldg.author}
                          po={rentedbldg.po} 
                          createdAt={rentedbldg.createdAt} />
                     ))
          : <div></div>}
      {/* </div>
      </div> 
       <div>
            <h1 className="h1-bold text-dark100_light900">{plot.tagTitle}</h1> 
      <div className="mt-10 flex w-full flex-col gap-6"> */}
        {plot.plots?.length > 0 ?
          plot.plots.map((plot: any) => (
            
      <PlotCard
          key={plot._id}
          _id={plot._id}
          // clerkId={clerkId}
          division={plot.division}
          date_purchase={plot.date_purchase}
          tags={plot.tags}
          name={plot.name}
          purchase_from={plot.purchase_from}
          area={plot.area}
          author={plot.author}
          lease_period={plot.lease_period} 
          createdAt={plot.createdAt} />
                     ))
          : <div></div>}
      {/* </div>

      <div className="mt-10">
         <Pagination 
           pageNumber={searchParams?.page ? +searchParams.page : 1}
           isNext={dop.isNext}
        /> 
      </div> */}
      </div>
    
 )
}

export default Page
