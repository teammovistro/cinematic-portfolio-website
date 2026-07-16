'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { MobileStream } from './mobile-stream'

const Experience = dynamic(() => import('./experience'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background" aria-hidden="true" />,
})

export function WorldStage() {
  const router = useRouter()
  return (
    <div className="fixed inset-0 h-screen w-screen">
      <Experience onNavigate={(path: string) => router.push(path)} />
    </div>
  )
}
