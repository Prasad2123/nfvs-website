import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    host: true, // Listen on all local IPv4 addresses (0.0.0.0)
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: true, // Listen on all network addresses for previewing production builds
    port: 4173,
    strictPort: true,
  },
});
