'use client'

import { useEffect, useState } from 'react'
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
      className={`flex h-screen w-screen flex-col justify-end pb-24 sm:pb-0 sm:justify-center items-center text-center gap-2 sm:gap-4 px-6 sm:px-12 md:px-20 ${justifyDesktop}`}
    >
      {children}
    </section>
  )
}

export function Overlay() {
  const [introOpacity, setIntroOpacity] = useState(1)
  const projects = useLiveProjects()

  useEffect(() => {
    const handleWheel = (e: Event) => {
      const scrollContainer = document.querySelector('[data-scroll]')
      if (scrollContainer) {
        const scrollY = (scrollContainer as HTMLElement).scrollTop || 0
        setIntroOpacity(Math.max(0, 1 - scrollY / 300))
      }
    }

    const scrollContainer =
      document.querySelector('[data-scroll]') || window
    scrollContainer.addEventListener('wheel', handleWheel)
    return () => scrollContainer.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className="w-screen">
      {/* intro — fades out on scroll */}
      <section
        style={{ opacity: introOpacity }}
        className="pointer-events-none flex h-screen w-screen flex-col items-center justify-between pt-20 pb-24 sm:py-20 px-5 transition-opacity"
      >
        <span className="font-mono text-[0.62rem] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.5em] text-[color:var(--muted-foreground)] text-center">
          Cinematography · Photography · Management · Marketing
        </span>
        <div className="flex flex-col items-center gap-3 sm:gap-4 pb-6 sm:pb-0">
          <p className="max-w-xs sm:max-w-md text-pretty text-center font-mono text-xs sm:text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            A premier studio crafting cinematography, photography, management & marketing from Faridpur, Bangladesh to the world.
          </p>
          <span className="font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[color:var(--gold)]">
            Scroll to enter ↓
          </span>
        </div>
      </section>

      {/* one caption panel per artwork, placed opposite the frame on desktop, bottom centered on mobile */}
      {projects.map((p, i) => (
        <Panel key={p.id || p.title} align={i % 2 === 0 ? 'right' : 'left'}>
          <span className="font-mono text-[0.62rem] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[color:var(--gold)]">
            {p.category} · {p.year}
          </span>
          <h2 className="font-display text-xl sm:text-5xl uppercase leading-none tracking-tight text-[color:var(--foreground)] md:text-7xl">
            {p.title}
          </h2>
          <p className="max-w-[260px] sm:max-w-xs text-pretty text-[0.72rem] sm:text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            {p.description || DESCRIPTIONS[i] || 'Cinematic exploration.'}
          </p>
        </Panel>
      ))}

      {/* contact */}
      <Panel>
        <span className="font-mono text-[0.62rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[color:var(--gold)]">
          Start a project
        </span>
        <h2 className="text-balance font-display text-2xl sm:text-4xl uppercase leading-tight tracking-tight text-[color:var(--foreground)] md:text-6xl">
          Ready when you are
        </h2>
        <div className="mt-4 sm:mt-6 flex flex-col items-center justify-center">
          <a
            href="/booking"
            data-cursor="hover"
            className="pointer-events-auto inline-flex items-center justify-center rounded-sm bg-[color:var(--gold)] px-7 py-3.5 sm:px-10 sm:py-5 font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-background shadow-[0_0_35px_rgba(212,166,79,0.5)] transition-all hover:bg-foreground hover:text-background hover:scale-105 font-bold"
          >
            ✦ Book Now
          </a>
        </div>
        <span className="mt-5 sm:mt-8 font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[color:var(--muted-foreground)]">
          Faridpur, Bangladesh — Worldwide
        </span>
        <a
          href="/partners"
          data-cursor="hover"
          className="pointer-events-auto mt-2 sm:mt-3 font-mono text-[0.58rem] sm:text-[0.65rem] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[color:var(--gold)]/80 hover:text-[color:var(--gold)] transition-colors"
        >
          Official IT Partner & Website Architect: Micro Logic IT
        </a>
      </Panel>
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
