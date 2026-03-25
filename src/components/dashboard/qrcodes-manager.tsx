"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { QrCode, Download, Copy, CheckCheck } from "lucide-react"
import QRCode from "qrcode"

interface QRItem {
  id: string
  token: string
  business: { name: string; address: string }
  _count: { checkIns: number }
}

interface Props {
  qrCodes: QRItem[]
}

function QRCodeCard({ qr }: { qr: QRItem }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)

  const checkInUrl = typeof window !== "undefined"
    ? `${window.location.origin}/checkin/${qr.token}`
    : `/checkin/${qr.token}`

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, checkInUrl, {
        width: 200,
        margin: 2,
        color: { dark: "#1E2D40", light: "#FAF8F5" },
      })
    }
  }, [checkInUrl])

  const handleDownload = () => {
    if (!canvasRef.current) return
    const url = canvasRef.current.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = url
    a.download = `${qr.business.name.toLowerCase().replace(/\s+/g, "-")}-checkin-qr.png`
    a.click()
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(checkInUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl border border-border p-5 flex flex-col items-center">
      <canvas ref={canvasRef} className="rounded-lg mb-3" />
      <h3 className="font-display font-bold text-slate-DEFAULT text-sm text-center mb-0.5">
        {qr.business.name}
      </h3>
      <p className="text-xs text-slate-DEFAULT/50 text-center mb-3">{qr._count.checkIns} check-ins</p>
      <div className="flex gap-2 w-full">
        <Button onClick={handleDownload} size="sm" variant="outline" className="flex-1 gap-1 text-xs">
          <Download className="w-3 h-3" /> Download
        </Button>
        <Button onClick={handleCopy} size="sm" variant="outline" className="flex-1 gap-1 text-xs">
          {copied ? <CheckCheck className="w-3 h-3 text-mint-DEFAULT" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : "Copy URL"}
        </Button>
      </div>
    </div>
  )
}

export function QRCodesManager({ qrCodes }: Props) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-slate-DEFAULT">QR Codes</h1>
        <p className="text-sm text-slate-DEFAULT/60 mt-1">
          Download and print these at each business location. One QR code per business.
        </p>
      </div>

      {qrCodes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-border">
          <QrCode className="w-12 h-12 text-terracotta-DEFAULT/30 mx-auto mb-4" />
          <h3 className="font-display font-bold text-slate-DEFAULT mb-2">No QR codes yet</h3>
          <p className="text-sm text-slate-DEFAULT/50">Add businesses to automatically generate QR codes</p>
        </div>
      ) : (
        <>
          <div className="bg-terracotta-DEFAULT/5 border border-terracotta-DEFAULT/20 rounded-xl px-5 py-3 mb-6 text-sm text-slate-DEFAULT/70">
            💡 <strong>Tip:</strong> Print these QR codes on 4×4 inch cards and place them at each business entrance. Visitors scan them to check in and earn passport stamps.
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {qrCodes.map((qr) => (
              <QRCodeCard key={qr.id} qr={qr} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
