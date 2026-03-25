"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Building2, Plus, Trash2, QrCode, MapPin } from "lucide-react"

interface Business {
  id: string
  name: string
  category: string
  address: string
  description: string | null
  lat: number
  lng: number
  _count: { checkIns: number }
}

interface Props {
  businesses: Business[]
  orgId?: string
}

const CATEGORIES = [
  "Food & Drink", "Coffee", "Retail", "Art & Culture", "Wellness",
  "Entertainment", "Services", "Market", "Bar", "Restaurant",
]

export function BusinessesManager({ businesses, orgId }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    category: "Restaurant",
    address: "",
    description: "",
    lat: 40.7128,
    lng: -74.006,
    website: "",
    phone: "",
  })

  const handleCreate = async () => {
    if (!form.name || !form.address) {
      setError("Name and address required")
      return
    }
    if (!orgId) {
      setError("Set up your organization first")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, orgId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setOpen(false)
      setForm({ name: "", category: "Restaurant", address: "", description: "", lat: 40.7128, lng: -74.006, website: "", phone: "" })
      router.refresh()
    } catch (e: any) {
      setError(e.message ?? "Failed to create business")
    }
    setLoading(false)
  }

  const handleDelete = async (bizId: string) => {
    if (!confirm("Remove this business? This cannot be undone.")) return
    await fetch(`/api/businesses/${bizId}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-DEFAULT">Businesses</h1>
          <p className="text-sm text-slate-DEFAULT/60 mt-1">Add businesses to include in your crawl routes</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2">
              <Plus className="w-4 h-4" /> Add Business
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Add a business</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label>Business name *</Label>
                <Input
                  placeholder="Blue Bottle Coffee"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Address *</Label>
                <Input
                  placeholder="123 Main St, Brooklyn, NY"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Latitude</Label>
                  <Input
                    type="number"
                    step="any"
                    value={form.lat}
                    onChange={(e) => setForm((f) => ({ ...f, lat: parseFloat(e.target.value) }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Longitude</Label>
                  <Input
                    type="number"
                    step="any"
                    value={form.lng}
                    onChange={(e) => setForm((f) => ({ ...f, lng: parseFloat(e.target.value) }))}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="What makes this place special?"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Website</Label>
                  <Input
                    placeholder="https://..."
                    value={form.website}
                    onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    placeholder="+1 555 123 4567"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-3 pt-2">
                <Button onClick={handleCreate} disabled={loading} className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white flex-1">
                  {loading ? "Adding..." : "Add Business"}
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {businesses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-border">
          <Building2 className="w-12 h-12 text-terracotta-DEFAULT/30 mx-auto mb-4" />
          <h3 className="font-display font-bold text-slate-DEFAULT mb-2">No businesses yet</h3>
          <p className="text-sm text-slate-DEFAULT/50 mb-6">Add businesses to start building routes</p>
          <Button onClick={() => setOpen(true)} className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2">
            <Plus className="w-4 h-4" /> Add first business
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businesses.map((biz) => (
            <div key={biz.id} className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-terracotta-DEFAULT/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-terracotta-DEFAULT" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-slate-DEFAULT">{biz.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs bg-terracotta-DEFAULT/10 text-terracotta-DEFAULT rounded-full px-2 py-0.5">
                      {biz.category}
                    </span>
                    <span className="text-xs text-slate-DEFAULT/50 flex items-center gap-1">
                      <QrCode className="w-3 h-3" /> {biz._count.checkIns} check-ins
                    </span>
                  </div>
                  <p className="text-xs text-slate-DEFAULT/50 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {biz.address}
                  </p>
                  {biz.description && (
                    <p className="text-xs text-slate-DEFAULT/60 mt-2 line-clamp-2">{biz.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(biz.id)}
                  className="text-destructive hover:text-destructive flex-shrink-0"
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
