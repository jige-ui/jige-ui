import { oklch2web } from 'oklch-colors'

const colorPrefix = '--jg-'

type Light = number
type Color = number
type Opacity = number

interface ThemeVar {
  l: Light
  c?: Color
  cD?: Color
  lD?: Light
  a?: Opacity
}

export interface ThemeVars {
  [key: string]: ThemeVar
}

export const defaultThemeColors: ThemeVars = {
  't-hl': { l: 78, lD: 68 },
  't-hl-darker': { l: 75, lD: 65 },
  't-hl-lighter': { l: 82, lD: 72 },
  't-bg1': { l: 99.5, c: 0.0038, lD: 25 },
  't-bg2': { l: 98.6, c: 0.003, lD: 28 },
  't-bg3': { l: 97, c: 0.008, lD: 35, cD: 0.006 },
  't-bg4': { l: 93.1, c: 0.008, lD: 39, a: 0.8 },
  't-bg5': { l: 90, c: 0.009, lD: 40, a: 0.9 },
  't-bg6': { l: 89, c: 0.029, cD: 0.04 },
  't-border': { l: 90, c: 0.008, lD: 42 },
  't-body': { l: 91, c: 0.014, lD: 18 },
}

export function genVars(hue: number, themeColors: ThemeVars) {
  let css = ':root,.light{'
  let cssDark = '.dark{'
  for (const key in themeColors) {
    const color = themeColors[key]
    const lightC = oklch2web(color.l, color.c || 0.16, hue, color.a)
    const darkC = oklch2web(color.lD || 128 - color.l, color.cD || color.c || 0.17, hue, color.a)
    css += `${colorPrefix}${key}:${lightC};`
    cssDark += `${colorPrefix}${key}:${darkC};`
  }
  css += '}'
  cssDark += '}'
  return css + cssDark
}
