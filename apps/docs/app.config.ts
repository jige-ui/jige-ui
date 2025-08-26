import { defineConfig } from '@solidjs/start/config';
/* @ts-ignore */
import pkg from '@vinxi/plugin-mdx';
import UnoCSS from 'unocss/vite';

const { default: mdx } = pkg;
export default defineConfig({
  extensions: ['mdx', 'md'],
  vite: {
    plugins: [
      UnoCSS(),
      mdx.withImports({})({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
      }),
    ],
  },
});
