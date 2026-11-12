import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import { contact, profile } from '../data/content'
import { LinkedInIcon, external } from './icons'
import { Magnetic, SplitWords } from './motion'
import Particles from './Particles'
import { useFinePointer } from '../hooks/useMedia'

const ease = [0.22, 1, 0.36, 1] as const

function Portrait() {
  const fine = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 90, damping: 18 })
  const sy = useSpring(my, { stiffness: 90, damping: 18 })
  const rotY = useTransform(sx, [-1, 1], [-9, 9])
  const rotX = useTransform(sy, [-1, 1], [7, -7])
  const ringX = useTransform(sx, [-1, 1], [-18, 18])
  const ringY = useTransform(sy, [-1, 1], [-18, 18])
  const dotX = useTransform(sx, [-1, 1], [26, -26])
  const dotY = useTransform(sy, [-1, 1], [26, -26])

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[460px]"
      style={{ perspective: 1200 }}
      onPointerMove={(e) => {
        if (!fine) return
        const r = ref.current!.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      {/* depth layer — outer orbit */}
      <motion.div aria-hidden className="absolute inset-0" style={{ x: ringX, y: ringY }}>
        <div className="absolute inset-0 rounded-full border border-gold/20" />
        <div
          className="absolute inset-[-6%] rounded-full border border-dashed border-gold/15"
          style={{ animation: 'spin-slow 80s linear infinite' }}
        />
        <span className="absolute top-[6%] right-[14%] h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_4px_rgba(197,164,109,0.45)]" />
      </motion.div>

      {/* portrait — moves as one rigid plane so the face is never distorted */}
      <motion.div
        className="absolute inset-[9%] rounded-full"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, ease, delay: 0.5 }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gold/60 via-gold/10 to-transparent p-px">
          <div className="h-full w-full overflow-hidden rounded-full bg-charcoal">
            <img
              src={profile.portrait}
              alt={profile.portraitAlt}
              width={600}
              height={600}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover [filter:saturate(.72)_contrast(1.06)_brightness(.96)]"
            />
          </div>
        </div>
        {/* editorial tint: warm top light, navy base */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(197,164,109,0.10) 0%, rgba(16,24,39,0) 45%, rgba(16,24,39,0.55) 100%)',
          }}
        />
      </motion.div>

      {/* foreground depth accents */}
      <motion.div aria-hidden className="absolute inset-0" style={{ x: dotX, y: dotY }}>
        <span className="absolute bottom-[14%] left-[4%] h-1.5 w-1.5 rounded-full bg-ivory/70" />
        <span className="absolute top-[26%] left-[-2%] h-px w-16 bg-gold/60" />
      </motion.div>

      <motion.div
        className="absolute right-[-2%] bottom-[8%] rounded-full border border-ivory/10 bg-navy/80 px-4 py-2.5 backdrop-blur-md sm:right-[-6%]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.9, ease }}
      >
        <p className="flex items-center gap-2 text-[11px] tracking-wide text-ivory/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          Currently · <span className="text-ivory">{profile.current}</span>
        </p>
      </motion.div>
    </div>
  )
}

export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120])
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 60])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const d = (n: number) => (ready ? n : 99) // hold intro until preloader finishes

  return (
    <section
      id="top"
      ref={sectionRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-navy px-6 pt-32 pb-24 sm:px-10 lg:px-16"
    >
      <Particles className="absolute inset-0 h-full w-full" />
      {/* faint architectural grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F5F2EA 1px, transparent 1px), linear-gradient(to bottom, #F5F2EA 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(ellipse at 60% 40%, black 10%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-gold/[0.07] blur-[120px]"
      />

      <div className="container-lux relative grid items-center gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.p
            className="eyebrow mb-6 flex items-center gap-4 text-gold"
            initial={{ opacity: 0, x: -16 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: d(0.1) }}
          >
            <span className="h-px w-10 bg-gold" /> Hello, I’m
          </motion.p>

          {ready && (
            <h1 className="font-serif text-[clamp(3rem,8.4vw,7.4rem)] leading-[0.92] font-medium tracking-[-0.02em] text-ivory">
              <SplitWords text="Nitesh Kumar" animateOnMount stagger={0.09} delay={0.15} className="block" />
              <SplitWords
                text="Choubey"
                animateOnMount
                delay={0.35}
                className="block"
                wordClassName="italic text-gold"
              />
            </h1>
          )}
          {!ready && (
            <h1 className="font-serif text-[clamp(3rem,8.4vw,7.4rem)] leading-[0.92] font-medium opacity-0">
              Nitesh Kumar Choubey
            </h1>
          )}

          <motion.ul
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium tracking-[0.08em] text-ivory/75 uppercase sm:text-[12.5px]"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: d(0.75), duration: 1 }}
            aria-label="Roles"
          >
            {profile.roles.map((r, i) => (
              <li key={r} className="flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rotate-45 bg-gold" aria-hidden />}
                {r}
              </li>
            ))}
          </motion.ul>

          <div className="mt-10 max-w-xl border-l border-gold/40 pl-6">
            <motion.p
              className="font-serif text-[clamp(1.5rem,2.6vw,2.15rem)] leading-[1.15] text-ivory"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: d(0.9), duration: 1, ease }}
            >
              {profile.headline[0]} <em className="text-gold-soft">{profile.headline[1]}</em>
            </motion.p>
            <motion.p
              className="mt-4 text-[15px] leading-relaxed text-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: d(1.05), duration: 1, ease }}
            >
              {profile.intro}
            </motion.p>
          </div>

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: d(1.2), duration: 1, ease }}
          >
            <Magnetic>
              <a
                href="#about"
                className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-[12px] font-bold tracking-[0.16em] text-navy uppercase transition-colors hover:bg-gold-soft"
              >
                Explore My Journey
                <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[-45deg]" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={contact.linkedinUrl || '#contact'}
                {...(contact.linkedinUrl ? external : {})}
                aria-label={contact.linkedinUrl ? 'Let’s Connect on LinkedIn (opens in a new tab)' : undefined}
                className="group inline-flex items-center gap-3 rounded-full border border-ivory/25 px-7 py-4 text-[12px] font-bold tracking-[0.16em] text-ivory uppercase transition-colors duration-500 hover:border-gold hover:text-gold"
              >
                {contact.linkedinUrl && (
                  <LinkedInIcon className="h-4 w-4 text-gold transition-transform duration-500 group-hover:-rotate-[8deg] group-hover:scale-110" />
                )}
                Let’s Connect
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.p
            className="mt-10 flex items-center gap-2 text-[12px] tracking-wide text-muted"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: d(1.4), duration: 1 }}
          >
            <MapPin className="h-3.5 w-3.5 text-gold" /> {profile.location}
          </motion.p>
        </motion.div>

        <motion.div style={{ y: yPortrait }} className="relative">
          {ready && <Portrait />}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: d(1.8), duration: 1 }}
      >
        <span className="eyebrow text-[0.6rem] text-muted">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory/15">
          <span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            style={{ animation: 'scroll-cue 2.2s cubic-bezier(.65,0,.35,1) infinite' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
