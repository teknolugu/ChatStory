import vue from '@vitejs/plugin-vue';
import eslint from '@rollup/plugin-eslint';
import path from 'path';
import pages from 'vite-plugin-pages';
import analyze from 'rollup-plugin-analyzer';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [
    vue(),
    pages({
      pagesDir: 'src/pages',
    }),
    {
      ...eslint({
        include: ['./src/**/*.vue', './src/**/*.js'],
      }),
      enforce: 'pre',
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // build: {
  //   rollupOptions: {
  //     plugins: [analyze()],
  //   },
  // },
};
