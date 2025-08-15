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
import { useScrollSpy } from '@/hooks/useScrollSpy' // ← ÚJ

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

  // ↓↓↓ Ezeknek az ID-knak meg kell egyezniük a szekciók gyökér elemének id-jával
  const sectionIds = React.useMemo(() => ['home', 'rolam', 'projektek', 'kapcsolat'], [])
  const { activeId, handleNavClick } = useScrollSpy(sectionIds, { offset: 88, activationRatio: 0.35 })

  const toggleTheme = React.useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])

  return (
    <div className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-500">
      <SkipToContent />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeId}
        onNavClick={handleNavClick} // ← kattintáskor azonnali aktiválás + offsetelt scroll
      />
      <main id="content" className="outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
        <HeroSection />      {/* id="home" */}
        <AboutSection />     {/* id="rolam" */}
        <ProjectsSection />  {/* id="projektek" */}
        <ContactSection />   {/* id="kapcsolat" */}
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
