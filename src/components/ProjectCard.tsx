import React from 'react'
import type { Project } from '@/types'
import ProjectTags from './ProjectTags'
import { placeholderFor } from '@/utils/media'

const ProjectCard: React.FC<{ project: Project; onSelect: () => void }> = React.memo(({ project, onSelect }) => (
  <button
    onClick={onSelect}
    className="w-full text-left cursor-pointer bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-indigo-500/20 overflow-hidden transform hover:-translate-y-2 transition-all duration-500 group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    aria-label={`${project.title} részletek megnyitása`}
  >
    <div className="relative w-full h-56 overflow-hidden">
      <img
        src={project.imageUrl || placeholderFor(project.title)}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async"
        loading="lazy"
        decoding="async"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x400/ef4444/ffffff?text=Hiba'; }}
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate" title={project.title}>{project.title}</h3>
      {project.description && <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-grow line-clamp-3">{project.description}</p>}
      {(project.tags?.length ?? 0) > 0 && (
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
          <ProjectTags tags={project.tags} />
        </div>
      )}
    </div>
  </button>
))

export default ProjectCard
