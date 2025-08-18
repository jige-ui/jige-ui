export interface LabColor {
  l: number;
  a: number;
  b: number;
}
export interface LCHColor {
  l: number;
  c: number;
  h: number;
}

export function normalizeHue(hue: number): number {
  const normalized = hue % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

export function lab2lch(lab: LabColor): LCHColor {
  const { l, a, b } = lab;
  const c = Math.sqrt(a * a + b * b);
  let h = 0;
  if (c) {
    h = normalizeHue((Math.atan2(b, a) * 180) / Math.PI);
  }
  return { l, c, h };
}

export function lch2lab(lch: LCHColor): LabColor {
  const { l, c, h } = lch;
  const res = {
    l,
    a: c ? c * Math.cos((h / 180) * Math.PI) : 0,
    b: c ? c * Math.sin((h / 180) * Math.PI) : 0,
  };
  return res;
}
