import React from 'react'
import { Mail } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="kapcsolat" className="scroll-mt-24 py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <Mail className="mr-3 text-indigo-500" size={32} /> Kapcsolat
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Örömmel veszem a megkeresésedet – írj bátran!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <a
            href="mailto:gabor.kiss@example.com"
            aria-label="E-mail küldése: gabor.kiss@example.com"
            className="group inline-flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-5 shadow-sm transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <div className="text-left">
              <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Email</div>
              <div className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white select-all">
                gabor.kiss@example.com
              </div>
            </div>

            <span className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
              <Mail className="h-5 w-5" />
              Írj nekem
            </span>
          </a>

          <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
            Tipp: kattints a dobozra a leveleződ megnyitásához.
          </p>
        </div>
      </div>
    </section>
  )
}
