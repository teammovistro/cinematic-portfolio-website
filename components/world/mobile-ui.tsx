'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useLiveProjects, type Project } from './data'
import { Clapperboard, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

// Single portrait 3D frame that flips around smoothly when changing project
function MobileArtworkFrame({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating animation + touch responsive tilt
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        Math.sin(state.clock.elapsedTime * 1.5) * 0.08,
        4,
        delta
      )
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        (state.pointer.x * 0.4),
        5,
        delta
      )
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        (-state.pointer.y * 0.25),
        5,
        delta
      )
    }

    if (lightRef.current) {
      lightRef.current.intensity = 2.4 + Math.sin(state.clock.elapsedTime * 2) * 0.4
    }
  })

  // Portrait Cinema Poster Ratio (2.5 x 3.25)
  const W = 2.5
  const H = 3.25

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Warm cinematic point light */}
      <pointLight
        ref={lightRef}
        position={[0, 1.5, 2.5]}
        color="#ffd9a0"
        intensity={2.6}
        distance={10}
        decay={2}
      />

      {/* Matte outer border */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[W + 0.28, H + 0.28, 0.1]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Luxury gold bezel */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[W + 0.1, H + 0.1]} />
        <meshStandardMaterial
          color="#d4a64f"
          roughness={0.3}
          metalness={0.9}
          emissive="#3a2c12"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Dynamic Artwork Image */}
      <Image
        url={project.img || '/images/reel.png'}
        scale={[W, H]}
        position={[0, 0, 0.01]}
      />
    </group>
  )
}

export function MobileUI() {
  const router = useRouter()
  const projects = useLiveProjects()
  const [activeIndex, setActiveIndex] = useState(0)

  // Touch swipe support
  const touchStartX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (deltaX > 50) {
      prevProject()
    } else if (deltaX < -50) {
      nextProject()
    }
    touchStartX.current = null
  }

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const current = projects[activeIndex] || projects[0] || {
    title: 'Nocturne',
    category: 'Short Film',
    year: '2025',
    description: 'A nocturnal short shot on anamorphic glass, chasing light through empty streets.',
    img: '/images/reel.png',
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080808] text-foreground selection:bg-gold selection:text-background overflow-hidden"
    >
      {/* 1. Mobile Top Header */}
      <header className="flex items-center justify-between border-b border-border/50 bg-black/80 px-5 py-4 backdrop-blur-md z-20">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 font-display text-base uppercase tracking-wider text-foreground"
        >
          <Clapperboard className="h-4 w-4 text-gold" />
          Movistro
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/about')}
            className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold"
          >
            About
          </button>
          <button
            onClick={() => router.push('/partners')}
            className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold"
          >
            Partners
          </button>
          <button
            onClick={() => router.push('/booking')}
            className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-gold"
          >
            Contact
          </button>
        </div>
      </header>

      {/* 2. Top Project Info Badge & Title */}
      <div className="z-20 flex flex-col items-center px-6 pt-3 text-center">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-gold">
          ✦ {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} · {current.category} · {current.year}
        </span>
        <h1 className="mt-1 font-display text-3xl uppercase leading-none tracking-tight text-foreground sm:text-4xl">
          {current.title}
        </h1>
      </div>

      {/* 3. Dedicated Mobile 3D Canvas Stage */}
      <div className="relative flex-1 w-full my-1">
        <Canvas
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.8], fov: 45 }}
        >
          <color attach="background" args={['#080808']} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[4, 6, 4]} intensity={0.6} color="#9fb4d8" />
          <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#d4a64f" />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <MobileArtworkFrame project={current} index={activeIndex} />
          </Float>
        </Canvas>
      </div>

      {/* 4. Bottom Project Caption & Controls */}
      <div className="z-20 flex flex-col items-center px-6 pb-6 text-center bg-gradient-to-t from-black via-black/90 to-transparent pt-4">
        <p className="max-w-xs text-pretty font-mono text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {current.description || 'Cinematic exploration.'}
        </p>

        {/* Carousel Navigation Bar */}
        <div className="mt-4 flex items-center justify-between w-full max-w-xs gap-4">
          <button
            onClick={prevProject}
            className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-black/60 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-gold active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </button>

          <button
            onClick={() => router.push('/booking')}
            className="flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-background shadow-[0_0_25px_rgba(212,166,79,0.5)] active:scale-95 transition-transform"
          >
            <Sparkles className="h-3.5 w-3.5" /> Book
          </button>

          <button
            onClick={nextProject}
            className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-black/60 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-gold active:scale-95 transition-transform"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Swipe Hint & IT Partner Credit */}
        <div className="mt-3 flex flex-col items-center gap-1">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
            Swipe left / right to explore projects
          </span>
          <button
            onClick={() => router.push('/partners')}
            className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold/80 hover:text-gold"
          >
            IT Partner & Architect: Micro Logic IT
          </button>
        </div>
      </div>
    </div>
  )
}
