import React from 'react'
import type { Project } from '@/types'
import ProjectTags from './ProjectTags'
import { placeholderFor } from '@/utils/media'
import { ExternalLink, Github } from 'lucide-react'

const ProjectListItem: React.FC<{ project: Project; onSelect: () => void }> = React.memo(({ project, onSelect }) => (
  <article className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl dark:hover:bg-slate-700/50 p-4 transition-all duration-300">
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <button
        onClick={onSelect}
        className="flex items-center gap-6 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-label={`${project.title} részletek megnyitása`}
      >
        <img
          src={project.imageUrl || placeholderFor(project.title)}
          alt={project.title}
          className="w-full sm:w-48 h-32 sm:h-28 rounded-lg object-cover flex-shrink-0"
          loading="lazy"
          decoding="async"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x400/ef4444/ffffff?text=Hiba' }}
        />
        <div className="flex-grow text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{project.title}</h3>
          {project.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">{project.description}</p>
          )}
          {(project.tags?.length ?? 0) > 0 && <ProjectTags tags={project.tags} />}
        </div>
      </button>
    </div>
    {(project.liveUrl || project.repoUrl) && (
      <div className="mt-4 flex flex-wrap items-center gap-3">
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
    )}
  </article>
))

export default ProjectListItem

