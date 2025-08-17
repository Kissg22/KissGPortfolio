import React from 'react'
import { GraduationCap, Briefcase } from 'lucide-react'

type Entry = {
  title: string
  org: string
  period: string
  location?: string
  details?: string
  tags?: string[]
}

// TODO: töltsd ki a saját adataiddal
const education: Entry[] = [
  {
    title: 'Szoftverfejlesztő és -tesztelő',
    org: 'Képző Intézmény / Iskola',
    period: '2023 – 2024',
    location: 'Magyarország',
    details: 'Backend + frontend alapok, adatbázisok, projektmunka.',
    tags: ['Backend', 'Frontend', 'SQL'],
  },
  {
    title: 'Műszaki / Informatikai tanulmányok',
    org: 'Iskola / Egyetem',
    period: '2021 – 2023',
    details: 'Programozási alapok, webes technológiák.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
]

const experience: Entry[] = [
  {
    title: 'Webáruház-menedzser (részmunkaidő)',
    org: 'Cég / Projekt',
    period: '2024 – jelenleg',
    location: 'Remote',
    details:
      'Termékkezelés, akciók, integrációk. Automatikus feed-feldolgozás és árkalkuláció ötletek.',
    tags: ['Shopify', 'Automatizálás', 'Integráció'],
  },
  {
    title: 'Saját projektek (freelance / hobbiprojektek)',
    org: 'Önálló',
    period: '2022 – jelenleg',
    details:
      'Portfólió, admin panelek, REST API-k, Firestore, anon auth. Demók és PoC-ek.',
    tags: ['React', 'TypeScript', 'Firebase'],
  },
]

function TimelineItem({ entry }: { entry: Entry }) {
  return (
    <li className="relative pl-8">
      {/* vertikális vonal */}
      <span className="absolute left-0 top-0 ml-[-1px] h-full w-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden />
      {/* pont */}
      <span className="absolute left-[-7px] top-1 inline-block h-3.5 w-3.5 rounded-full ring-4 ring-white dark:ring-slate-900 bg-indigo-500" aria-hidden />

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 shadow-sm">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">{entry.title}</h3>
          <span className="text-sm text-slate-500 dark:text-slate-400">{entry.org}</span>
          <span className="ml-auto text-sm text-indigo-600 dark:text-indigo-400">{entry.period}</span>
        </div>
        {entry.location && (
          <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{entry.location}</div>
        )}
        {entry.details && (
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{entry.details}</p>
        )}
        {(entry.tags?.length ?? 0) > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.tags!.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}

export default function ResumeSection() {
  return (
    <section id="oneletrajz" className="scroll-mt-48 py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <GraduationCap className="text-indigo-500" size={32} />
            Önéletrajz – Tanulmány & Munka
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Az alábbi idővonalon a tanulmányaim és szakmai tapasztalataim láthatók.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Tanulmányok */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Tanulmányok</h3>
            </div>
            <ol className="space-y-6 relative">
              {education.map((e, i) => (
                <TimelineItem key={i} entry={e} />
              ))}
            </ol>
          </div>

          {/* Munka */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Munka</h3>
            </div>
            <ol className="space-y-6 relative">
              {experience.map((e, i) => (
                <TimelineItem key={i} entry={e} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
