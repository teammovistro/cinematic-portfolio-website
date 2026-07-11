'use client'

import React, { useEffect, useState, createContext, useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface AuthUser {
  id: string
  user: string
  name: string
  role: 'super_admin' | 'editor' | 'viewer'
}

interface Toast {
  id: string
  message: string
  type?: 'success' | 'error'
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void
}

interface AuthContextType {
  user: AuthUser | null
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
})

const AuthContext = createContext<AuthContextType>({
  user: null,
})

export const useToast = () => useContext(ToastContext)
export const useAuth = () => useContext(AuthContext)

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsLoading(false)
      return
    }

    const authStr = localStorage.getItem('movistro_admin_auth') || localStorage.getItem('aurelius_admin_auth')
    if (!authStr) {
      router.replace('/admin/login')
    } else {
      try {
        const authData = JSON.parse(authStr)
        const currentUser: AuthUser = {
          id: authData.id || 'user-admin',
          user: authData.user || 'admin',
          name: authData.name || 'Movistro Executive',
          role: authData.role || 'super_admin',
        }
        setUser(currentUser)

        // Route-level authorization check for sensitive tabs
        const isProtected = pathname.includes('/users') || pathname.includes('/settings') || pathname.includes('/telegram')
        if (isProtected && currentUser.role !== 'super_admin') {
          showToast('Access Denied: Super Admin role required for this section.', 'error')
          router.replace('/admin')
        }
      } catch (err) {
        localStorage.removeItem('movistro_admin_auth')
        localStorage.removeItem('aurelius_admin_auth')
        router.replace('/admin/login')
      }
    }
    setIsLoading(false)
  }, [pathname, router])

  if (pathname === '/admin/login') {
    return (
      <AuthContext.Provider value={{ user: null }}>
        <ToastContext.Provider value={{ showToast }}>{children}</ToastContext.Provider>
      </AuthContext.Provider>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Verifying Studio Authorizations...
          </span>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <AuthContext.Provider value={{ user }}>
      <ToastContext.Provider value={{ showToast }}>
        <div className="min-h-screen bg-background text-foreground">
          <AdminSidebar />
          
          <div className="flex min-h-screen flex-col pl-64 transition-all">
            <AdminHeader />
            <main className="flex-1 p-8 md:p-12">{children}</main>
          </div>

          {/* Toast Notifications */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
            <AnimatePresence>
              {toasts.map((toast) => (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`flex items-center gap-3 rounded-sm border px-4 py-3 shadow-[0_5px_20px_rgba(0,0,0,0.5)] backdrop-blur-md ${
                    toast.type === 'error'
                      ? 'border-red-500/50 bg-red-950/80 text-red-200'
                      : 'border-gold/50 bg-surface/90 text-foreground'
                  }`}
                >
                  {toast.type === 'error' ? (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-gold" />
                  )}
                  <span className="font-mono text-xs tracking-wide">{toast.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </ToastContext.Provider>
    </AuthContext.Provider>
  )
}
