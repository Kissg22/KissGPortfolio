import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  // Vercelen a site a domain gyökerén fut, maradjon a base '/'.
  base: '/',
  publicDir: 'public', // alapértelmezett, de így egyértelmű
  server: { port: 5173 }, // csak devre hat
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Ha a PDF-et a src-ből szeretnéd importálni (nem a public-ból),
  // és nem használsz ?url-t, akkor ezt kapcsold be:
  // assetsInclude: ['**/*.pdf'],
})
