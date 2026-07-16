'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Clapperboard, Menu, X } from 'lucide-react'

export function Chrome() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
      className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between"
    >
      {/* top bar */}
      <header className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-6 md:px-12 bg-gradient-to-b from-background/95 via-background/60 to-transparent">
        <span className="flex items-center gap-2 font-display text-base sm:text-lg uppercase tracking-tight text-[color:var(--foreground)] drop-shadow-sm">
          <Clapperboard className="h-4 w-4 text-[color:var(--gold)]" />
          Movistro
        </span>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          <button
            onClick={() => router.push('/portfolio')}
            data-cursor="hover"
            className="pointer-events-auto font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--gold)] py-1"
          >
            Portfolio
          </button>
          <button
            onClick={() => router.push('/about')}
            data-cursor="hover"
            className="pointer-events-auto font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--gold)] py-1"
          >
            About
          </button>
          <button
            onClick={() => router.push('/partners')}
            data-cursor="hover"
            className="pointer-events-auto font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--gold)] py-1"
          >
            Partners
          </button>
          <button
            onClick={() => router.push('/booking')}
            data-cursor="hover"
            className="pointer-events-auto font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--gold)] py-1"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-cursor="hover"
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/40 bg-black/60 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-[color:var(--gold)] shadow-md backdrop-blur-md active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto fixed inset-0 z-50 flex flex-col justify-center items-center gap-6 bg-black/95 backdrop-blur-2xl px-6 py-12 md:hidden text-center"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white"
            >
              <X className="h-4 w-4" /> Close
            </button>

            <span className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-[color:var(--gold)]">
              Navigation Portal
            </span>

            <button
              onClick={() => { setMobileMenuOpen(false); router.push('/portfolio'); }}
              className="font-display text-2xl uppercase tracking-wider text-foreground hover:text-[color:var(--gold)] transition-colors py-2"
            >
              ✦ Portfolio Showcase
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); router.push('/about'); }}
              className="font-display text-2xl uppercase tracking-wider text-foreground hover:text-[color:var(--gold)] transition-colors py-2"
            >
              ✦ About Studio
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); router.push('/partners'); }}
              className="font-display text-2xl uppercase tracking-wider text-foreground hover:text-[color:var(--gold)] transition-colors py-2"
            >
              ✦ IT Partners
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); router.push('/booking'); }}
              className="font-display text-2xl uppercase tracking-wider text-foreground hover:text-[color:var(--gold)] transition-colors py-2"
            >
              ✦ Contact & Booking
            </button>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-1 w-full max-w-xs text-center">
              <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                Faridpur, Bangladesh — Worldwide
              </span>
              <span className="font-mono text-[0.62rem] text-[color:var(--gold)]">
                +880 1793-602999
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* bottom hint */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-8 sm:py-6 md:px-12 pointer-events-none bg-gradient-to-t from-background/90 via-background/40 to-transparent text-center">
        <span className="font-mono text-[0.58rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[color:var(--gold)]">
          Drag / Scroll to explore ↓
        </span>
        <button
          onClick={() => router.push('/partners')}
          data-cursor="hover"
          className="pointer-events-auto font-mono text-[0.55rem] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--gold)]"
        >
          IT Partner: <span className="text-[color:var(--foreground)]">Micro Logic IT</span>
        </button>
      </div>
    </motion.div>
  )
}
