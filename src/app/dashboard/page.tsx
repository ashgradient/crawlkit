export const dynamic = "force-dynamic"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { BarChart2, Route, QrCode, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { ownerId: session.user.id },
    include: {
      routes: { take: 5, orderBy: { createdAt: "desc" } },
      _count: { select: { routes: true, businesses: true } },
    },
  })

  const totalCheckIns = org
    ? await prisma.checkIn.count({
        where: { route: { orgId: org.id } },
      })
    : 0

  const recentCheckIns = org
    ? await prisma.checkIn.findMany({
        where: { route: { orgId: org.id } },
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, email: true } },
          business: { select: { name: true } },
          route: { select: { name: true } },
        },
      })
    : []

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-DEFAULT">
          Welcome back, {session.user.name?.split(" ")[0] ?? "there"} 👋
        </h1>
        <p className="text-slate-DEFAULT/60 text-sm mt-1">
          {org ? `${org.name} · ${org.plan} plan` : "Set up your organization to get started"}
        </p>
      </div>

      {/* Setup prompt */}
      {!org && (
        <div className="bg-terracotta-DEFAULT/10 border border-terracotta-DEFAULT/20 rounded-2xl p-6 mb-8">
          <h2 className="font-display font-bold text-slate-DEFAULT mb-2">Set up your organization</h2>
          <p className="text-sm text-slate-DEFAULT/70 mb-4">
            Create your BID or tourism board profile to start building routes.
          </p>
          <Link href="/dashboard/settings">
            <Button size="sm" className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2">
              Set up org <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Routes", value: org?._count.routes ?? 0, icon: Route, color: "terracotta" },
          { label: "Businesses", value: org?._count.businesses ?? 0, icon: Users, color: "mint" },
          { label: "Total Check-ins", value: totalCheckIns, icon: QrCode, color: "terracotta" },
          { label: "Analytics", value: "→", icon: BarChart2, color: "mint", href: "/dashboard/analytics" },
        ].map(({ label, value, icon: Icon, color, href }) => (
          <div key={label} className={`bg-white rounded-xl p-5 border border-border ${href ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}>
            {href ? (
              <Link href={href} className="block">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                  color === "terracotta" ? "bg-terracotta-DEFAULT/10" : "bg-mint-DEFAULT/10"
                }`}>
                  <Icon className={`w-4 h-4 ${color === "terracotta" ? "text-terracotta-DEFAULT" : "text-mint-DEFAULT"}`} />
                </div>
                <div className="font-mono text-2xl font-bold text-slate-DEFAULT">{value}</div>
                <div className="text-xs text-slate-DEFAULT/50 mt-1">{label}</div>
              </Link>
            ) : (
              <>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                  color === "terracotta" ? "bg-terracotta-DEFAULT/10" : "bg-mint-DEFAULT/10"
                }`}>
                  <Icon className={`w-4 h-4 ${color === "terracotta" ? "text-terracotta-DEFAULT" : "text-mint-DEFAULT"}`} />
                </div>
                <div className="font-mono text-2xl font-bold text-slate-DEFAULT">{value}</div>
                <div className="text-xs text-slate-DEFAULT/50 mt-1">{label}</div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent routes */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-slate-DEFAULT">Your Routes</h2>
            <Link href="/dashboard/routes">
              <Button variant="ghost" size="sm" className="text-terracotta-DEFAULT gap-1 text-xs">
                Manage <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          {org?.routes.length ? (
            <div className="space-y-3">
              {org.routes.map((route) => (
                <div key={route.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="w-8 h-8 bg-terracotta-DEFAULT/10 rounded-lg flex items-center justify-center">
                    <Route className="w-4 h-4 text-terracotta-DEFAULT" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-DEFAULT truncate">{route.name}</div>
                    <div className="text-xs text-slate-DEFAULT/50">{route.totalStops} stops · {route.city}</div>
                  </div>
                  <div className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                    route.isPublished
                      ? "bg-mint-DEFAULT/10 text-mint-DEFAULT"
                      : "bg-slate-DEFAULT/10 text-slate-DEFAULT/50"
                  }`}>
                    {route.isPublished ? "Live" : "Draft"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-slate-DEFAULT/50 mb-3">No routes yet</p>
              <Link href="/dashboard/routes">
                <Button size="sm" className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2">
                  Build first route <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Recent check-ins */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-slate-DEFAULT">Recent Check-ins</h2>
            <Link href="/dashboard/analytics">
              <Button variant="ghost" size="sm" className="text-terracotta-DEFAULT gap-1 text-xs">
                Analytics <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          {recentCheckIns.length ? (
            <div className="space-y-3">
              {recentCheckIns.map((ci) => (
                <div key={ci.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="w-8 h-8 bg-mint-DEFAULT/10 rounded-full flex items-center justify-center">
                    <QrCode className="w-4 h-4 text-mint-DEFAULT" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-DEFAULT">{ci.business.name}</div>
                    <div className="text-xs text-slate-DEFAULT/50">
                      {ci.user.name ?? ci.user.email} · {ci.route?.name}
                    </div>
                  </div>
                  <div className="text-xs text-slate-DEFAULT/40 font-mono">
                    {new Date(ci.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-slate-DEFAULT/50">Check-ins will appear here once visitors start scanning QR codes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
