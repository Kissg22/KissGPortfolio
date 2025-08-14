import React from 'react'
export default function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag} className="bg-indigo-100 dark:bg-slate-700 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
      ))}
    </div>
  )
}
