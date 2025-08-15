import type { Config } from 'tailwindcss'
import lineClamp from '@tailwindcss/line-clamp'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
} satisfies Config
