'use client'

import React from 'react'
import Link from 'next/link'
import {
  Clapperboard,
  Cpu,
  ShieldCheck,
  Code2,
  Globe,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Layers,
  Terminal,
  ArrowLeft
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function PartnersPage() {
  const capabilities = [
    {
      icon: <Code2 className="h-6 w-6 text-[color:var(--gold)]" />,
      title: 'Interactive 3D Web & Studio OS',
      desc: 'Architecting ultra-responsive Next.js, WebGL, Three.js, and Framer Motion immersive digital experiences.'
    },
    {
      icon: <Layers className="h-6 w-6 text-[color:var(--gold)]" />,
      title: 'Custom API & Telegram Integration',
      desc: 'Seamless backend communication systems that bridge real-time studio bookings directly to executive Telegram channels.'
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[color:var(--gold)]" />,
      title: 'Enterprise Security & Performance',
      desc: 'High-speed edge deployment, SSL encryption, and rock-solid platform reliability for worldwide studio clients.'
    },
    {
      icon: <Terminal className="h-6 w-6 text-[color:var(--gold)]" />,
      title: 'Long-Term Technical Engineering',
      desc: 'Continuous digital maintenance, cloud scaling, and studio infrastructure upgrades.'
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[color:var(--gold)] selection:text-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-md px-8 py-6 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl uppercase tracking-tight hover:text-[color:var(--gold)] transition-colors"
        >
          <Clapperboard className="h-5 w-5 text-[color:var(--gold)]" />
          Movistro
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          <Link
            href="/about"
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-[color:var(--gold)] transition-colors"
          >
            About
          </Link>
          <Link
            href="/partners"
            className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] transition-colors"
          >
            Partners
          </Link>
          <Link
            href="/booking"
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-[color:var(--gold)] transition-colors"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero Spotlight */}
      <section className="relative overflow-hidden px-8 py-20 md:px-16 md:py-28">
        <div className="pointer-events-none absolute right-1/4 top-10 h-96 w-96 rounded-full bg-[color:var(--gold)]/10 blur-[130px]" />
        
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Official IT Partner & Technology Architect
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 font-display text-5xl uppercase leading-none tracking-tight md:text-7xl lg:text-8xl"
          >
            Micro Logic IT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-2xl font-mono text-base leading-relaxed text-muted-foreground"
          >
            Empowering Movistro Studio with world-class digital engineering, custom software solutions, and high-performance web architecture.
          </motion.p>
        </div>
      </section>

      {/* "MADE BY MICRO LOGIC IT" Signature Spotlight Card */}
      <section className="px-8 pb-20 md:px-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/50 bg-gradient-to-r from-card via-background to-card p-8 md:p-14 shadow-[0_0_50px_rgba(212,166,79,0.15)]"
          >
            <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-[color:var(--gold)]/20 blur-[100px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-md bg-[color:var(--gold)]/15 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--gold)]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Official Engineering Certification
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl text-foreground">
                  Designed & Built By Micro Logic IT
                </h2>
                <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                  This entire cinematic portfolio website, interactive 3D studio experience, and backend management OS was custom engineered from scratch by <strong className="text-[color:var(--gold)]">Micro Logic IT</strong>. Serving as Movistro&apos;s trusted technology partner, Micro Logic IT bridges creative filmmaking with cutting-edge software engineering.
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 rounded-xl border border-border/60 bg-card/80 p-6 backdrop-blur-sm min-w-[240px]">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                  Partner Verification
                </span>
                <span className="font-display text-xl uppercase tracking-wide text-foreground">
                  Micro Logic IT
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Official Partner
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="border-t border-border/50 bg-card/30 px-8 py-20 md:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
              Partnership Scope
            </span>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl">
              Engineering Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-xl border border-border/60 bg-card/60 p-8 transition-all hover:border-[color:var(--gold)]/50 hover:bg-card hover:shadow-[0_0_30px_rgba(212,166,79,0.1)]"
              >
                <div className="mb-5 inline-flex rounded-lg border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 p-3">
                  {cap.icon}
                </div>
                <h3 className="font-display text-xl uppercase tracking-wide text-foreground group-hover:text-[color:var(--gold)] transition-colors">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cap.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="border-t border-border/60 bg-card/10 px-8 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
            Interested in Partnership or Studio Services?
          </h2>
          <p className="mt-3 font-mono text-sm text-muted-foreground">
            Get in touch with Movistro Studio to start your next production.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-sm bg-[color:var(--gold)] px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] font-bold text-background shadow-[0_0_25px_rgba(212,166,79,0.3)] transition-all hover:bg-foreground hover:text-background hover:scale-105"
            >
              ✦ Contact Studio
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-sm border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
