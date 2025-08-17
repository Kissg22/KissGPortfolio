// tailwind.config.ts
import type { Config } from 'tailwindcss'
import lineClamp from '@tailwindcss/line-clamp'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',      // MINDEN TS/TSX fájl
  ],
  theme: { extend: {} },
  plugins: [lineClamp],
} satisfies Config
