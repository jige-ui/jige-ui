import solid from 'rolldown-plugin-solid';
import inlinePlugin from 'rollup-plugin-inline-import';
import { defineConfig } from 'tsdown';
import Icons from 'unplugin-icons/rollup';

// biome-ignore lint/suspicious/noExplicitAny: rollup plugins have complex types
const getPlugins = (jsx: boolean): any[] => {
  if (!jsx) {
    return [
      Icons({ compiler: 'solid' }),
      solid({ solid: { generate: 'dom' } }),
      inlinePlugin(),
    ] as any[];
  }

  return [Icons({ compiler: 'solid' }), inlinePlugin()] as any[];
};

// export both js and jsx
export default defineConfig([
  {
    entry: [
      'src/build.ts',
      'src/components/*/index.ts',
      'src/components/form-components/*/index.ts',
    ],
    platform: 'browser',
    dts: true,
    plugins: [getPlugins(false)],
  },
  {
    entry: [
      'src/build.ts',
      'src/components/*/index.ts',
      'src/components/form-components/*/index.ts',
    ],
    platform: 'browser',
    dts: false,
    inputOptions: {
      jsx: 'preserve',
    },
    outputOptions: {},
    plugins: getPlugins(true),
    outExtensions: () => ({
      js: '.jsx',
    }),
  },
]);
