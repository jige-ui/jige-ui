import { createComponentState } from "solid-tiny-context";
import type { ThemeVars } from "./gen-vars";
import { defaultThemeColors } from "./gen-vars";

const context = createComponentState({
  state: () => ({
    hue: 165,
    themeColors: { ...defaultThemeColors } as ThemeVars,
    zIndexConfig: { tooltip: 999, popover: 998, toast: 997, modal: 996 },
  }),
  methods: {
    setHue(hue: number) {
      let normalized = hue;
      if (normalized < 0) {
        normalized = 0;
      }
      if (normalized > 360) {
        normalized = 360;
      }
      this.actions.setState("hue", normalized);
    },
  },
});

export { context as RootContext };
