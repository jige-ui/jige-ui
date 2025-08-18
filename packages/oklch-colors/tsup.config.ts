import type { Options } from 'tsup';
// tsup.config.ts
import { defineConfig } from 'tsup';

function generateConfig(jsx: boolean): Options {
  return {
    target: 'esnext',
    platform: 'browser',
    format: 'esm',
    clean: true,
    dts: !jsx,
    entry: ['src/index.ts'],
    outDir: 'dist/',
    treeshake: { preset: 'smallest' },
    replaceNodeEnv: true,
  };
}

export default defineConfig([generateConfig(false)]);
