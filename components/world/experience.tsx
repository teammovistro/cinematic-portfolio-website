'use client'

import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Preload } from '@react-three/drei'
import { Gallery } from './gallery'
import { Overlay } from './overlay'
import { useLiveProjects, getPages } from './data'

export default function Experience({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const projects = useLiveProjects()
  const pages = getPages(projects.length)

  return (
    <Canvas
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      dpr={1}
      camera={{ position: [0, 0.2, 8], fov: 44, near: 0.1, far: 120 }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement
        canvas.addEventListener(
          'webglcontextlost',
          (e) => {
            e.preventDefault()
          },
          false,
        )
      }}
    >
      <color attach="background" args={['#080808']} />
      <fog attach="fog" args={['#080808', 12, 40]} />
      <ambientLight intensity={0.18} />

      <ScrollControls pages={pages} damping={0.22}>
        <Gallery />
        <Scroll html style={{ width: '100%' }}>
          <Overlay onNavigate={onNavigate} />
        </Scroll>
      </ScrollControls>

      {/* key/rim lights instead of a networked HDR environment */}
      <directionalLight position={[6, 8, 6]} intensity={0.35} color="#9fb4d8" />
      <directionalLight position={[-6, 3, -4]} intensity={0.25} color="#d4a64f" />
      <Preload all />
    </Canvas>
  )
}
