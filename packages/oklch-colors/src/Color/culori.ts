import type { LCHColor } from './lab_lch'
import { lab2lch, lch2lab } from './lab_lch'
import { lrgb2oklab, oklab2lrgb } from './lrgb_oklab'
import type { RGBColor } from './rgb_lrgb'
import { lrgb2rgb, rgb2lrgb } from './rgb_lrgb'

export function convertRgbToOkLch(rgb: RGBColor): LCHColor {
  return lab2lch(lrgb2oklab(rgb2lrgb(rgb)))
}

function convertOklchToRgb(oklch: LCHColor): RGBColor {
  return lrgb2rgb(oklab2lrgb(lch2lab(oklch)))
}

export function safeOklchToRgb(oklch: LCHColor): RGBColor {
  let rgb = convertOklchToRgb(oklch)
  const unSafeC = (c: RGBColor) => {
    return [c.r, c.g, c.b].some((c) => c < 0 || c > 255)
  }
  if (unSafeC(rgb) && !unSafeC(convertOklchToRgb({ ...oklch, c: 0 }))) {
    let start = 0
    let end = oklch.c
    let goodC = 0
    const resolution = 0.4 / Math.pow(2, 13)
    while (end - start > resolution) {
      const mid = start + (end - start) * 0.5
      const tmp = convertOklchToRgb({ ...oklch, c: mid })
      if (unSafeC(tmp)) {
        end = mid
      } else {
        goodC = mid
        start = mid
      }
    }
    rgb = convertOklchToRgb({ ...oklch, c: goodC })
  }
  return rgb
}
