import Link from "next/link"
import { MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-DEFAULT text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-white mb-3">
            <div className="w-8 h-8 bg-terracotta-DEFAULT rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            CrawlKit
          </Link>
          <p className="text-sm text-white/60 max-w-sm">
            Themed walking routes that drive foot traffic to local businesses. GPS + QR check-ins at each stop.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="/routes" className="hover:text-white transition-colors">Browse Routes</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 border-t border-white/10 text-xs text-white/40">
        © {new Date().getFullYear()} CrawlKit. All rights reserved.
      </div>
    </footer>
  )
}
