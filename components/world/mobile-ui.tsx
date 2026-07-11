'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, Text, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useLiveProjects, type Project } from './data'
import { Clapperboard, ChevronLeft, ChevronRight, Sparkles as SparklesIcon } from 'lucide-react'

// Distance between artworks along the 3D flight path
const SPACING = 5.8

// Animated 3D Artwork Frame in 3D Space
function Animated3DArtwork({
  project,
  index,
  activeIndex,
}: {
  project: Project
  index: number
  activeIndex: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  // Calculate 3D position along the runway
  const targetZ = -index * SPACING
  // Subtle alternating wave curve so artworks float gracefully in 3D space
  const targetX = Math.sin(index * 1.1) * 0.35
  const targetY = Math.cos(index * 0.9) * 0.2

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const distanceToActive = Math.abs(index - activeIndex)
    const isActive = distanceToActive === 0

    // Smooth spring float & tilt animation
    const floatOffset = Math.sin(state.clock.elapsedTime * 1.8 + index) * (isActive ? 0.12 : 0.05)
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY + floatOffset,
      5,
      delta
    )

    // Dynamic 3D rotation: active frame faces camera straight on; inactive frames angle slightly
    const targetRotY = isActive
      ? state.pointer.x * 0.35
      : (index > activeIndex ? -0.35 : 0.35)

    const targetRotX = isActive ? -state.pointer.y * 0.25 : 0

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      6,
      delta
    )
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      6,
      delta
    )

    // Dynamic scale: active frame scales up majestically
    const targetScale = isActive ? 1.05 : Math.max(0.65, 1 - distanceToActive * 0.18)
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 6, delta)
    )

    // Dynamic light pulsing
    if (lightRef.current) {
      const targetIntensity = isActive
        ? 3.2 + Math.sin(state.clock.elapsedTime * 2.5) * 0.6
        : 0.5
      lightRef.current.intensity = THREE.MathUtils.damp(
        lightRef.current.intensity,
        targetIntensity,
        5,
        delta
      )
    }
  })

  // Portrait Cinema Poster Aspect Ratio (2.4 x 3.1)
  const W = 2.4
  const H = 3.1

  return (
    <group ref={groupRef} position={[targetX, targetY, targetZ]}>
      {/* Dynamic Key Light */}
      <pointLight
        ref={lightRef}
        position={[0, 1.2, 2.2]}
        color="#ffd9a0"
        intensity={2.8}
        distance={9}
        decay={2}
      />

      {/* Matte Black Shadow Box Frame */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[W + 0.26, H + 0.26, 0.12]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Glowing Luxury Gold Bezel */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[W + 0.1, H + 0.1]} />
        <meshStandardMaterial
          color="#d4a64f"
          roughness={0.25}
          metalness={0.95}
          emissive="#523d14"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* High-Resolution Artwork Image */}
      <Image
        url={project.img || '/images/reel.png'}
        scale={[W, H]}
        position={[0, 0, 0.01]}
      />

      {/* 3D Floating Title right inside the 3D scene below artwork */}
      <Text
        font="/fonts/Archivo-Bold.ttf"
        fontSize={0.22}
        position={[0, -H / 2 - 0.28, 0.05]}
        anchorX="center"
        anchorY="middle"
        color="#f5f5f5"
        letterSpacing={0.04}
      >
        {project.title.toUpperCase()}
      </Text>

      <Text
        font="/fonts/SpaceMono-Regular.ttf"
        fontSize={0.11}
        position={[0, -H / 2 - 0.52, 0.05]}
        anchorX="center"
        anchorY="middle"
        color="#d4a64f"
        letterSpacing={0.25}
      >
        {`${project.category.toUpperCase()} · ${project.year}`}
      </Text>
    </group>
  )
}

// Cinematic 3D Camera Flight Controller
function MobileCameraFlight({ activeIndex }: { activeIndex: number }) {
  const { camera } = useThree()
  const targetCamPos = useRef(new THREE.Vector3(0, 0.1, 5.5))
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state, delta) => {
    // Target Z is 5.5 units in front of active artwork
    const activeZ = -activeIndex * SPACING
    const activeX = Math.sin(activeIndex * 1.1) * 0.35
    const activeY = Math.cos(activeIndex * 0.9) * 0.2

    targetCamPos.current.set(
      activeX + state.pointer.x * 0.4,
      activeY + 0.1 + state.pointer.y * 0.3,
      activeZ + 5.3
    )

    // Smooth drone camera flight through 3D space
    camera.position.lerp(targetCamPos.current, 1 - Math.pow(0.005, delta))

    // Look at active artwork center with smooth damping
    lookAtTarget.current.set(activeX, activeY - 0.1, activeZ)
    camera.lookAt(lookAtTarget.current)
  })

  return null
}

export function MobileUI() {
  const router = useRouter()
  const projects = useLiveProjects()
  const [activeIndex, setActiveIndex] = useState(0)

  // Touch Swipe Gesture Handling
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current

    // Trigger on horizontal swipe OR vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 45) {
        prevProject()
      } else if (deltaX < -45) {
        nextProject()
      }
    } else {
      if (deltaY < -45) {
        nextProject()
      } else if (deltaY > 45) {
        prevProject()
      }
    }

    touchStartX.current = null
    touchStartY.current = null
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
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#060606] text-foreground selection:bg-gold selection:text-background overflow-hidden"
    >
      {/* 1. Sleek Glass Top Bar */}
      <header className="flex items-center justify-between border-b border-border/40 bg-black/75 px-5 py-3.5 backdrop-blur-xl z-20">
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
            className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-gold font-bold"
          >
            Contact
          </button>
        </div>
      </header>

      {/* 2. Full-Screen 3D Animated World Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.2, 5.5], fov: 46 }}
        >
          <color attach="background" args={['#060606']} />
          <fog attach="fog" args={['#060606', 4, 18]} />

          <ambientLight intensity={0.25} />
          <directionalLight position={[5, 8, 5]} intensity={0.7} color="#a8c1e8" />
          <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#d4a64f" />

          {/* Golden Volumetric Floating Particles */}
          <Sparkles
            count={70}
            scale={[10, 10, 25]}
            size={3}
            speed={0.6}
            color="#d4a64f"
            opacity={0.6}
          />

          {/* 3D Flight Camera Controller */}
          <MobileCameraFlight activeIndex={activeIndex} />

          {/* 3D Animated Artworks Runway */}
          {projects.map((proj, idx) => (
            <Animated3DArtwork
              key={proj.id || proj.title || idx}
              project={proj}
              index={idx}
              activeIndex={activeIndex}
            />
          ))}
        </Canvas>
      </div>

      {/* 3. Sleek Floating Bottom Glass HUD (Never covers artwork) */}
      <div className="z-20 flex flex-col items-center px-5 pb-5 pt-3 bg-gradient-to-t from-black via-black/85 to-transparent">
        {/* Project Description Line */}
        <p className="max-w-xs text-center font-mono text-[0.72rem] leading-relaxed text-muted-foreground line-clamp-2">
          {current.description || 'Cinematic exploration.'}
        </p>

        {/* 3D Flight Controls & Book CTA */}
        <div className="mt-3.5 flex items-center justify-between w-full max-w-xs gap-3">
          <button
            onClick={prevProject}
            className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-black/75 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-gold active:scale-95 transition-all"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </button>

          <button
            onClick={() => router.push('/booking')}
            className="flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-background shadow-[0_0_30px_rgba(212,166,79,0.6)] active:scale-95 transition-all"
          >
            <SparklesIcon className="h-3.5 w-3.5" /> Book
          </button>

          <button
            onClick={nextProject}
            className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-black/75 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-gold active:scale-95 transition-all"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Swipe Hint & Official Credit */}
        <div className="mt-2.5 flex flex-col items-center gap-1">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground">
            ✦ Swipe left / right or scroll to fly in 3D ✦
          </span>
          <button
            onClick={() => router.push('/partners')}
            className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-gold/80 hover:text-gold transition-colors"
          >
            IT Partner & Architect: Micro Logic IT
          </button>
        </div>
      </div>
    </div>
  )
}
