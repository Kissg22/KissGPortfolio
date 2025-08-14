import React from 'react'
export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-slate-800/50 py-8">
      <div className="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Kiss Gábor. Minden jog fenntartva.</p>
      </div>
    </footer>
  )
}
