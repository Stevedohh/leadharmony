/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/leadharmony-ui',

  server: {
    port: 4200,
    host: 'localhost'
  },

  preview: {
    port: 3001,
    host: '162.55.42.115',
  },

  plugins: [ react(), nxViteTsPaths() ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {

    outDir: '../../dist/apps/leadharmony-ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
