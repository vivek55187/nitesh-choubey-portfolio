import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { philosophy } from '../data/content'
import { Reveal } from './motion'

function Line({ text, i, progress }: { text: string; i: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const start = 0.18 + i * 0.12
  const opacity = useTransform(progress, [start, start + 0.14], [0.22, 1])
  const x = useTransform(progress, [start, start + 0.2], [i % 2 ? 40 : -40, 0])
  return (
    <motion.span style={{ opacity, x }} className={`block ${i === 1 ? 'italic text-gold' : ''}`}>
      {text}
    </motion.span>
  )
}

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const markY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section id="philosophy" ref={ref} className="grain section-pad relative overflow-hidden bg-navy-2" aria-labelledby="philosophy-title">
      <motion.span
        aria-hidden
        style={{ y: markY }}
        className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 font-serif text-[28rem] leading-none text-gold/[0.06] select-none"
      >
        “
      </motion.span>

      <div className="container-lux relative">
        <Reveal className="mb-14 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold/60" />
          <span id="philosophy-title" className="eyebrow text-muted">
            Professional Philosophy
          </span>
          <span className="h-px w-12 bg-gold/60" />
        </Reveal>

        <blockquote className="mx-auto max-w-5xl text-center">
          <p className="font-serif text-[clamp(2.2rem,5.6vw,5rem)] leading-[1.08] font-medium tracking-[-0.01em] text-ivory">
            {philosophy.quote.map((l, i) => (
              <Line key={l} text={l} i={i} progress={scrollYProgress} />
            ))}
          </p>
          <footer className="mt-10 text-[12px] tracking-[0.24em] text-muted uppercase">— Nitesh Kumar Choubey</footer>
        </blockquote>

        <div className="mx-auto mt-28 max-w-5xl">
          <Reveal as="p" className="mx-auto mb-14 max-w-2xl text-center text-[16px] leading-relaxed text-ivory/70">
            Good decisions rarely come from a single discipline. I try to bring four together — so that what the data
            suggests becomes something people understand, believe in and act on.
          </Reveal>
          <ol className="grid border-t border-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.pillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 0.08}
                className="group relative border-b border-ivory/10 px-2 py-10 sm:px-6 lg:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <span className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" aria-hidden />
                <span className="font-serif text-sm text-gold italic">0{i + 1}</span>
                <h3 className="mt-4 font-serif text-[1.75rem] text-ivory">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
