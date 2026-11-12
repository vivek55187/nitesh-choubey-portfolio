import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react'
import { contact, profile } from '../data/content'
import { Magnetic, Reveal, SectionLabel, SplitWords } from './motion'
import { LinkedInIcon, external } from './icons'

export default function Contact() {
  const [copied, setCopied] = useState<'ok' | 'fail' | null>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied('ok')
    } catch {
      // Fallback for browsers / frames that block the async clipboard API
      try {
        const t = document.createElement('textarea')
        t.value = contact.email
        t.setAttribute('readonly', '')
        t.style.position = 'fixed'
        t.style.opacity = '0'
        document.body.appendChild(t)
        t.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(t)
        setCopied(ok ? 'ok' : 'fail')
      } catch {
        setCopied('fail')
      }
    }
    window.setTimeout(() => setCopied(null), 2400)
  }

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-charcoal" aria-labelledby="contact-title">
      <div aria-hidden className="pointer-events-none absolute right-[-15%] bottom-[-30%] h-[700px] w-[700px] rounded-full bg-gold/[0.06] blur-[140px]" />
      <div className="container-lux relative">
        <SectionLabel index="06">Contact &amp; Connect</SectionLabel>

        <h2 id="contact-title" className="font-serif text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.95] font-medium tracking-[-0.02em] text-ivory">
          <SplitWords text="Let’s Build Something" stagger={0.07} />
          <br />
          <SplitWords text="Meaningful." delay={0.25} wordClassName="italic text-gold" />
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <Reveal as="p" className="text-[17px] leading-relaxed text-ivory/70 lg:col-span-5">
            Always open to meaningful conversations, professional collaborations, business opportunities, and innovative
            ideas.
          </Reveal>

          <div className="space-y-4 lg:col-span-7">
            {contact.email && (
              <Reveal>
                <div className="group flex flex-col gap-5 rounded-2xl border border-ivory/10 bg-navy/50 p-6 transition-colors duration-500 hover:border-gold/40 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="flex min-w-0 items-center gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="eyebrow text-[0.62rem] text-muted">Email</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-1 block truncate text-[1.15rem] font-medium tracking-wide text-ivory transition-colors hover:text-gold sm:text-[1.35rem]"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={copy}
                      className="relative inline-flex h-11 items-center gap-2 rounded-full border border-ivory/20 px-5 text-[11.5px] font-semibold tracking-[0.14em] text-ivory uppercase transition-colors hover:border-gold hover:text-gold"
                      aria-label="Copy email address"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied === 'ok' ? (
                          <motion.span key="ok" className="flex items-center gap-2 text-gold" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                            <Check className="h-4 w-4" /> Copied
                          </motion.span>
                        ) : copied === 'fail' ? (
                          <motion.span key="fail" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                            Select &amp; copy
                          </motion.span>
                        ) : (
                          <motion.span key="copy" className="flex items-center gap-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                            <Copy className="h-4 w-4" /> Copy
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                    <span className="sr-only" aria-live="polite">
                      {copied === 'ok' ? 'Email address copied to clipboard' : ''}
                    </span>
                  </div>
                </div>
              </Reveal>
            )}

            {contact.linkedinUrl && (
              <Reveal delay={0.08}>
                <a
                  href={contact.linkedinUrl}
                  {...external}
                  aria-label="Connect with Nitesh Kumar Choubey on LinkedIn (opens in a new tab)"
                  className="group flex items-center justify-between gap-5 rounded-2xl border border-ivory/10 bg-navy/50 p-6 transition-colors duration-500 hover:border-gold/40 sm:p-8"
                >
                  <span className="flex items-center gap-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <LinkedInIcon className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="eyebrow block text-[0.62rem] text-muted">Connect on LinkedIn</span>
                      <span className="mt-1 block font-serif text-[1.5rem] text-ivory transition-colors group-hover:text-gold sm:text-[1.75rem]">
                        Nitesh Choubey
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ivory/60 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" />
                </a>
              </Reveal>
            )}

            <Reveal delay={0.14} className="flex flex-wrap items-center gap-4 pt-4">
              {contact.email && (
                <Magnetic>
                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent('Hello Nitesh')}`}
                    className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[12px] font-bold tracking-[0.16em] text-navy uppercase transition-colors hover:bg-gold-soft"
                  >
                    Start a Conversation
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
              )}
              <p className="flex items-center gap-2 text-[13px] text-muted">
                <MapPin className="h-4 w-4 text-gold" aria-hidden /> {profile.location}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
