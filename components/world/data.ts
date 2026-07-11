'use client'

import { useState, useEffect } from 'react'

export type Project = {
  id?: string
  img: string
  title: string
  category: string
  year: string
  description?: string
  active?: boolean
  featured?: boolean
}

export const INITIAL_PROJECTS: Project[] = [
  { img: '/images/reel.png', title: 'Nocturne', category: 'Short Film', year: '2025', description: 'A nocturnal short shot on anamorphic glass, chasing light through empty streets.' },
  { img: '/images/project-1.png', title: 'Velocity', category: 'Automotive', year: '2025', description: 'High-velocity automotive spot graded in teal and amber neon.' },
  { img: '/images/project-2.png', title: 'Silk', category: 'Fashion Film', year: '2024', description: 'A fashion film built on negative space, natural light, and slow motion.' },
  { img: '/images/project-3.png', title: 'Tides', category: 'Documentary', year: '2024', description: 'An intimate documentary captured at sea through fog and first light.' },
  { img: '/images/project-4.png', title: 'Pulse', category: 'Music Video', year: '2024', description: 'A high-energy music video lit with bold, saturated stage color.' },
  { img: '/images/reel-2.png', title: 'Horizon', category: 'Aerial', year: '2023', description: 'Sweeping aerial cinematography across mountain roads at golden hour.' },
  { img: '/images/bts.png', title: 'On Set', category: 'Behind The Scenes', year: '2023', description: 'Behind the scenes — the craft, the crew, and the camera in motion.' },
  { img: '/images/about.png', title: 'Portrait', category: 'Editorial', year: '2023', description: 'An editorial portrait series exploring texture and single-source light.' },
]

export let PROJECTS: Project[] = [...INITIAL_PROJECTS]

export function useLiveProjects() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeOnly = data.filter((p) => p.active !== false)
          setProjects(activeOnly)
          PROJECTS.splice(0, PROJECTS.length, ...activeOnly)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch dynamic projects:', err)
      })
  }, [])

  return projects
}

// journey geometry (shared between 3D scene + overlay)
export const GAP = 8 // z distance between frames
export const FIRST_Z = -6 // z of first frame
export const CAM_START_Z = 8
export const CAM_END_Z = -(PROJECTS.length * GAP + 2) // travel past last frame
export const PAGES = PROJECTS.length + 2 // intro + frames + contact

export function getCamEndZ(count: number) {
  return -(count * GAP + 2)
}

export function getPages(count: number) {
  return count + 2
}

export function frameZ(i: number) {
  return FIRST_Z - i * GAP
}

export function frameX(i: number) {
  return i % 2 === 0 ? -3.4 : 3.4
}

export function frameRotY(i: number) {
  return i % 2 === 0 ? 0.32 : -0.32
}
