import React from 'react'
import { Github } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="home" className="scroll-mt-24 text-center bg-gray-100 dark:bg-slate-900 px-4 pt-20 md:pt-24 pb-20 md:pb-28">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <img src="https://placehold.co/128x128/4338ca/ffffff?text=KG" alt="Kiss Gábor profilképe"
             className="rounded-full w-32 h-32 mb-6 shadow-xl border-4 border-indigo-500/50" loading="lazy" decoding="async" />
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
          Szia, a nevem <span className="text-indigo-500 dark:text-indigo-400">Kiss Gábor</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Szoftverfejlesztő és -tesztelő technikus vagyok, aki a megbízhatóságot és kitartást a sportból hozza a kódolás világába.
        </p>
        <div className="flex justify-center mb-8">
          <a href="https://github.com/kissg22" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md border border-gray-200 dark:border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            <Github size={24} /><span>GitHub</span>
          </a>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#projektek" className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Munkáim</a>
          <a href="#kapcsolat" className="w-full sm:w-auto bg-transparent hover:bg-indigo-500 text-indigo-700 dark:text-indigo-400 font-semibold hover:text-white py-3 px-8 border-2 border-indigo-500 hover:border-transparent rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Kapcsolatfelvétel</a>
        </div>
      </div>
    </section>
  )
}
