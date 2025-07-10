'use client'

import Image from "next/image"
import { motion } from "framer-motion"

const page = () => (
  <section className="w-full">
    {/* Hero Section */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[75vh] flex items-center justify-center bg-black/5 overflow-hidden"
    >
      <Image
        src="https://cdn-iconscout.com/3d-illustration/dashboard-template-1-4587225-3782165.png"
        alt="3D holographic dashboard"
        fill
        style={{ objectFit: "cover" }}
        className="opacity-40 mix-blend-overlay"
      />
      <div className="relative text-center z-10 px-6">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 drop-shadow-lg mb-4">Postal Operations HQ</h1>
        <p className="text-lg sm:text-xl text-gray-700/90 max-w-2xl mx-auto">
          Monitor Funds • Asset Status • Reminders • Insights — Powered by live dashboards.
        </p>
      </div>
    </motion.div>

    {/* Feature Cards */}
    <div className="py-16 px-6 sm:px-12 bg-white/50 backdrop-blur-lg">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">What You Can Do</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Funds Tracking",
            icon: "https://cdn-icons-png.flaticon.com/512/3176/3176362.png",
            desc: "Monitor budgets across regions, visualize allocations and usage in real-time."
          },
          {
            title: "Building Management",
            icon: "https://cdn-icons-png.flaticon.com/512/2897/2897766.png",
            desc: "Track building conditions, occupancy, maintenance schedules and assets."
          },
          {
            title: "Reminder System",
            icon: "https://cdn-icons-png.flaticon.com/512/2838/2838912.png",
            desc: "Set alerts for payments, reports, audits, and critical postal tasks."
          },
          {
            title: "Analytics Reports",
            icon: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
            desc: "Generate detailed insights, download PDF reports, and export CSV data."
          }
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ translateY: -5 }}
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center transition"
          >
            <Image src={f.icon} alt={f.title} width={72} height={72} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Dashboard Preview */}
    <div className="py-16 px-6 sm:px-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">Live Dashboard Snapshot</h2>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-lg shadow-2xl"
      >
        <Image
          src="https://images.unsplash.com/photo-1612832020955-63f373e6ecb7"
          alt="Professional Dashboard UI"
          width={1200}
          height={600}
          className="object-cover w-full h-auto"
        />
      </motion.div>
    </div>

    {/* CTA Section */}
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 text-center backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-4">Step Into The Future of Postal Ops</h2>
      <p className="mb-6 text-lg max-w-xl mx-auto">
        Secure, transparent, and intuitive — the next-gen postal operations solution.
      </p>
      {/* CTA Button */}
      {/* <Link href="/dashboard">
        <Button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition">
          Launch Dashboard
        </Button>
      </Link> */}
    </div>
  </section>
)

export default page

