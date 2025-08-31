import React from 'react'
import type { Project } from '@/types'
import { PlusCircle } from 'lucide-react'

export default function AddProjectForm({ onAdd }: { onAdd: (p: Omit<Project, 'id' | 'createdAt'>) => Promise<void> }) {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [tags, setTags] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')
  const [liveUrl, setLiveUrl] = React.useState('')
  const [repoUrl, setRepoUrl] = React.useState('')
  const [videoUrl, setVideoUrl] = React.useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    const tgs = tags.split(',').map(t => t.trim()).filter(Boolean)
    await onAdd({
      title: title.trim(),
      description: description.trim() || null,
      tags: tgs,
      imageUrl: imageUrl.trim() || null,
      liveUrl: liveUrl.trim() || null,
      repoUrl: repoUrl.trim() || null,
      videoUrl: videoUrl.trim() || null,
    })
    setTitle(''); setDescription(''); setTags(''); setImageUrl(''); setLiveUrl(''); setRepoUrl(''); setVideoUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <PlusCircle className="text-indigo-500" /> Új projekt hozzáadása
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cím *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Címkék (vesszővel elválasztva)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="pl. React, Node.js" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Leírás</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Bekezdéshez hagyj üres sort. Felsoroláshoz kezdj '-' vagy '*' jellel." className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <p className="mt-1 text-xs text-gray-500">Tipp: Markdown támogatás – bekezdés: üres sor; felsorolás: sor elején <code>-</code> vagy <code>*</code>.</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kép URL</label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Demo URL</label>
          <input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GitHub URL</label>
          <input value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/..." className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Videó URL (YouTube / mp4)</label>
          <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtu.be/... vagy https://.../video.mp4" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg">Hozzáadás</button>
        <span className="text-sm text-gray-500">A mezők opcionálisak (a cím kivételével).</span>
      </div>
    </form>
  )
}
