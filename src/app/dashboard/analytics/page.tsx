export const dynamic = "force-dynamic"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard"

export default async function AnalyticsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { ownerId: session.user.id },
    include: { routes: { select: { id: true, name: true, totalStops: true } } },
  })

  if (!org) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-DEFAULT/50">Set up your organization first</p>
      </div>
    )
  }

  // Total check-ins by route (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const checkInsByRoute = await prisma.checkIn.groupBy({
    by: ["routeId"],
    where: { route: { orgId: org.id } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  })

  const routeNames = Object.fromEntries(org.routes.map((r) => [r.id, r.name]))

  // Daily check-ins (last 14 days)
  const checkInsRaw = await prisma.checkIn.findMany({
    where: {
      route: { orgId: org.id },
      createdAt: { gte: thirtyDaysAgo },
    },
    select: { createdAt: true, routeId: true, method: true },
  })

  // Group by day
  const dailyMap: Record<string, number> = {}
  checkInsRaw.forEach((ci) => {
    const day = ci.createdAt.toISOString().split("T")[0]
    dailyMap[day] = (dailyMap[day] ?? 0) + 1
  })

  const dailyData = Object.entries(dailyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14)
    .map(([date, count]) => ({ date, count }))

  // Top businesses
  const topBusinesses = await prisma.checkIn.groupBy({
    by: ["businessId"],
    where: { business: { orgId: org.id } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  })

  const businessNames = await prisma.business.findMany({
    where: { id: { in: topBusinesses.map((b) => b.businessId) } },
    select: { id: true, name: true },
  })

  const businessNameMap = Object.fromEntries(businessNames.map((b) => [b.id, b.name]))

  const totalCheckIns = await prisma.checkIn.count({ where: { route: { orgId: org.id } } })
  const uniqueVisitors = await prisma.checkIn.groupBy({
    by: ["userId"],
    where: { route: { orgId: org.id } },
  })

  return (
    <AnalyticsDashboard
      totalCheckIns={totalCheckIns}
      uniqueVisitors={uniqueVisitors.length}
      routeCount={org.routes.length}
      checkInsByRoute={checkInsByRoute.map((r) => ({
        routeId: r.routeId ?? "",
        name: routeNames[r.routeId ?? ""] ?? "Unknown",
        count: r._count.id,
      }))}
      dailyData={dailyData}
      topBusinesses={topBusinesses.map((b) => ({
        businessId: b.businessId,
        name: businessNameMap[b.businessId] ?? "Unknown",
        count: b._count.id,
      }))}
    />
  )
}
