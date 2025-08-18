import { describe, expect, it } from 'vitest';
import type { LabColor } from '../src/color/lab-lch';
import { lrgb2oklab, oklab2lrgb } from '../src/color/lrgb-oklab';
import type { RGBColor } from '../src/color/rgb-lrgb';

describe('Linear RGB ↔ OkLab Conversions', () => {
  describe('lrgb2oklab', () => {
    it('should convert linear RGB to OkLab', () => {
      const lrgb: RGBColor = { r: 0.5, g: 0.3, b: 0.8 };
      const result = lrgb2oklab(lrgb);

      expect(result).toHaveProperty('l');
      expect(result).toHaveProperty('a');
      expect(result).toHaveProperty('b');
      expect(typeof result.l).toBe('number');
      expect(typeof result.a).toBe('number');
      expect(typeof result.b).toBe('number');
    });

    it('should handle linear black (0,0,0)', () => {
      const black: RGBColor = { r: 0, g: 0, b: 0 };
      const result = lrgb2oklab(black);

      expect(result.l).toBeCloseTo(0, 3);
      expect(result.a).toBeCloseTo(0, 3);
      expect(result.b).toBeCloseTo(0, 3);
    });

    it('should handle linear white (1,1,1)', () => {
      const white: RGBColor = { r: 1, g: 1, b: 1 };
      const result = lrgb2oklab(white);

      expect(result.l).toBeCloseTo(1, 2);
      expect(result.a).toBeCloseTo(0, 3);
      expect(result.b).toBeCloseTo(0, 3);
    });

    it('should handle linear gray values', () => {
      const gray25: RGBColor = { r: 0.25, g: 0.25, b: 0.25 };
      const gray50: RGBColor = { r: 0.5, g: 0.5, b: 0.5 };
      const gray75: RGBColor = { r: 0.75, g: 0.75, b: 0.75 };

      const result25 = lrgb2oklab(gray25);
      const result50 = lrgb2oklab(gray50);
      const result75 = lrgb2oklab(gray75);

      // Lightness should increase with RGB values
      expect(result25.l).toBeLessThan(result50.l);
      expect(result50.l).toBeLessThan(result75.l);

      // Grays should have minimal a and b values
      expect(Math.abs(result25.a)).toBeLessThan(0.01);
      expect(Math.abs(result25.b)).toBeLessThan(0.01);
      expect(Math.abs(result50.a)).toBeLessThan(0.01);
      expect(Math.abs(result50.b)).toBeLessThan(0.01);
      expect(Math.abs(result75.a)).toBeLessThan(0.01);
      expect(Math.abs(result75.b)).toBeLessThan(0.01);
    });

    it('should handle primary colors correctly', () => {
      const red: RGBColor = { r: 1, g: 0, b: 0 };
      const green: RGBColor = { r: 0, g: 1, b: 0 };
      const blue: RGBColor = { r: 0, g: 0, b: 1 };

      const redResult = lrgb2oklab(red);
      const greenResult = lrgb2oklab(green);
      const blueResult = lrgb2oklab(blue);

      // All should have positive lightness
      expect(redResult.l).toBeGreaterThan(0);
      expect(greenResult.l).toBeGreaterThan(0);
      expect(blueResult.l).toBeGreaterThan(0);

      // They should have different a and b values
      expect(redResult.a).not.toBeCloseTo(greenResult.a);
      expect(greenResult.a).not.toBeCloseTo(blueResult.a);
      expect(redResult.b).not.toBeCloseTo(greenResult.b);
      expect(greenResult.b).not.toBeCloseTo(blueResult.b);
    });

    it('should produce reasonable OkLab ranges', () => {
      const testColors: RGBColor[] = [
        { r: 1, g: 0, b: 0 },
        { r: 0, g: 1, b: 0 },
        { r: 0, g: 0, b: 1 },
        { r: 1, g: 1, b: 0 },
        { r: 1, g: 0, b: 1 },
        { r: 0, g: 1, b: 1 },
      ];

      for (const color of testColors) {
        const result = lrgb2oklab(color);

        // Lightness should be between 0 and 1
        expect(result.l).toBeGreaterThanOrEqual(0);
        expect(result.l).toBeLessThanOrEqual(1);

        // a and b typically range roughly -0.5 to 0.5 for visible colors
        expect(result.a).toBeGreaterThan(-1);
        expect(result.a).toBeLessThan(1);
        expect(result.b).toBeGreaterThan(-1);
        expect(result.b).toBeLessThan(1);
      }
    });
  });

  describe('oklab2lrgb', () => {
    it('should convert OkLab to linear RGB', () => {
      const oklab: LabColor = { l: 0.6, a: 0.1, b: -0.05 };
      const result = oklab2lrgb(oklab);

      expect(result).toHaveProperty('r');
      expect(result).toHaveProperty('g');
      expect(result).toHaveProperty('b');
      expect(typeof result.r).toBe('number');
      expect(typeof result.g).toBe('number');
      expect(typeof result.b).toBe('number');
    });

    it('should handle OkLab black (0,0,0)', () => {
      const black: LabColor = { l: 0, a: 0, b: 0 };
      const result = oklab2lrgb(black);

      expect(result.r).toBeCloseTo(0, 3);
      expect(result.g).toBeCloseTo(0, 3);
      expect(result.b).toBeCloseTo(0, 3);
    });

    it('should handle OkLab white (1,0,0)', () => {
      const white: LabColor = { l: 1, a: 0, b: 0 };
      const result = oklab2lrgb(white);

      expect(result.r).toBeCloseTo(1, 2);
      expect(result.g).toBeCloseTo(1, 2);
      expect(result.b).toBeCloseTo(1, 2);
    });

    it('should handle neutral colors (zero a and b)', () => {
      const grays = [
        { l: 0.25, a: 0, b: 0 },
        { l: 0.5, a: 0, b: 0 },
        { l: 0.75, a: 0, b: 0 },
      ];

      for (const gray of grays) {
        const result = oklab2lrgb(gray);

        // Should produce equal RGB values for neutral colors
        const tolerance = 0.01;
        expect(Math.abs(result.r - result.g)).toBeLessThan(tolerance);
        expect(Math.abs(result.g - result.b)).toBeLessThan(tolerance);
        expect(Math.abs(result.b - result.r)).toBeLessThan(tolerance);
      }
    });

    it('should produce different RGB values for different OkLab inputs', () => {
      const oklab1: LabColor = { l: 0.6, a: 0.1, b: 0 };
      const oklab2: LabColor = { l: 0.6, a: 0, b: 0.1 };
      const oklab3: LabColor = { l: 0.6, a: -0.1, b: 0 };

      const result1 = oklab2lrgb(oklab1);
      const result2 = oklab2lrgb(oklab2);
      const result3 = oklab2lrgb(oklab3);

      // Should produce noticeably different colors
      expect(
        Math.abs(result1.r - result2.r) +
          Math.abs(result1.g - result2.g) +
          Math.abs(result1.b - result2.b)
      ).toBeGreaterThan(0.01);
      expect(
        Math.abs(result2.r - result3.r) +
          Math.abs(result2.g - result3.g) +
          Math.abs(result2.b - result3.b)
      ).toBeGreaterThan(0.01);
      expect(
        Math.abs(result3.r - result1.r) +
          Math.abs(result3.g - result1.g) +
          Math.abs(result3.b - result1.b)
      ).toBeGreaterThan(0.01);
    });

    it('should handle extreme but valid OkLab values', () => {
      const extremeColors: LabColor[] = [
        { l: 0.1, a: 0.2, b: 0.2 }, // Dark saturated
        { l: 0.9, a: -0.1, b: -0.1 }, // Light saturated
        { l: 0.5, a: 0.3, b: -0.3 }, // Mid-tone saturated
      ];

      for (const color of extremeColors) {
        const result = oklab2lrgb(color);

        // Results might be outside [0,1] range for extreme colors
        // but should still be finite numbers
        expect(Number.isFinite(result.r)).toBe(true);
        expect(Number.isFinite(result.g)).toBe(true);
        expect(Number.isFinite(result.b)).toBe(true);
      }
    });
  });

  describe('Round-trip conversions', () => {
    it('should maintain accuracy in Linear RGB → OkLab → Linear RGB', () => {
      const originalLrgb: RGBColor = { r: 0.6, g: 0.3, b: 0.8 };

      const oklab = lrgb2oklab(originalLrgb);
      const resultLrgb = oklab2lrgb(oklab);

      const tolerance = 0.0001; // Allow small floating point error
      expect(Math.abs(resultLrgb.r - originalLrgb.r)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultLrgb.g - originalLrgb.g)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultLrgb.b - originalLrgb.b)).toBeLessThanOrEqual(
        tolerance
      );
    });

    it('should handle OkLab → Linear RGB → OkLab conversion', () => {
      const originalOklab: LabColor = { l: 0.7, a: 0.05, b: -0.1 };

      const lrgb = oklab2lrgb(originalOklab);
      const resultOklab = lrgb2oklab(lrgb);

      const tolerance = 0.0001;
      expect(Math.abs(resultOklab.l - originalOklab.l)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultOklab.a - originalOklab.a)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultOklab.b - originalOklab.b)).toBeLessThanOrEqual(
        tolerance
      );
    });

    it('should handle round-trip for primary colors', () => {
      const primaryColors: RGBColor[] = [
        { r: 1, g: 0, b: 0 }, // Red
        { r: 0, g: 1, b: 0 }, // Green
        { r: 0, g: 0, b: 1 }, // Blue
      ];

      for (const originalColor of primaryColors) {
        const oklab = lrgb2oklab(originalColor);
        const resultColor = oklab2lrgb(oklab);

        const tolerance = 0.001;
        expect(Math.abs(resultColor.r - originalColor.r)).toBeLessThanOrEqual(
          tolerance
        );
        expect(Math.abs(resultColor.g - originalColor.g)).toBeLessThanOrEqual(
          tolerance
        );
        expect(Math.abs(resultColor.b - originalColor.b)).toBeLessThanOrEqual(
          tolerance
        );
      }
    });

    it('should handle round-trip for secondary colors', () => {
      const secondaryColors: RGBColor[] = [
        { r: 1, g: 1, b: 0 }, // Yellow
        { r: 1, g: 0, b: 1 }, // Magenta
        { r: 0, g: 1, b: 1 }, // Cyan
      ];

      for (const originalColor of secondaryColors) {
        const oklab = lrgb2oklab(originalColor);
        const resultColor = oklab2lrgb(oklab);

        const tolerance = 0.001;
        expect(Math.abs(resultColor.r - originalColor.r)).toBeLessThanOrEqual(
          tolerance
        );
        expect(Math.abs(resultColor.g - originalColor.g)).toBeLessThanOrEqual(
          tolerance
        );
        expect(Math.abs(resultColor.b - originalColor.b)).toBeLessThanOrEqual(
          tolerance
        );
      }
    });

    it('should handle round-trip for grayscale colors', () => {
      const grayValues = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];

      for (const value of grayValues) {
        const originalGray: RGBColor = { r: value, g: value, b: value };
        const oklab = lrgb2oklab(originalGray);
        const resultGray = oklab2lrgb(oklab);

        const tolerance = 0.001;
        expect(Math.abs(resultGray.r - originalGray.r)).toBeLessThanOrEqual(
          tolerance
        );
        expect(Math.abs(resultGray.g - originalGray.g)).toBeLessThanOrEqual(
          tolerance
        );
        expect(Math.abs(resultGray.b - originalGray.b)).toBeLessThanOrEqual(
          tolerance
        );
      }
    });
  });

  describe('Mathematical properties', () => {
    it('should be consistent for the same input', () => {
      const lrgb: RGBColor = { r: 0.4, g: 0.6, b: 0.2 };

      const result1 = lrgb2oklab(lrgb);
      const result2 = lrgb2oklab(lrgb);

      expect(result1.l).toBe(result2.l);
      expect(result1.a).toBe(result2.a);
      expect(result1.b).toBe(result2.b);
    });

    it('should handle edge values gracefully', () => {
      const edgeColors: RGBColor[] = [
        { r: 0, g: 0, b: 0 },
        { r: 1, g: 1, b: 1 },
        { r: 1, g: 0, b: 0 },
        { r: 0, g: 1, b: 0 },
        { r: 0, g: 0, b: 1 },
      ];

      for (const color of edgeColors) {
        const oklab = lrgb2oklab(color);
        const backToLrgb = oklab2lrgb(oklab);

        // Should not produce NaN or Infinity
        expect(Number.isFinite(oklab.l)).toBe(true);
        expect(Number.isFinite(oklab.a)).toBe(true);
        expect(Number.isFinite(oklab.b)).toBe(true);
        expect(Number.isFinite(backToLrgb.r)).toBe(true);
        expect(Number.isFinite(backToLrgb.g)).toBe(true);
        expect(Number.isFinite(backToLrgb.b)).toBe(true);
      }
    });

    it('should preserve lightness ordering', () => {
      const colors: RGBColor[] = [
        { r: 0.2, g: 0.2, b: 0.2 },
        { r: 0.4, g: 0.4, b: 0.4 },
        { r: 0.6, g: 0.6, b: 0.6 },
        { r: 0.8, g: 0.8, b: 0.8 },
      ];

      const oklabResults = colors.map((color) => lrgb2oklab(color));

      // Lightness should increase monotonically
      for (let i = 1; i < oklabResults.length; i++) {
        expect(oklabResults[i].l).toBeGreaterThan(oklabResults[i - 1].l);
      }
    });
  });
});
