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

  // Navbar magassága (dinamikusan mérve) + CSS változó a sima anchor scrollhoz
  const [navH, setNavH] = React.useState<number>(88)
  React.useEffect(() => {
    const header = document.getElementById('site-header')
    const getH = () => Math.max(0, header?.offsetHeight ?? 88)
    const apply = () => {
      const h = getH()
      setNavH(h)
      document.documentElement.style.setProperty('--nav-h', `${h}px`)
    }
    apply()
    const ro = new ResizeObserver(apply)
    if (header) ro.observe(header)
    window.addEventListener('resize', apply)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', apply)
    }
  }, [])

  const [activeSection, setActiveSection] = React.useState('home')
  const sectionIds = React.useMemo(
    () => ['home', 'rolam', 'projektek', 'oneletrajz', 'kapcsolat'],
    []
  )

  // Hash váltáskor azonnal állítsuk be az aktív szekciót
  React.useEffect(() => {
    const applyFromHash = () => {
      const id = window.location.hash.replace(/^#/, '')
      if (id && sectionIds.includes(id)) setActiveSection(id)
    }
    applyFromHash()
    window.addEventListener('hashchange', applyFromHash)
    return () => window.removeEventListener('hashchange', applyFromHash)
  }, [sectionIds])

  // Stabil aktív-detektálás:
  // - NAV_LINE = navbar alja + 8px, ehhez viszonyítjuk a szekciókat (KIVÉVE 'kapcsolat')
  // - 'kapcsolat' csak akkor aktív, ha az ALJA bent van a viewportban, vagy az oldal legalján vagyunk
  React.useEffect(() => {
    let ticking = false

    const updateActive = () => {
      const NAV_LINE = (typeof navH === 'number' ? navH : 88) + 8
      let next = activeSection

      const els = sectionIds
        .map(id => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)

      // 1) Kapcsolat (alja alapján)
      const contact = document.getElementById('kapcsolat')
      if (contact) {
        const r = contact.getBoundingClientRect()
        const vh = window.innerHeight
        const bottomInView = r.bottom <= vh && r.top < vh
        const atBottom =
          Math.ceil(window.scrollY + window.innerHeight) >=
          Math.ceil(document.documentElement.scrollHeight)
        if (bottomInView || atBottom) {
          next = 'kapcsolat'
          if (next !== activeSection) setActiveSection(next)
          return
        }
      }

      // 2) Többi szekció – amelyik átfedi a NAV_LINE-t
      let found = false
      for (const el of els) {
        if (el.id === 'kapcsolat') continue
        const r = el.getBoundingClientRect()
        if (r.top <= NAV_LINE && r.bottom > NAV_LINE) {
          next = el.id
          found = true
          break
        }
      }

      // 3) Ha nincs pontos találat: NAV_LINE-hoz legközelebbi szekció teteje (kapcsolat nélkül)
      if (!found) {
        let closest = Number.POSITIVE_INFINITY
        let closestId = next
        for (const el of els) {
          if (el.id === 'kapcsolat') continue
          const d = Math.abs(el.getBoundingClientRect().top - NAV_LINE)
          if (d < closest) { closest = d; closestId = el.id }
        }
        next = closestId
      }

      if (next !== activeSection) setActiveSection(next)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          updateActive()
          ticking = false
        })
      }
    }

    updateActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [navH, sectionIds, activeSection])

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
