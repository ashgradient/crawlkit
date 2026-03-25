"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Build your route",
    description: "Add local businesses to your crawl. Set the order, add descriptions, and customize each stop.",
  },
  {
    number: "02",
    title: "Print & place QR codes",
    description: "Download QR codes for each business. They print on a postcard. Tap to see a digital version.",
  },
  {
    number: "03",
    title: "Visitors check in",
    description: "Visitors scan the QR or tap GPS check-in. They collect stamps in their digital passport.",
  },
  {
    number: "04",
    title: "Prove the ROI",
    description: "See which routes drive purchases. Export board-ready reports showing foot traffic data.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-[hsl(40,33%,97%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-slate-DEFAULT mb-4">
            From idea to live crawl in a day
          </h2>
          <p className="text-slate-DEFAULT/60 max-w-xl mx-auto">
            No technical setup. No app store. No developer needed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-terracotta-DEFAULT/20 -translate-y-1/2 z-0" />
              )}

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-terracotta-DEFAULT/10 border-2 border-terracotta-DEFAULT/20 flex items-center justify-center mb-4">
                  <span className="font-mono text-lg font-bold text-terracotta-DEFAULT">{step.number}</span>
                </div>
                <h3 className="font-display font-bold text-slate-DEFAULT mb-2">{step.title}</h3>
                <p className="text-sm text-slate-DEFAULT/60 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
