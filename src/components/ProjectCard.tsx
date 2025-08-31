import React from 'react'
import type { Project } from '@/types'
import ProjectTags from './ProjectTags'
import { placeholderFor } from '@/utils/media'
import { ExternalLink, Github } from 'lucide-react'

const ProjectCard: React.FC<{ project: Project; onSelect: () => void }> = React.memo(({ project, onSelect }) => (
  <article className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-indigo-500/20 overflow-hidden transform hover:-translate-y-2 transition-all duration-500 group flex flex-col">
    <button
      onClick={onSelect}
      className="text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      aria-label={`${project.title} részletek megnyitása`}
    >
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={project.imageUrl || placeholderFor(project.title)}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x400/ef4444/ffffff?text=Hiba' }}
        />
      </div>
      <div className="p-6 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate" title={project.title}>{project.title}</h3>
        {project.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">{project.description}</p>
        )}
        {(project.tags?.length ?? 0) > 0 && (
          <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
            <ProjectTags tags={project.tags} />
          </div>
        )}
      </div>
    </button>

    {(project.liveUrl || project.repoUrl) && (
      <div className="px-6 pb-6 mt-auto">
        <div className="flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 border border-indigo-500 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700 font-semibold py-2 px-4 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Github size={16} /> Forráskód
            </a>
          )}
        </div>
      </div>
    )}
  </article>
))

export default ProjectCard

