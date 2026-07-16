'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Clapperboard, ArrowLeft, Send, PhoneCall } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.628.852 5.066 2.287 7.016L.5 23.5l4.636-1.636C7.031 23.145 9.418 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm.024 21.844c-2.184 0-4.212-.686-5.882-1.854l-.423-.296-3.076 1.085 1.084-2.973-.314-.438c-1.278-1.78-2.032-3.957-2.032-6.312 0-5.965 4.853-10.818 10.819-10.818 5.966 0 10.818 4.853 10.818 10.818 0 5.965-4.852 10.788-10.994 10.788z" />
    </svg>
  )
}

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transmittingStep, setTransmittingStep] = useState(0) // 0: off, 1: telemetry scan, 2: clapper snap
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
    budget: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTransmittingStep(1) // Stage 1: Radar Telemetry Beam Scan
    setTimeout(() => setTransmittingStep(2), 1100) // Stage 2: Cinema Slate Clapperboard Snap
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setTimeout(() => {
          setTransmittingStep(0)
          setSubmitted(true)
        }, 2200)
      } else {
        setTimeout(() => {
          setTransmittingStep(0)
          setSubmitted(true)
        }, 2200)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setTimeout(() => {
        setTransmittingStep(0)
        setSubmitted(true)
      }, 2200)
    } finally {
      setTimeout(() => setLoading(false), 2200)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* High-End Cinematic Submission Animation Modal */}
      <AnimatePresence>
        {transmittingStep > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl px-6 text-center"
          >
            {transmittingStep === 1 ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="flex flex-col items-center gap-6 max-w-md"
              >
                {/* Radar Ring Animation */}
                <div className="relative flex h-28 w-28 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-gold/30 animate-ping" />
                  <div className="absolute inset-2 rounded-full border border-gold/50 animate-pulse" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 border border-gold text-gold shadow-[0_0_40px_rgba(212,166,79,0.8)]">
                    <Send className="h-7 w-7 animate-bounce" />
                  </div>
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.4em] text-gold">
                    Encrypted Studio Telemetry
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl uppercase tracking-tight text-foreground">
                    Transmitting Project Brief...
                  </h3>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    Routing details directly to Executive Producer Desk & Studio CRM
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="flex flex-col items-center gap-6 max-w-md"
              >
                {/* Cinema Slate Clapperboard Animation */}
                <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-gold bg-[#111] p-6 shadow-[0_0_60px_rgba(212,166,79,0.45)] w-64">
                  {/* Clapper Top Bar */}
                  <motion.div
                    initial={{ rotate: -25, originX: 0 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute -top-5 left-0 right-0 h-6 bg-gold border-b-2 border-black rounded-t-sm flex items-center justify-around overflow-hidden"
                  >
                    <div className="h-full w-4 bg-black -skew-x-12" />
                    <div className="h-full w-4 bg-black -skew-x-12" />
                    <div className="h-full w-4 bg-black -skew-x-12" />
                    <div className="h-full w-4 bg-black -skew-x-12" />
                  </motion.div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-gold mt-1">
                    MOVISTRO PRODUCTION
                  </span>
                  <span className="mt-2 font-display text-xl uppercase tracking-wider text-foreground">
                    SCENE 01 · TAKE 01
                  </span>
                  <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-[#25D366]">
                    ● BRIEF RECORDED
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-gold">
                    Clapper Snapped!
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    Production file created successfully.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* header */}
      <header className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-8 sm:py-6 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-base sm:text-lg uppercase tracking-tight hover:text-gold transition-colors"
        >
          <Clapperboard className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
          Movistro
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/portfolio"
            className="font-mono text-[0.62rem] sm:text-[0.7rem] uppercase tracking-[0.15em] sm:tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 sm:gap-1.5 font-mono text-[0.62rem] sm:text-[0.7rem] uppercase tracking-[0.15em] sm:tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </div>
      </header>

      {/* content */}
      <div className="flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20 md:px-12">
        <div className="w-full max-w-2xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-sm border border-gold/40 bg-surface p-10 text-center shadow-[0_0_50px_rgba(212,166,79,0.15)]"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold border border-gold/50 shadow-[0_0_20px_rgba(212,166,79,0.3)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-gold">
                Transmission Confirmed
              </span>
              <h2 className="mt-3 font-display text-3xl uppercase tracking-tight text-foreground md:text-5xl">
                Inquiry Received
              </h2>
              <p className="mx-auto mt-4 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
                Thank you, <span className="font-bold text-foreground">{formData.name}</span>. Your project brief has been routed directly to our Executive Producers and is now visible in the Studio CRM.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/"
                  className="rounded-sm border border-border bg-section px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-all hover:border-gold"
                >
                  Return to 3D World
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {/* hero */}
              <div className="mb-10">
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-gold">
                  Production Inquiries
                </span>
                <h1 className="mt-2 font-display text-4xl sm:text-5xl uppercase leading-tight tracking-tight md:text-7xl">
                  Let&apos;s Make Cinema
                </h1>
                <p className="mt-4 sm:mt-6 text-pretty text-sm sm:text-base leading-relaxed text-muted-foreground md:text-lg">
                  Every great film begins with a conversation. Connect instantly via WhatsApp or Call Now, or submit your detailed project brief below.
                </p>
              </div>

              {/* Instant WhatsApp & Call Now Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {/* WhatsApp Card */}
                <a
                  href="https://wa.me/8801793602999?text=Hello%20Movistro%20Studio%2C%20I'd%20like%20to%20inquire%20about%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#25D366]/40 bg-[#121613] p-5 transition-all hover:border-[#25D366] hover:bg-[#151c17] hover:shadow-[0_0_35px_rgba(37,211,102,0.22)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 group-hover:scale-110 transition-transform">
                      <WhatsAppIcon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-[#25D366]/10 border border-[#25D366]/30 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-[#25D366] group-hover:bg-[#25D366] group-hover:text-black font-bold transition-all">
                      Chat Now ↗
                    </span>
                  </div>
                  <div>
                    <span className="block font-mono text-[0.62rem] uppercase tracking-widest text-[#25D366]/90">
                      Instant Messaging · 24/7
                    </span>
                    <span className="font-display text-xl uppercase text-foreground group-hover:text-[#25D366] transition-colors">
                      WhatsApp Studio
                    </span>
                  </div>
                </a>

                {/* Call Now Card */}
                <a
                  href="tel:+8801793602999"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-gold/40 bg-[#15130f] p-5 transition-all hover:border-gold hover:bg-[#1a1711] hover:shadow-[0_0_35px_rgba(212,166,79,0.22)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30 group-hover:scale-110 transition-transform">
                      <PhoneCall className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-gold/10 border border-gold/30 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-gold group-hover:bg-gold group-hover:text-background font-bold transition-all">
                      Call Now ↗
                    </span>
                  </div>
                  <div>
                    <span className="block font-mono text-[0.62rem] uppercase tracking-widest text-gold/90">
                      Direct Line · Producer
                    </span>
                    <span className="font-display text-xl uppercase text-foreground group-hover:text-gold transition-colors">
                      +880 1793-602999
                    </span>
                  </div>
                </a>
              </div>

              {/* Visual Divider */}
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground text-center">
                  Or Submit Detailed Project Brief
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono text-xs uppercase tracking-widest text-foreground mb-3"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b border-gold bg-transparent px-0 py-2 font-mono text-sm placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-xs uppercase tracking-widest text-foreground mb-3"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b border-gold bg-transparent px-0 py-2 font-mono text-sm placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    placeholder="hello@example.com"
                  />
                </div>

                {/* project type */}
                <div>
                  <label
                    htmlFor="type"
                    className="block font-mono text-xs uppercase tracking-widest text-foreground mb-3"
                  >
                    Project Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border-b border-gold bg-background px-0 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-foreground transition-colors cursor-pointer capitalize"
                  >
                    <option value="">Select a service</option>
                    <option value="cinematography">Cinematography</option>
                    <option value="photography">Photography</option>
                    <option value="management">Management Service</option>
                    <option value="marketing">Strategic Marketing</option>
                    <option value="commercial">Commercial Video</option>
                    <option value="short-film">Short Film / Doc</option>
                    <option value="other">Other Related Service</option>
                  </select>
                </div>

                {/* message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs uppercase tracking-widest text-foreground mb-3"
                  >
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-sm border border-border bg-transparent px-4 py-3 font-mono text-sm placeholder-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    placeholder="Describe your vision, style, lighting, and any specific ideas..."
                  />
                </div>

                {/* budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block font-mono text-xs uppercase tracking-widest text-foreground mb-3"
                  >
                    Budget Range (Optional)
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full border-b border-gold bg-transparent px-0 py-2 font-mono text-sm placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    placeholder="e.g., $10k - $50k"
                  />
                </div>

                {/* submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background shadow-[0_0_20px_rgba(212,166,79,0.3)] disabled:opacity-50 font-bold"
                  >
                    <Send className="h-4 w-4" />
                    <span>{loading ? 'Transmitting...' : 'Send Inquiry'}</span>
                  </button>
                  <p className="mt-4 font-mono text-xs text-muted-foreground">
                    We&apos;ll get back to you within 48 hours. Leads are logged directly to Admin OS.
                  </p>
                </div>
              </form>

              {/* contact info */}
              <div className="mt-16 border-t border-border pt-10">
                <h3 className="font-mono text-xs uppercase tracking-widest text-gold mb-6">
                  Direct Contact & Instant Channels
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-sm">
                  <a
                    href="https://wa.me/8801793602999?text=Hello%20Movistro%20Studio%2C%20I'd%20like%20to%20inquire%20about%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-md border border-[#25D366]/30 bg-card p-4 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all text-[#25D366]"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <WhatsAppIcon className="h-4 w-4" /> WhatsApp Chat
                    </span>
                    <span className="text-xs tracking-wider">Open ↗</span>
                  </a>
                  <a
                    href="tel:+8801793602999"
                    className="flex items-center justify-between rounded-md border border-gold/30 bg-card p-4 hover:border-gold hover:bg-gold/10 transition-all text-gold"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <PhoneCall className="h-4 w-4" /> Call Studio
                    </span>
                    <span className="text-xs tracking-wider">+880 1793-602999</span>
                  </a>
                  <a
                    href="mailto:hello@movistro.com"
                    className="flex items-center justify-between rounded-md border border-border bg-card p-4 hover:border-foreground transition-all text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <span>✉</span> Email
                    </span>
                    <span className="text-xs text-muted-foreground">hello@movistro.com</span>
                  </a>
                </div>
                <p className="mt-6 font-mono text-xs text-muted-foreground">
                  Studio Headquarters: Faridpur, Bangladesh — Worldwide Operations
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating WhatsApp & Call Quick Buttons */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3">
        <a
          href="https://wa.me/8801793602999?text=Hello%20Movistro%20Studio%2C%20I'd%20like%20to%20inquire%20about%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 sm:h-auto sm:w-auto items-center justify-center sm:justify-start gap-2 rounded-full bg-[#25D366] sm:px-4 sm:py-3 font-mono text-xs uppercase tracking-widest text-black font-bold shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:scale-105 transition-transform"
          title="Chat on WhatsApp"
        >
          <WhatsAppIcon className="h-5 w-5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
        <a
          href="tel:+8801793602999"
          className="flex h-11 w-11 sm:h-auto sm:w-auto items-center justify-center sm:justify-start gap-2 rounded-full bg-gold sm:px-4 sm:py-3 font-mono text-xs uppercase tracking-widest text-background font-bold shadow-[0_0_25px_rgba(212,166,79,0.5)] hover:scale-105 transition-transform"
          title="Call Now"
        >
          <PhoneCall className="h-5 w-5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Call Now</span>
        </a>
      </div>

      {/* footer */}
      <footer className="border-t border-border px-8 py-6 text-center md:px-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Est. 2024 · Cinematography · Photography · Management · Marketing
        </p>
      </footer>
    </div>
  )
}
