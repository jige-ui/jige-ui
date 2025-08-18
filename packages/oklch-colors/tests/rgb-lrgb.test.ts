import { describe, expect, it } from 'vitest';
import { lrgb2rgb, type RGBColor, rgb2lrgb } from '../src/color/rgb-lrgb';

describe('RGB ↔ Linear RGB Conversions', () => {
  describe('rgb2lrgb', () => {
    it('should convert sRGB to linear RGB', () => {
      const rgb: RGBColor = { r: 128, g: 128, b: 128 };
      const result = rgb2lrgb(rgb);

      expect(result).toHaveProperty('r');
      expect(result).toHaveProperty('g');
      expect(result).toHaveProperty('b');
      expect(typeof result.r).toBe('number');
      expect(typeof result.g).toBe('number');
      expect(typeof result.b).toBe('number');
    });

    it('should produce linear RGB values in [0,1] range', () => {
      const rgb: RGBColor = { r: 255, g: 128, b: 64 };
      const result = rgb2lrgb(rgb);

      expect(result.r).toBeGreaterThanOrEqual(0);
      expect(result.r).toBeLessThanOrEqual(1);
      expect(result.g).toBeGreaterThanOrEqual(0);
      expect(result.g).toBeLessThanOrEqual(1);
      expect(result.b).toBeGreaterThanOrEqual(0);
      expect(result.b).toBeLessThanOrEqual(1);
    });

    it('should handle black color (0,0,0)', () => {
      const black: RGBColor = { r: 0, g: 0, b: 0 };
      const result = rgb2lrgb(black);

      expect(result.r).toBeCloseTo(0);
      expect(result.g).toBeCloseTo(0);
      expect(result.b).toBeCloseTo(0);
    });

    it('should handle white color (255,255,255)', () => {
      const white: RGBColor = { r: 255, g: 255, b: 255 };
      const result = rgb2lrgb(white);

      expect(result.r).toBeCloseTo(1);
      expect(result.g).toBeCloseTo(1);
      expect(result.b).toBeCloseTo(1);
    });

    it('should handle mid-gray correctly', () => {
      const midGray: RGBColor = { r: 128, g: 128, b: 128 };
      const result = rgb2lrgb(midGray);

      // Mid-gray in sRGB should be around 0.2 in linear RGB due to gamma correction
      expect(result.r).toBeCloseTo(0.2, 1);
      expect(result.g).toBeCloseTo(0.2, 1);
      expect(result.b).toBeCloseTo(0.2, 1);
    });

    it('should apply gamma correction consistently', () => {
      const rgb1: RGBColor = { r: 255, g: 0, b: 0 };
      const rgb2: RGBColor = { r: 0, g: 255, b: 0 };
      const rgb3: RGBColor = { r: 0, g: 0, b: 255 };

      const result1 = rgb2lrgb(rgb1);
      const result2 = rgb2lrgb(rgb2);
      const result3 = rgb2lrgb(rgb3);

      // All should have one channel at 1.0 and others at 0.0
      expect(result1.r).toBeCloseTo(1);
      expect(result1.g).toBeCloseTo(0);
      expect(result1.b).toBeCloseTo(0);

      expect(result2.r).toBeCloseTo(0);
      expect(result2.g).toBeCloseTo(1);
      expect(result2.b).toBeCloseTo(0);

      expect(result3.r).toBeCloseTo(0);
      expect(result3.g).toBeCloseTo(0);
      expect(result3.b).toBeCloseTo(1);
    });
  });

  describe('lrgb2rgb', () => {
    it('should convert linear RGB to sRGB', () => {
      const lrgb: RGBColor = { r: 0.5, g: 0.5, b: 0.5 };
      const result = lrgb2rgb(lrgb);

      expect(result).toHaveProperty('r');
      expect(result).toHaveProperty('g');
      expect(result).toHaveProperty('b');
      expect(typeof result.r).toBe('number');
      expect(typeof result.g).toBe('number');
      expect(typeof result.b).toBe('number');
    });

    it('should produce sRGB values in [0,255] range', () => {
      const lrgb: RGBColor = { r: 0.8, g: 0.3, b: 0.1 };
      const result = lrgb2rgb(lrgb);

      expect(result.r).toBeGreaterThanOrEqual(0);
      expect(result.r).toBeLessThanOrEqual(255);
      expect(result.g).toBeGreaterThanOrEqual(0);
      expect(result.g).toBeLessThanOrEqual(255);
      expect(result.b).toBeGreaterThanOrEqual(0);
      expect(result.b).toBeLessThanOrEqual(255);
    });

    it('should handle linear black (0,0,0)', () => {
      const linearBlack: RGBColor = { r: 0, g: 0, b: 0 };
      const result = lrgb2rgb(linearBlack);

      expect(result.r).toBeCloseTo(0);
      expect(result.g).toBeCloseTo(0);
      expect(result.b).toBeCloseTo(0);
    });

    it('should handle linear white (1,1,1)', () => {
      const linearWhite: RGBColor = { r: 1, g: 1, b: 1 };
      const result = lrgb2rgb(linearWhite);

      expect(result.r).toBeCloseTo(255);
      expect(result.g).toBeCloseTo(255);
      expect(result.b).toBeCloseTo(255);
    });

    it('should apply inverse gamma correction', () => {
      const linearMidGray: RGBColor = { r: 0.2, g: 0.2, b: 0.2 };
      const result = lrgb2rgb(linearMidGray);

      // Linear 0.2 should convert to approximately sRGB 124 (not 128 due to gamma curve)
      expect(result.r).toBeCloseTo(124, 0);
      expect(result.g).toBeCloseTo(124, 0);
      expect(result.b).toBeCloseTo(124, 0);
    });
  });

  describe('Round-trip conversions', () => {
    it('should maintain accuracy in sRGB → Linear → sRGB conversion', () => {
      const originalRgb: RGBColor = { r: 200, g: 100, b: 50 };

      const linearRgb = rgb2lrgb(originalRgb);
      const resultRgb = lrgb2rgb(linearRgb);

      const tolerance = 1; // Allow 1 unit of error due to floating point
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

    it('should handle round-trip for all primary and secondary colors', () => {
      const testColors: RGBColor[] = [
        { r: 255, g: 0, b: 0 }, // Red
        { r: 0, g: 255, b: 0 }, // Green
        { r: 0, g: 0, b: 255 }, // Blue
        { r: 255, g: 255, b: 0 }, // Yellow
        { r: 255, g: 0, b: 255 }, // Magenta
        { r: 0, g: 255, b: 255 }, // Cyan
        { r: 128, g: 128, b: 128 }, // Gray
        { r: 64, g: 128, b: 192 }, // Arbitrary color
      ];

      for (const originalColor of testColors) {
        const linearColor = rgb2lrgb(originalColor);
        const resultColor = lrgb2rgb(linearColor);

        const tolerance = 1;
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

    it('should handle Linear → sRGB → Linear conversion', () => {
      const originalLinear: RGBColor = { r: 0.3, g: 0.6, b: 0.9 };

      const srgb = lrgb2rgb(originalLinear);
      const resultLinear = rgb2lrgb(srgb);

      const tolerance = 0.01; // Allow small floating point error
      expect(Math.abs(resultLinear.r - originalLinear.r)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultLinear.g - originalLinear.g)).toBeLessThanOrEqual(
        tolerance
      );
      expect(Math.abs(resultLinear.b - originalLinear.b)).toBeLessThanOrEqual(
        tolerance
      );
    });

    it('should be consistent for edge values', () => {
      const edgeValues = [0, 1, 127, 128, 254, 255];

      for (const r of edgeValues) {
        for (const g of edgeValues) {
          for (const b of edgeValues) {
            const original: RGBColor = { r, g, b };
            const linear = rgb2lrgb(original);
            const result = lrgb2rgb(linear);

            const tolerance = 1;
            expect(Math.abs(result.r - original.r)).toBeLessThanOrEqual(
              tolerance
            );
            expect(Math.abs(result.g - original.g)).toBeLessThanOrEqual(
              tolerance
            );
            expect(Math.abs(result.b - original.b)).toBeLessThanOrEqual(
              tolerance
            );
          }
        }
      }
    });
  });

  describe('Mathematical properties', () => {
    it('should be monotonic (preserving order)', () => {
      const values = [0, 64, 128, 192, 255];
      const linearValues = values.map((v) => rgb2lrgb({ r: v, g: v, b: v }).r);

      for (let i = 1; i < linearValues.length; i++) {
        expect(linearValues[i]).toBeGreaterThan(linearValues[i - 1]);
      }
    });

    it('should handle very small values correctly', () => {
      const smallRgb: RGBColor = { r: 1, g: 2, b: 3 };
      const result = rgb2lrgb(smallRgb);

      expect(result.r).toBeGreaterThan(0);
      expect(result.g).toBeGreaterThan(0);
      expect(result.b).toBeGreaterThan(0);
      expect(result.r).toBeLessThan(0.01);
      expect(result.g).toBeLessThan(0.01);
      expect(result.b).toBeLessThan(0.01);
    });
  });
});
