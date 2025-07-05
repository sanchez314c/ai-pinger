import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 51847,
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@shared': '/src/shared',
      '@renderer': '/src/renderer',
    },
  },
});
