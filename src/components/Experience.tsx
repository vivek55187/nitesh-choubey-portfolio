import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { external } from './icons'
import { experience, type Experience as Exp } from '../data/content'
import { Reveal, SectionLabel, SplitWords, Tilt } from './motion'

function Node({ current }: { current?: boolean }) {
  return (
    <motion.span
      className="absolute top-9 left-0 z-10 flex h-[15px] w-[15px] -translate-x-1/2 items-center justify-center md:left-1/2"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -30% 0px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      aria-hidden
    >
      <span className="absolute h-full w-full rotate-45 border border-gold bg-navy" />
      <span className="relative h-[5px] w-[5px] rotate-45 bg-gold" />
      {current && <span className="absolute h-7 w-7 animate-ping rounded-full border border-gold/30" />}
    </motion.span>
  )
}

/** Flagship entry (JEEVAN): logo, founder designation, links to the venture section and website. */
function FeaturedCard({ e }: { e: Exp }) {
  return (
    <Tilt max={4} className="rounded-2xl">
      <article className="group relative overflow-hidden rounded-2xl border border-gold/45 bg-gradient-to-br from-[#16241c] via-charcoal to-navy-2 p-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),0_0_0_6px_rgba(197,164,109,0.05)] sm:p-9">
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <span aria-hidden className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-gold via-gold/60 to-transparent" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {e.logo && (
              <img src={e.logo} alt={`${e.org} logo`} width={60} height={60} loading="lazy" decoding="async" className="h-[60px] w-[60px] rounded-full ring-1 ring-gold/40" />
            )}
            <div>
              <p className="text-[10.5px] font-bold tracking-[0.26em] text-gold uppercase">Flagship Venture</p>
              <p className="mt-1 text-[12px] font-semibold tracking-[0.14em] text-ivory/70 uppercase">{e.period}</p>
            </div>
          </div>
          {e.current && (
            <span className="relative mt-2 flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
          )}
        </div>

        <h3 className="relative mt-7 font-serif text-[2.3rem] leading-[1.02] text-ivory">
          {e.role} <span className="italic text-gold">— {e.org}</span>
        </h3>
        <p className="relative mt-2 text-[14px] text-ivory/75">{e.type}</p>
        <p className="relative mt-3 flex items-center gap-2 text-[12.5px] text-muted">
          <MapPin className="h-3.5 w-3.5 text-gold/80" aria-hidden /> {e.location}
        </p>
        <div className="relative my-6 h-px bg-gold/20" />
        <ul className="relative space-y-2.5 text-[15px] leading-relaxed text-ivory/80">
          {e.description.map((d) => (
            <li key={d} className="flex gap-3">
              <span className="mt-[0.6em] h-px w-3 shrink-0 bg-gold" aria-hidden />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        {e.skills.length > 0 && (
          <ul className="relative mt-6 flex flex-wrap gap-2" aria-label="Skills">
            {e.skills.map((s) => (
              <li key={s} className="rounded-full border border-gold/30 bg-gold/[0.06] px-3 py-1 text-[11.5px] tracking-wide text-gold-soft">
                {s}
              </li>
            ))}
          </ul>
        )}
        <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ivory/[0.08] pt-6">
          {e.anchor && (
            <a
              href={e.anchor}
              className="group/l inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-navy uppercase transition-colors hover:bg-gold-soft"
            >
              The JEEVAN Story
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover/l:translate-y-0.5" />
            </a>
          )}
          {e.website && (
            <a
              href={e.website}
              {...external}
              aria-label="Explore the JEEVAN website (opens in a new tab)"
              className="group/l inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] text-ivory/85 uppercase transition-colors hover:text-gold"
            >
              Explore the startup
              <ArrowUpRight className="h-3.5 w-3.5 text-gold transition-transform duration-500 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
            </a>
          )}
        </div>
      </article>
    </Tilt>
  )
}

function Card({ e, side }: { e: Exp; side: 'left' | 'right' }) {
  if (e.featured) return <FeaturedCard e={e} />
  return (
    <Tilt max={4} className="rounded-2xl">
      <article className="group relative overflow-hidden rounded-2xl border border-ivory/[0.08] bg-gradient-to-b from-charcoal to-navy-2 p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] transition-colors duration-500 hover:border-gold/35 sm:p-9">
        <span
          aria-hidden
          className={`absolute top-0 h-px w-24 bg-gold/70 transition-all duration-700 group-hover:w-48 ${side === 'left' ? 'right-0 md:right-0' : 'left-0'}`}
        />
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[12px] font-semibold tracking-[0.14em] text-gold uppercase">{e.period}</span>
          {e.current && (
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
          )}
        </div>
        <h3 className="mt-4 font-serif text-[1.85rem] leading-[1.1] text-ivory">{e.role}</h3>
        <p className="mt-2 text-[15px] text-ivory/85">
          {e.org}
          {e.type && <span className="text-muted"> · {e.type}</span>}
        </p>
        {e.orgDetail && <p className="mt-1 text-[13px] text-muted">{e.orgDetail}</p>}
        <p className="mt-3 flex items-center gap-2 text-[12.5px] text-muted">
          <MapPin className="h-3.5 w-3.5 text-gold/80" aria-hidden /> {e.location}
        </p>
        <div className="my-6 h-px bg-ivory/[0.08]" />
        <ul className="space-y-2.5 text-[14.5px] leading-relaxed text-ivory/70">
          {e.description.map((d) => (
            <li key={d} className="flex gap-3">
              <span className="mt-[0.6em] h-px w-3 shrink-0 bg-gold/70" aria-hidden />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        {e.skills.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills">
            {e.skills.map((s) => (
              <li key={s} className="rounded-full bg-ivory/[0.05] px-3 py-1 text-[11.5px] tracking-wide text-ivory/75">
                {s}
              </li>
            ))}
          </ul>
        )}
      </article>
    </Tilt>
  )
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="experience" className="section-pad relative overflow-hidden bg-navy" aria-labelledby="exp-title">
      <div className="container-lux">
        <SectionLabel index="02">Professional Experience</SectionLabel>
        <div className="mb-20 grid gap-8 md:grid-cols-2 md:items-end">
          <h2 id="exp-title" className="font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] font-medium text-ivory">
            <SplitWords text="A path built" />
            <br />
            <SplitWords text="on ownership." delay={0.15} wordClassName="italic text-gold" />
          </h2>
          <Reveal as="p" className="max-w-md text-[15px] leading-relaxed text-muted md:justify-self-end">
            From representing my school as an NCC cadet to founding my own venture — each role added a different
            lens: discipline, communication, customer empathy and ownership.
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          {/* timeline track + animated progress */}
          <div aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-ivory/10 md:left-1/2" />
          <motion.div
            aria-hidden
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-gold via-gold to-gold/0 md:left-1/2"
            style={{ scaleY: fill }}
          />

          <ol className="space-y-14 md:space-y-20">
            {experience.map((e, i) => {
              const side = i % 2 === 0 ? 'left' : 'right'
              return (
                <li key={e.role + e.org} className="relative pl-10 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
                  <Node current={e.current} />
                  <Reveal
                    y={40}
                    className={side === 'left' ? 'md:col-start-1' : 'md:col-start-2'}
                  >
                    <Card e={e} side={side} />
                  </Reveal>
                  <div
                    className={`hidden items-start pt-7 md:flex ${side === 'left' ? 'md:col-start-2 md:row-start-1' : 'md:col-start-1 md:row-start-1 md:justify-end'}`}
                    aria-hidden
                  >
                    <Reveal delay={0.15}>
                      <span className="font-serif text-[5.5rem] leading-none text-ivory/[0.06] italic">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </Reveal>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
