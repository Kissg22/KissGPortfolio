import React from 'react'
import { Mail, Copy, Check } from 'lucide-react'

export default function ContactSection() {
  const email = 'gabor.kiss@example.com'
  const [copied, setCopied] = React.useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // opcionális: hibaüzenet
    }
  }

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
          {/* Kártya – színes gradient keret, lágy hover shadow */}
          <div className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 dark:hover:shadow-indigo-900/40">
            <div className="rounded-2xl bg-white dark:bg-slate-900 px-6 py-6 md:px-8 md:py-7 transition-transform duration-300 group-hover:-translate-y-0.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Email</div>
                  <div className="mt-1 text-lg md:text-xl font-semibold text-slate-900 dark:text-white select-all">
                    {email}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${email}`}
                    aria-label={`E-mail küldése: ${email}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-4 py-2.5 font-medium shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:translate-y-px transition"
                  >
                    <Mail className="h-5 w-5" />
                    Írj nekem
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:translate-y-px transition"
                    aria-live="polite"
                  >
                    {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Copy className="h-5 w-5" />}
                    {copied ? 'Másolva!' : 'Másolás'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
            Tipp: az „Írj nekem” gomb a levelezőt nyitja meg, a „Másolás” gomb a vágólapra teszi az e-mail címet.
          </p>

          {/* SR visszajelzés olvasóprogramoknak */}
          <span className="sr-only" aria-live="polite">
            {copied ? 'E-mail cím a vágólapra másolva.' : ''}
          </span>
        </div>
      </div>
    </section>
  )
}
