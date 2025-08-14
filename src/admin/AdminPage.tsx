import React from 'react'
import { useProjects } from '@/context/ProjectsContext'
import AddProjectForm from './AddProjectForm'
import { Shield, Lock, Trash2, Github, ExternalLink } from 'lucide-react'
import { getFirebase } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function AdminPage() {
  const { projects, addProject, deleteProject, resetToDefaults } = useProjects()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [pin, setPin] = React.useState('')
  const [error, setError] = React.useState('')

  const handleLogin = async () => {
    setError('')
    try {
      const { db } = await getFirebase()               // <-- db lekérése runtime-ból
      const docRef = doc(db, 'config', 'admin')
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const correctPin = (docSnap.data() as any).pin
        if (pin === String(correctPin)) setIsLoggedIn(true)
        else setError('Hibás PIN kód.')
      } else {
        setError("Nincs PIN beállítva az adatbázisban. Kérlek hozd létre a 'config/admin' dokumentumot a Firestore-ban.")
      }
    } catch (e: any) {
      console.error('Error checking PIN:', e)
      if (e?.code === 'permission-denied') {
        setError('Nincs jogosultság a PIN olvasásához. Frissítsd a Firebase biztonsági szabályokat!')
      } else {
        setError('Hiba a PIN ellenőrzésekor.')
      }
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-slate-900">
        <div className="bg-white dark:bg-slate-800 dark:text-slate-100 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-4 text-indigo-500">
            <Shield /> <Lock />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Admin Belépés</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Add meg a Firebase-ben beállított PIN kódot.</p>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            type="password"
            inputMode="numeric"
            placeholder="PIN"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex gap-4 justify-center">
            <button onClick={handleLogin} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg">Belépés</button>
            <a href="/#" className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 dark:text-slate-100">Vissza a főoldalra</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center sm:text-left text-gray-900 dark:text-white">Projektek Kezelése</h1>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a href="/#" className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 dark:text-slate-100">Főoldal</a>
            <button onClick={() => setIsLoggedIn(false)} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 dark:text-slate-100">Kilépés</button>
          </div>
        </div>

        <AddProjectForm onAdd={addProject} />

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Jelenlegi projektek ({projects.length})</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <li key={p.id} className="bg-white dark:bg-slate-800 dark:text-slate-100 rounded-xl shadow p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate text-gray-900 dark:text-white" title={p.title}>{p.title}</h3>
                    {(p.tags?.length ?? 0) > 0 && (
                      <p className="text-xs text-gray-600 dark:text-slate-400 mt-1 break-words">{p.tags.join(', ')}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteProject(p.id)}
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-1.5 rounded-md bg-red-50 dark:bg-red-900/20 flex-shrink-0"
                  >
                    <Trash2 size={16} /> Törlés
                  </button>
                </div>
                {p.description && <p className="text-sm text-gray-700 dark:text-slate-200 mt-3 line-clamp-3">{p.description}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer" className="text-xs inline-flex items-center gap-1 underline"><Github size={14} /> repo</a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-xs inline-flex items-center gap-1 underline"><ExternalLink size={14} /> demo</a>}
                  {p.videoUrl && <span className="text-xs">🎬 videó</span>}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <button onClick={resetToDefaults} className="text-sm px-3 py-2 rounded-md bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 dark:text-slate-100">
              Visszaállítás alapértelmezettre
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
