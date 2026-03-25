"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, QrCode, BarChart2 } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,98,42,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(46,196,182,0.06)_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-terracotta-DEFAULT/10 text-terracotta-DEFAULT rounded-full px-3 py-1 text-sm font-medium mb-6">
              <MapPin className="w-3.5 h-3.5" />
              For BIDs, Tourism Boards & Local Business
            </div>

            <h1 className="font-display text-5xl sm:text-6xl font-bold text-slate-DEFAULT leading-[1.1] mb-6">
              Build a neighborhood crawl.{" "}
              <span className="text-terracotta-DEFAULT">Prove it works.</span>
            </h1>

            <p className="text-lg text-slate-DEFAULT/70 mb-8 max-w-lg font-body leading-relaxed">
              Themed walking routes that drive foot traffic to local businesses. GPS + QR check-ins at each stop.
              Analytics on which routes convert to purchases.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/signup">
                <Button size="lg" className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2 px-8">
                  Start building free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/routes">
                <Button size="lg" variant="outline" className="gap-2 px-8">
                  Browse routes
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 text-sm text-slate-DEFAULT/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-mint-DEFAULT" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-mint-DEFAULT" />
                Setup in 5 minutes
              </div>
            </div>
          </motion.div>

          {/* Right: UI preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-border p-6">
              {/* Mock route card */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-terracotta-DEFAULT/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-terracotta-DEFAULT" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-DEFAULT">Williamsburg Food Crawl</h3>
                  <p className="text-sm text-slate-DEFAULT/60">6 stops · ~90 min · Brooklyn, NY</p>
                </div>
              </div>

              {/* Stops preview */}
              <div className="space-y-3 mb-6">
                {["Blue Bottle Coffee", "Smorgasburg Bites", "Mast Brothers Chocolate"].map((name, i) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono
                      ${i < 2 ? "bg-mint-DEFAULT text-white" : "bg-slate-DEFAULT/10 text-slate-DEFAULT/40"}`}>
                      {i + 1}
                    </div>
                    <span className={`text-sm font-medium ${i < 2 ? "text-slate-DEFAULT" : "text-slate-DEFAULT/40"}`}>
                      {name}
                    </span>
                    {i < 2 && (
                      <div className="ml-auto">
                        <span className="text-xs bg-mint-DEFAULT/10 text-mint-DEFAULT rounded-full px-2 py-0.5 font-mono">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: QrCode, label: "QR Scans", value: "1,248" },
                  { icon: BarChart2, label: "Conversion", value: "34%" },
                  { icon: MapPin, label: "Unique Visitors", value: "892" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-slate-DEFAULT/5 rounded-lg p-3 text-center">
                    <Icon className="w-4 h-4 text-terracotta-DEFAULT mx-auto mb-1" />
                    <div className="font-mono text-sm font-bold text-slate-DEFAULT">{value}</div>
                    <div className="text-xs text-slate-DEFAULT/50">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating check-in stamp */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl border border-border p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-mint-DEFAULT rounded-full flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-DEFAULT">Check-in confirmed!</div>
                <div className="text-xs text-slate-DEFAULT/50">Blue Bottle Coffee • just now</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
