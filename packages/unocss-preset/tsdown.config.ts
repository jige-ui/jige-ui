import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/index.ts",
  outDir: "dist",
  format: ["esm"],
  dts: true,
  target: "es2022",
  platform: "node",
  clean: true,
  exports: true,
});
