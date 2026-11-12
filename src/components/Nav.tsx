import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { contact, nav, profile } from '../data/content'
import { LinkedInIcon, external } from './icons'
import { useActiveSection } from '../hooks/useMedia'

export default function Nav() {
  const ids = useMemo(() => [...nav.map((n) => n.id), 'philosophy', 'top'], [])
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <>
      <motion.div aria-hidden className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-gold" style={{ scaleX: progress }} />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav
          aria-label="Primary"
          className={`container-lux mx-auto flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6 ${
            scrolled
              ? 'border-ivory/10 bg-navy/90 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a href="#top" className="group flex items-center gap-3" aria-label={`${profile.name} — back to top`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 font-serif text-[15px] tracking-wide text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
              {profile.initials}
            </span>
            <span className="hidden text-[13px] font-medium tracking-wide whitespace-nowrap text-ivory/90 sm:block lg:hidden xl:block">
              Nitesh <span className="text-muted">Choubey</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`relative block rounded-full px-3 py-2 text-[13px] tracking-wide whitespace-nowrap transition-colors xl:px-4 ${
                    active === n.id ? 'text-navy' : 'text-ivory/70 hover:text-ivory'
                  }`}
                >
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          {contact.linkedinUrl ? (
            <a
              href={contact.linkedinUrl}
              {...external}
              aria-label="Connect with Nitesh on LinkedIn (opens in a new tab)"
              className="group relative hidden shrink-0 items-center gap-2.5 overflow-hidden rounded-full border border-gold/60 px-5 py-2 whitespace-nowrap text-[12px] font-semibold tracking-[0.14em] text-gold uppercase transition-colors duration-500 hover:text-navy lg:inline-flex"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-0 origin-left scale-x-0 rounded-full bg-gold transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
              />
              <LinkedInIcon className="relative h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-[8deg] group-hover:scale-110" />
              <span className="relative">Let’s Connect</span>
            </a>
          ) : (
            <a
              href="#contact"
              className="hidden rounded-full border border-gold/60 px-5 py-2 text-[12px] font-semibold tracking-[0.14em] text-gold uppercase transition-colors hover:bg-gold hover:text-navy lg:block"
            >
              Let’s Connect
            </a>
          )}

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={`absolute h-px w-4 bg-ivory transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
            <span className={`absolute h-px w-4 bg-ivory transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-navy-2 px-8 pt-28 pb-10 lg:hidden"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {nav.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6 }}
                >
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-serif text-4xl text-ivory"
                  >
                    <span className="font-sans text-xs text-gold">0{i + 1}</span>
                    <span className={active === n.id ? 'italic text-gold' : ''}>{n.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              {contact.linkedinUrl && (
                <a
                  href={contact.linkedinUrl}
                  {...external}
                  onClick={() => setOpen(false)}
                  aria-label="Connect with Nitesh on LinkedIn (opens in a new tab)"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 text-[12px] font-bold tracking-[0.16em] text-navy uppercase active:bg-gold-soft"
                >
                  <LinkedInIcon className="h-4 w-4" /> Connect on LinkedIn
                </a>
              )}
              <p className="eyebrow text-muted">{profile.location}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
