'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLiveProjects } from './data'

export function MobileStream({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const projects = useLiveProjects()
  const [transitioning, setTransitioning] = useState(false)

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

  return (
    <div className="min-h-screen w-full bg-[#080808] text-foreground overflow-y-auto px-5 pt-24 pb-28 flex flex-col items-center gap-14 pointer-events-auto">
      {/* Cinematic Shutter Transition for Book Now */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-auto bg-black/90 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-[#080808] border-b border-[color:var(--gold)]/50 shadow-2xl"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#080808] border-t border-[color:var(--gold)]/50 shadow-2xl"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative z-10 flex flex-col items-center gap-3 text-center px-4"
            >
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">
                Entering Suite
              </span>
              <h3 className="font-display text-2xl uppercase tracking-tight text-foreground">
                Movistro Studio Suite
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Hero Section */}
      <div className="flex flex-col items-center text-center gap-3 mt-4">
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground font-bold drop-shadow-md">
          MOVISTRO
        </h1>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-[color:var(--gold)]">
          CINEMA · PHOTO · MANAGEMENT
        </span>
        <p className="max-w-[300px] text-pretty text-xs leading-relaxed text-muted-foreground mt-2">
          A premier studio crafting cinematography, photography, management & marketing from Faridpur, Bangladesh to the world.
        </p>
        <div className="mt-4 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground/80 animate-pulse">
          <span>Scroll to explore ↓</span>
        </div>
      </div>

      {/* Minimal Projects Feed */}
      <div className="w-full max-w-md flex flex-col gap-10">
        {projects.map((p, i) => (
          <motion.article
            key={p.id || p.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Project Image */}
            <div className="relative w-full aspect-[16/10] bg-[#111] overflow-hidden group">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-[color:var(--gold)]/30">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--gold)] font-medium">
                  {String(i + 1).padStart(2, '0')} // {p.category}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-5 flex flex-col gap-1.5 text-left">
              <div className="flex items-center justify-between text-muted-foreground font-mono text-[0.65rem] uppercase tracking-wider">
                <span>{p.category}</span>
                <span className="text-[color:var(--gold)]/80">{p.year}</span>
              </div>
              <h2 className="font-display text-2xl uppercase tracking-tight text-foreground font-bold">
                {p.title}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                {p.description || DESCRIPTIONS[i] || 'Cinematic exploration across visual landscapes.'}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-md flex flex-col items-center text-center bg-black/80 border border-[color:var(--gold)]/30 rounded-2xl p-7 shadow-2xl gap-3">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-[color:var(--gold)]">
          Start a project
        </span>
        <h2 className="font-display text-3xl uppercase leading-tight tracking-tight text-foreground">
          Ready when you are
        </h2>
        <div className="mt-3 flex flex-col gap-3 w-full">
          <button
            onClick={handleBookNow}
            className="w-full inline-flex items-center justify-center rounded-sm bg-[color:var(--gold)] py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-background shadow-[0_0_25px_rgba(212,166,79,0.5)] font-bold active:scale-98 transition-transform"
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
            className="w-full inline-flex items-center justify-center rounded-sm border border-[color:var(--gold)]/60 bg-surface/80 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] font-bold active:scale-98 transition-transform"
          >
            ✦ Full Portfolio Grid
          </button>
        </div>
        <span className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
          Faridpur, Bangladesh — Worldwide
        </span>
        <a
          href="/partners"
          className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[color:var(--gold)]/80 hover:text-[color:var(--gold)] transition-colors"
        >
          Official IT Partner: Micro Logic IT
        </a>
      </div>
    </div>
  )
}
