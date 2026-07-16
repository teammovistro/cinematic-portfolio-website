'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLiveProjects } from './data'

function Panel({
  children,
  align = 'center',
}: {
  children: React.ReactNode
  align?: 'left' | 'right' | 'center'
}) {
  const justifyDesktop =
    align === 'left'
      ? 'md:items-start md:text-left'
      : align === 'right'
        ? 'md:items-end md:text-right'
        : 'md:items-center md:text-center'
  return (
    <section
      className={`flex h-screen w-screen flex-col justify-end pb-14 sm:pb-0 sm:justify-center items-center text-center gap-2 sm:gap-4 px-4 sm:px-12 md:px-20 relative ${justifyDesktop}`}
    >
      {/* subtle bottom gradient backdrop on mobile to ensure pristine text readability */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none -z-10" />
      {children}
    </section>
  )
}

export function Overlay({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [introOpacity, setIntroOpacity] = useState(1)
  const [transitioning, setTransitioning] = useState(false)
  const projects = useLiveProjects()

  useEffect(() => {
    let rafId: number
    const scrollContainer = document.querySelector('[data-scroll]') || window

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const el = document.querySelector('[data-scroll]')
        const scrollY = el ? (el as HTMLElement).scrollTop : window.scrollY || 0
        setIntroOpacity(Math.max(0, 1 - scrollY / 300))
      })
    }

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault()
    setTransitioning(true)
    setTimeout(() => {
      if (onNavigate) {
        onNavigate('/booking')
      } else {
        window.location.href = '/booking'
      }
    }, 750)
  }

  return (
    <div className="w-screen">
      {/* Cinematic Transition Overlay when clicking Book Now */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-auto bg-black/90 backdrop-blur-md overflow-hidden"
          >
            {/* Top Cinematic Shutter Blade */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-[#080808] border-b border-[color:var(--gold)]/50 shadow-2xl"
            />
            {/* Bottom Cinematic Shutter Blade */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#080808] border-t border-[color:var(--gold)]/50 shadow-2xl"
            />

            {/* Glowing Golden Center Clapper & Text */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative z-10 flex flex-col items-center gap-3 text-center px-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--gold)] bg-[color:var(--gold)]/20 text-[color:var(--gold)] shadow-[0_0_50px_rgba(212,166,79,0.8)] animate-pulse">
                <span className="font-display text-2xl">✦</span>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">
                Movistro Studio Suite
              </span>
              <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-foreground">
                Entering Booking Portal...
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* intro — fades out on scroll */}
      <section
        style={{ opacity: introOpacity }}
        className="pointer-events-none flex h-screen w-screen flex-col items-center justify-between pt-24 pb-24 sm:py-20 px-5 transition-opacity"
      >
        <span className="font-mono text-[0.62rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.5em] text-[color:var(--muted-foreground)] text-center max-w-[92vw]">
          Cinematography · Photography · Management · Marketing
        </span>
        <div className="flex flex-col items-center gap-3 sm:gap-4 pb-4 sm:pb-0">
          <p className="max-w-[290px] sm:max-w-md text-pretty text-center font-mono text-xs sm:text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            A premier studio crafting cinematography, photography, management & marketing from Faridpur, Bangladesh to the world.
          </p>
          <span className="font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[color:var(--gold)] animate-pulse">
            Scroll to enter ↓
          </span>
        </div>
      </section>

      {/* one caption panel per artwork, placed opposite the frame on desktop, bottom centered on mobile */}
      {projects.map((p, i) => (
        <Panel key={p.id || p.title} align={i % 2 === 0 ? 'right' : 'left'}>
          <div className="flex flex-col items-center md:items-inherit bg-black/65 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-5 sm:p-0 rounded-2xl sm:rounded-none border sm:border-0 border-white/10 max-w-[90vw] sm:max-w-none shadow-2xl sm:shadow-none pointer-events-auto">
            <span className="font-mono text-[0.68rem] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[color:var(--gold)] font-medium">
              {String(i + 1).padStart(2, '0')} // {p.category} · {p.year}
            </span>
            <h2 className="font-display text-2xl sm:text-5xl uppercase leading-none tracking-tight text-[color:var(--foreground)] md:text-7xl mt-1.5 drop-shadow-md">
              {p.title}
            </h2>
            <p className="max-w-[280px] sm:max-w-xs text-pretty text-xs sm:text-sm leading-relaxed text-[color:var(--muted-foreground)] mt-2">
              {p.description || DESCRIPTIONS[i] || 'Cinematic exploration.'}
            </p>
          </div>
        </Panel>
      ))}

      {/* full screen closing contact & book now section */}
      <section className="flex h-screen w-screen flex-col justify-center items-center text-center px-6 sm:px-12 md:px-20 relative pointer-events-auto">
        <div className="flex flex-col items-center max-w-2xl mx-auto z-10">
          <span className="font-mono text-[0.68rem] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[color:var(--gold)] font-semibold animate-pulse">
            Start a project
          </span>
          <h2 className="text-balance font-display text-4xl sm:text-6xl md:text-8xl uppercase leading-none tracking-tight text-[color:var(--foreground)] mt-2 sm:mt-4 drop-shadow-xl">
            Ready when you are
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[color:var(--muted-foreground)] max-w-sm sm:max-w-md leading-relaxed">
            From Faridpur, Bangladesh to the world — bringing your cinematic and commercial vision to life.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
            <button
              onClick={handleBookNow}
              data-cursor="hover"
              className="pointer-events-auto w-full sm:w-auto inline-flex items-center justify-center rounded-sm bg-[color:var(--gold)] px-8 py-4 sm:px-12 sm:py-5 font-mono text-xs sm:text-sm uppercase tracking-[0.28em] text-background shadow-[0_0_45px_rgba(212,166,79,0.6)] transition-all hover:bg-foreground hover:text-background hover:scale-105 font-bold cursor-pointer"
            >
              ✦ Book Now
            </button>
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/portfolio')
                } else {
                  window.location.href = '/portfolio'
                }
              }}
              data-cursor="hover"
              className="pointer-events-auto w-full sm:w-auto inline-flex items-center justify-center rounded-sm border border-[color:var(--gold)]/60 bg-surface/80 px-8 py-4 sm:px-10 sm:py-5 font-mono text-xs sm:text-sm uppercase tracking-[0.28em] text-[color:var(--gold)] shadow-[0_0_25px_rgba(212,166,79,0.25)] transition-all hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-background hover:scale-105 font-bold cursor-pointer"
            >
              ✦ Full Grid
            </button>
          </div>
        </div>

        {/* Bottom credits anchored neatly in the full screen view */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-1.5 px-4 z-10 pointer-events-auto">
          <span className="font-mono text-[0.62rem] sm:text-[0.7rem] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[color:var(--muted-foreground)]">
            Faridpur, Bangladesh — Worldwide
          </span>
          <a
            href="/partners"
            data-cursor="hover"
            className="font-mono text-[0.58rem] sm:text-[0.68rem] uppercase tracking-[0.18em] sm:tracking-[0.3em] text-[color:var(--gold)]/90 hover:text-[color:var(--gold)] transition-colors"
          >
            Official IT Partner & Website Architect: Micro Logic IT
          </a>
        </div>
      </section>
    </div>
  )
}

const DESCRIPTIONS = [
  'A nocturnal short shot on anamorphic glass, chasing light through empty streets.',
  'High-velocity automotive spot graded in teal and amber neon.',
  'A fashion film built on negative space, natural light, and slow motion.',
  'An intimate documentary captured at sea through fog and first light.',
  'A high-energy music video lit with bold, saturated stage color.',
  'Sweeping aerial cinematography across mountain roads at golden hour.',
  'Behind the scenes — the craft, the crew, and the camera in motion.',
  'An editorial portrait series exploring texture and single-source light.',
]
