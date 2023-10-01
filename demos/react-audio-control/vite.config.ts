import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['!**/node_modules/@guidestar/react-audio-control/**'],
    },
  },
  optimizeDeps: {
    exclude: ['@guidestar/react-audio-control'],
  }
})
