import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 3001,
  },
  build: {
    outDir: '../ui',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        login: path.resolve(__dirname, 'login.html'),
      },
    },
  },
})
