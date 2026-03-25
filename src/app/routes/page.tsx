export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { MapPin, Clock, QrCode } from "lucide-react"
import { formatDuration } from "@/lib/utils"

export default async function RoutesPage() {
  const routes = await prisma.route.findMany({
    where: { isPublished: true },
    include: {
      stops: { include: { business: true }, orderBy: { order: "asc" }, take: 3 },
      org: { select: { name: true } },
      _count: { select: { checkIns: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <h1 className="font-display text-4xl font-bold text-slate-DEFAULT mb-3">Browse Routes</h1>
            <p className="text-slate-DEFAULT/60">Discover neighborhood crawls near you</p>
          </div>

          {routes.length === 0 ? (
            <div className="text-center py-20">
              <MapPin className="w-12 h-12 text-terracotta-DEFAULT/30 mx-auto mb-4" />
              <h2 className="font-display font-bold text-slate-DEFAULT mb-2">No routes yet</h2>
              <p className="text-slate-DEFAULT/50 text-sm">Check back soon — new routes are added regularly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route) => (
                <Link
                  key={route.id}
                  href={`/routes/${encodeURIComponent(route.city.toLowerCase())}/${route.slug}`}
                  className="block bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Route header */}
                  <div className="h-32 bg-gradient-to-br from-terracotta-DEFAULT/20 to-mint-DEFAULT/20 flex items-center justify-center relative">
                    <MapPin className="w-10 h-10 text-terracotta-DEFAULT/40" />
                    <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-0.5 text-xs font-mono text-slate-DEFAULT">
                      {route.stops.length} stops
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display font-bold text-slate-DEFAULT text-lg mb-1 group-hover:text-terracotta-DEFAULT transition-colors">
                      {route.name}
                    </h3>
                    <p className="text-xs text-slate-DEFAULT/50 flex items-center gap-1 mb-3">
                      <MapPin className="w-3 h-3" />{route.city}
                    </p>

                    {route.description && (
                      <p className="text-sm text-slate-DEFAULT/60 mb-3 line-clamp-2">{route.description}</p>
                    )}

                    {/* Preview stops */}
                    <div className="space-y-1.5 mb-4">
                      {route.stops.map((stop, i) => (
                        <div key={stop.id} className="flex items-center gap-2 text-xs text-slate-DEFAULT/60">
                          <div className="w-4 h-4 rounded-full bg-terracotta-DEFAULT/10 flex items-center justify-center text-[9px] font-bold font-mono text-terracotta-DEFAULT">
                            {i + 1}
                          </div>
                          {stop.business.name}
                        </div>
                      ))}
                      {route.stops.length < route.totalStops && (
                        <p className="text-xs text-slate-DEFAULT/40 pl-6">+{route.totalStops - route.stops.length} more stops</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-DEFAULT/40 border-t border-border pt-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDuration(route.estimatedMinutes)}
                      </span>
                      <span className="flex items-center gap-1">
                        <QrCode className="w-3 h-3" /> {route._count.checkIns} check-ins
                      </span>
                      <span>{route.org.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
