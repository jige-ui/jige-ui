// tsup.config.ts
import { solidPlugin } from 'esbuild-plugin-solid';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

function generateConfig(jsx: boolean): Options {
  return {
    target: 'esnext',
    platform: 'browser',
    format: 'esm',
    clean: true,
    dts: !jsx,
    entry: ['src/build.ts', 'src/components/*/index.ts'],
    outDir: 'dist/',
    treeshake: { preset: 'smallest' },
    replaceNodeEnv: true,
    esbuildOptions(options) {
      if (jsx) {
        options.jsx = 'preserve';
      }

      options.chunkNames = '[name]/[hash]';
      if (process.env.DEV_MODE !== 'true') {
        options.drop = ['console', 'debugger'];
      }
    },
    outExtension() {
      return jsx ? { js: '.jsx' } : {};
    },
    esbuildPlugins: jsx ? [] : [solidPlugin({ solid: { generate: 'dom' } })],
  };
}

export default defineConfig([generateConfig(false), generateConfig(true)]);
