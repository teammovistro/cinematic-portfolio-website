'use client'

import { usePathname } from 'next/navigation'
import { Bell, Search, ShieldCheck } from 'lucide-react'

export function AdminHeader() {
  const pathname = usePathname()
  
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Executive Overview'
    if (pathname.includes('/projects')) return 'Portfolio Manager'
    if (pathname.includes('/inquiries')) return 'CRM & Bookings'
    if (pathname.includes('/users')) return 'Team & RBAC Management'
    if (pathname.includes('/telegram')) return 'Telegram Bot Notification Engine'
    if (pathname.includes('/settings')) return 'Studio Configuration'
    return 'Dashboard'
  }

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-md">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-4">
        <h1 className="font-display text-xl uppercase tracking-tight text-foreground md:text-2xl">
          {getPageTitle()}
        </h1>
        <span className="hidden rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-success md:inline-flex md:items-center md:gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Live Engine
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search simulation */}
        <div className="relative hidden w-64 lg:block">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects, clients..."
            className="w-full rounded-sm border border-border bg-surface py-1.5 pl-9 pr-4 font-mono text-xs text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-colors"
          />
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-2 rounded-sm border border-border bg-section px-3 py-1.5 font-mono text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-gold" />
          <span className="hidden sm:inline">Admin Protected</span>
        </div>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-surface text-muted-foreground transition-colors hover:border-gold hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold font-mono text-[0.6rem] font-bold text-background">
            2
          </span>
        </button>
      </div>
    </header>
  )
}
