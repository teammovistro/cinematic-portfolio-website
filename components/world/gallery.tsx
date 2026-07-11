'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import { Frame } from './frame'
import { useLiveProjects, CAM_START_Z, getCamEndZ, frameZ } from './data'

export function Gallery() {
  const scroll = useScroll()
  const { camera, viewport } = useThree()
  const isMobile = viewport.width < 5.5
  const target = useRef(new THREE.Vector3())
  const projects = useLiveProjects()
  const camEndZ = getCamEndZ(projects.length)

  useFrame((state, delta) => {
    const offset = scroll.offset

    // travel forward through the hall
    const z = THREE.MathUtils.lerp(CAM_START_Z, camEndZ, offset)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 6, delta)

    // subtle mouse parallax
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      state.pointer.x * (isMobile ? 0.2 : 0.5),
      3,
      delta,
    )
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      0.2 + state.pointer.y * (isMobile ? 0.15 : 0.35),
      3,
      delta,
    )

    target.current.set(0, 0, camera.position.z - 8)
    camera.lookAt(target.current)
  })

  return (
    <group>
      {/* intro title */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <Text
          font="/fonts/Archivo-Bold.ttf"
          fontSize={isMobile ? 0.78 : 1.35}
          position={[0, 1.1, 2]}
          anchorX="center"
          anchorY="middle"
          color="#f5f5f5"
          letterSpacing={-0.03}
        >
          MOVISTRO
        </Text>
        <Text
          font="/fonts/SpaceMono-Regular.ttf"
          fontSize={isMobile ? 0.11 : 0.2}
          position={[0, 0.1, 2]}
          anchorX="center"
          anchorY="middle"
          color="#d4a64f"
          letterSpacing={isMobile ? 0.18 : 0.4}
        >
          CINEMA · PHOTO · MANAGEMENT
        </Text>
      </Float>

      {/* the gallery */}
      {projects.map((p, i) => (
        <Frame key={p.id || p.title} project={p} index={i} />
      ))}



      {/* dark polished floor running the length of the hall */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.2, (camEndZ + CAM_START_Z) / 2]}
      >
        <planeGeometry args={[40, Math.abs(camEndZ) + 40]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.35}
          metalness={0.85}
        />
      </mesh>

      {/* cool fill so the hall isn't pitch black */}
      <hemisphereLight args={['#4a5a7a', '#050505', 0.35]} />
    </group>
  )
}
