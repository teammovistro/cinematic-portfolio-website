'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Clapperboard,
  Search,
  Sparkles,
  LayoutGrid,
  List,
  Eye,
  ArrowRight,
  Filter,
  Film,
  Camera,
  Layers,
  Calendar,
  X,
  Play,
  ArrowUpRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project, INITIAL_PROJECTS } from '@/components/world/data'

export default function PortfolioPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'filmstrip' | 'spotlight'>('grid')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeOnly = data.filter((p) => p.active !== false)
          setProjects(activeOnly)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch dynamic projects:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory
    return matchesSearch && matchesCat
  })

  // Technical camera and color grading simulation based on category
  const getTechSpecs = (category: string) => {
    switch (category) {
      case 'Feature Film':
      case 'Short Film':
        return {
          camera: 'ARRI Alexa LF · Panavision Anamorphic',
          aspectRatio: '2.39:1 CinemaScope',
          colorStyle: 'Kodak Vision3 500T 5219 Simulation',
          audio: 'Dolby Atmos 7.1 Master Mix',
        }
      case 'Automotive':
        return {
          camera: 'RED V-Raptor 8K VV · Cine-Servo Zoom',
          aspectRatio: '2.00:1 Dynamic Frame',
          colorStyle: 'Teal & Amber High-Contrast Neon Grade',
          audio: 'Spatial Engine & Exhaust Audio Capture',
        }
      case 'Fashion Film':
      case 'Editorial':
        return {
          camera: 'Hasselblad H6D-100c / Sony FX9',
          aspectRatio: '4:3 & 16:9 Multi-Format',
          colorStyle: 'Desaturated Pastel & High-Key Silver Grade',
          audio: 'Minimalist Ambient & Synth Soundscape',
        }
      default:
        return {
          camera: 'Sony Venice 2 · Zeiss Supreme Primes',
          aspectRatio: '16:9 Cinematic Widescreen',
          colorStyle: 'Natural Balanced & Rich Skin Tones',
          audio: 'Stereo Master & Spatial Dialogue',
        }
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[color:var(--gold)] selection:text-background relative overflow-x-hidden">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/85 backdrop-blur-xl px-4 py-4 sm:px-8 sm:py-6 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-base sm:text-xl uppercase tracking-tight hover:text-[color:var(--gold)] transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[color:var(--gold)] text-background shadow-[0_0_15px_rgba(212,166,79,0.3)]">
            <Clapperboard className="h-4 w-4" />
          </div>
          <span>Movistro</span>
        </Link>
        <nav className="flex items-center gap-2.5 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-none py-1">
          <Link
            href="/portfolio"
            className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.25em] text-[color:var(--gold)] font-bold transition-colors whitespace-nowrap"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.25em] text-muted-foreground hover:text-[color:var(--gold)] transition-colors whitespace-nowrap"
          >
            About
          </Link>
          <Link
            href="/partners"
            className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.25em] text-muted-foreground hover:text-[color:var(--gold)] transition-colors whitespace-nowrap"
          >
            Partners
          </Link>
          <Link
            href="/booking"
            className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.25em] text-muted-foreground hover:text-[color:var(--gold)] transition-colors whitespace-nowrap"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-12 md:py-28 lg:py-36">
        {/* Ambient background light spheres */}
        <div className="pointer-events-none absolute left-1/4 top-10 -translate-x-1/2 h-96 w-96 rounded-full bg-[color:var(--gold)]/10 blur-[130px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-[color:var(--gold)]/5 blur-[120px]" />

        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--gold)] shadow-[0_0_20px_rgba(212,166,79,0.15)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Cinematic Master Archive
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 font-display text-4xl uppercase leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            The Portfolio <br />
            <span className="text-[color:var(--gold)]">Showcase</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-pretty font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base"
          >
            Explore our curated catalog of films, commercials, fashion editorials, and documentary cinematography. Every work represents meticulous craft, custom lighting, and powerful storytelling.
          </motion.p>

          {/* Quick Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 rounded-xl border border-border/70 bg-card/40 p-4 backdrop-blur-md sm:grid-cols-4 sm:p-6"
          >
            <div className="border-r border-border/50 px-2 last:border-r-0 sm:last:border-r-0">
              <span className="block font-display text-2xl sm:text-3xl font-bold text-[color:var(--gold)]">
                {projects.length}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Total Works
              </span>
            </div>
            <div className="border-r border-border/50 px-2 sm:last:border-r-0">
              <span className="block font-display text-2xl sm:text-3xl font-bold text-foreground">
                {categories.length - 1}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Disciplines
              </span>
            </div>
            <div className="border-r border-border/50 px-2 last:border-r-0 sm:last:border-r-0">
              <span className="block font-display text-2xl sm:text-3xl font-bold text-foreground">
                4K+
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Master Resolution
              </span>
            </div>
            <div className="px-2">
              <span className="block font-display text-2xl sm:text-3xl font-bold text-[color:var(--gold)]">
                2024-26
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Archive Range
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="sticky top-16 z-40 border-y border-border/70 bg-background/90 px-4 py-4 backdrop-blur-xl sm:px-8 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 lg:flex-row lg:items-center">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-sm px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[color:var(--gold)] text-background font-bold shadow-[0_0_15px_rgba(212,166,79,0.35)] scale-105'
                    : 'border border-border/80 bg-surface/60 text-muted-foreground hover:border-[color:var(--gold)]/50 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & View Switcher */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto">
            <div className="relative flex-1 min-w-[200px] sm:w-64">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-sm border border-border bg-surface/80 py-1.5 pl-9 pr-8 font-mono text-xs text-foreground placeholder-muted-foreground focus:border-[color:var(--gold)] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center rounded-sm border border-border bg-section p-1 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-sm p-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[color:var(--gold)] text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Cinematic Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('filmstrip')}
                className={`rounded-sm p-1.5 transition-colors ${
                  viewMode === 'filmstrip'
                    ? 'bg-[color:var(--gold)] text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Filmstrip List View"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('spotlight')}
                className={`rounded-sm p-1.5 transition-colors ${
                  viewMode === 'spotlight'
                    ? 'bg-[color:var(--gold)] text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Spotlight Reel View"
              >
                <Film className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Grid / List / Spotlight */}
      <section className="px-6 py-12 sm:px-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex h-80 flex-col items-center justify-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[color:var(--gold)] border-t-transparent" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Loading Studio Reels...
              </span>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
              <Film className="mb-4 h-10 w-10 text-muted-foreground/40" />
              <h3 className="font-display text-xl uppercase tracking-wide text-foreground">
                No Projects Found
              </h3>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                No works match your filter query. Try adjusting your category or search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
                className="mt-6 rounded-sm bg-[color:var(--gold)] px-6 py-2 font-mono text-xs uppercase tracking-widest text-background font-bold transition-all hover:bg-foreground hover:text-background"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* 1. Cinematic Grid View */
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id || project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  onMouseEnter={() => setHoveredId(project.id || project.title)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveModalProject(project)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-border/70 bg-surface/60 transition-all duration-300 hover:border-[color:var(--gold)]/80 hover:bg-card hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)] cursor-pointer"
                >
                  {/* Image & Shutter Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-section">
                    {/* Simulated image backdrop with glowing pulse */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-section via-background to-section text-muted-foreground/30">
                      <Film className="h-12 w-12 opacity-20" />
                    </div>

                    {/* Sequence Badge */}
                    <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-sm border border-background/60 bg-background/80 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-[color:var(--gold)] backdrop-blur-md">
                      <span>✦ #{String(idx + 1).padStart(2, '0')}</span>
                    </div>

                    {/* Category & Year Badge */}
                    <div className="absolute right-3 top-3 z-10 rounded-sm bg-black/70 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-white backdrop-blur-md">
                      {project.year}
                    </div>

                    {/* Hover Play / View Overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
                      <div className="flex items-center gap-2 rounded-full border border-[color:var(--gold)] bg-[color:var(--gold)]/20 px-5 py-2 font-mono text-xs uppercase tracking-widest text-[color:var(--gold)] shadow-[0_0_25px_rgba(212,166,79,0.5)] transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>View Reel Specs</span>
                      </div>
                    </div>

                    {/* Bottom gradient fade */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
                  </div>

                  {/* Content Breakdown */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--gold)]">
                        {project.category}
                      </span>
                      <h3 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground group-hover:text-[color:var(--gold)] transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 line-clamp-3 font-mono text-xs leading-relaxed text-muted-foreground">
                        {project.description || 'An immersive visual exploration of light, shadow, and narrative.'}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                      <span className="flex items-center gap-1 text-[color:var(--gold)] group-hover:underline">
                        Explore Production <ArrowUpRight className="h-3 w-3" />
                      </span>
                      <span>Master 4K</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : viewMode === 'filmstrip' ? (
            /* 2. Filmstrip List View */
            <div className="space-y-4">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id || project.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  onClick={() => setActiveModalProject(project)}
                  className="group flex flex-col justify-between gap-6 rounded-md border border-border/70 bg-surface/60 p-5 transition-all duration-300 hover:border-[color:var(--gold)] hover:bg-card hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] sm:flex-row sm:items-center cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-base font-bold text-[color:var(--gold)] w-8">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-[color:var(--gold)]">
                        <span>{project.category}</span>
                        <span>·</span>
                        <span className="text-muted-foreground">{project.year}</span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-foreground group-hover:text-[color:var(--gold)] transition-colors mt-0.5">
                        {project.title}
                      </h3>
                      <p className="mt-1 max-w-xl line-clamp-1 font-mono text-xs text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-border/40 pt-3 sm:border-t-0 sm:pt-0">
                    <span className="rounded-sm border border-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground group-hover:border-[color:var(--gold)]/50 group-hover:text-foreground transition-colors">
                      CinemaScope 4K
                    </span>
                    <button className="flex items-center gap-1.5 rounded-sm bg-[color:var(--gold)]/15 px-4 py-2 font-mono text-xs uppercase tracking-widest text-[color:var(--gold)] font-bold group-hover:bg-[color:var(--gold)] group-hover:text-background transition-all">
                      <span>Specs</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* 3. Spotlight Reel View (Large Showcase Cards) */
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {filteredProjects.map((project, idx) => {
                const specs = getTechSpecs(project.category)
                return (
                  <motion.div
                    key={project.id || project.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    onClick={() => setActiveModalProject(project)}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[color:var(--gold)]/40 bg-gradient-to-br from-card via-surface to-background p-6 sm:p-8 shadow-2xl transition-all hover:border-[color:var(--gold)] hover:shadow-[0_0_40px_rgba(212,166,79,0.2)] cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--gold)]">
                          <Sparkles className="h-3.5 w-3.5" />
                          Master Reel #{String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="rounded-full bg-section px-3 py-1 font-mono text-xs text-muted-foreground">
                          {project.year} · {project.category}
                        </span>
                      </div>

                      <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-foreground group-hover:text-[color:var(--gold)] transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-3 font-mono text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      {/* Technical Specs Breakdown */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg border border-border/50 bg-section/60 p-4 font-mono text-xs">
                        <div>
                          <span className="block text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                            Camera System
                          </span>
                          <span className="text-foreground">{specs.camera}</span>
                        </div>
                        <div>
                          <span className="block text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                            Aspect Ratio
                          </span>
                          <span className="text-foreground">{specs.aspectRatio}</span>
                        </div>
                        <div>
                          <span className="block text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                            Color Grade
                          </span>
                          <span className="text-foreground truncate">{specs.colorStyle}</span>
                        </div>
                        <div>
                          <span className="block text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                            Soundtrack & Mix
                          </span>
                          <span className="text-foreground">{specs.audio}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between pt-4 border-t border-border/60">
                      <span className="font-mono text-xs text-muted-foreground">
                        Click to view cinematic reel modal
                      </span>
                      <button className="flex items-center gap-2 rounded-sm bg-[color:var(--gold)] px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-background font-bold shadow-[0_0_15px_rgba(212,166,79,0.3)] group-hover:bg-foreground transition-all">
                        <span>Launch Reel</span>
                        <Play className="h-3.5 w-3.5 fill-current" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Cinematic Project Preview Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-xl overflow-y-auto"
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-[color:var(--gold)]/60 bg-surface text-foreground shadow-[0_0_70px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-border bg-section/90 px-6 py-4">
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[color:var(--gold)]">
                  <Clapperboard className="h-4 w-4" />
                  <span>Movistro Studio · Master Production File</span>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="rounded-full p-1 text-muted-foreground hover:bg-section hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content Body */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
                {/* Simulated Player Viewport */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black shadow-inner flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                  
                  {/* Glowing Center Play Indicator */}
                  <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[color:var(--gold)] bg-[color:var(--gold)]/25 text-[color:var(--gold)] shadow-[0_0_40px_rgba(212,166,79,0.8)] animate-pulse">
                      <Play className="h-7 w-7 fill-current ml-1" />
                    </div>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/90">
                      Master Color Graded Reel · 4K UHD
                    </span>
                  </div>

                  {/* Shutter frame marks */}
                  <div className="absolute left-4 bottom-4 z-10 font-mono text-[0.65rem] text-[color:var(--gold)]">
                    REC ● 23.98 FPS · ISO 800
                  </div>
                  <div className="absolute right-4 bottom-4 z-10 font-mono text-[0.65rem] text-white/70 uppercase">
                    {activeModalProject.category} / {activeModalProject.year}
                  </div>
                </div>

                {/* Project Details Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/70 pb-6">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] font-bold">
                      {activeModalProject.category} · {activeModalProject.year}
                    </span>
                    <h2 className="mt-1 font-display text-3xl sm:text-5xl uppercase tracking-tight text-foreground">
                      {activeModalProject.title}
                    </h2>
                  </div>
                  <Link
                    href={`/booking?type=${activeModalProject.category.toLowerCase()}`}
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-[color:var(--gold)] px-7 py-3 font-mono text-xs uppercase tracking-widest text-background font-bold shadow-[0_0_20px_rgba(212,166,79,0.4)] hover:bg-foreground hover:text-background transition-all whitespace-nowrap"
                  >
                    <span>✦ Book This Production Style</span>
                  </Link>
                </div>

                {/* Description and Technical Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Cinematic Treatment & Narrative
                    </h4>
                    <p className="font-mono text-sm leading-relaxed text-foreground/90">
                      {activeModalProject.description || 'An evocative exploration of atmosphere, single-source practical lighting, and character emotion. Captured on high-end anamorphic glass to ensure organic bokeh and rich color rendition across every frame.'}
                    </p>
                    <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                      Produced and managed directly from Movistro Studio headquarters in Faridpur, Bangladesh, with complete post-production grading and spatial audio mixing.
                    </p>
                  </div>

                  {/* Specifications Card */}
                  <div className="rounded-lg border border-border/80 bg-section/70 p-5 space-y-4 font-mono text-xs">
                    <h4 className="font-bold text-[color:var(--gold)] uppercase tracking-wider border-b border-border/60 pb-2">
                      Technical Specs
                    </h4>
                    <div>
                      <span className="block text-[0.65rem] uppercase text-muted-foreground">Camera System</span>
                      <span className="text-foreground font-medium">ARRI Alexa Mini / RED V-Raptor</span>
                    </div>
                    <div>
                      <span className="block text-[0.65rem] uppercase text-muted-foreground">Lenses</span>
                      <span className="text-foreground font-medium">Cooke Anamorphic Primes</span>
                    </div>
                    <div>
                      <span className="block text-[0.65rem] uppercase text-muted-foreground">Color Grading</span>
                      <span className="text-foreground font-medium">DaVinci Resolve Studio · Custom LUT</span>
                    </div>
                    <div>
                      <span className="block text-[0.65rem] uppercase text-muted-foreground">Release Year</span>
                      <span className="text-foreground font-medium">{activeModalProject.year}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-border bg-section/50 px-6 py-4">
                <span className="font-mono text-xs text-muted-foreground">
                  Movistro Studio OS v2.4 Archive
                </span>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="rounded-sm border border-border px-6 py-2 font-mono text-xs uppercase tracking-widest text-foreground hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Footer Section */}
      <section className="border-t border-border/60 bg-card/20 px-6 py-20 text-center sm:px-12">
        <div className="mx-auto max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
            Ready to Start
          </span>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-tight text-foreground sm:text-5xl">
            Have a Vision for Your Next Project?
          </h2>
          <p className="mt-4 font-mono text-sm leading-relaxed text-muted-foreground">
            Let our directors and cinematography crew turn your concept into a timeless cinematic experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-sm bg-[color:var(--gold)] px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] font-bold text-background shadow-[0_0_25px_rgba(212,166,79,0.3)] transition-all hover:bg-foreground hover:text-background hover:scale-105"
            >
              ✦ Book a Session
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-sm border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              Return to 3D World
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-8 py-6 text-center md:px-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Movistro Studio · Est. 2024 · Cinematography · Photography · Management · Marketing
        </p>
      </footer>
    </div>
  )
}
