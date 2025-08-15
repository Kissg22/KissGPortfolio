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
    <section id="kapcsolat" className="scroll-mt-24 py-20 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <Mail className="mr-3 text-indigo-500" size={32} /> Kapcsolat
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Örömmel veszem a megkeresésedet – írj bátran!
          </p>
        </div>

        {/* Új, letisztult kártya */}
        <div className="relative mx-auto max-w-3xl rounded-3xl border border-slate-200/70 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/85 shadow-sm backdrop-blur">
          {/* dekoratív, finom háttér-blobok (nem zavaró, de ad mélységet) */}
          <div className="pointer-events-none absolute -top-12 -left-12 h-40 w-40 rounded-full bg-indigo-400/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-fuchsia-400/10 blur-3xl" />

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col gap-5">
              {/* Email „box button” – másolás */}
              <button
                type="button"
                onClick={copyEmail}
                className={[
                  "group w-full rounded-2xl border",
                  "border-slate-200 dark:border-slate-700",
                  "bg-slate-50 dark:bg-slate-950",
                  "px-5 py-4 text-left",
                  "shadow-sm hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                  "transition"
                ].join(" ")}
                aria-live="polite"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">E-mail cím</div>
                    <div className="mt-1 truncate text-lg md:text-xl font-semibold text-slate-900 dark:text-white select-all">
                      {email}
                    </div>
                  </div>
                  <div className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-slate-900 dark:text-slate-100 shadow-sm group-hover:shadow-md transition">
                    {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Copy className="h-5 w-5" />}
                    <span className="text-sm font-medium">{copied ? 'Másolva!' : 'Másolás'}</span>
                  </div>
                </div>
              </button>

              {/* Írj nekem – külön, esztétikus primer gomb */}
              <a
                href={`mailto:${email}`}
                aria-label={`E-mail küldése: ${email}`}
                className={[
                  "inline-flex w-full items-center justify-center gap-2",
                  "rounded-2xl px-6 py-4 text-base font-medium",
                  "bg-gradient-to-r from-indigo-600 to-violet-600 text-white",
                  "shadow-sm hover:shadow-lg",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                  "transition"
                ].join(" ")}
              >
                <Mail className="h-5 w-5" />
                Írj nekem
              </a>
            </div>

            <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
              Tipp: fent kattintva az e-mail cím a vágólapra másolódik, alul pedig megnyílik a leveleződ.
            </p>

            {/* SR visszajelzés olvasóprogramoknak */}
            <span className="sr-only" aria-live="polite">
              {copied ? 'E-mail cím a vágólapra másolva.' : ''}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
