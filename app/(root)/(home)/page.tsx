
  
'use client'

import Image from "next/image"
import { motion } from "framer-motion"

const page = () => (
  <section className="w-full">
    {/* Hero Section with 3D Feel and Transparent Gradient */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[70vh] flex items-center justify-center bg-gradient-to-br from-transparent via-blue-900/50 to-transparent overflow-hidden"
    >
      <Image
        src="https://cdn.dribbble.com/users/206940/screenshots/2595524/media/81e5b417dc6c5c9090f40f8d4f82fc4d.gif"
        alt="3D Postal Dashboard"
        fill
        style={{ objectFit: "cover" }}
        className="opacity-30 mix-blend-soft-light"
      />
      <div className="relative text-center z-10 px-4">
        <h1 className="text-5xl sm:text-6xl font-bold text-white drop-shadow-md mb-4">
          Postal Department Dashboard
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
          Real-time visual monitoring of Funds, Buildings, Reminders & more.
        </p>
      </div>
    </motion.div>

    {/* Feature Section with 3D Icons */}
    <div className="py-16 px-6 sm:px-12 bg-white/50 backdrop-blur-md">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        Core Features
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Funds Monitoring",
            icon: "https://cdn-icons-png.flaticon.com/512/3176/3176362.png"
          },
          {
            title: "Building Records",
            icon: "https://cdn-icons-png.flaticon.com/512/2897/2897766.png"
          },
          {
            title: "Smart Reminders",
            icon: "https://cdn-icons-png.flaticon.com/512/2838/2838912.png"
          },
          {
            title: "Reports & Analytics",
            icon: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
          }
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg text-center transition"
          >
            <Image src={f.icon} alt={f.title} width={64} height={64} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{f.title}</h3>
            <p className="text-gray-600">Clean UI with powerful backend tracking.</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Real Dashboard Preview Section */}
    <div className="py-16 px-6 sm:px-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
        Live Dashboard Preview
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-xl shadow-xl"
      >
        <Image
          src="https://denovers.com/wp-content/uploads/2023/09/Admin-Dashboard-UI-Design-1.png"
          alt="Professional Dashboard Screenshot"
          width={1200}
          height={600}
          className="w-full h-auto object-cover rounded-xl"
        />
      </motion.div>
    </div>

    {/* CTA */}
    <div className="bg-indigo-600/70 backdrop-blur-md text-white py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Start Using Your Dashboard</h2>
      <p className="mb-6 text-lg max-w-xl mx-auto">
        Secure. Powerful. Custom-built for postal operations.
      </p>
      {/* <Link href="/dashboard">
        <Button className="px-6 py-3 text-lg rounded-md bg-gradient-to-r from-yellow-400 to-red-500 text-gray-900">
          Open Dashboard
        </Button>
      </Link> */}
    </div>
  </section>
)

export default page
