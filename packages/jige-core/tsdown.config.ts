import strip from '@rollup/plugin-strip';
import solid from 'rolldown-plugin-solid';
import inlinePlugin from 'rollup-plugin-inline-import';
import { defineConfig } from 'tsdown';

const getPlugins = (jsx: boolean) => {
  const isDev = process.env.DEV_MODE === 'true';
  const plugins: any[] = [];

  if (!jsx) {
    plugins.push(solid({ solid: { generate: 'dom' } }));
  }

  plugins.push(inlinePlugin());

  if (isDev) {
    plugins.push(
      strip({
        functions: ['console.*', 'debugger'],
      })
    );
  }

  return plugins;
};

const entry = ['src/build.ts', 'src/components/*/index.ts'];

// export both js and jsx
export default defineConfig([
  {
    entry,
    platform: 'browser',
    dts: true,
    plugins: [getPlugins(false)],
    outputOptions: {
      chunkFileNames: 'chunks/[hash].js',
    },
  },
  {
    entry,
    platform: 'browser',
    dts: false,
    inputOptions: {
      jsx: 'preserve',
    },
    outputOptions: {
      chunkFileNames: 'chunks/[hash].jsx',
    },
    plugins: getPlugins(true),
    outExtensions: () => ({
      js: '.jsx',
    }),
  },
]);
