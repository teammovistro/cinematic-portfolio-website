'use client'

import dynamic from 'next/dynamic'

const Experience = dynamic(() => import('./experience'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background" aria-hidden="true" />,
})

export function WorldStage() {
  return (
    <div className="fixed inset-0 h-screen w-screen">
      <Experience />
    </div>
  )
}
