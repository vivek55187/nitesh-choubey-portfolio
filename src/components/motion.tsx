import { useRef, type ReactNode, type ElementType, type CSSProperties } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'motion/react'
import { useFinePointer } from '../hooks/useMedia'

const ease = [0.22, 1, 0.36, 1] as const

/** Fade + rise into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'p' | 'span' | 'header'
}) {
  const M = motion[as] as typeof motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.95, ease, delay }}
    >
      {children}
    </M>
  )
}

const wordParent: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
}
const wordChild: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease } },
}

/** Word-by-word masked stagger for headings. */
export function SplitWords({
  text,
  className,
  as: Tag = 'span',
  stagger = 0.06,
  delay = 0,
  animateOnMount = false,
  wordClassName,
}: {
  text: string
  className?: string
  as?: ElementType
  stagger?: number
  delay?: number
  animateOnMount?: boolean
  wordClassName?: string
}) {
  const words = text.split(' ')
  const trigger = animateOnMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        variants={wordParent}
        custom={stagger}
        initial="hidden"
        transition={{ delayChildren: delay }}
        {...trigger}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
            <motion.span
              className={`inline-block will-change-transform ${wordClassName ?? ''}`}
              variants={wordChild}
              transition={{ delay: delay + i * stagger, duration: 0.9, ease }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

/** Subtle 3D tilt that follows the pointer. Disabled on touch / reduced motion. */
export function Tilt({
  children,
  className,
  max = 7,
  style,
  glare = true,
}: {
  children: ReactNode
  className?: string
  max?: number
  style?: CSSProperties
  glare?: boolean
}) {
  const enabled = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 160, damping: 18 })
  const sy = useSpring(py, { stiffness: 160, damping: 18 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(sx, (v) => `${v * 100}%`)
  const gy = useTransform(sy, (v) => `${v * 100}%`)
  const glareBg = useTransform(
    [gx, gy] as never,
    ([x, y]: string[]) => `radial-gradient(420px circle at ${x} ${y}, rgba(197,164,109,0.16), transparent 60%)`,
  )

  if (!enabled) return <div className={className} style={style}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={`relative ${className ?? ''}`}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
      }}
      onPointerLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}

/** Magnetic wrapper: pulls its child gently toward the cursor. */
export function Magnetic({ children, strength = 0.32 }: { children: ReactNode; strength?: number }) {
  const enabled = useFinePointer()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 })
  if (!enabled) return <span className="inline-flex">{children}</span>
  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}

/** Small section label with a gold rule. */
export function SectionLabel({ index, children, tone = 'dark' }: { index: string; children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <Reveal className="mb-10 flex items-center gap-4">
      <span className={`font-serif text-lg italic ${tone === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>{index}</span>
      <span className={`h-px w-12 ${tone === 'dark' ? 'bg-gold/60' : 'bg-gold-deep/50'}`} />
      <span className={`eyebrow ${tone === 'dark' ? 'text-muted' : 'text-ink/60'}`}>{children}</span>
    </Reveal>
  )
}
