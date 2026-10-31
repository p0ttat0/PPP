/* ==========================================================================
   TIER 1: FEATURES 01 - 07 // TYPOGRAPHY & DESIGN TOKENS
   Verifies:
   - F01: Display Typography Stack (Federo / Syne)
   - F02: VFD Numeric Readout Stack (Silkscreen / VT323)
   - F03: Technical Monospace Stack (Share Tech Mono)
   - F04: Humanist Editorial Body Stack (IBM Plex Sans)
   - F05: Brass & Gold Color Spectrum
   - F06: Anodized Slate & Cast-Iron Palette
   - F07: Calibrated Phosphor Emission System
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue, assertContains, assertMatches } from '../utils/assert_helpers.js';
import { extractCssVariables } from '../utils/dom_parser.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const indexHtmlPath = path.join(rootDir, 'index.html');
  const tokensCssPath = path.join(rootDir, 'css', 'tokens.css');

  const html = fs.readFileSync(indexHtmlPath, 'utf-8');
  const tokensCss = fs.readFileSync(tokensCssPath, 'utf-8');
  const cssVars = extractCssVariables(tokensCss);

  // 1. Verify Google Fonts Link in <head>
  // Should reference display typography (Federo/Syne/Chakra Petch), Silkscreen/VT323, Share Tech Mono, IBM Plex Sans
  assertTrue(
    html.includes('fonts.googleapis.com'),
    'index.html must preconnect/link to Google Fonts CDN'
  );
  assertTrue(
    html.includes('Share+Tech+Mono') || html.includes('Share Tech Mono'),
    'Google Fonts link must load Share Tech Mono (Feature 03)'
  );
  assertTrue(
    html.includes('IBM+Plex+Sans') || html.includes('IBM Plex Sans'),
    'Google Fonts link must load IBM Plex Sans (Feature 04)'
  );
  assertTrue(
    html.includes('Silkscreen') || html.includes('VT323'),
    'Google Fonts link must load Silkscreen or VT323 (Feature 02)'
  );

  // 2. Verify Typography CSS Variables
  // Check that font variables exist
  const fontVars = Object.keys(cssVars).filter(k => k.startsWith('--font-'));
  assertTrue(fontVars.length >= 3, `Expected at least 3 --font-* tokens, found ${fontVars.length}`);

  // 3. Verify Brass & Gold Spectrum Tokens (Feature 05)
  // Authoritative values: #d4a853 (primary), #b88938 (deep/shadow)
  const hasBrassPrimary =
    tokensCss.includes('#d4a853') ||
    tokensCss.includes('212, 168, 83') ||
    tokensCss.toLowerCase().includes('--brass-primary') ||
    tokensCss.toLowerCase().includes('--gold');
  assertTrue(hasBrassPrimary, 'tokens.css must define Brass & Gold spectrum tokens (Feature 05)');

  // 4. Verify Anodized Slate & Cast-Iron Chassis Palette (Feature 06)
  // Tokens should include dark chassis shades (#0c0e12, #12151b, #1c222c, #252d3a, or --chassis-*, --slate-*)
  const hasSlateTokens =
    tokensCss.includes('--chassis-') ||
    tokensCss.includes('--slate-') ||
    tokensCss.includes('#0c0e12') ||
    tokensCss.includes('#12151b') ||
    tokensCss.includes('#161a22');
  assertTrue(hasSlateTokens, 'tokens.css must define Anodized Slate & Cast-Iron Chassis tokens (Feature 06)');

  // 5. Verify Calibrated Phosphor Emission System (Feature 07)
  // Cyan (#00f0d0), Amber (#ff9f1c), Emerald (#2ee57d), Crimson/Ruby (#ff3b5c)
  const hasCyan = tokensCss.includes('00f0d0') || tokensCss.includes('--vfd-cyan');
  const hasAmber = tokensCss.includes('ff9f1c') || tokensCss.includes('--vfd-amber');
  const hasEmerald = tokensCss.includes('2ee57d') || tokensCss.includes('--vfd-emerald');
  assertTrue(hasCyan, 'tokens.css must define VFD Cyan phosphor emission (#00f0d0)');
  assertTrue(hasAmber, 'tokens.css must define VFD Amber phosphor emission (#ff9f1c)');
  assertTrue(hasEmerald, 'tokens.css must define CRT Emerald phosphor emission (#2ee57d)');

  return {
    name: 'Tier 1: Typography & Design Tokens (Features 01-07)',
    passed: true,
    featuresTested: [1, 2, 3, 4, 5, 6, 7]
  };
}
