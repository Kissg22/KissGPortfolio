// src/sections/ContactSection.tsx
import { useState } from "react";

const EMAIL = "kissgabor5622@gmail.com"; // ← cseréld a saját e-mailedre

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback: no-op
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 min-h-[50vh] py-16 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Kapcsolat
        </h2>

        <p className="text-slate-600 max-w-2xl mb-8">
          Írj bátran, ha együtt dolgoznál, kérdésed van, vagy szeretnél több
          infót a projektekről.
        </p>

        <div className="max-w-xl">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm transition-shadow hover:shadow-xl">
            <p className="text-slate-500 mb-4">
              Elérsz közvetlenül e-mailben:
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-md hover:shadow-lg transition-shadow no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
              >
                {/* Ikon helyett egyszerű emoji, hogy ne legyen extra függőség */}
                <span aria-hidden>✉️</span>
                <span className="font-medium tracking-wide">{EMAIL}</span>
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-md hover:shadow-lg transition-shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
              >
                <span aria-hidden>📋</span>
                <span>{copied ? "Másolva!" : "Másolás"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
