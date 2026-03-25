"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, QrCode, Star, ArrowRight, CheckCircle, Map } from "lucide-react"

interface Business {
  id: string
  name: string
  description: string | null
  category: string
  address: string
  imageUrl: string | null
  website: string | null
  phone: string | null
}

interface Route {
  id: string
  name: string
  slug: string
  city: string
  totalStops: number
}

interface Props {
  qrToken: string
  business: Business
  route: Route | null
  stopOrder: number | null
}

type State = "idle" | "loading" | "success" | "already" | "error"

export function CheckInClient({ qrToken, business, route, stopOrder }: Props) {
  const { data: session, status } = useSession()
  const [state, setState] = useState<State>("idle")
  const [message, setMessage] = useState("")
  const [showStamp, setShowStamp] = useState(false)

  const handleCheckIn = async () => {
    if (!session) {
      signIn(undefined, { callbackUrl: `/checkin/${qrToken}` })
      return
    }

    setState("loading")
    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qrToken,
          routeId: route?.id,
          method: "QR",
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      if (data.alreadyCheckedIn) {
        setState("already")
        setMessage("You've already checked in here!")
      } else {
        setState("success")
        setMessage(`Checked in at ${business.name}!`)
        setTimeout(() => setShowStamp(true), 200)
      }
    } catch (e: any) {
      setState("error")
      setMessage(e.message ?? "Check-in failed. Try again.")
    }
  }

  // Auto check-in when authenticated
  useEffect(() => {
    if (status === "authenticated" && state === "idle") {
      handleCheckIn()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const categoryEmoji: Record<string, string> = {
    "Food & Drink": "🍽️", Coffee: "☕", Retail: "🛍️", "Art & Culture": "🎨",
    Wellness: "🧘", Entertainment: "🎭", Services: "🔧", Market: "🏪", Bar: "🍺", Restaurant: "🍴",
  }

  return (
    <div className="min-h-screen bg-[hsl(40,33%,97%)] flex flex-col">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-slate-DEFAULT">
          <div className="w-7 h-7 bg-terracotta-DEFAULT rounded-lg flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-white" />
          </div>
          CrawlKit
        </Link>
        {session ? (
          <Link href="/passport">
            <Button variant="outline" size="sm" className="text-xs gap-1">
              <Star className="w-3 h-3" /> My Passport
            </Button>
          </Link>
        ) : null}
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">

          <AnimatePresence mode="wait">
            {/* SUCCESS STATE — the brand moment */}
            {state === "success" && showStamp && (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                {/* Stamp animation */}
                <motion.div
                  initial={{ scale: 2, rotate: -15, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-mint-DEFAULT bg-mint-DEFAULT/10 flex items-center justify-center"
                >
                  <CheckCircle className="w-16 h-16 text-mint-DEFAULT" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-4xl mb-2">{categoryEmoji[business.category] ?? "📍"}</div>
                  <h1 className="font-display text-2xl font-bold text-slate-DEFAULT mb-1">
                    Stamped! ✓
                  </h1>
                  <p className="text-slate-DEFAULT/60 mb-2">{business.name}</p>

                  {route && stopOrder && (
                    <div className="bg-white rounded-xl p-4 mb-6 border border-border">
                      <p className="text-xs text-slate-DEFAULT/50 mb-1 font-mono">
                        Stop {stopOrder} of {route.totalStops}
                      </p>
                      <div className="flex gap-1 justify-center">
                        {Array.from({ length: route.totalStops }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              i < stopOrder
                                ? "bg-mint-DEFAULT text-white"
                                : i === stopOrder - 1
                                ? "bg-terracotta-DEFAULT text-white ring-2 ring-terracotta-DEFAULT ring-offset-2"
                                : "bg-slate-DEFAULT/10 text-slate-DEFAULT/30"
                            }`}
                          >
                            {i < stopOrder ? "✓" : i + 1}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-DEFAULT/50 mt-2">{route.name}</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <Link href="/passport">
                      <Button className="w-full bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2">
                        View my passport <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    {route && (
                      <Link href={`/routes/${route.city.toLowerCase().replace(/,\s*/g, "/").replace(/\s+/g, "-")}/${route.slug}`}>
                        <Button variant="outline" className="w-full gap-2">
                          <Map className="w-4 h-4" /> See full route
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ALREADY CHECKED IN */}
            {state === "already" && (
              <motion.div key="already" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-DEFAULT/10 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-slate-DEFAULT/40" />
                </div>
                <h1 className="font-display text-2xl font-bold text-slate-DEFAULT mb-2">Already stamped!</h1>
                <p className="text-slate-DEFAULT/60 mb-6">You&apos;ve already checked in at {business.name}.</p>
                <Link href="/passport">
                  <Button className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2">
                    View my passport <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* IDLE / NOT SIGNED IN */}
            {(state === "idle" || status === "unauthenticated") && state !== "loading" && (
              <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <div className="text-5xl mb-4">{categoryEmoji[business.category] ?? "📍"}</div>
                <h1 className="font-display text-2xl font-bold text-slate-DEFAULT mb-1">{business.name}</h1>
                <p className="text-sm text-slate-DEFAULT/50 mb-1">{business.category}</p>
                <p className="text-sm text-slate-DEFAULT/60 flex items-center justify-center gap-1 mb-6">
                  <MapPin className="w-3.5 h-3.5" /> {business.address}
                </p>

                {business.description && (
                  <p className="text-sm text-slate-DEFAULT/70 mb-6 bg-white rounded-xl px-4 py-3 border border-border">
                    {business.description}
                  </p>
                )}

                {route && stopOrder && (
                  <div className="bg-white rounded-xl p-4 mb-6 border border-border text-left">
                    <p className="text-xs font-mono text-slate-DEFAULT/50 mb-1">
                      Part of · {route.name}
                    </p>
                    <p className="text-sm font-medium text-slate-DEFAULT">
                      Stop {stopOrder} of {route.totalStops}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleCheckIn}
                  size="lg"
                  className="w-full bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2"
                >
                  <QrCode className="w-5 h-5" />
                  {session ? "Check in here" : "Sign in to check in"}
                </Button>
              </motion.div>
            )}

            {/* LOADING */}
            {state === "loading" && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-terracotta-DEFAULT/10 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <QrCode className="w-8 h-8 text-terracotta-DEFAULT" />
                  </motion.div>
                </div>
                <p className="text-slate-DEFAULT/60">Checking you in...</p>
              </motion.div>
            )}

            {/* ERROR */}
            {state === "error" && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <p className="text-destructive mb-4">{message}</p>
                <Button onClick={() => setState("idle")} variant="outline">Try again</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
