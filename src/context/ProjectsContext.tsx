import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Project } from '@/types'
import { getFirebase } from '@/lib/firebase'
import { collection, onSnapshot, addDoc, deleteDoc, doc, writeBatch, getDocs, query, orderBy } from 'firebase/firestore'

type ProjectsContextType = {
  projects: Project[]
  addProject: (p: Omit<Project, 'id' | 'createdAt'>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  resetToDefaults: () => Promise<void>
}

const ProjectsContext = createContext<ProjectsContextType | null>(null)

export const useProjects = () => {
  const ctx = useContext(ProjectsContext)
  if (!ctx) throw new Error('useProjects must be used within ProjectsProvider')
  return ctx
}

const defaultProjectsData: Omit<Project, 'id'>[] = [
  {
    title: 'PureLine Webshop',
    description: 'Duális képzés során készített, működő webáruház. Frontend + backend + adatbázis.',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
    imageUrl: 'https://placehold.co/600x400/1e293b/ffffff?text=PureLine+Webshop',
    liveUrl: 'https://pureline.infinityfreeapp.com',
    repoUrl: '#',
  },
  {
    title: 'IT & Sales Management Rendszer',
    description: 'Webshop üzemeltetés és partnerkezelés automatizálása API integrációkkal.',
    tags: ['API', 'Automatizálás', 'Webshop'],
    imageUrl: 'https://placehold.co/600x400/374151/ffffff?text=IT+System',
  },
  {
    title: 'Cross-Platform Mobilalkalmazás',
    description: 'Flutter koncepcióapp Android/iOS-re.',
    tags: ['Flutter', 'Mobilalkalmazás', 'API'],
    imageUrl: 'https://placehold.co/600x400/111827/ffffff?text=Flutter+App',
  },
]

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])

  // Firestore realtime projects – NINCS többé auth/anon belépés
  useEffect(() => {
    let unsubscribe = () => {}
    ;(async () => {
      try {
        const { db } = await getFirebase()
        const projectsCollectionRef = collection(db, 'projects')
        const qy = query(projectsCollectionRef, orderBy('createdAt', 'desc'))
        unsubscribe = onSnapshot(
          qy,
          (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Project[]
            setProjects(data)
          },
          (error) => {
            console.error('Error fetching projects:', error)
          }
        )
      } catch (e) {
        console.error('Firestore init error:', e)
      }
    })()
    return () => unsubscribe()
  }, [])

  const addProject = async (p: Omit<Project, 'id' | 'createdAt'>) => {
    try {
      const { db } = await getFirebase()
      await addDoc(collection(db, 'projects'), { ...p, createdAt: new Date() })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const { db } = await getFirebase()
      await deleteDoc(doc(db, 'projects', id))
    } catch (e) {
      console.error('Error deleting document: ', e)
    }
  }

  const resetToDefaults = async () => {
    try {
      const { db } = await getFirebase()
      const batch = writeBatch(db)
      const projectsCollectionRef = collection(db, 'projects')
      const snapshot = await getDocs(projectsCollectionRef)
      snapshot.docs.forEach(d => batch.delete(d.ref))
      defaultProjectsData.forEach(proj => {
        const newDocRef = doc(collection(db, 'projects'))
        batch.set(newDocRef, { ...proj, createdAt: new Date() })
      })
      await batch.commit()
    } catch (e) {
      console.error('Error resetting projects: ', e)
    }
  }

  const value = useMemo(
    () => ({ projects, addProject, deleteProject, resetToDefaults }),
    [projects]
  )

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}
