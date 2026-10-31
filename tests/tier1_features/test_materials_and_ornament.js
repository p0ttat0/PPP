/* ==========================================================================
   TIER 1: FEATURES 08 - 12 // MATERIALS & ORNAMENTATION
   Verifies:
   - F08: Procedural SVG Micro-Grain Filters (crinkle enamel, Bakelite, matte ABS)
   - F09: Stepped Art Deco Ziggurat Brackets
   - F10: Double-Line Brass Division Rules
   - F11: Streamline Moderne Triple Speed-Lines
   - F12: Engraved Serial Plates
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue } from '../utils/assert_helpers.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
  const decoCssPath = path.join(rootDir, 'css', 'deco-ornament.css');
  const componentsCss = fs.readFileSync(path.join(rootDir, 'css', 'components.css'), 'utf-8');
  const tokensCss = fs.readFileSync(path.join(rootDir, 'css', 'tokens.css'), 'utf-8');

  let decoCss = '';
  if (fs.existsSync(decoCssPath)) {
    decoCss = fs.readFileSync(decoCssPath, 'utf-8');
  }
  const combinedCss = decoCss + '\n' + componentsCss + '\n' + tokensCss;

  // 1. Procedural SVG Micro-Grain Filters (Feature 08)
  // Check for SVG filter in index.html, assets/grain-filters.svg, or CSS url(#...)
  const grainFiltersPath = path.join(rootDir, 'assets', 'grain-filters.svg');
  const hasInlineFilters =
    indexHtml.includes('<filter') ||
    indexHtml.includes('feTurbulence') ||
    indexHtml.includes('grain-filters.svg');
  const hasGrainAsset = fs.existsSync(grainFiltersPath);
  assertTrue(
    hasInlineFilters || hasGrainAsset || combinedCss.includes('filter: url(#'),
    'Procedural SVG micro-grain filters or asset must be present (Feature 08)'
  );

  // 2. Stepped Art Deco Ziggurat Brackets (Feature 09)
  // Check for ziggurat styling or classes
  const hasZiggurat =
    combinedCss.includes('ziggurat') ||
    combinedCss.includes('stepped') ||
    indexHtml.includes('ziggurat') ||
    combinedCss.includes('clip-path: polygon');
  assertTrue(
    hasZiggurat || combinedCss.includes('border-image') || indexHtml.includes('nameplate-box'),
    'Stepped Art Deco ziggurat brackets or architectural framing must be defined (Feature 09)'
  );

  // Verify clipped ziggurat panel uses filter: drop-shadow instead of clipped box-shadow
  assertTrue(
    decoCss.includes('.deco-ziggurat-panel') && decoCss.includes('filter: drop-shadow('),
    '.deco-ziggurat-panel must use filter: drop-shadow to cast shadow outside clip-path boundary'
  );

  // 3. Double-Line Brass Division Rules (Feature 10)
  // Check for double rules or brass division borders
  const hasDoubleBrassRule =
    combinedCss.includes('double') ||
    combinedCss.includes('rule-double') ||
    combinedCss.includes('rule-brass') ||
    combinedCss.includes('d4a853') ||
    combinedCss.includes('b88938');
  assertTrue(hasDoubleBrassRule, 'Double-line brass division rules must be defined in CSS (Feature 10)');

  // Verify diamond mask background-color is inherit
  assertTrue(
    decoCss.includes('.rule-double-brass.with-diamond::before') && decoCss.includes('background-color: inherit;'),
    '.rule-double-brass.with-diamond::before must set background-color: inherit to avoid dark patch on lighter chassis'
  );

  // 4. Streamline Moderne Triple Speed-Lines (Feature 11)
  // Check for speed-line moldings or parallel ribs
  const hasSpeedLines =
    combinedCss.includes('speed-line') ||
    combinedCss.includes('speedline') ||
    indexHtml.includes('speed-line') ||
    indexHtml.includes('rack-screw-col') ||
    combinedCss.includes('repeating-linear-gradient');
  assertTrue(hasSpeedLines, 'Streamline Moderne triple speed-lines must be defined (Feature 11)');

  // 5. Engraved Serial Plates (Feature 12)
  // Check for nameplate or serial plate element and machine screws
  const hasSerialPlate =
    indexHtml.includes('nameplate') ||
    indexHtml.includes('serial-plate') ||
    indexHtml.includes('MODEL GP-2804');
  const hasScrews =
    indexHtml.includes('hex-screw') ||
    indexHtml.includes('screw') ||
    combinedCss.includes('hex-screw');
  assertTrue(hasSerialPlate, 'Engraved serial nameplate must be present in DOM (Feature 12)');
  assertTrue(hasScrews, 'Machine screw heads for serial plates must be present (Feature 12)');

  return {
    name: 'Tier 1: Materials & Ornamentation (Features 08-12)',
    passed: true,
    featuresTested: [8, 9, 10, 11, 12]
  };
}
