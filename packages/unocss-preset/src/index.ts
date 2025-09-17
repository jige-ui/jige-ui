/** biome-ignore-all lint/performance/useTopLevelRegex: unocss */
import type { Preset } from "unocss";

export function presetJigeUI(): Preset {
  return {
    name: "unocss-preset-jige-ui",
    theme: {
      colors: {
        fg1: "var(--jg-fg1)",
        fg2: "var(--jg-fg2)",
        fg3: "var(--jg-fg3)",
        fg4: "var(--jg-fg4)",
        fg5: "var(--jg-fg5)",
        darken: "var(--jg-darken)",
        smoke: "var(--jg-smoke)",
        "fg-danger": "var(--jg-fg-danger)",
        "fg-success": "var(--jg-fg-success)",
        "fg-warning": "var(--jg-fg-warning)",
        "fg-info": "var(--jg-fg-info)",
        "fg-link": "var(--jg-fg-link)",
        "t-body": "var(--jg-t-body)",
        "t-hl": "var(--jg-t-hl)",
        "t-bg1": "var(--jg-t-bg1)",
        "t-bg2": "var(--jg-t-bg2)",
        "t-bg3": "var(--jg-t-bg3)",
        "t-bg4": "var(--jg-t-bg4)",
        "t-bg5": "var(--jg-t-bg5)",
        "t-bg6": "var(--jg-t-bg6)",
        "t-border": "var(--jg-t-border)",
      },
    },
    rules: [
      [
        /^shadow-([12348])$/,
        ([, d]) => ({
          "box-shadow": `var(--jg-shadow${d})`,
        }),
      ],
      [
        /^typo-(10|12|14|16|20|24|28|32)$/,
        ([, d]) => ({
          "font-size": `var(--jg-fs-${d})`,
          "line-height": `var(--jg-lh-${d})`,
        }),
      ],
    ],
  };
}
