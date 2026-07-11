'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Image, Text } from '@react-three/drei'
import * as THREE from 'three'
import { frameRotY, frameX, frameZ, type Project } from './data'

const W = 4.2
const H = 2.4

export function Frame({ project, index }: { project: Project; index: number }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // On mobile, center the photo (x = 0, rotY = 0) and scale proportionally so 100% of the image is fully visible
  const x = isMobile ? 0 : frameX(index)
  const z = frameZ(index)
  const rotY = isMobile ? 0 : frameRotY(index)
  const scale = isMobile ? 0.44 : 1

  const imgRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    // gentle breathing glow on each artwork light
    if (lightRef.current) {
      const pulse = 2.6 + Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.35
      lightRef.current.intensity = THREE.MathUtils.damp(
        lightRef.current.intensity,
        hovered ? pulse + 2 : pulse,
        4,
        delta,
      )
    }
  })

  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]} scale={scale}>
      {/* warm key light pooling on the artwork + floor */}
      <pointLight
        ref={lightRef}
        position={[0, 1.2, 2.2]}
        color="#ffd9a0"
        intensity={2.6}
        distance={12}
        decay={2}
      />

      {/* matte frame border */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[W + 0.34, H + 0.34, 0.12]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.85} metalness={0.2} />
      </mesh>
      {/* thin gold inlay */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[W + 0.14, H + 0.14]} />
        <meshStandardMaterial
          color="#d4a64f"
          roughness={0.35}
          metalness={0.9}
          emissive="#3a2c12"
          emissiveIntensity={0.4}
        />
      </mesh>

      <Image
        ref={imgRef}
        url={project.img}
        scale={[W, H]}
        radius={0.02}
        transparent
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {/* caption in 3D under the frame */}
      <Text
        font="/fonts/Archivo-Bold.ttf"
        fontSize={0.26}
        position={[-W / 2, -H / 2 - 0.4, 0]}
        anchorX="left"
        anchorY="top"
        color="#f5f5f5"
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        font="/fonts/SpaceMono-Regular.ttf"
        fontSize={0.13}
        position={[-W / 2, -H / 2 - 0.78, 0]}
        anchorX="left"
        anchorY="top"
        color="#d4a64f"
        letterSpacing={0.15}
      >
        {`${String(index + 1).padStart(2, '0')} — ${project.category.toUpperCase()}`}
      </Text>
    </group>
  )
}
