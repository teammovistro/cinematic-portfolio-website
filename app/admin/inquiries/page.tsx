'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { InquiryItem } from '@/lib/db'
import { Modal } from '@/components/admin/modal'
import { useToast } from '../layout'
import { 
  Mail, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle, 
  Clock, 
  User, 
  Calendar, 
  DollarSign, 
  Send, 
  FileText,
  Sparkles,
  ExternalLink,
  Phone
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function InquiriesCRM() {
  const searchParams = useSearchParams()
  const { showToast } = useToast()
  const [inquiries, setInquiries] = useState<InquiryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Detail Modal
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null)
  const [notes, setNotes] = useState('')

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries')
      const data = await res.json()
      setInquiries(data || [])
    } catch (error) {
      showToast('Error loading CRM leads', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  useEffect(() => {
    const id = searchParams.get('id')
    if (id && inquiries.length > 0) {
      const found = inquiries.find((i) => i.id === id)
      if (found) {
        setSelectedInquiry(found)
        setNotes(found.notes || '')
      }
    }
  }, [searchParams, inquiries])

  const handleOpenDetail = (inquiry: InquiryItem) => {
    setSelectedInquiry(inquiry)
    setNotes(inquiry.notes || '')
  }

  const handleStatusChange = async (id: string, newStatus: InquiryItem['status']) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        )
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null))
        }
        showToast(`Status updated to ${newStatus.toUpperCase()}`)
      }
    } catch (error) {
      showToast('Failed to update status', 'error')
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedInquiry.id, notes }),
      })
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === selectedInquiry.id ? { ...inq, notes } : inq))
        )
        setSelectedInquiry((prev) => (prev ? { ...prev, notes } : null))
        showToast('Internal producer notes saved!')
      }
    } catch (error) {
      showToast('Failed to save notes', 'error')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete inquiry from "${name}"?`)) return
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id))
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(null)
        }
        showToast(`Deleted lead from ${name}`)
      }
    } catch (error) {
      showToast('Failed to delete inquiry', 'error')
    }
  }

  const statuses = [
    { label: 'All Statuses', value: 'all' },
    { label: 'New Leads', value: 'new' },
    { label: 'In Review', value: 'in-review' },
    { label: 'Contacted / Active', value: 'contacted' },
    { label: 'Archived', value: 'archived' },
  ]

  const types = [
    { label: 'All Project Types', value: 'all' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Short Film', value: 'short-film' },
    { label: 'Music Video', value: 'music-video' },
    { label: 'Documentary', value: 'documentary' },
    { label: 'Fashion Film', value: 'fashion' },
  ]

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter
    const matchesType = typeFilter === 'all' || inq.type === typeFilter
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesType && matchesSearch
  })

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            Client Relations CRM
          </span>
          <h2 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground md:text-3xl">
            Project Inquiries ({inquiries.length})
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-gold animate-pulse" />
          <span>Live synchronization with /booking</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col justify-between gap-4 rounded-sm border border-border bg-surface p-4 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-sm border border-border bg-section px-3 py-1.5 font-mono text-xs text-foreground focus:border-gold focus:outline-none cursor-pointer"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-sm border border-border bg-section px-3 py-1.5 font-mono text-xs text-foreground focus:border-gold focus:outline-none cursor-pointer capitalize"
          >
            {types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search client name, email, text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-sm border border-border bg-section py-1.5 pl-9 pr-4 font-mono text-xs text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Inquiries Grid / Pipeline Cards */}
      {filteredInquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border bg-surface py-20 text-center">
          <Mail className="h-10 w-10 text-muted-foreground/30 mb-4" />
          <h3 className="font-display text-base uppercase text-foreground">No Inquiries Found</h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Try adjusting your search filters or wait for new leads from the booking page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredInquiries.map((inq, idx) => (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleOpenDetail(inq)}
              className={`group relative flex flex-col justify-between rounded-sm border p-6 transition-all cursor-pointer ${
                inq.status === 'new'
                  ? 'border-gold/60 bg-gradient-to-br from-surface via-surface to-gold/5 shadow-[0_5px_20px_rgba(212,166,79,0.08)]'
                  : 'border-border bg-surface hover:border-gold/40'
              }`}
            >
              {inq.status === 'new' && (
                <div className="absolute -top-2.5 right-6 rounded-full bg-gold px-2.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-background">
                  New Lead
                </div>
              )}

              <div>
                <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase text-muted-foreground mb-3">
                  <span className="rounded-sm border border-border bg-section px-2 py-0.5 text-foreground">
                    {inq.type}
                  </span>
                  <span>{new Date(inq.date).toLocaleDateString()}</span>
                </div>

                <h3 className="font-display text-lg uppercase text-foreground group-hover:text-gold transition-colors">
                  {inq.name}
                </h3>
                <p className="font-mono text-xs text-muted-foreground">{inq.email}</p>
                {inq.phone && (
                  <p className="font-mono text-xs text-gold/90 mt-0.5">📞 {inq.phone}</p>
                )}

                <div className="mt-4 border-l-2 border-gold/40 pl-3">
                  <p className="line-clamp-3 font-mono text-xs leading-relaxed text-foreground/90">
                    "{inq.message}"
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="font-mono text-xs font-bold text-gold">
                  {inq.budget ? `Budget: ${inq.budget}` : 'Budget: TBD'}
                </span>

                <span
                  className={`rounded-sm px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider font-bold ${
                    inq.status === 'new'
                      ? 'bg-gold/20 text-gold'
                      : inq.status === 'in-review'
                      ? 'bg-blue/20 text-blue'
                      : inq.status === 'contacted'
                      ? 'bg-success/20 text-success'
                      : 'bg-section text-muted-foreground'
                  }`}
                >
                  {inq.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Drawer / Modal */}
      <Modal
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        title={selectedInquiry ? `Inquiry: ${selectedInquiry.name}` : 'Inquiry Details'}
        maxWidth="max-w-3xl"
      >
        {selectedInquiry && (
          <div className="space-y-8">
            {/* Top Status & Quick Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-border bg-section p-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground uppercase">Pipeline Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as InquiryItem['status'])}
                  className="rounded-sm border border-gold bg-surface px-3 py-1 font-mono text-xs font-bold uppercase text-gold focus:outline-none cursor-pointer"
                >
                  <option value="new">New Lead</option>
                  <option value="in-review">In Review / Treatment</option>
                  <option value="contacted">Contacted / Discussion</option>
                  <option value="archived">Archived / Closed</option>
                </select>
              </div>

              <a
                href={`mailto:${selectedInquiry.email}?subject=MOVISTRO Production Studio — Inquiry Regarding ${selectedInquiry.type.toUpperCase()}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-sm bg-gold px-4 py-2 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background"
              >
                <Send className="h-3.5 w-3.5" /> Reply to Client
              </a>
            </div>

            {/* Client Metadata */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 border-b border-border pb-6">
              <div>
                <span className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase text-muted-foreground mb-1">
                  <User className="h-3.5 w-3.5 text-gold" /> Client Contact
                </span>
                <p className="font-display text-base uppercase text-foreground">{selectedInquiry.name}</p>
                <a href={`mailto:${selectedInquiry.email}`} className="block font-mono text-xs text-gold hover:underline">
                  ✉ {selectedInquiry.email}
                </a>
                {selectedInquiry.phone && (
                  <a href={`tel:${selectedInquiry.phone}`} className="block font-mono text-xs text-foreground/90 hover:text-gold mt-1">
                    📞 {selectedInquiry.phone}
                  </a>
                )}
              </div>

              <div>
                <span className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase text-muted-foreground mb-1">
                  <DollarSign className="h-3.5 w-3.5 text-gold" /> Proposed Budget
                </span>
                <p className="font-display text-base text-foreground">{selectedInquiry.budget || 'Not Specified'}</p>
                <span className="font-mono text-[0.7rem] uppercase text-muted-foreground">
                  Project: {selectedInquiry.type}
                </span>
              </div>

              <div>
                <span className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase text-muted-foreground mb-1">
                  <Calendar className="h-3.5 w-3.5 text-gold" /> Submission Date
                </span>
                <p className="font-mono text-xs text-foreground">
                  {new Date(selectedInquiry.date).toLocaleDateString()}
                </p>
                <span className="font-mono text-[0.7rem] text-muted-foreground">
                  {new Date(selectedInquiry.date).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Full Story / Message */}
            <div>
              <span className="mb-3 block font-mono text-xs uppercase tracking-widest text-gold">
                Client Vision & Project Description
              </span>
              <div className="rounded-sm border border-border bg-section/60 p-6">
                <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
                  {selectedInquiry.message || 'No additional text provided.'}
                </p>
              </div>
            </div>

            {/* Producer Internal Notes */}
            <div>
              <span className="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-gold" /> Internal Studio Notes (Private)
                </span>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="text-gold hover:underline font-bold"
                >
                  Save Notes
                </button>
              </span>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add private producer notes, treatment links, call summaries..."
                className="w-full rounded-sm border border-border bg-section px-4 py-3 font-mono text-xs text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            {/* Footer actions */}
            <div className="flex justify-between border-t border-border pt-4">
              <button
                type="button"
                onClick={() => handleDelete(selectedInquiry.id, selectedInquiry.name)}
                className="flex items-center gap-2 rounded-sm border border-red-500/30 bg-red-950/20 px-4 py-2 font-mono text-xs uppercase tracking-wider text-red-400 transition-colors hover:bg-red-500/30"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete Lead
              </button>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="rounded-sm border border-border px-6 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:border-gold hover:text-foreground"
              >
                Close Drawer
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
