import { education } from '../data/content'
import { Reveal, SectionLabel, SplitWords, Tilt } from './motion'

function Monogram({ letters }: { letters: string }) {
  // Typographic monogram in place of institution logos (no authentic high-res logos supplied).
  return (
    <span
      aria-hidden
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 font-serif text-lg tracking-wider text-gold"
    >
      {letters}
    </span>
  )
}

export default function Education() {
  return (
    <section id="education" className="section-pad relative overflow-hidden bg-charcoal" aria-labelledby="edu-title">
      <div className="container-lux">
        <SectionLabel index="03">Education</SectionLabel>
        <h2 id="edu-title" className="mb-16 max-w-3xl font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] font-medium text-ivory">
          <SplitWords text="History taught me why." />
          <br />
          <SplitWords text="Analytics teaches me how." delay={0.2} wordClassName="italic text-gold" />
        </h2>

        <ol className="grid gap-5 md:grid-cols-2">
          {education.map((ed, i) => (
            <Reveal as="li" key={ed.institution} delay={(i % 2) * 0.1} className="h-full">
              <Tilt max={4} className="h-full rounded-2xl">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ivory/[0.08] bg-navy/60 p-8 transition-colors duration-500 hover:border-gold/35 sm:p-10">
                  <span
                    aria-hidden
                    className="absolute -right-6 -bottom-10 font-serif text-[9rem] leading-none text-ivory/[0.03] italic transition-colors duration-700 group-hover:text-gold/[0.07]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-start justify-between gap-6">
                    <Monogram letters={ed.short} />
                    <div className="text-right">
                      {ed.status && (
                        <span className="rounded-full border border-gold/40 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-gold-soft uppercase">
                          {ed.status}
                        </span>
                      )}
                      {ed.period && <p className="text-[12px] font-semibold tracking-[0.14em] text-gold uppercase">{ed.period}</p>}
                    </div>
                  </div>
                  <h3 className="mt-10 font-serif text-[1.9rem] leading-[1.1] text-ivory">{ed.institution}</h3>
                  <p className="mt-3 text-[15px] text-ivory/80">{ed.credential}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-8 text-[13px] text-muted">
                    {ed.note && <span>{ed.note}</span>}
                    {ed.grade && (
                      <span className="flex items-center gap-2">
                        <span className="h-1 w-1 rotate-45 bg-gold" aria-hidden />
                        {ed.grade}
                      </span>
                    )}
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
