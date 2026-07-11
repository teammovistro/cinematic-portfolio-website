'use client'

import { useState } from 'react'
import { LoadingScreen } from './loading-screen'
import { Cursor } from './anim/cursor'
import { WorldStage } from './world/world-stage'
import { Chrome } from './world/chrome'

export function Site() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <Cursor />

      {/* the entire site is one continuous 3D world for both PC and Mobile */}
      <WorldStage />
      <Chrome />

      {/* cinematic overlays */}
      <div className="vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <span className="sr-only" aria-live="polite">
        {loaded ? 'Experience loaded' : 'Loading'}
      </span>
    </>
  )
}
