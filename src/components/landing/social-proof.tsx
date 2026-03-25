"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "We ran our first food crawl and tracked 340 check-ins across 8 businesses in one weekend. Our board finally has proof that our digital programs work.",
    name: "Sarah Chen",
    title: "Downtown BID Director, Portland",
    initials: "SC",
  },
  {
    quote: "Setup was 30 minutes. We had QR codes printed and placed the same afternoon. Our visitors love the passport feature.",
    name: "Marcus Webb",
    title: "Tourism Board, Savannah",
    initials: "MW",
  },
  {
    quote: "The analytics dashboard is exactly what I needed to justify our annual $15K digital program budget.",
    name: "Elena Rodriguez",
    title: "Chamber of Commerce, Austin",
    initials: "ER",
  },
]

export function SocialProof() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-slate-DEFAULT mb-4">
            BIDs are finally proving ROI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[hsl(40,33%,97%)] rounded-2xl p-6"
            >
              <Quote className="w-8 h-8 text-terracotta-DEFAULT/30 mb-4" />
              <p className="text-slate-DEFAULT/80 text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta-DEFAULT/10 flex items-center justify-center font-display font-bold text-terracotta-DEFAULT text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="font-medium text-slate-DEFAULT text-sm">{t.name}</div>
                  <div className="text-xs text-slate-DEFAULT/50">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "1,200+", label: "Routes created" },
            { value: "48K+", label: "Check-ins recorded" },
            { value: "34%", label: "Avg. route completion" },
            { value: "$200-500", label: "Monthly per business" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-terracotta-DEFAULT mb-1">{stat.value}</div>
              <div className="text-sm text-slate-DEFAULT/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
