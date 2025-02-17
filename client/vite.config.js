import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Render-friendly configuration
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external access
    port: process.env.PORT || 5173, // Use Render's assigned port
    strictPort: true, // Enforce port usage
  },
  preview: {
    port: process.env.PORT || 5173, // Preview port
  }
});