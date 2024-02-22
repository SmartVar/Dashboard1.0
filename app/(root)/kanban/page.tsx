import Columns from '@/components/kanban/columns'

export default function Home() {
  return (
    // <section className='flex h-screen bg-gradient-to-br from-gray-700 to-gray-900 py-12 text-white'>
    <section className='background-light850_dark100 flex h-screen bg-gradient-to-br py-12'>
      <div className='mx-auto w-full max-w-7xl px-6 text-dark500_light700 small-regular border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400'>
        <Columns />
      </div>
    </section>
  )
}
