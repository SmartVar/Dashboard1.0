// import QuestionCard from '@/components/cards/QuestionCard'
import DopbldgCard from '@/components/cards/DopbldgCard'
// import QuestionCard from '@/components/cards/QuestionCard'
// import DopbldgCard from '@/components/cards/DopbldgCard'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { getDopBldgByTagId } from '@/lib/actions/tag.action'
import { URLProps } from '@/types'

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getDopBldgByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q
  })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1> 

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
        {result.departmentalbldgs.length > 0 ?
          result.departmentalbldgs.map((departmentalbldg: any) => (
            <DopbldgCard 
              key={departmentalbldg._id}
              _id={departmentalbldg._id}
              division={departmentalbldg.division}
              classes={departmentalbldg.classes}
              // location={departmentalbldg.location}
              purchase_year={departmentalbldg.purchase_year}
              soa={departmentalbldg.soa}
              // paq={departmentalbldg.paq}
              area={departmentalbldg.area}
              // builtup_area={departmentalbldg.builtup_area}
              // open_space={departmentalbldg.open_space}
              // floors={departmentalbldg.floors}
              // year={departmentalbldg.year}
              // expenditure={departmentalbldg.expenditure}
              // value={departmentalbldg.value}
              // mut_doc={departmentalbldg.mut_doc}
              // mut_state={departmentalbldg.mut_state}
              // fund_type={departmentalbldg.fund_type}
              // fund_amount={departmentalbldg.fund_amount}
              // cases={departmentalbldg.cases}
              // case_description={departmentalbldg.case_description}
              // brief_history={departmentalbldg.brief_history}
              tags={departmentalbldg.tags}
              author={departmentalbldg.author}
              po={departmentalbldg.po}
              //   views={question.views}
              //   answers={question.answers}
              createdAt={departmentalbldg.createdAt}  />
          ))
          : <NoResult 
            title="There’s no tag saved to show"
            description="Enter Record"
            link="/add-dop"
            linkTitle="Create Dop Record"
          />}
      </div>

      <div className="mt-10">
        <Pagination 
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  )
}

export default Page
