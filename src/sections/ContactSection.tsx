import React from 'react'
import { Mail } from 'lucide-react'
export default function ContactSection() {
  return (
    <section id="kapcsolat" className="scroll-mt-24 py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <Mail className="mr-3 text-indigo-500" size={32} /> Kapcsolat
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">Vedd fel velem a kapcsolatot az alábbi elérhetőségeken!</p>
        </div>
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">A legjobb módja, ha írsz egy e-mailt:</p>
          <a href="mailto:gabor.kiss@example.com" className="text-2xl font-bold text-indigo-500 dark:text-indigo-400 hover:underline">gabor.kiss@example.com</a>
        </div>
      </div>
    </section>
  )
}
