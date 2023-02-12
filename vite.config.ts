import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    minify: true
  },
  resolve: {
    alias: {
      '~': resolve('src')
    }
  }
});
