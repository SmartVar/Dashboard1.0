
// import DopbldgCard from '@/components/cards/DopbldgCard'
// import PlotCard from '@/components/cards/PlotCard'
// import RentbldgCard from '@/components/cards/RentbldgCard'

// import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
// import { getDopBldgByTagId, getRentBldgByTagId, getPlotByTagId } from '@/lib/actions/tag.action'

// import { URLProps } from '@/types'

// const Page = async ({ params, searchParams }: URLProps) => {
//   const dop = await getDopBldgByTagId({
//     tagId: params.id,
//     page: searchParams.page ? +searchParams.page : 1,
//     searchQuery: searchParams.q
//   })

//   const rent = await getRentBldgByTagId({
//     tagId: params.id,
//     page: searchParams.page ? +searchParams.page : 1,
//     searchQuery: searchParams.q
//   })
//   const plot = await getPlotByTagId({
//     tagId: params.id,
//     page: searchParams.page ? +searchParams.page : 1,
//     searchQuery: searchParams.q
//   })

//   return (
    
//     <div>
//       <h1 className="h1-bold text-dark100_light900">{dop.tagTitle ? dop.tagTitle : rent.tagTitle ? rent.tagTitle : plot.tagTitle }</h1> 

//       <div className="mt-11 w-full">
//         <LocalSearchbar 
//           route={`/tags/${params.id}`}
//           iconPosition="left"
//           imgSrc="/assets/icons/search.svg"
//           placeholder="Search tag questions"
//           otherClasses="flex-1"
//         />
//       </div>

//       <div className="mt-10 flex w-full flex-col gap-6">
//         {dop.departmentalbldgs.length > 0 ?
//           dop.departmentalbldgs.map((departmentalbldg: any) => (
//             <DopbldgCard 
//               key={departmentalbldg._id}
//               _id={departmentalbldg._id}
//               division={departmentalbldg.division}
//               classes={departmentalbldg.classes}
//               purchase_year={departmentalbldg.purchase_year}
//               soa={departmentalbldg.soa}
//               area={departmentalbldg.area}
//              tags={departmentalbldg.tags}
//               author={departmentalbldg.author}
//               po={departmentalbldg.po}
//               createdAt={departmentalbldg.createdAt}  />
//           ))
//           : <div></div>}
//       </div>

//       {/* </div> */}
//       {/* <div>
//             <h1 className="h1-bold text-dark100_light900">Rent - {rent.tagTitle}</h1> 
//       <div className="mt-10 flex w-full flex-col gap-6"> */}
//         {rent.rentedbldgs?.length > 0 ?
//           rent.rentedbldgs.map((rentedbldg: any) => (
            
//              <RentbldgCard
//                           key={rentedbldg._id}
//                           _id={rentedbldg._id}
//                           division={rentedbldg.division}
//                           rent={rentedbldg.rent}
//                           tags={rentedbldg.tags}
//                           class_po={rentedbldg.class_po}
//                           lease_period={rentedbldg.lease_period}
//                           soa={rentedbldg.soa}
//                           area={rentedbldg.area}
//                           author={rentedbldg.author}
//                           po={rentedbldg.po} 
//                           createdAt={rentedbldg.createdAt} />
//                      ))
//           : <div></div>}
//       {/* </div>
//       </div> 
//        <div>
//             <h1 className="h1-bold text-dark100_light900">{plot.tagTitle}</h1> 
//       <div className="mt-10 flex w-full flex-col gap-6"> */}
//         {plot.plots?.length > 0 ?
//           plot.plots.map((plot: any) => (
            
//       <PlotCard
//           key={plot._id}
//           _id={plot._id}
//           // clerkId={clerkId}
//           division={plot.division}
//           date_purchase={plot.date_purchase}
//           tags={plot.tags}
//           name={plot.name}
//           purchase_from={plot.purchase_from}
//           area={plot.area}
//           author={plot.author}
//           lease_period={plot.lease_period} 
//           createdAt={plot.createdAt} />
//                      ))
//           : <div></div>}
//       {/* </div>

//       <div className="mt-10">
//          <Pagination 
//            pageNumber={searchParams?.page ? +searchParams.page : 1}
//            isNext={dop.isNext}
//         /> 
//       </div> */}
//       </div>
    
//  )
// }

// export default Page

import DopbldgCard from '@/components/cards/DopbldgCard'
import PlotCard from '@/components/cards/PlotCard'
import RentbldgCard from '@/components/cards/RentbldgCard'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { getDopBldgByTagId, getRentBldgByTagId, getPlotByTagId } from '@/lib/actions/tag.action'
import { URLProps } from '@/types'
// import NoResult from '@/components/shared/NoResult'

const Page = async ({ params, searchParams }: URLProps) => {
  const page = searchParams.page ? +searchParams.page : 1;
  const query = searchParams.q;

  const [dop, rent, plot] = await Promise.all([
    getDopBldgByTagId({ tagId: params.id, page, searchQuery: query }),
    getRentBldgByTagId({ tagId: params.id, page, searchQuery: query }),
    getPlotByTagId({ tagId: params.id, page, searchQuery: query })
  ]);

  const tagTitle = dop.tagTitle || rent.tagTitle || plot.tagTitle;

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tagged entries"
          otherClasses="flex-1"
        />
      </div>

      {/* Departmental Buildings */}
      {dop.departmentalbldgs.length > 0 && (
        <div className="mt-10 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-dark100_light900">Departmental Buildings</h2>
          {dop.departmentalbldgs.map((item: any) => (
            <DopbldgCard
              key={item._id}
              _id={item._id}
              division={item.division}
              classes={item.classes}
              purchase_year={item.purchase_year}
              soa={item.soa}
              area={item.area}
              tags={item.tags}
              author={item.author}
              po={item.po}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      )}

      {/* Rented Buildings */}
      {rent.rentedbldgs.length > 0 && (
        <div className="mt-16 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-dark100_light900">Rented Buildings</h2>
          {rent.rentedbldgs.map((item: any) => (
            <RentbldgCard
              key={item._id}
              _id={item._id}
              division={item.division}
              rent={item.rent}
              tags={item.tags}
              class_po={item.class_po}
              lease_period={item.lease_period}
              soa={item.soa}
              area={item.area}
              author={item.author}
              po={item.po}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      )}

      {/* Plot Buildings */}
      {plot.plots.length > 0 && (
        <div className="mt-16 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-dark100_light900">Plot Details</h2>
          {plot.plots.map((item: any) => (
            <PlotCard
              key={item._id}
              _id={item._id}
              division={item.division}
              date_purchase={item.date_purchase}
              tags={item.tags}
              name={item.name}
              purchase_from={item.purchase_from}
              area={item.area}
              author={item.author}
              lease_period={item.lease_period}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      )}

      {/* Optional: Show message if no data in any */}
      {dop.departmentalbldgs.length === 0 &&
        rent.rentedbldgs.length === 0 &&
        plot.plots.length === 0 && (
          <div className="mt-20 text-center text-gray-400">
            No records found for this tag.
          </div>
        )}
    </div>
  );
};

export default Page;
