import React from 'react'
import { GraduationCap, Briefcase, FileText } from 'lucide-react'

type Entry = {
  title: string
  org: string
  period: string
  location?: string
  details?: string
  tags?: string[]
}

const education: Entry[] = [
  {
    title: 'Üzemmérnök-informatikus (BProf)',
    org: 'Kodolányi János Egyetem – Budapest',
    period: '2025.07 – jelenleg',
    location: 'Magyarország',
    details: 'BProf üzemmérnök-informatikus képzés.',
    tags: ['BProf', 'Informatika'],
  },
  {
    title: 'Szoftverfejlesztő és -tesztelő technikus – Érettségi',
    org: 'Noszlopy Gáspár Közgazdasági Technikum – Kaposvár',
    period: '2020.09 – 2025.06',
    location: 'Magyarország',
    details: 'Érettségi szoftverfejlesztő és -tesztelő szakirányon.',
    tags: ['Szoftverfejlesztés', 'Tesztelés'],
  },
]

const experience: Entry[] = [
  {
    title: 'IT & Sales Manager',
    org: 'Simple Happy Zrt.',
    period: '2025.05 – jelenleg',
    location: 'Kaposvár',
    details:
      'Kapcsolattartás nagykereskedőkkel és webshop-partnerekkel; webshop felépítése, üzemeltetése és fejlesztése (API-integrációk, e-mail marketing, automatizálás); 10 000+ termékadat automatizált kezelése; rendszerek műszaki és logikai összehangolása.',
    tags: ['Shopify', 'API-integráció', 'Automatizálás', 'E-mail marketing'],
  },
  {
    title: "McDonald's (Diákmunka)",
    org: 'Színarany Kft. – Kaposvár',
    period: '2024.10 – 2025.01',
    location: 'Kaposvár',
    details:
      'Vendégek kiszolgálása és konyhai feladatok gyors tempójú környezetben; folyamatos multitasking és priorizálás; terhelhetőség és stressztűrés; csapaton belüli szoros együttműködés.',
    tags: ['Gyorsétterem', 'Csapatmunka', 'Multitasking'],
  },
  {
    title: 'Szoftverfejlesztő és -tesztelő technikus – Duális képzés',
    org: 'Kaposvári Informatika Ágazati Képzőközpont Nonprofit Kft. – Kaposvár',
    period: '2024.03 – 2025.04',
    location: 'Kaposvár',
    details:
      'Szakma Kiváló Tanulója oklevél (2024/2025). Web- és alkalmazásfejlesztés (HTML/CSS/Bootstrap, JavaScript, Vue.js, Node.js, Express.js, .NET, PHP, REST API), verziókezelés (Git); mobilfejlesztés (Flutter); adatbázis (MySQL); unit/integrációs/ funkcionális tesztelés (pl. Postman).',
    tags: ['Frontend', 'Backend', 'REST API', 'Git', 'Flutter', 'MySQL'],
  },
  {
    title: 'Szoftverfejlesztő és -tesztelő technikus – Duális képzés',
    org: 'BÁZIS INFORMATIKA Kft. – Kaposvár',
    period: '2023.03 – 2023.07',
    location: 'Kaposvár',
    details:
      'Szoftverfejlesztési ismeretek megszerzése gyakorlati környezetben; valós projektek több technológiával (C#, PHP, MySQL, Node.js, JavaScript, HTML/CSS, .NET, REST API, Bootstrap).',
    tags: ['C#', 'PHP', 'MySQL', 'Node.js', 'JavaScript'],
  },
]

function TimelineItem({ entry }: { entry: Entry }) {
  return (
    <li className="relative pl-8">
      <span className="absolute left-0 top-0 ml-[-1px] h-full w-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden />
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
    <section id="oneletrajz" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <GraduationCap className="text-indigo-500" size={32} />
            Önéletrajz – Tanulmány & Munka
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Az alábbi idővonalon a tanulmányaim és szakmai tapasztalataim láthatók.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <a
            href="KissGaborOneletrajz.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Önéletrajz megnyitása PDF-ben"
            title="Önéletrajz (PDF) megnyitása"
            className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <FileText size={22} />
            <span>Önéletrajz (PDF) megnyitása</span>
          </a>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Tanulmányok</h3>
            </div>
            <ol className="space-y-6 relative">
              {education.map((e, i) => (
                <TimelineItem key={`${e.title}-${i}`} entry={e} />
              ))}
            </ol>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Munka</h3>
            </div>
            <ol className="space-y-6 relative">
              {experience.map((e, i) => (
                <TimelineItem key={`${e.title}-${i}`} entry={e} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
