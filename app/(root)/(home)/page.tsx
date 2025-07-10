

import Link from "next/link"
import { Button } from "@/components/ui/button"
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
        <Link href="/dashboard">
          <Button className="primary-gradient px-6 py-3 text-lg !text-light-900 rounded-md">
            Go to Dashboard
          </Button>
        </Link> 
      </div>
    </section>
  )
}

export default page

  
