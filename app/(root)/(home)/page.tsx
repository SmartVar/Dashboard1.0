// import Link from "next/link"

// import { Button } from "@/components/ui/button"
{ /* import { Skeleton } from "@/components/ui/skeleton"

const page = () => {
  return (
    <section>
      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Postal Dashboard</h1>
        <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">The Ultimate Office Utility Website for you</h2>
            <p className="paragraph-regular text-dark200_light800">Kindly check the Dashboard for more information. Please use it for official purpose only</p>
        {/* <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
           Edit Dashboard
          </Button>
        </Link>  
      </div>

      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28" />
        </div>
      </div>

      <div className="my-10 hidden flex-wrap gap-6 md:flex">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
      </div>

      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
      </div>
    </section>
  )
}

export default page */ }

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
import Image from "next/image"

const page = () => {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white flex flex-col justify-center items-center text-center px-4 transition-all duration-500 ease-in-out">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">Postal Department Dashboard</h1>
        <p className="text-lg sm:text-xl max-w-2xl">
          Your Ultimate Office Utility Platform – Monitor Funds, Track Buildings, Set Reminders & More
        </p>
        {/* Hero Image */}
        <Image
          src="/images/postal-hero.jpg"
          alt="Postal dashboard illustration"
          fill
          style={{ objectFit: "cover", zIndex: -1 }}
          className="opacity-20"
        />
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 sm:px-12 bg-light-100 dark:bg-dark-800 transition-all duration-300">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-dark100_light900 mb-12">Key Features</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Funds Monitoring", desc: "Track allocated and used funds across branches.", icon: "/icons/funds.svg" },
            { title: "Building Details", desc: "Manage infrastructure and building data efficiently.", icon: "/icons/building.svg" },
            { title: "Reminders", desc: "Set and view important reminders for tasks.", icon: "/icons/reminder.svg" },
            { title: "Reports", desc: "Generate, download and review performance reports.", icon: "/icons/reports.svg" }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Image src={feature.icon} alt={feature.title} width={50} height={50} className="mb-4" />
              <h3 className="text-xl font-semibold text-dark100_light900 mb-2">{feature.title}</h3>
              <p className="text-dark300_light700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Dive In?</h2>
        <p className="mb-6">Access your Dashboard now and streamline your postal operations.</p>
        {/* <Link href="/dashboard">
          <Button className="primary-gradient px-6 py-3 text-lg !text-light-900 rounded-md">
            Go to Dashboard
          </Button>
        </Link> */}
      </div>
    </section>
  )
}

export default page

  
