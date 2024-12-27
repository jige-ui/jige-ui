import type { ThemeVars } from './gen_vars'
import globalStyles from 'sass:../../styles/global.scss'
import { mountStyle, watch } from 'solid-uses'
import { RootContext } from './context'
import { defaultThemeColors, genVars } from './gen_vars'

export function Provider(props: {
  children: any
  hue?: number
  themeColors?: ThemeVars
  zIndexConfig?: { tooltip?: number, popover?: number, modal?: number }
}) {
  const Context = RootContext.initial({
    hue: () => props.hue,
    themeColors: () => ({ ...defaultThemeColors, ...props.themeColors }),
    zIndexConfig: () => ({ ...RootContext.defaultValue().zIndexConfig, ...props.zIndexConfig }),
  })

  mountStyle(globalStyles, 'jige-ui-global')

  const [state] = Context.value

  watch(() => state.hue, (hue) => {
    mountStyle(genVars(hue, state.themeColors), 'jige-ui-vars', true)
  })

  return <Context.Provider>{props.children}</Context.Provider>
}

export { RootContext, ThemeVars }
