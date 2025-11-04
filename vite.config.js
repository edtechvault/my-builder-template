
// REPLACE (Reason: rely on postcss.config.cjs; avoid mis-wired inline PostCSS)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
