import { oklchToRgb } from "solid-tiny-utils";

const colorPrefix = "--jg-";

type Light = number;
type Color = number;
type Opacity = number;

type ThemeVar = {
  l: Light;
  c?: Color;
  cD?: Color;
  lD?: Light;
  a?: Opacity;
};

export type ThemeVars = {
  [key: string]: ThemeVar;
};

export const defaultThemeColors: ThemeVars = {
  "t-hl": { l: 78, lD: 65 },
  "t-bg1": { l: 99.5, c: 0.0038, lD: 25 },
  "t-bg2": { l: 98, c: 0.003, lD: 28 },
  "t-bg3": { l: 96.5, c: 0.005, lD: 35, cD: 0.006 },
  "t-bg4": { l: 94.8, c: 0.006, lD: 37, a: 0.5 },
  "t-bg5": { l: 91.5, c: 0.008, lD: 40, a: 0.5 },
  "t-bg6": { l: 89, c: 0.029, cD: 0.04 },
  "t-border": { l: 91, c: 0.01, lD: 42, a: 0.6 },
  "t-body": { l: 91, c: 0.014, lD: 18 },
};

export function genVars(hue: number, themeColors: ThemeVars) {
  let css = ":root,.light{";
  let cssDark = ".dark{";
  for (const [key, tc] of Object.entries(themeColors)) {
    const lightC = oklch2web(tc.l, tc.c || 0.16, hue, tc.a);
    const darkC = oklch2web(
      tc.lD || 128 - tc.l,
      tc.cD || tc.c || 0.17,
      hue,
      tc.a
    );
    css += `${colorPrefix}${key}:${lightC};`;
    cssDark += `${colorPrefix}${key}:${darkC};`;
  }
  css += "}";
  cssDark += "}";
  return css + cssDark;
}

export function oklch2web(l: number, c: number, h: number, a?: number) {
  const { r, g, b } = oklchToRgb({ l: l / 100, c, h });
  if (a) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}
