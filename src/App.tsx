import React from 'react'
import SkipToContent from '@/components/SkipToContent'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ProjectsSection from '@/sections/ProjectsSection'
import ContactSection from '@/sections/ContactSection'
import { ProjectsProvider } from '@/context/ProjectsContext'
import { ensureMeta, setDynamicFavicon } from '@/utils/dom'
import ResumeSection from '@/sections/ResumeSection' // alias használat egységesen

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
    setDynamicFavicon(theme) // ⟵ FIX: string union megy be, nem boolean
  }, [theme])

  const [activeSection, setActiveSection] = React.useState('home')
  // FIX: elírás javítva: 'oneltrajt' -> 'oneletrajz'
  const sectionIds = React.useMemo(() => ['home', 'rolam', 'munkaim', 'oneletrajz', 'kapcsolat'], [])

  // 1) IntersectionObserver mindenre, KIVÉVE 'kapcsolat'
  React.useEffect(() => {
    const navbarHeight = 88
    const options: IntersectionObserverInit = {
      rootMargin: `${-navbarHeight}px 0px ${-(window.innerHeight - navbarHeight - 1)}px 0px`,
    }
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const id = (entry.target as HTMLElement).id
        if (id === 'kapcsolat') continue // a kapcsolatot külön kezeljük az alja alapján
        setActiveSection(prev => (prev === id ? prev : id))
      }
    }
    const observer = new IntersectionObserver(observerCallback, options)
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [sectionIds])

  // 2) Kizárólag a 'kapcsolat' aktiválása AZ ALJA alapján (+ oldal legalja fallback)
  React.useEffect(() => {
    const updateContactActive = () => {
      const el = document.getElementById('kapcsolat')
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight

      // Aktív, ha az alja már bent van a viewportban
      const bottomInView = r.bottom <= vh && r.top < vh

      // Oldal legalja eset
      const atBottom =
        Math.ceil(window.scrollY + window.innerHeight) >=
        Math.ceil(document.documentElement.scrollHeight)

      if (bottomInView || atBottom) {
        setActiveSection(prev => (prev === 'kapcsolat' ? prev : 'kapcsolat'))
      }
    }

    updateContactActive()
    window.addEventListener('scroll', updateContactActive, { passive: true })
    window.addEventListener('resize', updateContactActive)
    return () => {
      window.removeEventListener('scroll', updateContactActive)
      window.removeEventListener('resize', updateContactActive)
    }
  }, [])

  const toggleTheme = React.useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])

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
