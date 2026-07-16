'use client'

import React from 'react'
import Link from 'next/link'
import {
  Clapperboard,
  Camera,
  Film,
  Sparkles,
  Award,
  Globe,
  ArrowRight,
  ShieldCheck,
  Cpu,
  HeartHandshake
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const pillars = [
    {
      icon: <Film className="h-6 w-6 text-[color:var(--gold)]" />,
      title: 'Cinematography & Direction',
      desc: 'Crafting visually arresting films, commercials, and narratives with cinematic lighting and world-class color grading.'
    },
    {
      icon: <Camera className="h-6 w-6 text-[color:var(--gold)]" />,
      title: 'Editorial Photography',
      desc: 'High-end portraiture, fashion editorials, and commercial brand photography designed to leave an unforgettable impression.'
    },
    {
      icon: <Award className="h-6 w-6 text-[color:var(--gold)]" />,
      title: 'Production & Management',
      desc: 'Executive-level project coordination, talent management, and end-to-end studio production workflows.'
    },
    {
      icon: <Globe className="h-6 w-6 text-[color:var(--gold)]" />,
      title: 'Global Brand Marketing',
      desc: 'Strategic digital branding and creative campaigns bridging Faridpur, Bangladesh with international audiences.'
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[color:var(--gold)] selection:text-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-md px-4 py-4 sm:px-8 sm:py-6 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-base sm:text-xl uppercase tracking-tight hover:text-[color:var(--gold)] transition-colors"
        >
          <img
            src="/images/logo.jpg"
            alt="Movistro Monogram Logo"
            className="h-8 sm:h-9 w-auto rounded border border-gold/40 object-contain shadow-[0_0_15px_rgba(212,166,79,0.25)]"
          />
          <span className="tracking-widest font-bold">MOVISTRO</span>
        </Link>
        <nav className="flex items-center gap-2.5 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-none py-1">
          <Link
            href="/portfolio"
            className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.25em] text-muted-foreground hover:text-[color:var(--gold)] transition-colors whitespace-nowrap"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.25em] text-[color:var(--gold)] transition-colors whitespace-nowrap"
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

      {/* Hero Section */}
      <section className="relative overflow-hidden px-8 py-24 md:px-16 md:py-32 lg:py-40">
        {/* Subtle ambient light */}
        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-96 w-96 rounded-full bg-[color:var(--gold)]/10 blur-[120px]" />

        <div className="mx-auto max-w-5xl text-center">
          {/* JSON-LD Schema for MOVISTRO Studio */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'MOVISTRO',
                alternateName: 'Movistro Studio Bangladesh',
                url: 'https://cinematic-portfolio-website-git-main-movistro.vercel.app',
                logo: 'https://cinematic-portfolio-website-git-main-movistro.vercel.app/logo.png',
                description:
                  'Premier cinematography, photography, management, and global marketing studio headquartered in Faridpur, Bangladesh.',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Faridpur',
                  addressCountry: 'Bangladesh',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+880 1793-602999',
                  contactType: 'Customer Support',
                  areaServed: 'Worldwide',
                },
              }),
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            About MOVISTRO Studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 font-display text-5xl uppercase leading-none tracking-tight md:text-7xl lg:text-8xl"
          >
            MOVISTRO <br />
            <span className="text-[color:var(--gold)]">Cinematography & Craft.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-8 max-w-3xl text-pretty font-mono text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            <strong className="text-foreground">MOVISTRO</strong> is a world-class cinematography, editorial photography, talent management, and digital marketing agency headquartered in Faridpur, Bangladesh. We blend cutting-edge cinematic technique with compelling storytelling to elevate brands and artists onto the global stage.
          </motion.p>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="border-y border-border/50 bg-card/30 px-8 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
              Our Core Disciplines
            </h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Multidisciplinary Mastery Under One Roof
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-xl border border-border/60 bg-card/60 p-8 transition-all hover:border-[color:var(--gold)]/50 hover:bg-card hover:shadow-[0_0_30px_rgba(212,166,79,0.15)]"
              >
                <div className="mb-6 inline-flex rounded-lg border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 p-3">
                  {pillar.icon}
                </div>
                <h3 className="font-display text-xl uppercase tracking-wide text-foreground group-hover:text-[color:var(--gold)] transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Technology Partner Highlight */}
      <section className="px-8 py-24 md:px-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/40 bg-gradient-to-br from-card via-background to-card p-8 md:p-14 shadow-2xl"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--gold)]/15 blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-3.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[color:var(--gold)]">
                  <Cpu className="h-3.5 w-3.5" />
                  Technology & Engineering
                </span>
                <h3 className="mt-4 font-display text-3xl uppercase tracking-tight md:text-4xl">
                  Powered by Official IT Partner
                </h3>
                <p className="mt-3 font-mono text-sm leading-relaxed text-muted-foreground">
                  Every aspect of Movistro&apos;s digital ecosystem—including this interactive 3D web platform and Studio OS—is officially designed, engineered, and maintained by <strong className="text-foreground">Micro Logic IT</strong>.
                </p>
              </div>

              <Link
                href="/partners"
                className="group inline-flex items-center gap-3 whitespace-nowrap rounded-sm bg-[color:var(--gold)] px-7 py-4 font-mono text-xs uppercase tracking-[0.25em] font-bold text-background transition-all hover:bg-foreground hover:text-background hover:scale-105"
              >
                View IT Partner
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dedicated MOVISTRO SEO Knowledge Base & Studio FAQ */}
      <section className="border-t border-border/50 bg-card/20 px-8 py-20 md:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
              MOVISTRO Knowledge Base
            </span>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-5xl">
              Frequently Asked About MOVISTRO
            </h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Everything you need to know about our premier agency
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-card/50 p-7">
              <h3 className="font-display text-lg uppercase text-[color:var(--gold)]">
                What is MOVISTRO?
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">MOVISTRO</strong> is a full-service, high-end cinematography, commercial photography, talent management, and digital brand marketing agency headquartered in Faridpur, Bangladesh, operating worldwide.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/50 p-7">
              <h3 className="font-display text-lg uppercase text-[color:var(--gold)]">
                Where is MOVISTRO located?
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                Our primary production studio and headquarters are based in <strong className="text-foreground">Faridpur, Bangladesh</strong>. However, our creative directors, cinematographers, and management teams deploy globally for international campaigns and feature productions.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/50 p-7">
              <h3 className="font-display text-lg uppercase text-[color:var(--gold)]">
                What services does MOVISTRO offer?
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                We specialize in 4 core pillars: <strong className="text-foreground">Cinematography & Film Direction</strong>, <strong className="text-foreground">High-Fashion & Commercial Photography</strong>, <strong className="text-foreground">Celebrity & Talent Management</strong>, and <strong className="text-foreground">Global Brand Marketing</strong>.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/50 p-7">
              <h3 className="font-display text-lg uppercase text-[color:var(--gold)]">
                Who builds and manages MOVISTRO&apos;s digital platform?
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                Our official IT partner, cloud infrastructure provider, and interactive 3D website architect is <strong className="text-foreground">Micro Logic IT</strong>, ensuring state-of-the-art performance and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="border-t border-border/60 bg-card/20 px-8 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl uppercase tracking-tight md:text-5xl">
            Ready to Create Something Iconic?
          </h2>
          <p className="mt-4 font-mono text-sm text-muted-foreground">
            Let&apos;s bring your cinematic vision to life with world-class production.
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
              Explore 3D World
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
