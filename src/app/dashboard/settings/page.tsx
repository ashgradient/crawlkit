"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Building2, Loader2, Check } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    city: "",
    slug: "",
  })

  const handleSave = async () => {
    if (!form.name || !form.city) {
      setError("Organization name and city are required")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/org", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      router.refresh()
    } catch (e: any) {
      setError(e.message ?? "Failed to save")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-slate-DEFAULT">Settings</h1>
        <p className="text-sm text-slate-DEFAULT/60 mt-1">Configure your organization profile</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-terracotta-DEFAULT/10 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-terracotta-DEFAULT" />
          </div>
          <div>
            <h2 className="font-display font-bold text-slate-DEFAULT">Organization</h2>
            <p className="text-xs text-slate-DEFAULT/50">Your BID, Tourism Board, or business profile</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Organization name *</Label>
            <Input
              placeholder="Downtown Portland BID"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>City *</Label>
            <Input
              placeholder="Portland, OR"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>URL slug</Label>
            <div className="flex items-center mt-1">
              <span className="text-sm text-slate-DEFAULT/40 bg-muted px-3 py-2 border border-input border-r-0 rounded-l-md">
                crawlkit.io/
              </span>
              <Input
                placeholder="portland-downtown"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="rounded-l-none"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <Check className="w-4 h-4" />
            ) : null}
            {saved ? "Saved!" : loading ? "Saving..." : "Save organization"}
          </Button>
        </div>
      </div>
    </div>
  )
}
