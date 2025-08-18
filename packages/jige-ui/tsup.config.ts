import browserslist from 'browserslist';
import inlineImportPlugin from 'esbuild-plugin-inline-import';
// tsup.config.ts
import { solidPlugin } from 'esbuild-plugin-solid';
import { browserslistToTargets, transform as lightCss } from 'lightningcss';
import { compileAsync } from 'sass-embedded';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';
import Icons from 'unplugin-icons/esbuild';

const inlinePlugin = inlineImportPlugin({
  filter: /^sass:/,
  transform: async (_contents, args) => {
    const browers = browserslist();
    const browersTarget = browserslistToTargets(browers);
    const code = (await compileAsync(args.path)).css;
    const res = lightCss({
      // eslint-disable-next-line node/prefer-global/buffer
      code: Buffer.from(code),
      minify: true,
      sourceMap: false,
      targets: browersTarget,
      filename: args.path,
    }).code.toString();
    return res;
  },
});

const getPlugins = (jsx: boolean) => {
  let plugins = [inlinePlugin, Icons({ compiler: 'solid' })];

  if (!jsx) {
    plugins = [
      Icons({ compiler: 'solid' }),
      solidPlugin({ solid: { generate: 'dom' } }),
      inlinePlugin,
    ];
  }

  return plugins;
};

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
        options.jsx = 'preserve';
      }
      options.chunkNames = '[name]/[hash]';
      if (!watch) {
        options.drop = ['console', 'debugger'];
      }
    },
    outExtension() {
      return jsx ? { js: '.jsx' } : {};
    },
    esbuildPlugins: getPlugins(jsx),
  };
}

export default defineConfig(() => {
  if (process.env.DEV_MODE === 'true') {
    return generateConfig(true, true, true);
  }
  return [generateConfig(false, true), generateConfig(true)];
});
