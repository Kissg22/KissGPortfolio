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
    setDynamicFavicon(theme) // fontos: string union, nem boolean
  }, [theme])

  const toggleTheme = React.useCallback(
    () => setTheme(t => (t === 'dark' ? 'light' : 'dark')),
    []
  )

  // Nav magasság mérése + CSS változó beállítása
  const [navH, setNavH] = React.useState(88)
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

  // Stabil aktív-szekció észlelés "vonal" alapján (navbar alja),
  // + oldal legalja fallback (Kapcsolat aktív lesz)
  React.useEffect(() => {
    let ticking = false

    const updateActive = () => {
      const NAV = navH
      const y = NAV + 1 // a vonal, ami alatt "nézünk"
      let active = sectionIds[0]

      const els = sectionIds
        .map(id => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)

      // 1) amelyik szekció átfedi a NAV vonalat
      let found = false
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.top <= y && r.bottom > y) {
          active = el.id
          found = true
          break
        }
      }

      // 2) ha nem találtunk, de az oldal alján vagyunk → utolsó szekció (Kapcsolat)
      if (!found) {
        const atBottom =
          Math.ceil(window.scrollY + window.innerHeight) >=
          Math.ceil(document.documentElement.scrollHeight)
        if (atBottom && els.length) {
          active = els[els.length - 1].id
          found = true
        }
      }

      // 3) ha még mindig nincs találat, a NAV vonalhoz legközelebbi szekció teteje
      if (!found) {
        let closest = Number.POSITIVE_INFINITY
        let closestId = active
        for (const el of els) {
          const d = Math.abs(el.getBoundingClientRect().top - y)
          if (d < closest) {
            closest = d
            closestId = el.id
          }
        }
        active = closestId
      }

      setActiveSection(prev => (prev === active ? prev : active))
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

    // kezdeti frissítés + események
    updateActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('hashchange', updateActive)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('hashchange', updateActive)
    }
  }, [navH, sectionIds])

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
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <ProjectsProvider>
      {route === '#admin' ? (
        <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
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
