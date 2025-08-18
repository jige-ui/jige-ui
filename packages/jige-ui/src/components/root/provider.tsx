import globalStyles from 'sass:../../styles/global.scss';
import type { JSX } from 'solid-js';
import { createWatch, mountStyle } from 'solid-tiny-utils';
import { RootContext } from './context';
import type { ThemeVars } from './gen-vars';
import { defaultThemeColors, genVars } from './gen-vars';

export function Provider(props: {
  children: JSX.Element;
  hue?: number;
  themeColors?: ThemeVars;
  zIndexConfig?: {
    tooltip?: number;
    popover?: number;
    toast?: number;
    modal?: number;
  };
}) {
  const Context = RootContext.initial({
    hue: () => props.hue,
    themeColors: () => ({ ...defaultThemeColors, ...props.themeColors }),
    zIndexConfig: () => ({
      ...RootContext.defaultValue().zIndexConfig,
      ...props.zIndexConfig,
    }),
  });

  mountStyle(globalStyles, 'jige-ui-global');

  const [state] = Context.value;

  createWatch(
    () => state.hue,
    (hue) => {
      mountStyle(genVars(hue, state.themeColors), 'jige-ui-vars', true);
    }
  );

  return <Context.Provider>{props.children}</Context.Provider>;
}
