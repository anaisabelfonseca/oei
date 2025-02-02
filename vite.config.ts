import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic'
  })],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3003" // Proxy API requests to backend
    }
  },
  resolve: {
    alias: {
        react: require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
      },
  }
});