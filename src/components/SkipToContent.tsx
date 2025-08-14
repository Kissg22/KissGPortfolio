import React from 'react'
const SkipToContent: React.FC = () => (
  <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[101] bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-lg shadow-lg">
    Ugrás a tartalomhoz
  </a>
)
export default SkipToContent
