'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: string
    isUp: boolean
  }
  icon: LucideIcon
}

export function StatCard({ title, value, subtitle, trend, icon: Icon }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-sm border border-border bg-surface p-6 transition-all hover:border-gold/50 hover:shadow-[0_4px_20px_rgba(212,166,79,0.08)]">
      {/* Background glow accent */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/5 blur-2xl transition-all group-hover:bg-gold/15" />

      <div className="flex items-start justify-between">
        <div>
          <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {title}
          </span>
          <h3 className="mt-2 font-display text-3xl uppercase tracking-tight text-foreground md:text-4xl">
            {value}
          </h3>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-section text-gold transition-transform group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4 font-mono text-xs">
          {subtitle && <span className="text-muted-foreground">{subtitle}</span>}
          {trend && (
            <span className={`flex items-center gap-1 font-bold ${trend.isUp ? 'text-success' : 'text-red-400'}`}>
              {trend.isUp ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
