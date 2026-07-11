'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Clapperboard, Sparkles, ArrowLeft, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
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
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* header */}
      <header className="flex items-center justify-between border-b border-border px-8 py-6 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg uppercase tracking-tight hover:text-gold transition-colors"
        >
          <Clapperboard className="h-5 w-5 text-gold" />
          Movistro
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors"
          >
            Admin OS
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </div>
      </header>

      {/* content */}
      <div className="flex items-center justify-center px-8 py-20 md:px-12">
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
                <Link
                  href="/admin/inquiries"
                  className="flex items-center gap-2 rounded-sm bg-gold px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background"
                >
                  <Sparkles className="h-3.5 w-3.5" /> View in Admin CRM
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {/* hero */}
              <div className="mb-16">
                <span className="font-mono text-xs uppercase tracking-[0.4em] text-gold">
                  Production Inquiries
                </span>
                <h1 className="mt-2 font-display text-5xl uppercase leading-tight tracking-tight md:text-7xl">
                  Let&apos;s Make Cinema
                </h1>
                <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  Every great film begins with a conversation. Tell us about your
                  vision, your story, and we&apos;ll craft the cinematic language
                  to bring it to life.
                </p>
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
                    className="flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background shadow-[0_0_20px_rgba(212,166,79,0.3)] disabled:opacity-50"
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
              <div className="mt-16 border-t border-border pt-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-gold mb-4">
                  Direct Contact
                </h3>
                <div className="space-y-2 font-mono text-sm text-muted-foreground">
                  <p>
                    Email:{' '}
                    <a
                      href="mailto:hello@movistro.com"
                      className="text-foreground hover:text-gold transition-colors"
                    >
                      hello@movistro.com
                    </a>
                  </p>
                  <p>
                    Phone:{' '}
                    <a
                      href="tel:+8801700000000"
                      className="text-foreground hover:text-gold transition-colors"
                    >
                      +880 1700-000000
                    </a>
                  </p>
                  <p>Faridpur, Bangladesh — Worldwide</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* footer */}
      <footer className="border-t border-border px-8 py-6 text-center md:px-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Est. 2024 · Cinematography · Photography · Management · Marketing ·{' '}
          <Link href="/admin" className="text-gold hover:underline">
            Admin Suite
          </Link>
        </p>
      </footer>
    </div>
  )
}
