import React from 'react'
import { Briefcase, LayoutGrid, List, Search } from 'lucide-react'
import { useProjects } from '@/context/ProjectsContext'
import type { Project } from '@/types'
import ProjectCard from '@/components/ProjectCard'
import ProjectListItem from '@/components/ProjectListItem'
import ProjectModal from '@/components/ProjectModal'

export default function ProjectsSection() {
  const { projects } = useProjects()
  const allTags = React.useMemo(() => ['Mind', ...Array.from(new Set(projects.flatMap(p => p.tags || [])))], [projects])

  const [searchTerm, setSearchTerm] = React.useState('')
  const [activeFilter, setActiveFilter] = React.useState('Mind')
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)

  const filtered = React.useMemo(() => {
    const t = searchTerm.trim().toLowerCase()
    return projects
      .filter(p => activeFilter === 'Mind' || (p.tags || []).includes(activeFilter))
      .filter(p => p.title.toLowerCase().includes(t) || (p.description || '').toLowerCase().includes(t))
  }, [searchTerm, activeFilter, projects])

  return (
    <section id="projektek" className="scroll-mt-24 py-20 bg-gray-100 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <Briefcase className="mr-3 text-indigo-500" size={32} /> Munkáim
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Böngéssz a projektjeim között, használj szűrőket vagy keress kulcsszavak alapján.</p>
        </div>

        <div className="mb-8 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-grow w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Keress projektek között..."
                aria-label="Projekt kereső"
                className="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div className="flex-shrink-0 flex items-center justify-end gap-2 bg-gray-200 dark:bg-slate-700 p-1 rounded-lg" role="group" aria-label="Nézetváltó">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  viewMode === 'grid' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-slate-600'
                }`}
                aria-pressed={viewMode === 'grid'}
              >
                <LayoutGrid size={16} /> Rács
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  viewMode === 'list' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-slate-600'
                }`}
                aria-pressed={viewMode === 'list'}
              >
                <List size={16} /> Lista
              </button>
            </div>
          </div>

          <div className="flex items-center justify-start flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-slate-700/50">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  activeFilter === tag
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
                aria-pressed={activeFilter === tag}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 px-1">
          <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-bold text-gray-800 dark:text-gray-200">{filtered.length}</span> találat</p>
        </div>

        {viewMode === 'grid' ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(p => (
              <li key={p.id} className="flex">
                <ProjectCard project={p} onSelect={() => setSelectedProject(p)} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-4" role="list">
            {filtered.map(p => (
              <li key={p.id}>
                <ProjectListItem project={p} onSelect={() => setSelectedProject(p)} />
              </li>
            ))}
          </ul>
        )}

        {filtered.length === 0 && (
          <div className="text-center col-span-full py-16">
            <p className="text-xl text-gray-500 dark:text-gray-400">Nincs a szűrési feltételeknek megfelelő projekt.</p>
          </div>
        )}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  )
}
