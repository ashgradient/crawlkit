"use client"

import { BarChart2, Users, QrCode, TrendingUp, Route } from "lucide-react"

interface Props {
  totalCheckIns: number
  uniqueVisitors: number
  routeCount: number
  checkInsByRoute: { routeId: string; name: string; count: number }[]
  dailyData: { date: string; count: number }[]
  topBusinesses: { businessId: string; name: string; count: number }[]
}

export function AnalyticsDashboard({
  totalCheckIns,
  uniqueVisitors,
  routeCount,
  checkInsByRoute,
  dailyData,
  topBusinesses,
}: Props) {
  const maxDaily = Math.max(...dailyData.map((d) => d.count), 1)
  const maxRoute = Math.max(...checkInsByRoute.map((r) => r.count), 1)
  const maxBiz = Math.max(...topBusinesses.map((b) => b.count), 1)

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-slate-DEFAULT">Analytics</h1>
        <p className="text-sm text-slate-DEFAULT/60 mt-1">Board-ready data on your crawl programs</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Check-ins", value: totalCheckIns, icon: QrCode, color: "terracotta", delta: "+12%" },
          { label: "Unique Visitors", value: uniqueVisitors, icon: Users, color: "mint", delta: "+8%" },
          { label: "Active Routes", value: routeCount, icon: Route, color: "terracotta", delta: "" },
          {
            label: "Avg per Route",
            value: routeCount > 0 ? Math.round(totalCheckIns / routeCount) : 0,
            icon: TrendingUp,
            color: "mint",
            delta: "",
          },
        ].map(({ label, value, icon: Icon, color, delta }) => (
          <div key={label} className="bg-white rounded-xl border border-border p-5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
              color === "terracotta" ? "bg-terracotta-DEFAULT/10" : "bg-mint-DEFAULT/10"
            }`}>
              <Icon className={`w-4 h-4 ${color === "terracotta" ? "text-terracotta-DEFAULT" : "text-mint-DEFAULT"}`} />
            </div>
            <div className="font-mono text-2xl font-bold text-slate-DEFAULT">{value.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-DEFAULT/50">{label}</span>
              {delta && (
                <span className="text-xs text-mint-DEFAULT font-mono">{delta}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily check-ins bar chart */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="font-display font-bold text-slate-DEFAULT mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-terracotta-DEFAULT" />
            Daily Check-ins (last 14 days)
          </h2>
          {dailyData.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-DEFAULT/40">No data yet</div>
          ) : (
            <div className="flex items-end gap-1.5 h-40">
              {dailyData.map((d) => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-terracotta-DEFAULT/80 rounded-t-sm transition-all hover:bg-terracotta-DEFAULT"
                    style={{ height: `${(d.count / maxDaily) * 100}%`, minHeight: d.count > 0 ? "4px" : "0" }}
                    title={`${d.count} check-ins`}
                  />
                  <span className="text-[9px] text-slate-DEFAULT/30 font-mono rotate-45 origin-left whitespace-nowrap">
                    {new Date(d.date).toLocaleDateString("en-US", { month: "numeric", day: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check-ins by route */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="font-display font-bold text-slate-DEFAULT mb-4 flex items-center gap-2">
            <Route className="w-4 h-4 text-terracotta-DEFAULT" />
            Check-ins by Route
          </h2>
          {checkInsByRoute.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-DEFAULT/40">No check-ins yet</div>
          ) : (
            <div className="space-y-3">
              {checkInsByRoute.slice(0, 6).map((r) => (
                <div key={r.routeId}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-DEFAULT font-medium truncate pr-2">{r.name}</span>
                    <span className="font-mono text-slate-DEFAULT/60 flex-shrink-0">{r.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-DEFAULT/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-terracotta-DEFAULT rounded-full"
                      style={{ width: `${(r.count / maxRoute) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top businesses */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="font-display font-bold text-slate-DEFAULT mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-mint-DEFAULT" />
          Top Businesses by Check-ins
        </h2>
        {topBusinesses.length === 0 ? (
          <div className="text-center py-8 text-sm text-slate-DEFAULT/40">No check-ins yet</div>
        ) : (
          <div className="space-y-3">
            {topBusinesses.map((b, i) => (
              <div key={b.businessId} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-DEFAULT/10 flex items-center justify-center text-xs font-bold font-mono text-slate-DEFAULT/60">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-DEFAULT">{b.name}</span>
                    <span className="font-mono text-sm text-slate-DEFAULT/60">{b.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-DEFAULT/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-mint-DEFAULT rounded-full"
                      style={{ width: `${(b.count / maxBiz) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
