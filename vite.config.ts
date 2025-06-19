import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    force: true, // Force re-optimization of dependencies
  },
  server: {
    proxy: {
      // Proxy the CoinMarketCap API requests
      // This is for development only and would normally be handled by a backend
      '/api/crypto-price': {
        target: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        changeOrigin: true,
        rewrite: (path) => ''
      }
    }
  },
  // Clear dependency cache
  cacheDir: '.vite'
});