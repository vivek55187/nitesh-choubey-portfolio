import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useFinePointer } from '../hooks/useMedia'

const INTERACTIVE = 'a, button, [role="button"], [data-cursor], input, textarea, summary, label'

/**
 * Minimal custom cursor: a precise dot, a lagging ring that grows over
 * interactive elements, and a soft gold glow that trails behind.
 * Only active on fine pointers with motion allowed.
 */
export default function Cursor() {
  const enabled = useFinePointer()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 })
  const gx = useSpring(x, { stiffness: 60, damping: 20 })
  const gy = useSpring(y, { stiffness: 60, damping: 20 })
  const [hover, setHover] = useState<string | null>(null)
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = (e.target as Element | null)?.closest?.(INTERACTIVE) as HTMLElement | null
      setHover(t ? t.dataset.cursor ?? 'link' : null)
    }
    const leave = () => setVisible(false)
    const d = () => setDown(true)
    const u = () => setDown(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', d)
    window.addEventListener('pointerup', u)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', d)
      window.removeEventListener('pointerup', u)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  const size = hover === 'view' ? 84 : hover ? 54 : 34

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0, transition: 'opacity .3s' }}>
      <motion.div
        className="absolute top-0 left-0 h-[420px] w-[420px] rounded-full"
        style={{
          x: gx,
          y: gy,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(197,164,109,0.075), transparent 62%)',
        }}
      />
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border mix-blend-difference"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          scale: down ? 0.82 : 1,
          borderColor: hover ? 'rgba(197,164,109,0.9)' : 'rgba(245,242,234,0.45)',
          backgroundColor: hover === 'view' ? 'rgba(197,164,109,0.95)' : 'rgba(197,164,109,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {hover === 'view' && (
          <span className="text-[10px] font-semibold tracking-[0.2em] text-navy uppercase">View</span>
        )}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 h-[5px] w-[5px] rounded-full bg-gold"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hover ? 0 : 1 }}
      />
    </div>
  )
}
