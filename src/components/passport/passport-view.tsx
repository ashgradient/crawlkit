"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Star, QrCode, Award, Map } from "lucide-react"

interface Stamp {
  id: string
  completedAt: Date
  stopsCompleted: number
  route: { name: string; city: string; totalStops: number }
}

interface Passport {
  id: string
  level: number
  xp: number
  stamps: Stamp[]
}

interface Props {
  user: { name?: string | null; image?: string | null }
  passport: Passport
  totalCheckIns: number
  uniqueBusinesses: number
}

const LEVEL_XP = [0, 50, 150, 300, 500, 1000]
const LEVEL_TITLES = ["Explorer", "Wanderer", "Trailblazer", "Navigator", "Pioneer", "Legend"]

function getLevel(xp: number) {
  let level = 1
  for (let i = 0; i < LEVEL_XP.length; i++) {
    if (xp >= LEVEL_XP[i]) level = i + 1
  }
  return Math.min(level, 6)
}

function xpToNextLevel(xp: number, level: number) {
  const nextThreshold = LEVEL_XP[level] ?? LEVEL_XP[LEVEL_XP.length - 1]
  const currThreshold = LEVEL_XP[level - 1] ?? 0
  const progress = xp - currThreshold
  const total = nextThreshold - currThreshold
  return { progress, total, pct: Math.min((progress / total) * 100, 100) }
}

export function PassportView({ user, passport, totalCheckIns, uniqueBusinesses }: Props) {
  const level = getLevel(passport.xp)
  const levelTitle = LEVEL_TITLES[level - 1]
  const { progress, total, pct } = xpToNextLevel(passport.xp, level)

  return (
    <div className="min-h-screen bg-[hsl(40,33%,97%)]">
      {/* Header */}
      <header className="bg-slate-DEFAULT text-white px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold">
          <div className="w-7 h-7 bg-terracotta-DEFAULT rounded-lg flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-white" />
          </div>
          CrawlKit
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white text-xs">
            Dashboard
          </Button>
        </Link>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Passport cover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-DEFAULT rounded-2xl p-6 text-white mb-6 relative overflow-hidden"
        >
          {/* Background texture */}
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="absolute text-white/20 text-6xl" style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}>✦</div>
            ))}
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">Digital Passport</p>
                <h1 className="font-display text-xl font-bold">{user.name ?? "Explorer"}</h1>
              </div>
              <Avatar className="w-14 h-14 border-2 border-terracotta-DEFAULT">
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback className="bg-terracotta-DEFAULT text-white font-bold">
                  {user.name?.[0] ?? "?"}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Level badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-terracotta-DEFAULT/20 border border-terracotta-DEFAULT/30 rounded-full px-3 py-1 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-terracotta-DEFAULT" />
                <span className="text-sm font-bold">Level {level}</span>
                <span className="text-terracotta-DEFAULT/80 text-xs">· {levelTitle}</span>
              </div>
            </div>

            {/* XP bar */}
            <div className="mb-1 flex items-center justify-between text-xs text-white/50">
              <span>{passport.xp} XP</span>
              <span>{progress}/{total} to Level {level + 1}</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-terracotta-DEFAULT rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Stamps", value: passport.stamps.length, icon: Award },
            { label: "Check-ins", value: totalCheckIns, icon: QrCode },
            { label: "Businesses", value: uniqueBusinesses, icon: MapPin },
          ].map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-xl border border-border p-4 text-center"
            >
              <Icon className="w-5 h-5 text-terracotta-DEFAULT mx-auto mb-1" />
              <div className="font-mono text-2xl font-bold text-slate-DEFAULT">{value}</div>
              <div className="text-xs text-slate-DEFAULT/50">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Stamps collection */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="font-display font-bold text-slate-DEFAULT mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-terracotta-DEFAULT" />
            Stamps Collected
          </h2>

          {passport.stamps.length === 0 ? (
            <div className="text-center py-8">
              <Map className="w-10 h-10 text-slate-DEFAULT/20 mx-auto mb-3" />
              <p className="text-sm text-slate-DEFAULT/50 mb-3">No stamps yet</p>
              <p className="text-xs text-slate-DEFAULT/40">Complete a crawl route to earn your first stamp!</p>
              <Link href="/routes" className="mt-4 inline-block">
                <Button size="sm" className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2 mt-3">
                  Find a route
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {passport.stamps.map((stamp, i) => (
                <motion.div
                  key={stamp.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="border-2 border-terracotta-DEFAULT/20 rounded-xl p-4 bg-terracotta-DEFAULT/5"
                >
                  <div className="text-2xl mb-2">🏆</div>
                  <h3 className="font-display font-bold text-slate-DEFAULT text-sm leading-tight mb-1">
                    {stamp.route.name}
                  </h3>
                  <p className="text-xs text-slate-DEFAULT/50">{stamp.route.city}</p>
                  <p className="text-xs text-slate-DEFAULT/50 mt-1 font-mono">
                    {stamp.stopsCompleted}/{stamp.route.totalStops} stops
                  </p>
                  <p className="text-xs text-terracotta-DEFAULT/60 mt-1">
                    {new Date(stamp.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
