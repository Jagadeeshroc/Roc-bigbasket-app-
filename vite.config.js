import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    },
  },
  server: {
    hmr: {
      clientPort: 5173, // Explicitly set the client port
      protocol: 'ws',   // Force WebSocket protocol
      host: 'localhost',
      strictPort: true
    }
  }
})
