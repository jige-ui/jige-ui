import solid from "rolldown-plugin-solid";
import inlinePlugin from "rollup-plugin-inline-import";
import { defineConfig, type UserConfig } from "tsdown";

const getPlugins = (jsx: boolean) => {
  const plugins: any[] = [];

  if (!jsx) {
    plugins.push(solid({ solid: { generate: "dom" } }));
  }

  plugins.push(inlinePlugin());

  return plugins;
};

const entry = ["src/build.ts", "src/components/*/index.ts"];

// export both js and jsx
export default defineConfig(({ env }) => {
  const isDev = env?.NODE_ENV === "development";
  return [
    {
      entry,
      platform: "browser",
      dts: true,
      plugins: getPlugins(false),
      inputOptions: {
        transform: {
          define: {
            IS_DEV: isDev ? "true" : "false",
          },
        },
      },
      outputOptions: {
        chunkFileNames: "chunks/[hash].js",
      },
    },
    {
      entry,
      platform: "browser",
      dts: false,
      inputOptions: {
        transform: {
          define: {
            IS_DEV: isDev ? "true" : "false",
          },
          jsx: "preserve",
        },
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
