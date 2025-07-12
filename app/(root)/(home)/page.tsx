'use client'

import { motion } from 'framer-motion'
import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const features = [
  {
    title: "Funds Tracking",
    icon: "💰",
    desc: "Monitor zone-wise budgets and expenditures in real time."
  },
  {
    title: "Building Management",
    icon: "🏢",
    desc: "Track building condition, usage, and maintenance alerts."
  },
  {
    title: "Reminder System",
    icon: "⏰",
    desc: "Set reminders for audits, inspections, and compliance."
  },
  {
    title: "Analytics Reports",
    icon: "📊",
    desc: "Download detailed reports in PDF and Excel format."
  }
]

const fundsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Funds Used (₹)',
      data: [45000, 52000, 60000, 75000, 72000, 81000],
      borderColor: '#FF7000',
      backgroundColor: 'rgba(255, 112, 0, 0.3)',
      fill: true,
      tension: 0.3
    }
  ]
}

const reminderData = {
  labels: ['Completed', 'Pending', 'Overdue'],
  datasets: [
    {
      data: [60, 30, 10],
      backgroundColor: ['#22C55E', '#3B82F6', '#EF4444']
    }
  ]
}

const page = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black font-sans text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 bg-black/30 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <h1 className="text-3xl font-extrabold text-[#FF7000] tracking-wide">📮 Postal Dashboard</h1>
        <nav className="space-x-8 text-gray-300 text-lg hidden md:flex">
          <a href="#features" className="hover:text-[#FF7000] transition-colors">Features</a>
          <a href="#funds" className="hover:text-[#FF7000] transition-colors">Funds</a>
          <a href="#reminders" className="hover:text-[#FF7000] transition-colors">Reminders</a>
        </nav>
      </header>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-24 px-6 bg-gradient-to-tr from-indigo-900 via-orange-900 to-black shadow-lg"
      >
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight drop-shadow-md">
          Postal Operations HQ
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
          Real-time monitoring of funds, buildings, reminders, and reports. Built for transparency and speed.
        </p>
      </motion.div>

      {/* Features */}
      <section
        id="features"
        className="py-20 px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, boxShadow: "0 25px 40px rgba(255, 112, 0, 0.4)" }}
            transition={{ duration: 0.3 }}
            className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 flex flex-col items-center text-center border border-[#FF7000]/30 hover:border-[#FF7000] cursor-pointer"
          >
            <div className="text-6xl mb-5">{f.icon}</div>
            <h4 className="text-2xl font-semibold mb-3 text-[#FF7000]">{f.title}</h4>
            <p className="text-gray-300">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Line Chart */}
      <section
        id="funds"
        className="py-20 px-8 max-w-5xl mx-auto bg-black/30 backdrop-blur-md rounded-3xl shadow-lg mb-20"
      >
        <h3 className="text-4xl font-bold text-center mb-12 text-[#FF7000]">Funds Utilization</h3>
        <Line
          data={fundsData}
          options={{
            responsive: true,
            plugins: {
              legend: { labels: { color: '#FF7000' } },
              title: { display: false }
            },
            scales: {
              x: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } },
              y: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } }
            }
          }}
        />
      </section>

      {/* Pie Chart */}
      <section
        id="reminders"
        className="py-20 px-8 max-w-3xl mx-auto bg-black/30 backdrop-blur-md rounded-3xl shadow-lg mb-20"
      >
        <h3 className="text-4xl font-bold text-center mb-12 text-[#FF7000]">Reminders Overview</h3>
        <Pie
          data={reminderData}
          options={{
            responsive: true,
            plugins: {
              legend: { labels: { color: '#FF7000', font: { size: 14 } } },
              tooltip: { enabled: true }
            }
          }}
        />
      </section>

      {/* Footer */}
      <footer className="bg-black/50 text-gray-400 text-center py-8 border-t border-[#FF7000]">
        <p>© {new Date().getFullYear()} Postal Dashboard - All rights reserved.</p>
      </footer>
    </section>
  )
}

export default page

