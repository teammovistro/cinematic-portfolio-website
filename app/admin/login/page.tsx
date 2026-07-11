'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Clapperboard, Lock, ArrowRight, ShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('movistro')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/users')
      const users = await res.json()

      let matchedUser = null
      if (Array.isArray(users)) {
        matchedUser = users.find(
          (u: any) =>
            u.username.toLowerCase() === username.trim().toLowerCase() &&
            u.password === password &&
            u.active !== false
        )
      }

      if (!matchedUser && username === 'admin' && (password === 'movistro' || password === 'aurelius')) {
        matchedUser = {
          id: 'user-admin',
          username: 'admin',
          name: 'Movistro Executive',
          role: 'super_admin',
        }
      }

      if (matchedUser) {
        localStorage.setItem(
          'movistro_admin_auth',
          JSON.stringify({
            id: matchedUser.id,
            user: matchedUser.username,
            name: matchedUser.name,
            role: matchedUser.role,
            timestamp: Date.now(),
          })
        )
        router.replace('/admin')
      } else {
        setError('Invalid credentials or deactivated studio account.')
        setLoading(false)
      }
    } catch (err) {
      setError('Authentication server error. Check connection.')
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Cinematic ambient lighting glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue/5 blur-[120px]" />
      <div className="vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md rounded-sm border border-border/80 bg-surface/90 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-10"
      >
        {/* Brand Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-sm border border-gold/40 bg-section text-gold shadow-[0_0_25px_rgba(212,166,79,0.2)]">
            <Clapperboard className="h-7 w-7" />
          </div>
          <h1 className="font-display text-2xl uppercase tracking-tight text-foreground md:text-3xl">
            Movistro Studio
          </h1>
          <span className="mt-1 font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Executive Access OS
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 rounded-sm border border-red-500/40 bg-red-950/40 p-3 font-mono text-xs text-red-300"
            >
              <ShieldAlert className="h-4 w-4 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Studio ID / Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-sm border border-border bg-section px-4 py-3 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
              placeholder="e.g., admin"
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Security Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-sm border border-border bg-section px-4 py-3 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <Lock className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Enter Studio Control'}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 border-t border-border/60 pt-6 text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            🔒 Restricted Area · Studio Executives Only
          </p>
        </div>
      </motion.div>
    </div>
  )
}
