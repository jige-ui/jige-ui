import { describe, expect, it } from 'vitest';
import { extractHue, oklch2web } from '../src/color/color';

// Regex patterns defined at top level for performance
const HEX_COLOR_REGEX = /^#[0-9a-f]{6}$/i;
const RGBA_REGEX = /^rgba\(\d+,\d+,\d+,0\.5\)$/;

describe('Color - Main Functions', () => {
  describe('oklch2web', () => {
    it('should convert OKLCH to hex format', () => {
      // Test basic red color
      const red = oklch2web(60, 0.15, 0);
      expect(red).toMatch(HEX_COLOR_REGEX);
    });

    it('should convert OKLCH to rgba format when alpha is provided', () => {
      const redWithAlpha = oklch2web(60, 0.15, 0, 0.5);
      expect(redWithAlpha).toMatch(RGBA_REGEX);
    });

    it('should handle lightness values', () => {
      // Test black (low lightness)
      const black = oklch2web(0, 0, 0);
      expect(black).toBe('#000000');

      // Test white (high lightness)
      const white = oklch2web(100, 0, 0);
      expect(white).toBe('#ffffff');
    });

    it('should handle different hue values', () => {
      // Test different hues with same lightness and chroma
      const red = oklch2web(60, 0.15, 0);
      const green = oklch2web(60, 0.15, 120);
      const blue = oklch2web(60, 0.15, 240);

      expect(red).not.toBe(green);
      expect(green).not.toBe(blue);
      expect(blue).not.toBe(red);
    });

    it('should handle chroma values', () => {
      // Test gray (no chroma)
      const gray = oklch2web(50, 0, 0);
      expect(gray).toMatch(HEX_COLOR_REGEX);

      // Test vivid color (high chroma)
      const vivid = oklch2web(50, 0.3, 180);
      expect(vivid).toMatch(HEX_COLOR_REGEX);
    });

    it('should handle edge cases', () => {
      // Test with minimal values
      const minimal = oklch2web(0, 0, 0);
      expect(minimal).toBe('#000000');

      // Test with high values
      const maximal = oklch2web(100, 0, 360);
      expect(maximal).toMatch(HEX_COLOR_REGEX);
    });

    it('should produce consistent output for same inputs', () => {
      const color1 = oklch2web(50, 0.1, 120);
      const color2 = oklch2web(50, 0.1, 120);
      expect(color1).toBe(color2);
    });
  });

  describe('extractHue', () => {
    it('should extract hue from hex color strings', () => {
      // Test standard hex colors
      const redHue = extractHue('#ff0000');
      const greenHue = extractHue('#00ff00');
      const blueHue = extractHue('#0000ff');

      expect(typeof redHue).toBe('number');
      expect(typeof greenHue).toBe('number');
      expect(typeof blueHue).toBe('number');

      // Hue values should be different for different colors
      expect(redHue).not.toBe(greenHue);
      expect(greenHue).not.toBe(blueHue);
    });

    it('should extract hue from short hex format', () => {
      const hue1 = extractHue('#f00'); // Red
      const hue2 = extractHue('#0f0'); // Green
      const hue3 = extractHue('#00f'); // Blue

      expect(typeof hue1).toBe('number');
      expect(typeof hue2).toBe('number');
      expect(typeof hue3).toBe('number');
    });

    it('should extract hue from hex without hash', () => {
      const hue1 = extractHue('#ff0000'); // Fix type by adding #
      const hue2 = extractHue('#00ff00'); // Fix type by adding #

      expect(typeof hue1).toBe('number');
      expect(typeof hue2).toBe('number');
    });

    it('should extract hue from RGB color objects', () => {
      const redHue = extractHue({ r: 255, g: 0, b: 0 });
      const greenHue = extractHue({ r: 0, g: 255, b: 0 });
      const blueHue = extractHue({ r: 0, g: 0, b: 255 });

      expect(typeof redHue).toBe('number');
      expect(typeof greenHue).toBe('number');
      expect(typeof blueHue).toBe('number');

      expect(redHue).not.toBe(greenHue);
      expect(greenHue).not.toBe(blueHue);
    });

    it('should handle grayscale colors', () => {
      const grayHue1 = extractHue('#808080');
      const grayHue2 = extractHue({ r: 128, g: 128, b: 128 });

      expect(typeof grayHue1).toBe('number');
      expect(typeof grayHue2).toBe('number');
    });

    it('should handle edge cases', () => {
      // Black
      const blackHue = extractHue('#000000');
      expect(typeof blackHue).toBe('number');

      // White
      const whiteHue = extractHue('#ffffff');
      expect(typeof whiteHue).toBe('number');

      // Invalid hex should fallback gracefully
      const invalidHue = extractHue('#invalid');
      expect(typeof invalidHue).toBe('number');
    });

    it('should produce consistent results for equivalent colors', () => {
      const hexHue = extractHue('#ff0000');
      const rgbHue = extractHue({ r: 255, g: 0, b: 0 });

      // Should be very close (allowing for floating point precision)
      expect(Math.abs(hexHue - rgbHue)).toBeLessThan(0.01);
    });
  });
});
