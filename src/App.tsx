import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Jeevan from './components/Jeevan'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Skills from './components/Skills'
import Philosophy from './components/Philosophy'
import Contact from './components/Contact'
import { profile } from './data/content'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[200] rounded-full bg-gold px-4 py-2 text-navy focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero ready={!loading} />
        <About />
        <Jeevan />
        <Experience />
        <Education />
        <Certifications />
        <Skills />
        <Philosophy />
        <Contact />
      </main>
      <footer className="border-t border-ivory/[0.07] bg-navy-2 px-6 py-10 sm:px-10 lg:px-16">
        <div className="container-lux flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 font-serif text-[13px] text-gold">
              {profile.initials}
            </span>
            <p className="text-[12.5px] text-muted">
              © {new Date().getFullYear()} {profile.name}
            </p>
          </div>
          <p className="font-serif text-[15px] text-ivory/60 italic">Turning data into strategy. Ideas into impact.</p>
          <a
            href="#top"
            className="group flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-muted uppercase transition-colors hover:text-gold"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </footer>
    </>
  )
}
