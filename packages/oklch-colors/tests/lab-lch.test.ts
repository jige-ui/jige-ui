import { describe, expect, it } from 'vitest';
import {
  type LabColor,
  type LCHColor,
  lab2lch,
  lch2lab,
  normalizeHue,
} from '../src/color/lab-lch';

describe('Lab ↔ LCH Conversions', () => {
  describe('normalizeHue', () => {
    it('should normalize positive hue values', () => {
      expect(normalizeHue(45)).toBe(45);
      expect(normalizeHue(180)).toBe(180);
      expect(normalizeHue(359)).toBe(359);
    });

    it('should normalize hue values over 360', () => {
      expect(normalizeHue(360)).toBe(0);
      expect(normalizeHue(450)).toBe(90); // 450 - 360 = 90
      expect(normalizeHue(720)).toBe(0); // 720 - 2*360 = 0
    });

    it('should normalize negative hue values', () => {
      expect(normalizeHue(-45)).toBe(315); // -45 + 360 = 315
      expect(normalizeHue(-90)).toBe(270); // -90 + 360 = 270
      expect(normalizeHue(-360)).toBeCloseTo(0, 10); // -360 + 360 = 0 (handle -0 vs +0)
    });

    it('should handle large positive and negative values', () => {
      expect(normalizeHue(1080)).toBe(0); // 1080 - 3*360 = 0
      expect(normalizeHue(-810)).toBe(270); // -810 + 3*360 = 270
    });

    it('should handle zero', () => {
      expect(normalizeHue(0)).toBe(0);
    });

    it('should handle floating point values', () => {
      expect(normalizeHue(45.5)).toBeCloseTo(45.5);
      expect(normalizeHue(360.5)).toBeCloseTo(0.5);
      expect(normalizeHue(-45.5)).toBeCloseTo(314.5);
    });
  });

  describe('lab2lch', () => {
    it('should convert Lab to LCH', () => {
      const lab: LabColor = { l: 50, a: 20, b: -10 };
      const result = lab2lch(lab);

      expect(result).toHaveProperty('l');
      expect(result).toHaveProperty('c');
      expect(result).toHaveProperty('h');
      expect(typeof result.l).toBe('number');
      expect(typeof result.c).toBe('number');
      expect(typeof result.h).toBe('number');
    });

    it('should preserve lightness', () => {
      const lab: LabColor = { l: 75, a: 15, b: 25 };
      const result = lab2lch(lab);

      expect(result.l).toBe(lab.l);
    });

    it('should calculate chroma correctly', () => {
      const lab: LabColor = { l: 50, a: 3, b: 4 };
      const result = lab2lch(lab);

      // C = sqrt(a² + b²) = sqrt(9 + 16) = sqrt(25) = 5
      expect(result.c).toBeCloseTo(5);
    });

    it('should handle zero chroma (neutral colors)', () => {
      const neutralLab: LabColor = { l: 50, a: 0, b: 0 };
      const result = lab2lch(neutralLab);

      expect(result.l).toBe(50);
      expect(result.c).toBe(0);
      expect(result.h).toBe(0);
    });

    it('should calculate hue correctly for different quadrants', () => {
      // First quadrant (a > 0, b > 0)
      const lab1: LabColor = { l: 50, a: 10, b: 10 };
      const result1 = lab2lch(lab1);
      expect(result1.h).toBeCloseTo(45); // atan2(10, 10) = 45°

      // Second quadrant (a < 0, b > 0)
      const lab2: LabColor = { l: 50, a: -10, b: 10 };
      const result2 = lab2lch(lab2);
      expect(result2.h).toBeCloseTo(135); // atan2(10, -10) = 135°

      // Third quadrant (a < 0, b < 0)
      const lab3: LabColor = { l: 50, a: -10, b: -10 };
      const result3 = lab2lch(lab3);
      expect(result3.h).toBeCloseTo(225); // atan2(-10, -10) = 225°

      // Fourth quadrant (a > 0, b < 0)
      const lab4: LabColor = { l: 50, a: 10, b: -10 };
      const result4 = lab2lch(lab4);
      expect(result4.h).toBeCloseTo(315); // atan2(-10, 10) = 315°
    });

    it('should handle axis colors correctly', () => {
      // Positive a-axis (red direction)
      const redLab: LabColor = { l: 50, a: 20, b: 0 };
      const redResult = lab2lch(redLab);
      expect(redResult.h).toBeCloseTo(0);

      // Positive b-axis (yellow direction)
      const yellowLab: LabColor = { l: 50, a: 0, b: 20 };
      const yellowResult = lab2lch(yellowLab);
      expect(yellowResult.h).toBeCloseTo(90);

      // Negative a-axis (green direction)
      const greenLab: LabColor = { l: 50, a: -20, b: 0 };
      const greenResult = lab2lch(greenLab);
      expect(greenResult.h).toBeCloseTo(180);

      // Negative b-axis (blue direction)
      const blueLab: LabColor = { l: 50, a: 0, b: -20 };
      const blueResult = lab2lch(blueLab);
      expect(blueResult.h).toBeCloseTo(270);
    });
  });

  describe('lch2lab', () => {
    it('should convert LCH to Lab', () => {
      const lch: LCHColor = { l: 50, c: 20, h: 45 };
      const result = lch2lab(lch);

      expect(result).toHaveProperty('l');
      expect(result).toHaveProperty('a');
      expect(result).toHaveProperty('b');
      expect(typeof result.l).toBe('number');
      expect(typeof result.a).toBe('number');
      expect(typeof result.b).toBe('number');
    });

    it('should preserve lightness', () => {
      const lch: LCHColor = { l: 75, c: 15, h: 120 };
      const result = lch2lab(lch);

      expect(result.l).toBe(lch.l);
    });

    it('should handle zero chroma correctly', () => {
      const grayLch: LCHColor = { l: 50, c: 0, h: 180 };
      const result = lch2lab(grayLch);

      expect(result.l).toBe(50);
      expect(result.a).toBeCloseTo(0);
      expect(result.b).toBeCloseTo(0);
    });

    it('should calculate a and b correctly for different hues', () => {
      const chroma = 20;

      // 0° hue (positive a-axis)
      const lch0: LCHColor = { l: 50, c: chroma, h: 0 };
      const result0 = lch2lab(lch0);
      expect(result0.a).toBeCloseTo(chroma);
      expect(result0.b).toBeCloseTo(0);

      // 90° hue (positive b-axis)
      const lch90: LCHColor = { l: 50, c: chroma, h: 90 };
      const result90 = lch2lab(lch90);
      expect(result90.a).toBeCloseTo(0);
      expect(result90.b).toBeCloseTo(chroma);

      // 180° hue (negative a-axis)
      const lch180: LCHColor = { l: 50, c: chroma, h: 180 };
      const result180 = lch2lab(lch180);
      expect(result180.a).toBeCloseTo(-chroma);
      expect(result180.b).toBeCloseTo(0);

      // 270° hue (negative b-axis)
      const lch270: LCHColor = { l: 50, c: chroma, h: 270 };
      const result270 = lch2lab(lch270);
      expect(result270.a).toBeCloseTo(0);
      expect(result270.b).toBeCloseTo(-chroma);
    });

    it('should handle 45° angles correctly', () => {
      const chroma = 20;
      const expectedValue = chroma * Math.cos(Math.PI / 4); // ≈ 14.142

      const lch45: LCHColor = { l: 50, c: chroma, h: 45 };
      const result45 = lch2lab(lch45);
      expect(result45.a).toBeCloseTo(expectedValue);
      expect(result45.b).toBeCloseTo(expectedValue);
    });
  });

  describe('Round-trip conversions', () => {
    it('should maintain accuracy in Lab → LCH → Lab conversion', () => {
      const originalLab: LabColor = { l: 60, a: 15, b: -25 };

      const lch = lab2lch(originalLab);
      const resultLab = lch2lab(lch);

      const tolerance = 0.000_001; // Very tight tolerance for mathematical conversion
      expect(Math.abs(resultLab.l - originalLab.l)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultLab.a - originalLab.a)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultLab.b - originalLab.b)).toBeLessThanOrEqual(
        tolerance
      );
    });

    it('should handle LCH → Lab → LCH conversion', () => {
      const originalLch: LCHColor = { l: 70, c: 30, h: 240 };

      const lab = lch2lab(originalLch);
      const resultLch = lab2lch(lab);

      const tolerance = 0.000_001;
      expect(Math.abs(resultLch.l - originalLch.l)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultLch.c - originalLch.c)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultLch.h - originalLch.h)).toBeLessThanOrEqual(
        tolerance
      );
    });

    it('should handle round-trip for various color types', () => {
      const testLabs: LabColor[] = [
        { l: 0, a: 0, b: 0 }, // Black
        { l: 100, a: 0, b: 0 }, // White
        { l: 50, a: 0, b: 0 }, // Gray
        { l: 50, a: 80, b: 0 }, // Red-ish
        { l: 50, a: 0, b: 80 }, // Yellow-ish
        { l: 50, a: -80, b: 0 }, // Green-ish
        { l: 50, a: 0, b: -80 }, // Blue-ish
        { l: 25, a: 20, b: -30 }, // Dark purple-ish
      ];

      for (const originalLab of testLabs) {
        const lch = lab2lch(originalLab);
        const resultLab = lch2lab(lch);

        const tolerance = 0.000_001;
        expect(Math.abs(resultLab.l - originalLab.l)).toBeLessThanOrEqual(
          tolerance
        );
        expect(Math.abs(resultLab.a - originalLab.a)).toBeLessThanOrEqual(
          tolerance
        );
        expect(Math.abs(resultLab.b - originalLab.b)).toBeLessThanOrEqual(
          tolerance
        );
      }
    });

    it('should handle hue continuity near 0°/360°', () => {
      // Test colors near the hue boundary
      const nearZero: LCHColor = { l: 50, c: 20, h: 1 };
      const near360: LCHColor = { l: 50, c: 20, h: 359 };

      const labNearZero = lch2lab(nearZero);
      const labNear360 = lch2lab(near360);

      const lchFromNearZero = lab2lch(labNearZero);
      const lchFromNear360 = lab2lch(labNear360);

      expect(lchFromNearZero.h).toBeCloseTo(1);
      expect(lchFromNear360.h).toBeCloseTo(359);
    });
  });

  describe('Mathematical properties', () => {
    it('should maintain chroma relationship: C = sqrt(a² + b²)', () => {
      const testCases = [
        { a: 3, b: 4, expectedC: 5 },
        { a: 5, b: 12, expectedC: 13 },
        { a: 8, b: 15, expectedC: 17 },
        { a: -6, b: 8, expectedC: 10 },
      ];

      for (const { a, b, expectedC } of testCases) {
        const lab: LabColor = { l: 50, a, b };
        const lch = lab2lch(lab);
        expect(lch.c).toBeCloseTo(expectedC);
      }
    });

    it('should maintain hue relationship with atan2', () => {
      const testCases = [
        { a: 1, b: 0, expectedH: 0 },
        { a: 1, b: 1, expectedH: 45 },
        { a: 0, b: 1, expectedH: 90 },
        { a: -1, b: 1, expectedH: 135 },
        { a: -1, b: 0, expectedH: 180 },
        { a: -1, b: -1, expectedH: 225 },
        { a: 0, b: -1, expectedH: 270 },
        { a: 1, b: -1, expectedH: 315 },
      ];

      for (const { a, b, expectedH } of testCases) {
        const lab: LabColor = { l: 50, a, b };
        const lch = lab2lch(lab);
        expect(lch.h).toBeCloseTo(expectedH, 1);
      }
    });
  });
});
