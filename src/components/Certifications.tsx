import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, X, Award } from 'lucide-react'
import { certificates, type Certificate } from '../data/content'
import { Reveal, SectionLabel, SplitWords, Tilt } from './motion'

const shown = certificates.filter((c): c is Certificate & { image: string; thumb: string } => !!c.image && !!c.thumb)
const ease = [0.22, 1, 0.36, 1] as const

function Viewer({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (d: number) => void }) {
  const c = shown[index]
  const [zoom, setZoom] = useState(1)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => setZoom(1), [index])

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(2.5, z + 0.25))
      if (e.key === '-') setZoom((z) => Math.max(1, z - 0.25))
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('button')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('keydown', key)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [onClose, onNav])

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-dialog-title"
      className="fixed inset-0 z-[80] flex flex-col bg-navy-2/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
    >
      <div className="flex items-start justify-between gap-6 px-5 pt-5 sm:px-10 sm:pt-8">
        <div className="min-w-0">
          <p className="eyebrow text-gold">
            {String(index + 1).padStart(2, '0')} / {String(shown.length).padStart(2, '0')}
          </p>
          <h3 id="cert-dialog-title" className="mt-2 font-serif text-xl leading-tight text-ivory sm:text-3xl">
            {c.title}
          </h3>
          <p className="mt-1 text-[13px] text-muted">
            {c.issuer} · {c.date}
          </p>
        </div>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close certificate preview"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto px-4 py-6 sm:px-20" onClick={onClose}>
        <AnimatePresence mode="wait">
          <motion.img
            key={c.id}
            src={c.image}
            alt={`${c.title} certificate issued to Nitesh Kumar Choubey by ${c.issuer}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-md shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] ring-1 ring-ivory/10"
            style={{ transformOrigin: 'center center' }}
            initial={{ opacity: 0, scale: 0.86, y: 20 }}
            animate={{ opacity: 1, scale: zoom, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, ease }}
            drag={zoom > 1}
            dragMomentum={false}
          />
        </AnimatePresence>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onNav(-1)
          }}
          aria-label="Previous certificate"
          className="absolute left-3 hidden h-12 w-12 items-center justify-center rounded-full border border-ivory/20 bg-navy/70 text-ivory transition-colors hover:border-gold hover:text-gold sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNav(1)
          }}
          aria-label="Next certificate"
          className="absolute right-3 hidden h-12 w-12 items-center justify-center rounded-full border border-ivory/20 bg-navy/70 text-ivory transition-colors hover:border-gold hover:text-gold sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory/10 px-5 py-4 sm:px-10">
        <p className="text-[12px] tracking-wide text-muted">{c.credential ?? c.detail ?? ''}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNav(-1)}
            aria-label="Previous certificate"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory sm:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
            disabled={zoom <= 1}
            aria-label="Zoom out"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory transition-colors hover:border-gold hover:text-gold disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-14 text-center text-[12px] text-ivory/70 tabular-nums" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
            disabled={zoom >= 2.5}
            aria-label="Zoom in"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory transition-colors hover:border-gold hover:text-gold disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => onNav(1)}
            aria-label="Next certificate"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory sm:hidden"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function CertCard({ c, i, onOpen, wide }: { c: (typeof shown)[number]; i: number; onOpen: () => void; wide: boolean }) {
  return (
    <Tilt max={6} className="h-full rounded-2xl">
      <button
        onClick={onOpen}
        data-cursor="view"
        aria-label={`View certificate: ${c.title}`}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-ivory/[0.08] bg-charcoal text-left transition-colors duration-500 hover:border-gold/40"
      >
        <div className={`relative overflow-hidden bg-ivory-2 ${wide ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <img
            src={c.thumb}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-3 transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute right-4 bottom-4 flex translate-y-2 items-center gap-2 rounded-full bg-navy/85 px-3.5 py-2 text-[10.5px] font-semibold tracking-[0.16em] text-gold uppercase opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <Maximize2 className="h-3 w-3" /> View Certificate
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <span className="font-serif text-sm text-gold italic">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-[11px] tracking-[0.12em] text-muted uppercase">{c.date}</span>
          </div>
          <h3 className="mt-3 font-serif text-[1.45rem] leading-[1.15] text-ivory">{c.title}</h3>
          <p className="mt-2 text-[13px] text-ivory/65">{c.issuer}</p>
          {(c.detail || c.skills) && (
            <p className="mt-auto pt-5 text-[12px] leading-relaxed text-muted">
              {c.skills ? c.skills.join(' · ') : c.detail}
            </p>
          )}
        </div>
      </button>
    </Tilt>
  )
}

export default function Certifications() {
  const [open, setOpen] = useState<number | null>(null)
  const nav = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)), [])
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id="certifications" className="section-pad relative overflow-hidden bg-navy" aria-labelledby="cert-title">
      <div aria-hidden className="pointer-events-none absolute top-1/3 left-[-10%] h-[520px] w-[520px] rounded-full bg-gold/[0.05] blur-[120px]" />
      <div className="container-lux relative">
        <SectionLabel index="04">Certifications &amp; Achievements</SectionLabel>
        <div className="mb-16 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h2 id="cert-title" className="font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] font-medium text-ivory">
            <SplitWords text="Credentials," />
            <br />
            <SplitWords text="earned deliberately." delay={0.15} wordClassName="italic text-gold" />
          </h2>
          <Reveal className="flex items-start gap-4 md:justify-self-end">
            <Award className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">
              Original certificates, shown exactly as issued. Select any card to open the full certificate.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {shown.map((c, i) => {
            const wide = i < 2
            return (
              <Reveal as="li" key={c.id} delay={(i % 3) * 0.08} className={wide ? 'lg:col-span-3' : 'lg:col-span-2'}>
                <CertCard c={c} i={i} wide={wide} onOpen={() => setOpen(i)} />
              </Reveal>
            )
          })}
        </ul>
      </div>

      <AnimatePresence>{open !== null && <Viewer index={open} onClose={close} onNav={nav} />}</AnimatePresence>
    </section>
  )
}
