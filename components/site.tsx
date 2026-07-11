'use client'

import { useState } from 'react'
import { LoadingScreen } from './loading-screen'
import { Cursor } from './anim/cursor'
import { WorldStage } from './world/world-stage'
import { Chrome } from './world/chrome'
import { MobileUI } from './world/mobile-ui'

export function Site() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <Cursor />

      {/* PC UI - Exact original desktop 3D museum corridor */}
      <div className="hidden md:block">
        <WorldStage />
        <Chrome />
      </div>

      {/* Mobile UI - Brand new dedicated interactive 3D mobile showcase */}
      <div className="block md:hidden">
        <MobileUI />
      </div>

      {/* cinematic overlays */}
      <div className="vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <span className="sr-only" aria-live="polite">
        {loaded ? 'Experience loaded' : 'Loading'}
      </span>
    </>
  )
}
