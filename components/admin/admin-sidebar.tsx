'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/app/admin/layout'
import { 
  LayoutDashboard, 
  Film, 
  Mail, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Clapperboard,
  Sparkles,
  Users,
  Send,
  ShieldAlert
} from 'lucide-react'

export function AdminSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const handleLogout = () => {
    localStorage.removeItem('movistro_admin_auth')
    localStorage.removeItem('aurelius_admin_auth')
    window.location.href = '/admin/login'
  }

  const roleLabel =
    user?.role === 'super_admin'
      ? 'Super Admin'
      : user?.role === 'editor'
      ? 'Producer'
      : 'CRM Viewer'

  const roleColor =
    user?.role === 'super_admin'
      ? 'bg-gold/20 text-gold border-gold/40'
      : user?.role === 'editor'
      ? 'bg-blue/20 text-blue border-blue/40'
      : 'bg-success/20 text-success border-success/40'

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard, roles: ['super_admin', 'editor', 'viewer'] },
    { label: 'Projects', href: '/admin/projects', icon: Film, roles: ['super_admin', 'editor'] },
    { label: 'Inquiries CRM', href: '/admin/inquiries', icon: Mail, roles: ['super_admin', 'editor', 'viewer'] },
    { label: 'Team & Roles', href: '/admin/users', icon: Users, roles: ['super_admin'] },
    { label: 'Telegram Alerts', href: '/admin/telegram', icon: Send, roles: ['super_admin'] },
    { label: 'Studio Settings', href: '/admin/settings', icon: Settings, roles: ['super_admin'] },
  ]

  const visibleItems = navItems.filter((item) => !user || item.roles.includes(user.role))

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col justify-between border-r border-border bg-surface/80 p-6 backdrop-blur-xl transition-all">
      {/* Brand Header */}
      <div>
        <div className="mb-6 flex items-center justify-between border-b border-border pb-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-gold text-background shadow-[0_0_15px_rgba(212,166,79,0.3)]">
              <Clapperboard className="h-5 w-5" />
            </div>
            <div>
              <span className="block font-display text-base uppercase tracking-tight text-foreground">
                Movistro
              </span>
              <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-gold">
                Studio OS v2.4
              </span>
            </div>
          </Link>
        </div>

        {/* User Role Badge */}
        {user && (
          <div className="mb-6 rounded-sm border border-border/60 bg-section/60 p-3">
            <span className="block font-display text-xs uppercase tracking-tight text-foreground truncate">
              {user.name}
            </span>
            <div className="mt-1.5 flex items-center justify-between">
              <span className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider ${roleColor}`}>
                {roleLabel}
              </span>
              <span className="font-mono text-[0.6rem] text-muted-foreground">@{user.user}</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="space-y-1">
          <span className="mb-2 block px-3 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            Menu
          </span>
          <nav className="space-y-1">
            {visibleItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-sm px-3 py-2.5 font-mono text-xs uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-gold/15 text-gold border-l-2 border-gold font-medium shadow-[inset_0_0_10px_rgba(212,166,79,0.1)]'
                      : 'text-muted-foreground hover:bg-section hover:text-foreground'
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-gold' : 'text-muted-foreground'}`} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Footer / Quick Actions */}
      <div className="space-y-4 border-t border-border pt-6">
        <Link
          href="/"
          target="_blank"
          className="flex w-full items-center justify-between rounded-sm border border-border bg-section/50 px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-all hover:border-gold hover:text-foreground"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Live World
          </span>
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-sm px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Lock Session
        </button>
      </div>
    </aside>
  )
}
