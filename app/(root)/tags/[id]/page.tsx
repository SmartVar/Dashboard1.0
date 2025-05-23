// import QuestionCard from '@/components/cards/QuestionCard'
import DopbldgCard from '@/components/cards/DopbldgCard'
// import QuestionCard from '@/components/cards/QuestionCard'
// import DopbldgCard from '@/components/cards/DopbldgCard'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { getDopBldgByTagId } from '@/lib/actions/tag.actions'
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
              tags={departmentalbldg.tags}
              author={departmentalbldg.author}
              po={departmentalbldg.po}
            //   views={question.views}
            //   answers={question.answers}
              createdAt={departmentalbldg.createdAt}
            />
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