'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { StatCard } from '@/components/admin/stat-card'
import { ProjectItem, InquiryItem } from '@/lib/db'
import { useToast } from './layout'
import { 
  Film, 
  Mail, 
  TrendingUp, 
  Award, 
  Plus, 
  ArrowUpRight, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const router = useRouter()
  const { showToast } = useToast()
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [inquiries, setInquiries] = useState<InquiryItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [projRes, inqRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/inquiries')
      ])
      const projData = await projRes.json()
      const inqData = await inqRes.json()
      setProjects(projData || [])
      setInquiries(inqData || [])
    } catch (error) {
      showToast('Error loading studio metrics', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
        showToast(`Inquiry marked as ${newStatus.toUpperCase()}`)
      }
    } catch (error) {
      showToast('Failed to update status', 'error')
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  const activeLeadsCount = inquiries.filter((i) => i.status === 'new' || i.status === 'in-review').length

  return (
    <div className="space-y-10">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-sm border border-gold/30 bg-gradient-to-r from-surface via-surface to-section p-8 shadow-xl">
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              Studio Production Dashboard
            </span>
            <h2 className="mt-2 font-display text-2xl uppercase tracking-tight text-foreground md:text-3xl">
              Welcome back, Producer.
            </h2>
            <p className="mt-1 max-w-xl font-mono text-xs text-muted-foreground">
              You have <span className="font-bold text-foreground">{activeLeadsCount} active project inquiries</span> awaiting review. Studio web traffic is trending up +18% this month.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/projects?action=new"
              className="flex items-center gap-2 rounded-sm bg-gold px-5 py-3 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Link>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-2 rounded-sm border border-border bg-section px-5 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-all hover:border-gold"
            >
              <Mail className="h-4 w-4 text-gold" />
              View All Leads
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Portfolio Projects"
          value={projects.length}
          subtitle="Cinematic releases active"
          trend={{ value: '1 added this month', isUp: true }}
          icon={Film}
        />
        <StatCard
          title="Client Inquiries"
          value={inquiries.length}
          subtitle={`${activeLeadsCount} requiring action`}
          trend={{ value: '+25% vs last month', isUp: true }}
          icon={Mail}
        />
        <StatCard
          title="Estimated Pipeline"
          value="$285k+"
          subtitle="Across 4 active discussions"
          trend={{ value: '+$40k QoQ', isUp: true }}
          icon={TrendingUp}
        />
        <StatCard
          title="Conversion Rate"
          value="68%"
          subtitle="Inquiry to production"
          trend={{ value: '+4.2% efficiency', isUp: true }}
          icon={Award}
        />
      </div>

      {/* Analytics Chart & Activity Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Visual Chart Simulation */}
        <div className="rounded-sm border border-border bg-surface p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <h3 className="font-display text-lg uppercase tracking-tight text-foreground">
                Inquiries & Project Engagement
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                6-Month Rolling Studio Analytics
              </span>
            </div>
            <span className="font-mono text-xs uppercase text-gold">2026 Season</span>
          </div>

          {/* Custom Animated SVG Chart */}
          <div className="relative h-64 w-full pt-4">
            <div className="absolute inset-0 flex flex-col justify-between text-left font-mono text-[0.65rem] text-muted-foreground/40">
              <div className="w-full border-b border-border/30 pb-1">30 Leads</div>
              <div className="w-full border-b border-border/30 pb-1">20 Leads</div>
              <div className="w-full border-b border-border/30 pb-1">10 Leads</div>
              <div className="w-full border-b border-border/30 pb-1">0</div>
            </div>

            <div className="relative z-10 flex h-full items-end justify-between gap-4 px-6 pb-6 pt-8">
              {[
                { month: 'Feb', value: 35, inquiries: 4 },
                { month: 'Mar', value: 45, inquiries: 6 },
                { month: 'Apr', value: 60, inquiries: 8 },
                { month: 'May', value: 50, inquiries: 7 },
                { month: 'Jun', value: 80, inquiries: 12 },
                { month: 'Jul', value: 95, inquiries: 16 },
              ].map((data, idx) => (
                <div key={data.month} className="group relative flex flex-1 flex-col items-center h-full justify-end">
                  {/* Tooltip */}
                  <div className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-sm bg-foreground px-2 py-1 font-mono text-[0.6rem] text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap">
                    {data.inquiries} Inquiries
                  </div>

                  {/* Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${data.value}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="w-full max-w-[32px] rounded-t-sm bg-gradient-to-t from-gold/30 to-gold transition-all group-hover:from-gold group-hover:to-foreground shadow-[0_0_15px_rgba(212,166,79,0.2)]"
                  />
                  <span className="mt-3 font-mono text-[0.7rem] uppercase text-muted-foreground group-hover:text-gold">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Insights Panel */}
        <div className="rounded-sm border border-border bg-surface p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-lg uppercase tracking-tight text-foreground border-b border-border/60 pb-4">
              Production Focus
            </h3>
            <div className="mt-6 space-y-6">
              <div>
                <div className="flex justify-between font-mono text-xs uppercase mb-2">
                  <span className="text-muted-foreground">Commercial & Automotive</span>
                  <span className="text-gold font-bold">45%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-section overflow-hidden">
                  <div className="h-full bg-gold w-[45%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs uppercase mb-2">
                  <span className="text-muted-foreground">Short Films & Narrative</span>
                  <span className="text-blue font-bold">30%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-section overflow-hidden">
                  <div className="h-full bg-blue w-[30%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs uppercase mb-2">
                  <span className="text-muted-foreground">Fashion & Editorial</span>
                  <span className="text-success font-bold">25%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-section overflow-hidden">
                  <div className="h-full bg-success w-[25%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-sm border border-gold/30 bg-gold/5 p-4">
            <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-gold">
              Pro Tip
            </span>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Reorder your projects in the Portfolio Manager to change the order they appear when scrolling through the 3D world.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Activity */}
      <div className="rounded-sm border border-border bg-surface p-6">
        <div className="mb-6 flex items-center justify-between border-b border-border/60 pb-4">
          <div>
            <h3 className="font-display text-lg uppercase tracking-tight text-foreground">
              Recent Lead Activity
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              Latest client submissions from /booking
            </span>
          </div>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-gold hover:underline"
          >
            Manage CRM <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 uppercase tracking-wider">Client</th>
                <th className="pb-3 uppercase tracking-wider">Project Type</th>
                <th className="pb-3 uppercase tracking-wider">Budget</th>
                <th className="pb-3 uppercase tracking-wider">Status</th>
                <th className="pb-3 uppercase tracking-wider">Submitted</th>
                <th className="pb-3 text-right uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {inquiries.slice(0, 4).map((inq) => (
                <tr key={inq.id} className="group transition-colors hover:bg-section/50">
                  <td className="py-4">
                    <span className="font-bold text-foreground block">{inq.name}</span>
                    <span className="text-[0.7rem] text-muted-foreground block">{inq.email}</span>
                    {inq.phone && (
                      <span className="text-[0.7rem] text-gold/90 block">📞 {inq.phone}</span>
                    )}
                  </td>
                  <td className="py-4 capitalize">
                    <span className="rounded-full border border-border bg-section px-2.5 py-1 text-[0.7rem]">
                      {inq.type}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-gold">{inq.budget || '—'}</td>
                  <td className="py-4">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryItem['status'])}
                      className={`rounded-sm border px-2 py-1 text-[0.7rem] uppercase tracking-wider font-bold focus:outline-none cursor-pointer ${
                        inq.status === 'new'
                          ? 'border-gold bg-gold/15 text-gold'
                          : inq.status === 'in-review'
                          ? 'border-blue/50 bg-blue/15 text-blue'
                          : inq.status === 'contacted'
                          ? 'border-success/50 bg-success/15 text-success'
                          : 'border-border bg-section text-muted-foreground'
                      }`}
                    >
                      <option value="new" className="bg-surface text-foreground">New</option>
                      <option value="in-review" className="bg-surface text-foreground">In Review</option>
                      <option value="contacted" className="bg-surface text-foreground">Contacted</option>
                      <option value="archived" className="bg-surface text-foreground">Archived</option>
                    </select>
                  </td>
                  <td className="py-4 text-muted-foreground">
                    {new Date(inq.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-right">
                    <Link
                      href={`/admin/inquiries?id=${inq.id}`}
                      className="inline-flex items-center gap-1 rounded-sm border border-border px-3 py-1.5 text-[0.7rem] uppercase tracking-wider transition-all hover:border-gold hover:text-gold"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
