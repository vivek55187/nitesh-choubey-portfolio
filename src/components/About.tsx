import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { about } from '../data/content'
import { Reveal, SectionLabel, SplitWords } from './motion'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bigY = useTransform(scrollYProgress, [0, 1], ['10%', '-30%'])

  return (
    <section id="about" ref={ref} className="section-pad relative overflow-hidden bg-ivory text-ink" aria-labelledby="about-title">
      <motion.span
        aria-hidden
        style={{ y: bigY }}
        className="pointer-events-none absolute top-10 right-[-4%] font-serif text-[22vw] leading-none text-ink/[0.035] italic select-none"
      >
        Story
      </motion.span>

      <div className="container-lux relative">
        <SectionLabel index="01" tone="light">
          My Professional Story
        </SectionLabel>

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="about-title" className="font-serif text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.04] font-medium tracking-[-0.01em]">
              <SplitWords text={about.lead} stagger={0.025} />
            </h2>
          </div>

          <div className="space-y-6 text-[16px] leading-[1.8] text-ink/75 lg:col-span-5 lg:pt-3">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} as="p">
                {i === 0 ? (
                  <>
                    <span className="float-left mt-1 mr-3 font-serif text-[4.2rem] leading-[0.8] text-gold-deep">
                      {p.charAt(0)}
                    </span>
                    {p.slice(1)}
                  </>
                ) : (
                  p
                )}
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <Reveal className="mb-8 flex items-center justify-between gap-6">
            <h3 className="eyebrow text-ink/55">Areas of interest &amp; experience</h3>
            <span className="h-px flex-1 bg-ink/15" />
          </Reveal>
          <ul className="grid grid-cols-1 border-t border-l border-ink/12 sm:grid-cols-2 lg:grid-cols-4">
            {about.focus.map((f, i) => (
              <Reveal
                as="li"
                key={f}
                delay={(i % 4) * 0.06}
                className="group relative border-r border-b border-ink/12 px-6 py-7 transition-colors duration-500 hover:bg-navy"
              >
                <span className="block font-serif text-sm text-gold-deep italic transition-colors group-hover:text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-6 block font-serif text-[1.45rem] leading-tight text-ink transition-colors duration-500 group-hover:text-ivory">
                  {f}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
