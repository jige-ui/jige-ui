/* eslint-disable no-loss-of-precision */
import type { LabColor } from './lab_lch'
import type { RGBColor } from './rgb_lrgb'

export function lrgb2oklab(lrgb: RGBColor): LabColor {
  const { r, g, b } = lrgb
  const L = Math.cbrt(0.41222147079999993 * r + 0.5363325363 * g + 0.0514459929 * b)
  const M = Math.cbrt(0.2119034981999999 * r + 0.6806995450999999 * g + 0.1073969566 * b)
  const S = Math.cbrt(0.08830246189999998 * r + 0.2817188376 * g + 0.6299787005000002 * b)

  return {
    l: 0.2104542553 * L + 0.793617785 * M - 0.0040720468 * S,
    a: 1.9779984951 * L - 2.428592205 * M + 0.4505937099 * S,
    b: 0.0259040371 * L + 0.7827717662 * M - 0.808675766 * S,
  }
}

export function oklab2lrgb(oklab: LabColor): RGBColor {
  const { l, a, b } = oklab
  const L =
    // biome-ignore lint/correctness/noPrecisionLoss: <explanation>
    (l * 0.99999999845051981432 + 0.39633779217376785678 * a + 0.21580375806075880339 * b) ** 3
  const M =
    // biome-ignore lint/correctness/noPrecisionLoss: <explanation>
    (l * 1.0000000088817607767 - 0.1055613423236563494 * a - 0.063854174771705903402 * b) ** 3
  const S =
    // biome-ignore lint/correctness/noPrecisionLoss: <explanation>
    (l * 1.0000000546724109177 - 0.089484182094965759684 * a - 1.2914855378640917399 * b) ** 3

  const res = {
    r: +4.076741661347994 * L - 3.307711590408193 * M + 0.230969928729428 * S,
    g: -1.2684380040921763 * L + 2.6097574006633715 * M - 0.3413193963102197 * S,
    b: -0.004196086541837188 * L - 0.7034186144594493 * M + 1.7076147009309444 * S,
  }

  return res
}
