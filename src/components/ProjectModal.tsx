import React from 'react'
import type { Project } from '@/types'
import ProjectTags from './ProjectTags'
import VideoEmbed from './VideoEmbed'
import { X, ExternalLink, Github } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && containerRef.current) {
        const focusables = containerRef.current.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])')
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault() }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault() }
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4" role="dialog" aria-modal aria-labelledby="project-title">
      <div onClick={(e) => e.stopPropagation()} ref={containerRef} className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-64 object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x400/ef4444/ffffff?text=Hiba' }}
            />
          ) : (
            <div className="h-16" />
          )}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
            aria-label="Bezárás"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-8">
          <h2 id="project-title" className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h2>
          {(project.tags?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <ProjectTags tags={project.tags} />
            </div>
          )}
          {project.description && (
            <div className="md-content text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{project.description}</ReactMarkdown>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <ExternalLink size={16} /> Élő demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-indigo-500 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700 font-semibold py-2 px-4 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Github size={16} /> Forráskód
              </a>
            )}
          </div>
          {project.videoUrl && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Videó</h3>
              <VideoEmbed url={project.videoUrl} title={project.title} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
