# @jige-ui/unocss-preset

A comprehensive UnoCSS preset designed specifically for the jige-ui component library. This preset provides utility classes, component shortcuts, and design tokens that align with jige-ui's design system.

## Installation

```bash
npm install @jige-ui/unocss-preset
# or
pnpm add @jige-ui/unocss-preset
# or
yarn add @jige-ui/unocss-preset
```

## Usage

Add the preset to your UnoCSS configuration:

```typescript
// uno.config.ts
import { defineConfig } from "unocss";
import { presetJigeUI } from "@jige-ui/unocss-preset";

export default defineConfig({
  presets: [
    presetJigeUI({
      // Configuration options
    }),
  ],
});
```
