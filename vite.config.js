import vue from '@vitejs/plugin-vue';
import path from 'path';
import voie from 'vite-plugin-voie';
import eslint from '@rollup/plugin-eslint';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue(), voie(), eslint({ include: ['src/**/*.{js,vue}'] })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
