
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ajout de la base URL pour le déploiement mobile
  base: './',
  // Configuration du serveur avec port spécifié
  server: {
    host: "::",
    port: 8080
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui'],
          maps: ['@react-google-maps/api'],
          stripe: ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          fabric: ['fabric'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}))
