// uno.config.ts
import { defineConfig, presetIcons, presetTypography, presetUno } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      stroke1: 'var(--jg-stroke1)',
      fg1: 'var(--jg-fg1)',
      fg2: 'var(--jg-fg2)',
      fg3: 'var(--jg-fg3)',
      fg4: 'var(--jg-fg4)',
      'fg-link': 'var(--jg-fg-link)',
      bg1: 'var(--jg-bg1)',
      bg2: 'var(--jg-bg2)',
      bg3: 'var(--jg-bg3)',
      'bg3-hover': 'var(--jg-bg3-hover)',
      bg4: 'var(--jg-bg4)',
      bg5: 'var(--jg-bg5)',
      bg6: 'var(--jg-bg6)',
      'bg-inverted': 'var(--jg-bg-inverted)',
      't-body': 'var(--jg-t-body)',
      't-hl': 'var(--jg-t-hl)',
      't-hover': 'var(--jg-t-hover)',
      't-bg1': 'var(--jg-t-bg1)',
      't-bg2': 'var(--jg-t-bg2)',
      't-bg3': 'var(--jg-t-bg3)',
      't-bg4': 'var(--jg-t-bg4)',
      't-bg5': 'var(--jg-t-bg5)',
      't-bg6': 'var(--jg-t-bg6)',
      't-border': 'var(--jg-t-border)',
    },
  },
  rules: [
    [
      /^shadow-(\d+)$/,
      ([, d]) => ({
        'box-shadow': `var(--jg-shadow${d})`,
      }),
    ],
  ],

  presets: [presetUno(), presetIcons(), presetTypography()],
});
