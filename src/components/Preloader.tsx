import { useEffect } from 'react'
import { motion } from 'motion/react'

const ease = [0.76, 0, 0.24, 1] as const

/** Minimal preloader: the "NC" monogram draws in, a gold rule fills, then the curtain lifts. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = window.setTimeout(onDone, reduced ? 200 : 2100)
    return () => window.clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-2"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 1.05, ease } }}
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-8">
        <svg width="132" height="84" viewBox="0 0 132 84" fill="none" aria-hidden>
          {/* N */}
          <motion.path
            d="M10 74 V10 L52 74 V10"
            stroke="#C5A46D"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          {/* C */}
          <motion.path
            d="M122 20 A30 30 0 1 0 122 64"
            stroke="#F5F2EA"
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.25 }}
          />
        </svg>
        <div className="h-px w-40 overflow-hidden bg-ivory/10">
          <motion.div
            className="h-full bg-gold"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
        <motion.p
          className="eyebrow text-muted"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Nitesh Kumar Choubey
        </motion.p>
      </div>
    </motion.div>
  )
}
