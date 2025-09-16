import solid from "rolldown-plugin-solid";
import inlinePlugin from "rollup-plugin-inline-import";
import { defineConfig, type UserConfig } from "tsdown";

// biome-ignore lint/suspicious/noExplicitAny: rollup plugins have complex types
const getPlugins = (jsx: boolean): any[] => {
  if (!jsx) {
    return [solid({ solid: { generate: "dom" } }), inlinePlugin()] as any[];
  }

  return [inlinePlugin()] as any[];
};

// export both js and jsx
export default defineConfig(({ env }) => {
  const define = {
    IS_DEV: env?.NODE_ENV === "development" ? "true" : "false",
  };

  const platform = "browser";
  const entry = [
    "src/build.ts",
    "src/components/*/index.ts",
    "src/components/form-components/*/index.ts",
  ];
  return [
    {
      entry,
      platform,
      dts: true,
      plugins: [getPlugins(false)],
      inputOptions: {
        define,
      },
      outputOptions: {
        chunkFileNames: "chunks/[hash].js",
      },
    },
    {
      entry,
      platform,
      dts: false,
      inputOptions: {
        jsx: "preserve",
        define,
      },
      outputOptions: {
        chunkFileNames: "chunks/[hash].jsx",
      },
      plugins: getPlugins(true),
      outExtensions: () => ({
        js: ".jsx",
      }),
    },
  ] satisfies UserConfig;
});
