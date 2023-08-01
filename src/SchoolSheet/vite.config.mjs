import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import requireTransform from 'vite-plugin-require-transform';
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'


export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    server: {
      open: true,
    },
    plugins: [
      viteCommonjs(),
      react(),
    ],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [esbuildCommonjs(['ordered-uuid', 'react', 'react-dom'])],
      },
    }
  };
});