export interface RGBColor {
  r: number // 0-255
  g: number // 0-255
  b: number // 0-255
}

export function rgb2lrgb(rgb: RGBColor): RGBColor {
  const fn = (c: number) => {
    const abs = Math.abs(c)
    if (abs <= 0.04045) {
      return c / 12.92
    }
    return (Math.sign(c) || 1) * Math.pow((abs + 0.055) / 1.055, 2.4)
  }

  return { r: fn(rgb.r / 255), g: fn(rgb.g / 255), b: fn(rgb.b / 255) }
}

export function lrgb2rgb(lrgb: RGBColor): RGBColor {
  const fn = (c: number) => {
    const abs = Math.abs(c)
    if (abs > 0.0031308) {
      return (Math.sign(c) || 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055)
    }
    return c * 12.92
  }

  return { r: fn(lrgb.r) * 255, g: fn(lrgb.g) * 255, b: fn(lrgb.b) * 255 }
}
