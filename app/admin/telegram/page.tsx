'use client'

import React, { useEffect, useState } from 'react'
import { TelegramConfig, TelegramRecipient } from '@/lib/db'
import { useToast } from '../layout'
import { 
  Send, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Bot, 
  Radio, 
  HelpCircle,
  ExternalLink,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function TelegramBotEngine() {
  const { showToast } = useToast()
  const [config, setConfig] = useState<TelegramConfig>({
    botToken: '',
    enabled: false,
    recipients: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResults, setTestResults] = useState<any[] | null>(null)

  const [newRecipient, setNewRecipient] = useState({
    name: '',
    role: 'Producer',
    chatId: '',
  })

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/telegram')
      const data = await res.json()
      setConfig(data)
    } catch (error) {
      showToast('Error loading Telegram config', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  const handleSave = async (updatedConfig: TelegramConfig = config) => {
    setSaving(true)
    try {
      const res = await fetch('/api/telegram', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConfig),
      })
      if (res.ok) {
        showToast('Telegram notification configuration saved!')
      } else {
        showToast('Failed to save configuration', 'error')
      }
    } catch (error) {
      showToast('Error saving configuration', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleAddRecipient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRecipient.name || !newRecipient.chatId) {
      showToast('Please enter both name and Telegram Chat ID', 'error')
      return
    }

    const rec: TelegramRecipient = {
      id: `rec-${Date.now()}`,
      name: newRecipient.name,
      role: newRecipient.role,
      chatId: newRecipient.chatId.trim(),
      enabled: true,
    }

    const updated = {
      ...config,
      recipients: [...config.recipients, rec],
    }
    setConfig(updated)
    handleSave(updated)
    setNewRecipient({ name: '', role: 'Producer', chatId: '' })
  }

  const handleRemoveRecipient = (id: string) => {
    const updated = {
      ...config,
      recipients: config.recipients.filter((r) => r.id !== id),
    }
    setConfig(updated)
    handleSave(updated)
  }

  const handleToggleRecipient = (id: string) => {
    const updated = {
      ...config,
      recipients: config.recipients.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    }
    setConfig(updated)
    handleSave(updated)
  }

  const handleTestTransmission = async () => {
    if (!config.botToken) {
      showToast('Please save a BotFather API Token first!', 'error')
      return
    }
    setTesting(true)
    setTestResults(null)
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setTestResults(data.results)
        showToast('Test transmission dispatched!')
      } else {
        showToast(data.error || 'Test failed. Check your Bot token and Chat IDs.', 'error')
      }
    } catch (error) {
      showToast('Network error during test', 'error')
    } finally {
      setTesting(false)
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
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
        <div>
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            Multi-User Broadcast Engine
          </span>
          <h2 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground md:text-3xl">
            Telegram Bot Alerts
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="rounded-sm bg-gold px-8 py-3 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background shadow-[0_0_15px_rgba(212,166,79,0.3)] disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Config'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Bot Token & Master Switch */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-sm border border-border bg-surface p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-display text-base uppercase tracking-tight text-foreground">
                1. Bot Configuration
              </span>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase font-bold ${config.enabled ? 'bg-success/15 text-success border border-success/30' : 'bg-muted/20 text-muted-foreground border border-border'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${config.enabled ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
                {config.enabled ? 'Broadcasting Active' : 'Disabled'}
              </span>
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Master Pipeline Switch
              </label>
              <button
                type="button"
                onClick={() => {
                  const updated = { ...config, enabled: !config.enabled }
                  setConfig(updated)
                  handleSave(updated)
                }}
                className={`flex w-full items-center justify-between rounded-sm border px-4 py-3 font-mono text-xs uppercase transition-all ${
                  config.enabled
                    ? 'border-gold bg-gold/15 text-gold shadow-[0_0_15px_rgba(212,166,79,0.2)]'
                    : 'border-border bg-section text-muted-foreground'
                }`}
              >
                <span>{config.enabled ? 'Live Lead Broadcasting ON' : 'Broadcasting OFF'}</span>
                <div className={`h-4 w-8 rounded-full p-0.5 transition-colors ${config.enabled ? 'bg-gold' : 'bg-muted-foreground/30'}`}>
                  <div className={`h-3 w-3 rounded-full bg-background transition-transform ${config.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </button>
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                BotFather API Token *
              </label>
              <input
                type="password"
                value={config.botToken}
                onChange={(e) => setConfig({ ...config, botToken: e.target.value })}
                placeholder="123456789:ABCdefGHIjklMNO..."
                className="w-full rounded-sm border border-border bg-section px-4 py-3 font-mono text-xs text-foreground focus:border-gold focus:outline-none transition-colors"
              />
              <p className="mt-2 text-[0.7rem] text-muted-foreground leading-relaxed">
                Paste the HTTP API token generated by <span className="text-gold font-mono">@BotFather</span> when you created your Telegram Bot.
              </p>
            </div>

            <div className="border-t border-border pt-4">
              <button
                type="button"
                onClick={handleTestTransmission}
                disabled={testing || !config.botToken}
                className="flex w-full items-center justify-center gap-2 rounded-sm border border-gold/60 bg-gold/10 px-4 py-3 font-mono text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-background disabled:opacity-40"
              >
                <Zap className="h-4 w-4" />
                {testing ? 'Transmitting Alert...' : 'Test Bot Transmission'}
              </button>
            </div>
          </div>

          {/* Setup Instructions Card */}
          <div className="rounded-sm border border-border/80 bg-section/40 p-6 space-y-3">
            <span className="flex items-center gap-2 font-display text-xs uppercase tracking-widest text-gold">
              <HelpCircle className="h-4 w-4" /> Quick Setup Guide
            </span>
            <ol className="list-decimal list-inside space-y-2 font-mono text-[0.7rem] text-muted-foreground leading-relaxed">
              <li>Open Telegram and message <span className="text-foreground font-bold">@BotFather</span> to create <span className="text-gold">/newbot</span>.</li>
              <li>Copy your Bot Token into the input above.</li>
              <li>Have each team member start a conversation with your bot.</li>
              <li>To find a team member&apos;s numeric Chat ID, they can message <span className="text-foreground font-bold">@userinfobot</span> on Telegram.</li>
              <li>Add their Name and Chat ID to the Recipient Pipeline below!</li>
            </ol>
          </div>
        </div>

        {/* Right Column: Multi-User Recipient Pipeline */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-sm border border-border bg-surface p-6 space-y-6">
            <div className="border-b border-border pb-4">
              <span className="font-display text-base uppercase tracking-tight text-foreground">
                2. Studio Recipient Pipeline ({config.recipients.length})
              </span>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                When a new inquiry arrives via <span className="text-gold">/booking</span>, our engine broadcasts cinematic alert briefs simultaneously to all enabled team members below.
              </p>
            </div>

            {/* Test Results Banner */}
            {testResults && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-sm border border-gold/40 bg-section/80 p-4 space-y-2"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold block">
                  ⚡ Test Transmission Diagnostic Results:
                </span>
                <div className="space-y-1 font-mono text-xs">
                  {testResults.map((res, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border/40 py-1.5 last:border-0">
                      <span>{res.recipient} (Chat ID: {res.chatId})</span>
                      <span className={`inline-flex items-center gap-1 font-bold ${res.ok ? 'text-success' : 'text-red-400'}`}>
                        {res.ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                        {res.ok ? 'DELIVERED OK' : `FAILED (${res.error || 'Invalid Chat ID'})`}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recipients List Table */}
            <div className="overflow-x-auto rounded-sm border border-border">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-section text-muted-foreground">
                    <th className="p-3 uppercase">Recipient Name</th>
                    <th className="p-3 uppercase">Studio Role</th>
                    <th className="p-3 uppercase">Telegram Chat ID</th>
                    <th className="p-3 uppercase text-center">Alert Status</th>
                    <th className="p-3 text-right uppercase">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {config.recipients.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        No Telegram recipients added yet. Add your team members below!
                      </td>
                    </tr>
                  ) : (
                    config.recipients.map((r) => (
                      <tr key={r.id} className="transition-colors hover:bg-section/40">
                        <td className="p-3 font-display uppercase font-bold text-foreground">{r.name}</td>
                        <td className="p-3 text-gold">{r.role}</td>
                        <td className="p-3 font-mono text-muted-foreground">{r.chatId || 'Not Configured'}</td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleRecipient(r.id)}
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] uppercase font-bold transition-all ${
                              r.enabled
                                ? 'bg-success/15 text-success border border-success/30 shadow-[0_0_10px_rgba(34,197,94,0.15)]'
                                : 'bg-muted/20 text-muted-foreground border border-border'
                            }`}
                          >
                            {r.enabled ? 'Active' : 'Muted'}
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveRecipient(r.id)}
                            className="rounded-sm p-1.5 text-muted-foreground hover:text-red-400 transition-colors"
                            title="Remove Recipient"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Add Recipient Form */}
            <form onSubmit={handleAddRecipient} className="rounded-sm border border-border/80 bg-section/40 p-5 space-y-4">
              <span className="font-display text-xs uppercase tracking-widest text-gold block">
                + Add Team Recipient to Broadcast Pipeline
              </span>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block font-mono text-[0.65rem] uppercase text-muted-foreground">
                    Team Member Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRecipient.name}
                    onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
                    placeholder="e.g., Lead Producer"
                    className="w-full rounded-sm border border-border bg-surface px-3 py-2 font-mono text-xs text-foreground focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-mono text-[0.65rem] uppercase text-muted-foreground">
                    Studio Role / Title
                  </label>
                  <input
                    type="text"
                    value={newRecipient.role}
                    onChange={(e) => setNewRecipient({ ...newRecipient, role: e.target.value })}
                    placeholder="e.g., Executive Producer"
                    className="w-full rounded-sm border border-border bg-surface px-3 py-2 font-mono text-xs text-foreground focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-mono text-[0.65rem] uppercase text-muted-foreground">
                    Telegram Chat ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRecipient.chatId}
                    onChange={(e) => setNewRecipient({ ...newRecipient, chatId: e.target.value })}
                    placeholder="e.g., 9876543210"
                    className="w-full rounded-sm border border-border bg-surface px-3 py-2 font-mono text-xs text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-sm bg-gold px-6 py-2 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background shadow-[0_0_15px_rgba(212,166,79,0.3)]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add to Broadcast List
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
