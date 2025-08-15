import React from 'react'
import { Sun, Moon, Menu } from 'lucide-react'

type Props = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  activeSection: string
  /** Opcionális: parent értesítése kattintáskor (eventtel + id-vel) */
  onNavClick?: (e: React.MouseEvent<HTMLElement>, id: string) => void
}

const HEADER_OFFSET = 88 // px – h-[88px] alapján

function scrollToId(id: string, offset = HEADER_OFFSET) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.offsetTop - offset
  window.scrollTo({ top, behavior: 'smooth' })
  history.replaceState(null, '', `#${id}`)
}

export default function Navbar({
  theme, toggleTheme, activeSection, onNavClick
}: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  // Azonnali vizuális visszajelzés kattintáskor:
  const [pendingActive, setPendingActive] = React.useState<string | null>(null)

  React.useEffect(() => {
    // Ha a parent frissítette az aktívat (scroll-spy), engedjük el a pendinget
    setPendingActive(null)
  }, [activeSection])

  const navItems = [
    { id: 'home', label: 'Kezdőlap' },
    { id: 'rolam', label: 'Rólam' },
    { id: 'projektek', label: 'Projektek' },
    { id: 'kapcsolat', label: 'Kapcsolat' },
    { id: 'admin', label: 'Admin' },
  ] as const

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (id: string) => (pendingActive ?? activeSection) === id

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // azonnali jelzés
    setPendingActive(id)

    if (onNavClick) {
      // delegálunk a parentnek (ő intézi a preventDefault-ot + offsetelt scrollt)
      onNavClick(e, id)
    } else {
      // fallback: mi intézzük
      e.preventDefault()
      scrollToId(id, HEADER_OFFSET)
    }

    if (mobileOpen) setMobileOpen(false)
  }

  const linkBase =
    'font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded'

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
              onClick={(e) => handleClick(e, item.id)}
              className={`${linkBase} ${
                isActive(item.id) && item.id !== 'admin'
                  ? 'text-indigo-500 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400'
              }`}
              aria-current={isActive(item.id) ? 'page' : undefined}
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
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive(item.id) && item.id !== 'admin'
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
