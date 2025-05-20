import browserslist from 'browserslist'
import inlineImportPlugin from 'esbuild-plugin-inline-import'
// tsup.config.ts
import { solidPlugin } from 'esbuild-plugin-solid'
import { browserslistToTargets, transform as lightCss } from 'lightningcss'
import { compileAsync } from 'sass'
import type { Options } from 'tsup'
import { defineConfig } from 'tsup'

const inlinePlugin = inlineImportPlugin({
  filter: /^sass:/,
  transform: async (_contents, args) => {
    const browers = browserslist()
    const browersTarget = browserslistToTargets(browers)
    const code = (await compileAsync(args.path)).css
    const res = lightCss({
      // @ts-expect-error node buffer
      // eslint-disable-next-line node/prefer-global/buffer
      code: Buffer.from(code),
      minify: true,
      sourceMap: false,
      targets: browersTarget,
      filename: args.path,
    }).code.toString()
    return res
  },
})

function generateConfig(jsx: boolean, dts?: boolean, watch?: boolean): Options {
  return {
    target: 'esnext',
    platform: 'browser',
    format: 'esm',
    clean: true,
    dts,
    entry: [
      'src/build.ts',
      'src/components/*/index.ts',
      'src/components/form-components/*/index.ts',
    ],
    outDir: 'dist/',
    treeshake: { preset: 'smallest' },
    replaceNodeEnv: true,

    esbuildOptions(options) {
      if (jsx) {
        options.jsx = 'preserve'
      }
      options.chunkNames = '[name]/[hash]'
      if (!watch) {
        options.drop = ['console', 'debugger']
      }
    },
    outExtension() {
      return jsx ? { js: '.jsx' } : {}
    },
    esbuildPlugins: !jsx
      ? [solidPlugin({ solid: { generate: 'dom' } }), inlinePlugin]
      : [inlinePlugin],
  }
}

export default defineConfig(() => {
  // @ts-ignore
  if (process.env.DEV_MODE === 'true') {
    return generateConfig(true, true, true)
  }
  return [generateConfig(false, true), generateConfig(true)]
})
