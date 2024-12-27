import type { ThemeVars } from './gen_vars'
import { createComponentState } from 'solid-uses'
import { defaultThemeColors } from './gen_vars'

const context = createComponentState({ state: () => ({
  hue: 165,
  themeColors: { ...defaultThemeColors } as ThemeVars,
  zIndexConfig: { tooltip: 999, popover: 998, modal: 997 },
}), methods: {
  setHue(hue: number) {
    let normalized = hue
    if (normalized < 0)
      normalized = 0
    if (normalized > 360)
      normalized = 360
    this.actions.setState('hue', normalized)
  },
} })

export { context as RootContext }