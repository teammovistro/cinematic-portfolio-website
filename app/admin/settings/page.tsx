'use client'

import React, { useEffect, useState } from 'react'
import { SettingsData } from '@/lib/db'
import { useToast } from '../layout'
import { 
  Save, 
  Sparkles, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Film, 
  Share2,
  Sliders,
  Check
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function StudioSettings() {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<SettingsData>({
    name: 'MOVISTRO',
    tagline: 'Cinematography · Photography · Management · Marketing',
    foundedYear: '2024',
    email: 'hello@movistro.com',
    phone: '+880 1793-602999',
    location: 'Faridpur, Bangladesh — Worldwide',
    aboutText: 'A global production studio providing premier Cinematography, Photography, Talent Management, and Strategic Film Marketing.',
    enableVignette: true,
    enableFilmGrain: true,
    socials: {
      instagram: 'https://instagram.com/movistro',
      vimeo: 'https://vimeo.com/movistro',
      youtube: 'https://youtube.com/@movistro',
    },
  })

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data && !data.error) {
        setSettings(data)
      }
    } catch (error) {
      showToast('Error loading studio settings', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        showToast('Studio brand configuration saved globally!')
      } else {
        showToast('Failed to save settings', 'error')
      }
    } catch (error) {
      showToast('Error saving settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            System & Brand OS
          </span>
          <h2 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground md:text-3xl">
            Studio Configuration
          </h2>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-sm bg-gold px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background shadow-[0_0_15px_rgba(212,166,79,0.3)] disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving OS...' : 'Save All Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-10">
        {/* Brand Profile */}
        <div className="rounded-sm border border-border bg-surface p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-border/60 pb-4">
            <Sparkles className="h-5 w-5 text-gold" />
            <h3 className="font-display text-lg uppercase tracking-tight text-foreground">
              Core Brand Identity
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Studio Name
              </label>
              <input
                type="text"
                required
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Founded / Established Year
              </label>
              <input
                type="text"
                required
                value={settings.foundedYear}
                onChange={(e) => setSettings({ ...settings, foundedYear: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Tagline (Header / Footer Banner)
            </label>
            <input
              type="text"
              required
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
              About Studio / Intro Narrative
            </label>
            <textarea
              rows={3}
              required
              value={settings.aboutText}
              onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
              className="w-full rounded-sm border border-border bg-section px-4 py-3 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Direct Contact Metadata */}
        <div className="rounded-sm border border-border bg-surface p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-border/60 pb-4">
            <Mail className="h-5 w-5 text-gold" />
            <h3 className="font-display text-lg uppercase tracking-tight text-foreground">
              Public Contact & Location
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /> Email Address
              </label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <Phone className="h-3.5 w-3.5" /> Direct Phone
              </label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Studio Headquarters / Location
            </label>
            <input
              type="text"
              required
              value={settings.location}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Cinematic Aesthetics & Effects */}
        <div className="rounded-sm border border-border bg-surface p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-border/60 pb-4">
            <Sliders className="h-5 w-5 text-gold" />
            <h3 className="font-display text-lg uppercase tracking-tight text-foreground">
              Visual Engine & Effects
            </h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-sm border border-border bg-section p-4 cursor-pointer transition-colors hover:border-gold/50">
              <div>
                <span className="block font-display text-sm uppercase text-foreground">
                  Cinematic Vignette Overlay
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  Adds subtle darkness around frame borders for anamorphic depth.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.enableVignette}
                onChange={(e) => setSettings({ ...settings, enableVignette: e.target.checked })}
                className="h-5 w-5 rounded-sm border-border bg-surface text-gold focus:ring-gold"
              />
            </label>

            <label className="flex items-center justify-between rounded-sm border border-border bg-section p-4 cursor-pointer transition-colors hover:border-gold/50">
              <div>
                <span className="block font-display text-sm uppercase text-foreground">
                  Analogue 35mm Film Grain
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  Renders procedural noise texture across the 3D viewport.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.enableFilmGrain}
                onChange={(e) => setSettings({ ...settings, enableFilmGrain: e.target.checked })}
                className="h-5 w-5 rounded-sm border-border bg-surface text-gold focus:ring-gold"
              />
            </label>
          </div>
        </div>

        {/* Social Links */}
        <div className="rounded-sm border border-border bg-surface p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-border/60 pb-4">
            <Share2 className="h-5 w-5 text-gold" />
            <h3 className="font-display text-lg uppercase tracking-tight text-foreground">
              Social Networks & Showcase
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.socials?.instagram || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, instagram: e.target.value },
                  })
                }
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Vimeo Channel
              </label>
              <input
                type="url"
                value={settings.socials?.vimeo || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, vimeo: e.target.value },
                  })
                }
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                placeholder="https://vimeo.com/..."
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                YouTube Channel
              </label>
              <input
                type="url"
                value={settings.socials?.youtube || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, youtube: e.target.value },
                  })
                }
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
