'use client'

import Image from "next/image"
import { motion } from "framer-motion"

const page = () => (
  <section className="w-full font-sans">
    {/* Header with India Post Logo */}
    <header className="flex items-center px-6 py-4 bg-white/50 backdrop-blur-lg shadow-bottom">
      <Image
        src="https://www.kindpng.com/picc/m/10-102669_india-post-logo-png-transparent-png.png"
        alt="India Post Logo"
        width={150}
        height={60}
      />
    </header>

    {/* Hero Section */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[75vh] flex flex-col justify-center items-center bg-indigo-900/10 overflow-hidden"
    >
      <Image
        src="https://cdn-iconscout.com/3d-illustration/dashboard-template-1-4587225-3782165.png"
        alt="3D holographic dashboard"
        fill
        style={{ objectFit: "cover" }}
        className="opacity-30 mix-blend-overlay"
      />
      <div className="relative text-center z-10 px-6">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 drop-shadow-lg mb-4">
          Postal Operations HQ
        </h1>
        <p className="text-lg sm:text-xl text-gray-700/90 max-w-2xl mx-auto">
          Monitor Funds • Assets • Reminders • Analytics — Powered by real‑time 3D dashboards.
        </p>
    {/* 3D Postman Illustration */}
      <div className="mt-8">
        <Image
          src="https://www.vecteezy.com/png/thumbnail/18971645-postman-puts-envelope-in-postal-service-mailbox-3d-character-illustration.png"
          alt="3D postman delivering mail"
          width={300}
          height={200}
        />
      </div>
      </div>
    </motion.div>

    {/* Features Section */}
    <div className="py-16 px-6 sm:px-12 bg-white/60 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What You Can Do</h2>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Funds Tracking",
            icon: "https://cdn-icons-png.flaticon.com/512/3176/3176362.png",
            desc: "📊 Monitor budgets across zones with real-time allocation & spend visuals."
          },
          {
            title: "Building Management",
            icon: "https://cdn-icons-png.flaticon.com/512/2897/2897766.png",
            desc: "🏢 Track infrastructure status, occupancy, maintenance schedules & assets."
          },
          {
            title: "Reminder System",
            icon: "https://cdn-icons-png.flaticon.com/512/2838/2838912.png",
            desc: "⏰ Set alerts for payments, inspections, audits or urgent postal tasks."
          },
          {
            title: "Analytics Reports",
            icon: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
            desc: "📈 Generate, download & export detailed reports in PDF/CSV formats."
          }
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ translateY: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md text-center transition"
          >
            <Image src={f.icon} alt={f.title} width={72} height={72} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 text-center backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-4">Elevate Postal Operations Today</h2>
      <p className="mb-6 text-lg max-w-xl mx-auto">
        Secure, transparent and built for scale — bring the future of postal services to your team.
      </p>
      {/* CTA Button */}
    </div>
  </section>
)

export default page
