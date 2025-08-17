import React from 'react'
import { Sun, Moon, Menu } from 'lucide-react'

export default function Navbar({
  theme, toggleTheme, activeSection
}: { theme: 'light' | 'dark', toggleTheme: () => void, activeSection: string }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const navItems = [
    { id: 'home', label: 'Kezdőlap' },
    { id: 'rolam', label: 'Rólam' },
    { id: 'munkaim', label: 'Munkáim' },
    { id: 'oneletrajz', label: 'Önéletrajz' }, 
    { id: 'kapcsolat', label: 'Kapcsolat' },
    { id: 'admin', label: 'Admin' },
  ]

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', onKey)

    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm dark:shadow-slate-800/50 h-[88px]">
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        <a href="/#" className="text-2xl font-bold text-gray-900 dark:text-white inline-flex items-center gap-2" aria-label="Ugrás a kezdőlapra">
          <span className="text-indigo-500">{'<'}</span>Kiss Gábor<span className="text-indigo-500">{'/>'}</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8" aria-label="Fő navigáció">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded ${
                activeSection === item.id && item.id !== 'admin'
                  ? 'text-indigo-500 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400'
              }`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Téma váltása" title="Téma váltása"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Menü megnyitása" aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav id="mobile-nav" className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
          <ul className="px-6 py-4 space-y-2">
            {navItems.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                    activeSection === item.id && item.id !== 'admin'
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
