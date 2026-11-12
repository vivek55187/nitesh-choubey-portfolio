import { motion } from 'motion/react'
import { skills } from '../data/content'
import { Reveal, SectionLabel, SplitWords } from './motion'

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative overflow-hidden bg-ivory text-ink" aria-labelledby="skills-title">
      <div className="container-lux">
        <SectionLabel index="05" tone="light">
          Skills &amp; Expertise
        </SectionLabel>
        <h2 id="skills-title" className="mb-20 max-w-4xl font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] font-medium">
          <SplitWords text="Analytical by training," />
          <br />
          <SplitWords text="creative by instinct." delay={0.2} wordClassName="italic text-gold-deep" />
        </h2>

        <div className="divide-y divide-ink/12 border-y border-ink/12">
          {skills.map((g, gi) => (
            <div key={g.group} className="grid gap-8 py-12 md:grid-cols-12 md:gap-10 md:py-14">
              <Reveal className="md:col-span-4">
                <span className="font-serif text-base text-gold-deep italic">{g.index}</span>
                <h3 className="mt-3 font-serif text-[2rem] leading-tight">{g.group}</h3>
                <p className="mt-2 text-[12px] tracking-[0.14em] text-ink/50 uppercase">{g.items.length} disciplines</p>
              </Reveal>
              <motion.ul
                className="flex flex-wrap content-start gap-3 md:col-span-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: gi * 0.05 } } }}
              >
                {g.items.map((s) => (
                  <motion.li
                    key={s}
                    variants={{
                      hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
                      show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <span
                      tabIndex={0}
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink/20 px-5 py-3 text-[15px] text-ink transition-colors duration-500 hover:border-navy hover:text-ivory focus-visible:border-navy focus-visible:text-ivory"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 -z-0 translate-y-full rounded-full bg-navy transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
                      />
                      <span aria-hidden className="relative h-1.5 w-1.5 rotate-45 bg-gold-deep transition-colors group-hover:bg-gold" />
                      <span className="relative">{s}</span>
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
