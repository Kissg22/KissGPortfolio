import React from 'react'
import { User } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="rolam" className=" py-20 lg:py-32 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <User className="mr-3 text-indigo-500" size={32} /> Rólam
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">Egy kis bemutatkozás a szakmai utamról és a filozófiámról.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">A történetem</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Kitartó és lelkiismeretes szoftverfejlesztő vagyok, aki széleskörű informatikai tapasztalattal rendelkezik.
              Célom, hogy a duális képzések és a valós projektek során megszerzett tudásomat kamatoztassam, és hatékony, megbízható szoftvereket hozzak létre.
              Szeretek csapatban dolgozni és új technológiákat megismerni.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              A mindennapi sportolásból merített kitartásom a munkám során is segít a komplex problémák megoldásában és a minőségi eredmények elérésében.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-slate-700/50 p-6 rounded-lg mb-12">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Amiben hiszek</h3>
            <ul className="space-y-5">
              {[
                { t: 'Automatizálás', d: 'Hiszek a hatékony, automatizált rendszerek építésében, amelyek csökkentik a manuális munkát.' },
                { t: 'Csapatmunka', d: 'A legjobb eredményeket szoros együttműködéssel, közös gondolkodással lehet elérni.' },
                { t: 'Folyamatos tanulás', d: 'A technológia világa állandóan változik, a fejlődés kulcsfontosságú.' },
              ].map(i => (
                <li key={i.t} className="flex items-start">
                  <span className="flex-shrink-0 bg-indigo-500 h-2 w-2 rounded-full mr-4 mt-2.5" />
                  <span className="text-gray-600 dark:text-gray-300"><strong>{i.t}:</strong> {i.d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Főbb technológiáim</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {['HTML/CSS','JavaScript','TypeScript','React','Vue.js','Node.js','PHP','.NET','Flutter','MySQL','PostgreSQL','MongoDB','Shopify','WordPress','Google Cloud','Azure','AWS','Docker','Google Sheets API','Stripe API','REST API','GraphQL','Git']
                .map(skill => (
                  <span key={skill} className="bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-4 py-2 rounded-md shadow-sm">{skill}</span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
