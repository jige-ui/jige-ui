import path from 'node:path';
import inline from 'rollup-plugin-inline-import';
import UnoCSS from 'unocss/vite';
import icon from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidPagesPlugin from 'vite-plugin-solid-pages';

export default defineConfig({
  root: './playground',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, '../src')}/`,
    },
  },
  css: {
    modules: false,
  },
  server: {
    port: 5010,
  },
  plugins: [
    inline(),
    icon({ compiler: 'solid' }),
    UnoCSS(),
    solidPlugin(),
    solidPagesPlugin({
      dir: './playground/src/pages',
      extensions: ['tsx'],
    }),
  ],
});
