"use client"

import { QrCode, BarChart2, Map, Award, Users, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Map,
    title: "Route Builder",
    description: "Drag-and-drop route builder with map preview. Add businesses, set order, customize stops.",
    color: "terracotta",
  },
  {
    icon: QrCode,
    title: "QR Check-ins",
    description: "Print QR codes for each business. Customers scan to check in. Anti-fraud built in.",
    color: "mint",
  },
  {
    icon: Award,
    title: "Digital Passport",
    description: "Gamified experience with stamps, XP, and milestones. Shareable social proof.",
    color: "terracotta",
  },
  {
    icon: BarChart2,
    title: "Real Analytics",
    description: "Dwell time, conversion funnels, route completion rates. Board-ready ROI reports.",
    color: "mint",
  },
  {
    icon: Users,
    title: "Multi-Business",
    description: "Manage entire BIDs or districts. Role-based access for route managers and business owners.",
    color: "terracotta",
  },
  {
    icon: Smartphone,
    title: "Mobile-First PWA",
    description: "No app download required. Works on any phone. GPS + QR dual check-in system.",
    color: "mint",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-slate-DEFAULT mb-4">
            Everything a BID needs to run a crawl
          </h2>
          <p className="text-slate-DEFAULT/60 max-w-xl mx-auto">
            From building routes to proving ROI to your board — CrawlKit handles the whole program.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[hsl(40,33%,97%)] rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                feature.color === "terracotta"
                  ? "bg-terracotta-DEFAULT/10"
                  : "bg-mint-DEFAULT/10"
              }`}>
                <feature.icon className={`w-5 h-5 ${
                  feature.color === "terracotta" ? "text-terracotta-DEFAULT" : "text-mint-DEFAULT"
                }`} />
              </div>
              <h3 className="font-display font-bold text-slate-DEFAULT mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-DEFAULT/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
