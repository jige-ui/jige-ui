import { convertRgbToOkLch, safeOklchToRgb } from './culori'
import type { RGBColor } from './rgb_lrgb'

type HashColor = `#${string}`

export type ColorType = RGBColor | HashColor

// Hex to RGB conversion
function hexToRgb(hex: string): RGBColor {
  const hexes = /^#?([\da-f]+)$/i.exec(hex.toLowerCase())
  let hexString = '00aeec'

  if (hexes && hexes[1]) {
    const tar = hexes[1]
    if (tar.length >= 3 && tar.length < 6) {
      const tmp = tar.slice(0, 3)
      hexString = `${tmp[0]}${tmp[0]}${tmp[1]}${tmp[1]}${tmp[2]}${tmp[2]}`
    }

    if (tar.length >= 6) {
      hexString = tar.slice(0, 6)
    }
  }

  const result = /([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hexString)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

// RGB to Hex conversion
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

function normalizeRGB(rgb: RGBColor): RGBColor {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const tmp = Math.round(c)
    return Math.min(Math.max(tmp, 0), 255)
  })
  return {
    r,
    g,
    b,
  }
}

export function oklch2web(l: number, c: number, h: number, a?: number): string {
  const rgb = safeOklchToRgb({ l: l / 100, c, h })
  const { r, g, b } = normalizeRGB(rgb)

  if (a) {
    return `rgba(${r},${g},${b},${a})`
  }

  return rgbToHex(r, g, b)
}

export function extractHue(color: ColorType): number {
  let rgb: RGBColor
  if (typeof color === 'string') {
    rgb = hexToRgb(color)
  }
  else {
    rgb = color
  }
  return convertRgbToOkLch(rgb).h
}
