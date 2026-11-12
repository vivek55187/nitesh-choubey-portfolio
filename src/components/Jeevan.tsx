import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight, Lock, MapPin } from 'lucide-react'
import { jeevan } from '../data/content'
import { Magnetic, Reveal, SectionLabel, SplitWords, Tilt } from './motion'
import { external } from './icons'

const ease = [0.22, 1, 0.36, 1] as const

/** Generic botanical outline used as slow-drifting background ornament. */
function Leaf({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="-40 -40 80 80" className={className} style={style} aria-hidden fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M0,-34 C22,-20 22,20 0,34 C-22,20 -22,-20 0,-34 Z" />
      <path d="M0,-34 L0,34 M0,-12 L10,-20 M0,0 L12,-8 M0,12 L10,6 M0,-12 L-10,-20 M0,0 L-12,-8 M0,12 L-10,6" opacity="0.7" />
    </svg>
  )
}

/** Premium founder badge with a slow light sweep. */
function FounderBadge() {
  return (
    <div className="relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-gold/50 bg-navy/70 py-2 pr-6 pl-2 shadow-[0_0_0_6px_rgba(197,164,109,0.06)] backdrop-blur">
      <img src={jeevan.logo} alt="JEEVAN logo" width={48} height={48} className="h-12 w-12 rounded-full" loading="lazy" decoding="async" />
      <div>
        <p className="text-[11px] font-bold tracking-[0.26em] text-gold uppercase">Founder — JEEVAN</p>
        <p className="mt-0.5 text-[12.5px] text-ivory/70">{jeevan.period}</p>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-gold/20 to-transparent"
        style={{ animation: 'badge-sweep 5.5s cubic-bezier(.65,0,.35,1) infinite' }}
      />
    </div>
  )
}

function Showcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const phoneY = useTransform(scrollYProgress, [0, 1], [90, -70])
  const sealY = useTransform(scrollYProgress, [0, 1], [-30, 40])
  const sealRotate = useTransform(scrollYProgress, [0, 1], [-40, 80])

  return (
    <div ref={ref} className="relative pb-16 sm:pb-20 lg:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 12 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1.3, ease }}
        style={{ transformPerspective: 1400 }}
      >
        <Tilt max={5} className="rounded-[18px]">
          <a
            href={jeevan.website}
            {...external}
            data-cursor="view"
            aria-label="Open the official JEEVAN website (opens in a new tab)"
            className="group block overflow-hidden rounded-[18px] border border-ivory/12 bg-charcoal shadow-[0_60px_120px_-40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(197,164,109,0.08)]"
          >
            {/* browser chrome */}
            <div className="flex items-center gap-4 border-b border-ivory/[0.07] bg-navy-2 px-4 py-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-ivory/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ivory/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-ivory/[0.05] px-4 py-1.5 text-[11.5px] text-ivory/60">
                <Lock className="h-3 w-3 shrink-0 text-gold/80" aria-hidden />
                <span className="truncate">{jeevan.displayUrl}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-ivory/40 transition-colors group-hover:text-gold" aria-hidden />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
              <img
                src={jeevan.previewDesktop}
                alt="Homepage of the official JEEVAN website: “Small pots. Big difference.” with hand-painted terracotta pots"
                width={1440}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-0" />
            </div>
          </a>
        </Tilt>
      </motion.div>

      {/* phone preview — parallax depth layer */}
      <motion.div
        style={{ y: phoneY }}
        className="absolute -bottom-6 -left-3 w-[30%] max-w-[190px] sm:-left-8 lg:-bottom-14 lg:-left-14"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease, delay: 0.35 }}
      >
        <div className="overflow-hidden rounded-[22px] border-[5px] border-charcoal bg-charcoal shadow-[0_40px_80px_-24px_rgba(0,0,0,0.9)] ring-1 ring-ivory/15">
          <img
            src={jeevan.previewMobile}
            alt="JEEVAN website on a mobile screen"
            width={600}
            height={1298}
            loading="lazy"
            decoding="async"
            className="aspect-[9/17] w-full object-cover object-top"
          />
        </div>
      </motion.div>

      {/* rotating brand seal */}
      <motion.div
        aria-hidden
        style={{ y: sealY }}
        className="absolute -top-10 -right-2 h-28 w-28 sm:-top-12 sm:-right-6 sm:h-36 sm:w-36"
      >
        <motion.svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" style={{ rotate: sealRotate }}>
          <defs>
            <path id="seal-circle" d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
          </defs>
          <circle cx="60" cy="60" r="59" fill="#101827" stroke="rgba(197,164,109,0.45)" />
          <text fill="#C5A46D" fontSize="9.2" letterSpacing="3.1" fontFamily="Manrope Variable, sans-serif" fontWeight="600">
            <textPath href="#seal-circle">SMALL POTS · BIG DIFFERENCE · JEEVAN ·</textPath>
          </text>
        </motion.svg>
        <img src={jeevan.logo} alt="" className="absolute inset-[27%] h-[46%] w-[46%] rounded-full" loading="lazy" decoding="async" />
      </motion.div>
    </div>
  )
}

export default function Jeevan() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const marqueeX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['4%', '-34%'])
  const processRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress: pp } = useScroll({ target: processRef, offset: ['start 85%', 'end 55%'] })
  const line = useSpring(pp, { stiffness: 90, damping: 24 })

  return (
    <section
      id="jeevan"
      ref={ref}
      className="grain section-pad relative overflow-hidden bg-navy-2"
      aria-labelledby="jeevan-title"
    >
      {/* ── background motion ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[30%] h-[640px] w-[640px] rounded-full bg-[#1E4620]/25 blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[5%] h-[520px] w-[520px] rounded-full bg-gold/[0.06] blur-[130px]" />
        <Leaf className="absolute top-[12%] left-[4%] h-24 w-24 text-gold/15" style={{ animation: 'leaf-drift 18s ease-in-out infinite' }} />
        <Leaf className="absolute top-[58%] left-[44%] h-16 w-16 text-gold/10" style={{ animation: 'leaf-drift 22s ease-in-out -6s infinite' }} />
        <Leaf className="absolute right-[6%] bottom-[16%] h-28 w-28 text-gold/[0.12]" style={{ animation: 'leaf-drift 26s ease-in-out -11s infinite' }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      </div>
      <motion.p
        aria-hidden
        style={{ x: marqueeX }}
        className="pointer-events-none absolute top-[38%] left-0 font-serif text-[18vw] leading-none whitespace-nowrap text-ivory/[0.025] italic select-none"
      >
        JEEVAN · Small pots. Big difference. · JEEVAN
      </motion.p>

      <div className="container-lux relative">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <SectionLabel index="✦">{jeevan.eyebrow}</SectionLabel>
          <Reveal className="mb-10 hidden sm:block">
            <span className="rounded-full border border-gold/35 px-4 py-1.5 text-[10.5px] font-semibold tracking-[0.24em] text-gold-soft uppercase">
              Flagship Venture
            </span>
          </Reveal>
        </div>

        <div className="grid items-center gap-20 lg:grid-cols-12 lg:gap-14">
          {/* copy */}
          <div className="lg:col-span-5">
            <Reveal>
              <FounderBadge />
            </Reveal>

            <h2 id="jeevan-title" className="mt-10 font-serif text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] font-medium tracking-[-0.01em] text-ivory">
              <SplitWords text={jeevan.headline[0]} className="block" />
              <SplitWords text={jeevan.headline[1]} delay={0.2} className="block" wordClassName="italic text-gold" />
            </h2>

            <Reveal as="p" delay={0.1} className="mt-8 text-[16px] leading-[1.8] text-ivory/70">
              {jeevan.description}
            </Reveal>

            <Reveal delay={0.15} className="mt-8">
              <p className="eyebrow mb-4 text-[0.62rem] text-muted">Founder’s remit</p>
              <ul className="flex flex-wrap gap-2" aria-label="Founder responsibilities">
                {jeevan.remit.map((r) => (
                  <li key={r} className="rounded-full border border-ivory/12 px-3.5 py-1.5 text-[12px] tracking-wide text-ivory/80 transition-colors duration-300 hover:border-gold/50 hover:text-gold-soft">
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Magnetic>
                <a
                  href={jeevan.website}
                  {...external}
                  aria-label="Explore JEEVAN — official website (opens in a new tab)"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-8 py-4 text-[12px] font-bold tracking-[0.16em] text-navy uppercase shadow-[0_18px_40px_-14px_rgba(197,164,109,0.55)] transition-colors hover:bg-gold-soft"
                >
                  <img src={jeevan.logo} alt="" className="h-6 w-6 rounded-full" />
                  Explore JEEVAN
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <a
                href={jeevan.website}
                {...external}
                aria-label="Discover the Brand — official JEEVAN website (opens in a new tab)"
                className="group inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-ivory"
              >
                <span className="relative">
                  Discover the Brand
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-gold/50" />
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-gold transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>

            <Reveal delay={0.25} className="mt-8 flex items-center gap-2 text-[12px] tracking-wide text-muted">
              <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden /> {jeevan.location}
            </Reveal>
          </div>

          {/* visual */}
          <div className="lg:col-span-7 lg:pl-6">
            <Showcase />
          </div>
        </div>

        {/* ── brand case-study strip ── */}
        <div className="mt-20 grid gap-14 border-t border-ivory/10 pt-16 lg:mt-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-[0.62rem] text-muted">About the brand</p>
            <p className="mt-5 font-serif text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.05] text-ivory">
              “Small pots. <em className="text-gold">Big difference.</em>”
            </p>
            <p className="mt-5 text-[14.5px] leading-relaxed text-ivory/65">{jeevan.brandSummary}</p>
            <ul className="mt-6 space-y-2.5">
              {jeevan.brandTraits.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[13px] text-ivory/75">
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[11px] tracking-wide text-muted">Source: official JEEVAN website</p>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal as="p" className="eyebrow mb-8 text-[0.62rem] text-muted">
              What JEEVAN does
            </Reveal>
            <ol ref={processRef} className="relative grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5">
              <div aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px bg-ivory/10 lg:block" />
              <motion.div aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px origin-left bg-gold lg:block" style={{ scaleX: line }} />
              {jeevan.process.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.08} className="relative">
                  <span className="relative z-10 block h-[15px] w-[15px] rotate-45 border border-gold bg-navy-2" aria-hidden>
                    <span className="absolute inset-[4px] bg-gold" />
                  </span>
                  <span className="mt-6 block font-serif text-sm text-gold italic">0{i + 1}</span>
                  <h3 className="mt-1.5 font-serif text-[1.45rem] leading-tight text-ivory">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
