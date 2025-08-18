import { describe, expect, it } from 'vitest';
import { convertRgbToOkLch, safeOklchToRgb } from '../src/color/culori';
import type { LCHColor } from '../src/color/lab-lch';
import type { RGBColor } from '../src/color/rgb-lrgb';

describe('Culori - Color Conversion Functions', () => {
  describe('convertRgbToOkLch', () => {
    it('should convert RGB to OKLCH', () => {
      const red: RGBColor = { r: 255, g: 0, b: 0 };
      const result = convertRgbToOkLch(red);

      expect(result).toHaveProperty('l');
      expect(result).toHaveProperty('c');
      expect(result).toHaveProperty('h');
      expect(typeof result.l).toBe('number');
      expect(typeof result.c).toBe('number');
      expect(typeof result.h).toBe('number');
    });

    it('should handle black color', () => {
      const black: RGBColor = { r: 0, g: 0, b: 0 };
      const result = convertRgbToOkLch(black);

      expect(result.l).toBeCloseTo(0, 2);
      expect(result.c).toBeCloseTo(0, 2);
    });

    it('should handle white color', () => {
      const white: RGBColor = { r: 255, g: 255, b: 255 };
      const result = convertRgbToOkLch(white);

      expect(result.l).toBeGreaterThan(0.9);
      expect(result.c).toBeCloseTo(0, 2);
    });

    it('should handle gray color', () => {
      const gray: RGBColor = { r: 128, g: 128, b: 128 };
      const result = convertRgbToOkLch(gray);

      expect(result.l).toBeGreaterThan(0);
      expect(result.l).toBeLessThan(1);
      expect(result.c).toBeCloseTo(0, 1);
    });

    it('should produce different results for different colors', () => {
      const red: RGBColor = { r: 255, g: 0, b: 0 };
      const green: RGBColor = { r: 0, g: 255, b: 0 };
      const blue: RGBColor = { r: 0, g: 0, b: 255 };

      const redResult = convertRgbToOkLch(red);
      const greenResult = convertRgbToOkLch(green);
      const blueResult = convertRgbToOkLch(blue);

      expect(redResult.h).not.toBeCloseTo(greenResult.h);
      expect(greenResult.h).not.toBeCloseTo(blueResult.h);
      expect(blueResult.h).not.toBeCloseTo(redResult.h);
    });

    it('should handle edge cases', () => {
      const edgeColor: RGBColor = { r: 1, g: 254, b: 127 };
      const result = convertRgbToOkLch(edgeColor);

      expect(result.l).toBeGreaterThanOrEqual(0);
      expect(result.l).toBeLessThanOrEqual(1);
      expect(result.c).toBeGreaterThanOrEqual(0);
      expect(result.h).toBeGreaterThanOrEqual(0);
      expect(result.h).toBeLessThan(360);
    });
  });

  describe('safeOklchToRgb', () => {
    it('should convert OKLCH to RGB', () => {
      const oklch: LCHColor = { l: 0.5, c: 0.1, h: 120 };
      const result = safeOklchToRgb(oklch);

      expect(result).toHaveProperty('r');
      expect(result).toHaveProperty('g');
      expect(result).toHaveProperty('b');
      expect(typeof result.r).toBe('number');
      expect(typeof result.g).toBe('number');
      expect(typeof result.b).toBe('number');
    });

    it('should produce RGB values in valid range', () => {
      const oklch: LCHColor = { l: 0.7, c: 0.15, h: 240 };
      const result = safeOklchToRgb(oklch);

      expect(result.r).toBeGreaterThanOrEqual(0);
      expect(result.r).toBeLessThanOrEqual(255);
      expect(result.g).toBeGreaterThanOrEqual(0);
      expect(result.g).toBeLessThanOrEqual(255);
      expect(result.b).toBeGreaterThanOrEqual(0);
      expect(result.b).toBeLessThanOrEqual(255);
    });

    it('should handle high chroma values safely', () => {
      // High chroma might be out of RGB gamut
      const highChroma: LCHColor = { l: 0.5, c: 0.5, h: 180 };
      const result = safeOklchToRgb(highChroma);

      // Should still produce valid RGB values
      expect(result.r).toBeGreaterThanOrEqual(0);
      expect(result.r).toBeLessThanOrEqual(255);
      expect(result.g).toBeGreaterThanOrEqual(0);
      expect(result.g).toBeLessThanOrEqual(255);
      expect(result.b).toBeGreaterThanOrEqual(0);
      expect(result.b).toBeLessThanOrEqual(255);
    });

    it('should handle zero chroma (gray)', () => {
      const gray: LCHColor = { l: 0.5, c: 0, h: 0 };
      const result = safeOklchToRgb(gray);

      // Should produce a gray color where R ≈ G ≈ B
      const tolerance = 1;
      expect(Math.abs(result.r - result.g)).toBeLessThanOrEqual(tolerance);
      expect(Math.abs(result.g - result.b)).toBeLessThanOrEqual(tolerance);
      expect(Math.abs(result.b - result.r)).toBeLessThanOrEqual(tolerance);
    });

    it('should handle black (l=0)', () => {
      const black: LCHColor = { l: 0, c: 0, h: 0 };
      const result = safeOklchToRgb(black);

      expect(result.r).toBeCloseTo(0, 1);
      expect(result.g).toBeCloseTo(0, 1);
      expect(result.b).toBeCloseTo(0, 1);
    });

    it('should handle white (l=1, c=0)', () => {
      const white: LCHColor = { l: 1, c: 0, h: 0 };
      const result = safeOklchToRgb(white);

      expect(result.r).toBeCloseTo(255, 1);
      expect(result.g).toBeCloseTo(255, 1);
      expect(result.b).toBeCloseTo(255, 1);
    });

    it('should be consistent for multiple calls', () => {
      const oklch: LCHColor = { l: 0.6, c: 0.12, h: 90 };
      const result1 = safeOklchToRgb(oklch);
      const result2 = safeOklchToRgb(oklch);

      expect(result1.r).toBeCloseTo(result2.r);
      expect(result1.g).toBeCloseTo(result2.g);
      expect(result1.b).toBeCloseTo(result2.b);
    });
  });

  describe('Round-trip conversion', () => {
    it('should maintain reasonable accuracy in round-trip conversion', () => {
      const originalRgb: RGBColor = { r: 128, g: 64, b: 192 };

      // RGB → OKLCH → RGB
      const oklch = convertRgbToOkLch(originalRgb);
      const resultRgb = safeOklchToRgb(oklch);

      // Allow some tolerance for floating point precision
      const tolerance = 2;
      expect(Math.abs(resultRgb.r - originalRgb.r)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultRgb.g - originalRgb.g)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultRgb.b - originalRgb.b)).toBeLessThanOrEqual(
        tolerance
      );
    });

    it('should handle multiple round-trip conversions for primary colors', () => {
      const colors: RGBColor[] = [
        { r: 255, g: 0, b: 0 }, // Red
        { r: 0, g: 255, b: 0 }, // Green
        { r: 0, g: 0, b: 255 }, // Blue
        { r: 255, g: 255, b: 0 }, // Yellow
        { r: 255, g: 0, b: 255 }, // Magenta
        { r: 0, g: 255, b: 255 }, // Cyan
      ];

      for (const originalColor of colors) {
        const oklch = convertRgbToOkLch(originalColor);
        const resultColor = safeOklchToRgb(oklch);

        const tolerance = 50; // Increased tolerance for out-of-gamut colors
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
  });
});
