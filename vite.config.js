import vue from '@vitejs/plugin-vue';
import eslint from '@rollup/plugin-eslint';
import path from 'path';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [
    vue(),
    layouts(),
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
};
