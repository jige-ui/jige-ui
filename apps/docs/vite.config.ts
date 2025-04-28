import path from 'node:path'
import mdx from '@mdx-js/rollup'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import solidPagesPlugin from 'vite-plugin-solid-pages'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  css: {
    modules: false,
  },
  plugins: [
    mdx({
      jsxImportSource: 'solid-js/h',
      remarkPlugins: [remarkFrontmatter, remarkGfm],
      rehypePlugins: [rehypePrettyCode],
    }),
    UnoCSS(),
    solidPlugin(),
    solidPagesPlugin({
      dir: 'src/pages',
      extensions: ['mdx'],
    }),
  ],
})
