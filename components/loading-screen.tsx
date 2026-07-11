'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const duration = 1800
    const start = Date.now()
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      setCount(100)
      setOpen(true)
      window.setTimeout(() => {
        setGone(true)
        onDone?.()
      }, 800)
    }

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / duration, 1)
      // Smooth human easing (quartic out)
      const eased = 1 - Math.pow(1 - t, 4)
      const currentCount = Math.round(eased * 100)
      setCount(currentCount)

      if (t >= 1) {
        window.clearInterval(interval)
        finish()
      }
    }, 25)

    const safety = window.setTimeout(finish, duration + 1200)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(safety)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-[#080808] px-8 py-8 md:px-16 md:py-12 select-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle noise texture only */}
          <div className="film-grain" aria-hidden="true" />

          {/* Top Editorial Bar */}
          <header className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[#707070]">
            <div>MOVISTRO STUDIO</div>
            <div>FARIDPUR, BD</div>
          </header>

          {/* Center Clean Typography */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center">
            <div className="overflow-hidden py-2">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: open ? '-100%' : '0%', opacity: open ? 0 : 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl md:text-9xl uppercase tracking-[0.2em] text-[#f2f2f2] font-normal sm:ml-[0.2em]"
              >
                MOVISTRO
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 overflow-hidden"
            >
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#d4a64f]">
                Cinematography · Photography · Management
              </p>
            </motion.div>
          </div>

          {/* Bottom Editorial Bar */}
          <footer className="relative z-10 flex items-end justify-between border-t border-[#1a1a1a] pt-6 font-mono text-xs text-[#707070]">
            <div className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.15em]">
              <span className="text-[#a0a0a0]">Worldwide Production</span>
              <span>© {new Date().getFullYear()}</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#505050]">Loading</span>
              <span className="font-mono text-3xl sm:text-4xl font-light text-[#f2f2f2] tabular-nums tracking-tighter">
                {count.toString().padStart(3, '0')}
              </span>
            </div>
          </footer>

          {/* Minimalist Top Progress Bar */}
          <div className="absolute left-0 top-0 h-[2px] w-full bg-transparent">
            <motion.div
              className="h-full bg-[#d4a64f]"
              style={{ width: `${count}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
