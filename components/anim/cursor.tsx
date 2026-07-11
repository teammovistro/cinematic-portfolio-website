'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.3 })

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) setEnabled(true)
    else return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement
      setHovering(!!el.closest('a, button, [data-cursor="hover"]'))
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full bg-foreground"
        animate={{
          width: hovering ? 44 : 12,
          height: hovering ? 44 : 12,
          x: hovering ? -22 : -6,
          y: hovering ? -22 : -6,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </motion.div>
  )
}
