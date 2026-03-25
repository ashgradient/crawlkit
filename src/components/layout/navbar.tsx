"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "/routes", label: "Explore Routes" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[hsl(40,33%,97%)]/90 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-slate-DEFAULT">
          <div className="w-8 h-8 bg-terracotta-DEFAULT rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span>CrawlKit</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-terracotta-DEFAULT",
                pathname === link.href ? "text-terracotta-DEFAULT" : "text-slate-DEFAULT/70"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white">
              Start free
            </Button>
          </Link>
        </div>

        {/* Mobile menu */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[hsl(40,33%,97%)] border-b border-border px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-slate-DEFAULT"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full">Sign in</Button>
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)}>
              <Button className="w-full bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white">
                Start free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
