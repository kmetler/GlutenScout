import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works from any public URL (GitHub Pages, Netlify, Vercel).
export default defineConfig({
  base: './',
  plugins: [react()],
})
