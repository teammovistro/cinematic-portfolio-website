'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function Chrome() {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
      className="pointer-events-none fixed inset-0 z-40"
    >
      {/* top bar */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6 md:px-12">
        <span className="font-display text-base sm:text-lg uppercase tracking-tight text-[color:var(--foreground)]">
          Movistro
        </span>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-7">
          <button
            onClick={() => router.push('/about')}
            data-cursor="hover"
            className="pointer-events-auto font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--gold)]"
          >
            About
          </button>
          <button
            onClick={() => router.push('/partners')}
            data-cursor="hover"
            className="pointer-events-auto font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--gold)]"
          >
            Partners
          </button>
          <button
            onClick={() => router.push('/booking')}
            data-cursor="hover"
            className="pointer-events-auto font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--gold)]"
          >
            Contact
          </button>
        </div>
      </header>

      {/* bottom hint */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex flex-col sm:flex-row items-center justify-between gap-1.5 px-4 sm:px-8 md:px-12 text-center">
        <button
          onClick={() => router.push('/partners')}
          data-cursor="hover"
          className="pointer-events-auto font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--gold)]"
        >
          IT Partner: <span className="text-[color:var(--foreground)]">Micro Logic IT</span>
        </button>
        <span className="font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[color:var(--gold)]">
          Touch / Drag / Scroll to explore
        </span>
      </div>
    </motion.div>
  )
}
