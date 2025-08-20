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
    setDynamicFavicon(theme)
  }, [theme])

  const toggleTheme = React.useCallback(
    () => setTheme(t => (t === 'dark' ? 'light' : 'dark')),
    []
  )

  const [activeSection, setActiveSection] = React.useState('home')
  const activeRef = React.useRef(activeSection)
  React.useEffect(() => { activeRef.current = activeSection }, [activeSection])

  // ⟵ ITT lett átírva 'projektek' → 'munkaim'
  const sectionIds = React.useMemo(
    () => ['home', 'rolam', 'munkaim', 'oneletrajz', 'kapcsolat'],
    []
  )

  // Aktív kiválasztása: a NAV offset (CSS: html{scroll-padding-top}) és a viewport alja közti sáv
  // átfedése alapján. Home: tetején mindig home. Kapcsolat: alja látszik vagy legalja → kapcsolat.
  React.useEffect(() => {
    let ticking = false

    const getNavFromCSS = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('scroll-padding-top')
      const n = parseFloat(v)
      return Number.isFinite(n) ? n : 88
    }

    const setIfChanged = (id: string) => {
      if (activeRef.current !== id) setActiveSection(id)
    }

    const pickActive = () => {
      const topLine = getNavFromCSS()
      const bottomLine = window.innerHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0

      // 0) Lap teteje közel: mindig home
      const TOP_THRESHOLD = Math.max(16, topLine * 0.6)
      if (scrollTop <= TOP_THRESHOLD) {
        setIfChanged('home')
        return
      }

      // 1) Kapcsolat (alja alapján) vagy lap legalja
      const contact = document.getElementById('kapcsolat')
      if (contact) {
        const r = contact.getBoundingClientRect()
        const bottomInView = r.bottom <= bottomLine && r.top < bottomLine
        const atBottom =
          Math.ceil(window.scrollY + window.innerHeight) >=
          Math.ceil(document.documentElement.scrollHeight)
        if (bottomInView || atBottom) {
          setIfChanged('kapcsolat')
          return
        }
      }

      // 2) Legnagyobb átfedés a [topLine..bottomLine] sávval (Kapcsolat nélkül)
      let bestId = sectionIds[0]
      let bestOverlap = -1

      for (const id of sectionIds) {
        if (id === 'kapcsolat') continue
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        const overlap = Math.max(0, Math.min(r.bottom, bottomLine) - Math.max(r.top, topLine))
        if (overlap > bestOverlap) {
          bestOverlap = overlap
          bestId = id
        }
      }

      // 3) Ha minden átfedés 0: NAV vonalhoz legközelebbi szekció teteje
      if (bestOverlap === 0) {
        let closest = Number.POSITIVE_INFINITY
        let closestId = bestId
        for (const id of sectionIds) {
          if (id === 'kapcsolat') continue
          const el = document.getElementById(id)
          if (!el) continue
          const d = Math.abs(el.getBoundingClientRect().top - topLine)
          if (d < closest) { closest = d; closestId = id }
        }
        bestId = closestId
      }

      setIfChanged(bestId)
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

    pickActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds])

  return (
    <div className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-500">
      <SkipToContent />
      <Navbar theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />
      <main id="content" className="outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
        <HeroSection />
        <AboutSection />
        {/* komponens neve maradhat, a szekció ID a fontos */}
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  // Globális 'dark' osztály beállítása, hogy az #admin route és a fallback is helyes színt kapjon
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initial = (stored === 'light' || stored === 'dark') ? stored : (prefersDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', initial === 'dark')
    } catch {}
  }, [])

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
        <React.Suspense
          fallback={
            <div
              className="h-screen w-full flex items-center justify-center
                         bg-gray-100 dark:bg-slate-900
                         text-black dark:text-white"
            >
              Loading...
            </div>
          }
        >
          <AdminLazy />
        </React.Suspense>
      ) : (
        <MainPage />
      )}
    </ProjectsProvider>
  )
}

// Lazy-load admin to keep main bundle small
const AdminLazy = React.lazy(async () => ({ default: (await import('@/admin/AdminPage')).default }))
