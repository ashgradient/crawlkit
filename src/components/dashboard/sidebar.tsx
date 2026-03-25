"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  MapPin,
  LayoutDashboard,
  Route,
  Building2,
  BarChart2,
  QrCode,
  Award,
  LogOut,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/routes", label: "Routes", icon: Route },
  { href: "/dashboard/businesses", label: "Businesses", icon: Building2 },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/qrcodes", label: "QR Codes", icon: QrCode },
  { href: "/passport", label: "My Passport", icon: Award },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-DEFAULT text-white flex flex-col z-40 hidden lg:flex">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="w-7 h-7 bg-terracotta-DEFAULT rounded-lg flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-white" />
          </div>
          CrawlKit
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                active
                  ? "bg-terracotta-DEFAULT text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback className="bg-terracotta-DEFAULT text-white text-xs">
              {user.name?.[0] ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{user.name}</div>
            <div className="text-xs text-white/40 truncate">{user.email}</div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors px-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
