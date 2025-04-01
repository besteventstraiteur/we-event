
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ajout de la base URL pour le déploiement mobile
  base: './',
  // Configuration du serveur avec port spécifié
  server: {
    port: 8080
  }
})
