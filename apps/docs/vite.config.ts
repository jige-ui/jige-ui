import path from 'node:path'
import mdx from '@mdx-js/rollup'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import solidPagesPlugin from 'vite-plugin-solid-pages'
import { visualizer } from 'rollup-plugin-visualizer'

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
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: 'test.html', //分析图生成的文件名
      open: true, //如果存在本地服务端口，将在打包后自动展示
    }),
  ],
})
