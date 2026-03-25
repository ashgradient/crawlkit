"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Plus, Route, QrCode, Trash2, GripVertical, ArrowRight, MapPin, Clock
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Business {
  id: string
  name: string
  category: string
  address: string
}

interface RouteStop {
  id: string
  order: number
  business: Business
}

interface RouteData {
  id: string
  name: string
  slug: string
  city: string
  description: string | null
  isPublished: boolean
  totalStops: number
  estimatedMinutes: number
  stops: RouteStop[]
  _count: { checkIns: number }
}

interface Props {
  routes: RouteData[]
  businesses: Business[]
  orgId?: string
}

export function RoutesList({ routes: initialRoutes, businesses, orgId }: Props) {
  const router = useRouter()
  const [routes, setRoutes] = useState(initialRoutes)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    name: "",
    city: "",
    description: "",
    estimatedMinutes: 60,
    stopIds: [] as string[],
  })

  const toggleStop = (bizId: string) => {
    setForm((f) => ({
      ...f,
      stopIds: f.stopIds.includes(bizId)
        ? f.stopIds.filter((id) => id !== bizId)
        : [...f.stopIds, bizId],
    }))
  }

  const handleCreate = async () => {
    if (!form.name || !form.city) {
      setError("Route name and city are required")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setOpen(false)
      setForm({ name: "", city: "", description: "", estimatedMinutes: 60, stopIds: [] })
      router.refresh()
    } catch (e: any) {
      setError(e.message ?? "Failed to create route")
    }
    setLoading(false)
  }

  const handlePublish = async (routeId: string, publish: boolean) => {
    await fetch(`/api/routes/${routeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: publish }),
    })
    router.refresh()
  }

  const handleDelete = async (routeId: string) => {
    if (!confirm("Delete this route? This cannot be undone.")) return
    await fetch(`/api/routes/${routeId}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-DEFAULT">Routes</h1>
          <p className="text-sm text-slate-DEFAULT/60 mt-1">Build and manage your neighborhood crawls</p>
        </div>

        {!orgId ? (
          <p className="text-sm text-slate-DEFAULT/50">Set up your org first</p>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Button className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2">
                <Plus className="w-4 h-4" /> New Route
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-display">Build a new route</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Route name *</Label>
                    <Input
                      placeholder="Williamsburg Food Crawl"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>City *</Label>
                    <Input
                      placeholder="Brooklyn, NY"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="What makes this crawl special?"
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Estimated duration (minutes)</Label>
                  <Input
                    type="number"
                    value={form.estimatedMinutes}
                    onChange={(e) => setForm((f) => ({ ...f, estimatedMinutes: parseInt(e.target.value) }))}
                    className="mt-1 w-32"
                  />
                </div>

                {/* Business stops picker */}
                <div>
                  <Label className="block mb-2">
                    Add stops ({form.stopIds.length} selected)
                  </Label>
                  {businesses.length === 0 ? (
                    <p className="text-sm text-slate-DEFAULT/50 bg-slate-DEFAULT/5 rounded-lg px-4 py-3">
                      No businesses yet. Add businesses first in the Businesses tab.
                    </p>
                  ) : (
                    <div className="border border-border rounded-lg divide-y max-h-64 overflow-y-auto">
                      {businesses.map((biz) => {
                        const selected = form.stopIds.includes(biz.id)
                        const order = form.stopIds.indexOf(biz.id) + 1
                        return (
                          <button
                            key={biz.id}
                            type="button"
                            onClick={() => toggleStop(biz.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                              selected ? "bg-terracotta-DEFAULT/5" : "hover:bg-slate-DEFAULT/5"
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono border-2 transition-colors ${
                              selected
                                ? "bg-terracotta-DEFAULT border-terracotta-DEFAULT text-white"
                                : "border-border text-slate-DEFAULT/30"
                            }`}>
                              {selected ? order : ""}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-DEFAULT">{biz.name}</div>
                              <div className="text-xs text-slate-DEFAULT/50">{biz.category} · {biz.address}</div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                  {form.stopIds.length > 0 && (
                    <p className="text-xs text-slate-DEFAULT/50 mt-2">
                      Order: {form.stopIds.map((id) => businesses.find((b) => b.id === id)?.name).join(" → ")}
                    </p>
                  )}
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-3 pt-2">
                  <Button onClick={handleCreate} disabled={loading} className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white flex-1">
                    {loading ? "Creating..." : "Create Route"}
                  </Button>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {routes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-border">
          <Route className="w-12 h-12 text-terracotta-DEFAULT/30 mx-auto mb-4" />
          <h3 className="font-display font-bold text-slate-DEFAULT mb-2">No routes yet</h3>
          <p className="text-sm text-slate-DEFAULT/50 mb-6">Build your first neighborhood crawl</p>
          {orgId && (
            <Button onClick={() => setOpen(true)} className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2">
              <Plus className="w-4 h-4" /> Build first route
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {routes.map((route) => (
            <div key={route.id} className="bg-white rounded-xl border border-border p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-terracotta-DEFAULT/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Route className="w-6 h-6 text-terracotta-DEFAULT" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-slate-DEFAULT">{route.name}</h3>
                  <Badge variant={route.isPublished ? "default" : "secondary"} className={
                    route.isPublished
                      ? "bg-mint-DEFAULT/10 text-mint-DEFAULT border-0 text-xs"
                      : "bg-slate-DEFAULT/10 text-slate-DEFAULT/50 border-0 text-xs"
                  }>
                    {route.isPublished ? "Live" : "Draft"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-DEFAULT/50">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{route.city}</span>
                  <span className="flex items-center gap-1"><GripVertical className="w-3 h-3" />{route.stops.length} stops</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{route.estimatedMinutes} min</span>
                  <span className="flex items-center gap-1"><QrCode className="w-3 h-3" />{route._count.checkIns} check-ins</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePublish(route.id, !route.isPublished)}
                  className="text-xs"
                >
                  {route.isPublished ? "Unpublish" : "Publish"}
                </Button>
                <a href={`/dashboard/qrcodes?routeId=${route.id}`}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" />
                    QR
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(route.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
