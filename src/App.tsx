import React from 'react'
import SkipToContent from '@/components/SkipToContent'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ProjectsSection from '@/sections/ProjectsSection'
import ContactSection from '@/sections/ContactSection'
import ResumeSection from '@/sections/ResumeSection'
import { ProjectsProvider } from '@/context/ProjectsContext'
import { ensureMeta, setDynamicFavicon } from '@/utils/dom'

function MainPage() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    try { localStorage.setItem('theme', theme) } catch {}
    const meta = ensureMeta('theme-color')
    meta.content = theme === 'dark' ? '#0f172a' : '#ffffff'
    setDynamicFavicon(theme) // string union, nem boolean
  }, [theme])

  const toggleTheme = React.useCallback(
    () => setTheme(t => (t === 'dark' ? 'light' : 'dark')),
    []
  )

  const [activeSection, setActiveSection] = React.useState('home')
  const sectionIds = React.useMemo(
    () => ['home', 'rolam', 'projektek', 'oneletrajz', 'kapcsolat'],
    []
  )

  // Hash-kattintáskor azonnal állítsuk be; a scroll úgyis „helyreigazít” utána
  React.useEffect(() => {
    const applyFromHash = () => {
      const id = window.location.hash.replace(/^#/, '')
      if (id && sectionIds.includes(id)) setActiveSection(id)
    }
    applyFromHash()
    window.addEventListener('hashchange', applyFromHash)
    return () => window.removeEventListener('hashchange', applyFromHash)
  }, [sectionIds])

  // Aktív szekció kiválasztása: a NAV vonal (CSS-ben megadott scroll-padding-top)
  // és a viewport alja között mérjük az ÁTFEDÉST; a legnagyobb átfedésű nyer.
  // KIVÉTEL: 'kapcsolat' → aktív, ha az ALJA bent van a viewportban, vagy a lap legalján vagyunk.
  // PLUSZ: ha közel vagyunk a lap tetejéhez, mindig 'home'.
  React.useEffect(() => {
    let ticking = false

    const getNavFromCSS = () => {
      // pl. "88px" → 88
      const v = getComputedStyle(document.documentElement).getPropertyValue('scroll-padding-top')
      const n = parseFloat(v)
      return Number.isFinite(n) ? n : 88
    }

    const pickActive = () => {
      const topLine = getNavFromCSS()
      const bottomLine = window.innerHeight

      // 0) LAP TETEJE KÖZEL: mindig 'home'
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const TOP_THRESHOLD = topLine * 0.6 // a nav-offset ~60%-a
      if (scrollTop <= TOP_THRESHOLD) {
        if (activeSection !== 'home') setActiveSection('home')
        return
      }

      // 1) Kapcsolat külön szabály (alja alapján vagy legalja eset)
      const contact = document.getElementById('kapcsolat')
      if (contact) {
        const r = contact.getBoundingClientRect()
        const bottomInView = r.bottom <= bottomLine && r.top < bottomLine
        const atBottom =
          Math.ceil(window.scrollY + window.innerHeight) >=
          Math.ceil(document.documentElement.scrollHeight)
        if (bottomInView || atBottom) {
          if (activeSection !== 'kapcsolat') setActiveSection('kapcsolat')
          return
        }
      }

      // 2) Legnagyobb átfedés a [topLine..bottomLine] sávval (Kapcsolat nélkül)
      let bestId = sectionIds[0]
      let bestOverlap = -Infinity

      for (const id of sectionIds) {
        if (id === 'kapcsolat') continue
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        const overlap = Math.min(r.bottom, bottomLine) - Math.max(r.top, topLine)
        if (overlap > bestOverlap) {
          bestOverlap = overlap
          bestId = id
        }
      }

      if (bestId && activeSection !== bestId) {
        setActiveSection(bestId)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          pickActive()
          ticking = false
        })
      }
    }

    // kezdeti futtatás + események
    pickActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // activeSection nincs deps-ben, mert felesleges rerender loopot okozna
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds])

  return (
    <div className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-500">
      <SkipToContent />
      <Navbar theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />
      <main id="content" className="outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const [route, setRoute] = React.useState<string>(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  )
  React.useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <ProjectsProvider>
      {route === '#admin' ? (
        <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
          <AdminLazy />
        </React.Suspense>
      ) : <MainPage />}
    </ProjectsProvider>
  )
}

// Lazy-load admin to keep main bundle small
const AdminLazy = React.lazy(async () => ({ default: (await import('@/admin/AdminPage')).default }))
