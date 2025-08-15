import type { Timestamp } from 'firebase/firestore'
export type Project = {
  id: string
  title: string
  description?: string | null
  tags: string[]
  imageUrl?: string | null
  liveUrl?: string | null
  repoUrl?: string | null
  videoUrl?: string | null
  createdAt?: Timestamp | null
}
