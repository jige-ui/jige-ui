import { describe, expect, it } from 'vitest';
import { extractHue, oklch2web } from '../src/color/color';
import { convertRgbToOkLch } from '../src/color/culori';
import { lab2lch, lch2lab } from '../src/color/lab-lch';
import { lrgb2oklab, oklab2lrgb } from '../src/color/lrgb-oklab';
import { lrgb2rgb, rgb2lrgb } from '../src/color/rgb-lrgb';

// Regex patterns defined at top level for performance
const HEX_COLOR_REGEX = /^#[0-9a-f]{6}$/i;
const RGBA_REGEX_080 = /^rgba\(\d+,\d+,\d+,0\.8\)$/;

describe('Integration Tests - Full Color Pipeline', () => {
  describe('Complete conversion pipeline', () => {
    it('should handle RGB → sRGB → Linear RGB → OkLab → LCH → OkLab → Linear RGB → sRGB → RGB', () => {
      const originalRgb = { r: 200, g: 100, b: 150 };

      // Full forward pipeline
      const linearRgb = rgb2lrgb(originalRgb);
      const oklab = lrgb2oklab(linearRgb);
      const lch = lab2lch(oklab);

      // Full reverse pipeline
      const backToOklab = lch2lab(lch);
      const backToLinearRgb = oklab2lrgb(backToOklab);
      const backToRgb = lrgb2rgb(backToLinearRgb);

      // Normalize back to integers
      const resultRgb = {
        r: Math.round(backToRgb.r),
        g: Math.round(backToRgb.g),
        b: Math.round(backToRgb.b),
      };

      const tolerance = 2; // Allow for some rounding error
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

    it('should handle hex color through full pipeline', () => {
      const hexColor = '#ff6b9d';

      // Extract hue using the main function
      const hue = extractHue(hexColor);
      expect(typeof hue).toBe('number');
      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThan(360);

      // Convert using RGB pipeline for comparison
      const rgbExtracted = extractHue({ r: 255, g: 107, b: 157 });
      expect(Math.abs(hue - rgbExtracted)).toBeLessThan(1);
    });

    it('should maintain color relationships through pipeline', () => {
      const red = { r: 255, g: 0, b: 0 };
      const green = { r: 0, g: 255, b: 0 };
      const blue = { r: 0, g: 0, b: 255 };

      const redLch = lab2lch(lrgb2oklab(rgb2lrgb(red)));
      const greenLch = lab2lch(lrgb2oklab(rgb2lrgb(green)));
      const blueLch = lab2lch(lrgb2oklab(rgb2lrgb(blue)));

      // Hues should be significantly different
      expect(Math.abs(redLch.h - greenLch.h)).toBeGreaterThan(30);
      expect(Math.abs(greenLch.h - blueLch.h)).toBeGreaterThan(30);
      expect(Math.abs(blueLch.h - redLch.h)).toBeGreaterThan(30);

      // All should have reasonable chroma
      expect(redLch.c).toBeGreaterThan(0.1);
      expect(greenLch.c).toBeGreaterThan(0.1);
      expect(blueLch.c).toBeGreaterThan(0.1);
    });
  });

  describe('oklch2web function integration', () => {
    it('should produce valid CSS colors for various inputs', () => {
      const testCases = [
        { l: 50, c: 0.1, h: 0 }, // Red-ish
        { l: 50, c: 0.1, h: 120 }, // Green-ish
        { l: 50, c: 0.1, h: 240 }, // Blue-ish
        { l: 80, c: 0.05, h: 60 }, // Light yellow-ish
        { l: 20, c: 0.15, h: 300 }, // Dark purple-ish
      ];

      for (const { l, c, h } of testCases) {
        const hexColor = oklch2web(l, c, h);
        expect(hexColor).toMatch(HEX_COLOR_REGEX);

        const rgbaColor = oklch2web(l, c, h, 0.8);
        expect(rgbaColor).toMatch(RGBA_REGEX_080);
      }
    });

    it('should handle grayscale colors correctly', () => {
      const lightness = [0, 25, 50, 75, 100];

      for (const l of lightness) {
        const grayHex = oklch2web(l, 0, 0); // Zero chroma = gray

        // Extract RGB components from hex
        const r = Number.parseInt(grayHex.slice(1, 3), 16);
        const g = Number.parseInt(grayHex.slice(3, 5), 16);
        const b = Number.parseInt(grayHex.slice(5, 7), 16);

        // Should be approximately equal for gray colors
        const tolerance = 3;
        expect(Math.abs(r - g)).toBeLessThanOrEqual(tolerance);
        expect(Math.abs(g - b)).toBeLessThanOrEqual(tolerance);
        expect(Math.abs(b - r)).toBeLessThanOrEqual(tolerance);
      }
    });

    it('should maintain hue consistency across lightness levels', () => {
      const targetHue = 180; // Cyan-ish
      const chroma = 0.1;
      const lightnesses = [20, 40, 60, 80];

      for (const l of lightnesses) {
        const color = oklch2web(l, chroma, targetHue);
        expect(color).toMatch(HEX_COLOR_REGEX);

        // Convert back to RGB and extract hue for verification
        const r = Number.parseInt(color.slice(1, 3), 16);
        const g = Number.parseInt(color.slice(3, 5), 16);
        const b = Number.parseInt(color.slice(5, 7), 16);

        const extractedHue = extractHue({ r, g, b });

        // Allow some tolerance for hue consistency
        const hueDiff = Math.min(
          Math.abs(extractedHue - targetHue),
          Math.abs(extractedHue - targetHue + 360),
          Math.abs(extractedHue - targetHue - 360)
        );
        expect(hueDiff).toBeLessThan(20); // Allow reasonable tolerance
      }
    });
  });

  describe('Real-world color scenarios', () => {
    it('should handle common web colors correctly', () => {
      const webColors = [
        { name: 'red', hex: '#ff0000', expected: { r: 255, g: 0, b: 0 } },
        { name: 'lime', hex: '#00ff00', expected: { r: 0, g: 255, b: 0 } },
        { name: 'blue', hex: '#0000ff', expected: { r: 0, g: 0, b: 255 } },
        { name: 'yellow', hex: '#ffff00', expected: { r: 255, g: 255, b: 0 } },
        { name: 'cyan', hex: '#00ffff', expected: { r: 0, g: 255, b: 255 } },
        { name: 'magenta', hex: '#ff00ff', expected: { r: 255, g: 0, b: 255 } },
        { name: 'black', hex: '#000000', expected: { r: 0, g: 0, b: 0 } },
        { name: 'white', hex: '#ffffff', expected: { r: 255, g: 255, b: 255 } },
      ];

      for (const { hex, expected } of webColors) {
        const hue1 = extractHue(hex as `#${string}`); // Cast to satisfy type system
        const hue2 = extractHue(expected);

        // Hues should match (within tolerance, especially for grays/neutrals)
        if (expected.r === expected.g && expected.g === expected.b) {
          // Neutral colors - hue is undefined, just check it's a number
          expect(typeof hue1).toBe('number');
          expect(typeof hue2).toBe('number');
        } else {
          // Colored - hues should be close
          const hueDiff = Math.min(
            Math.abs(hue1 - hue2),
            Math.abs(hue1 - hue2 + 360),
            Math.abs(hue1 - hue2 - 360)
          );
          expect(hueDiff).toBeLessThan(1);
        }
      }
    });

    it('should generate OKLCH colors that convert back accurately', () => {
      const oklchColors = [
        { l: 70, c: 0.1, h: 30 }, // Orange-ish
        { l: 60, c: 0.15, h: 150 }, // Green-ish
        { l: 40, c: 0.12, h: 270 }, // Purple-ish
        { l: 85, c: 0.05, h: 90 }, // Light yellow-ish
      ];

      for (const { l, c, h } of oklchColors) {
        // Generate web color
        const webColor = oklch2web(l, c, h);

        // Extract RGB
        const r = Number.parseInt(webColor.slice(1, 3), 16);
        const g = Number.parseInt(webColor.slice(3, 5), 16);
        const b = Number.parseInt(webColor.slice(5, 7), 16);

        // Convert back through full pipeline
        const backToOklch = convertRgbToOkLch({ r, g, b });

        // Check accuracy (allowing for some loss through RGB quantization)
        expect(Math.abs(backToOklch.l * 100 - l)).toBeLessThan(5);
        expect(Math.abs(backToOklch.c - c)).toBeLessThan(0.02);

        // Hue comparison with wrap-around
        const hueDiff = Math.min(
          Math.abs(backToOklch.h - h),
          Math.abs(backToOklch.h - h + 360),
          Math.abs(backToOklch.h - h - 360)
        );
        expect(hueDiff).toBeLessThan(10);
      }
    });

    it('should handle color accessibility scenarios', () => {
      // Test high contrast scenarios
      const darkColor = oklch2web(20, 0.05, 200); // Dark blue-ish
      const lightColor = oklch2web(80, 0.05, 60); // Light yellow-ish

      expect(darkColor).toMatch(HEX_COLOR_REGEX);
      expect(lightColor).toMatch(HEX_COLOR_REGEX);

      // Extract lightness values
      const darkRgb = {
        r: Number.parseInt(darkColor.slice(1, 3), 16),
        g: Number.parseInt(darkColor.slice(3, 5), 16),
        b: Number.parseInt(darkColor.slice(5, 7), 16),
      };

      const lightRgb = {
        r: Number.parseInt(lightColor.slice(1, 3), 16),
        g: Number.parseInt(lightColor.slice(3, 5), 16),
        b: Number.parseInt(lightColor.slice(5, 7), 16),
      };

      // Dark color should have lower RGB values
      expect(darkRgb.r + darkRgb.g + darkRgb.b).toBeLessThan(
        lightRgb.r + lightRgb.g + lightRgb.b
      );
    });
  });
});
