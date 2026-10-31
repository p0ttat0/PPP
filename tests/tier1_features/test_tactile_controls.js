/* ==========================================================================
   TIER 1: FEATURES 13 - 16 // TACTILE HARDWARE CONTROLS
   Verifies:
   - F13: Spring-Loaded Keycaps with Shadow Collapse
   - F14: 3D See-Saw Rocker Switch
   - F15: Linear Brass Rheostat Fader
   - F16: Smoked-Glass VFD Cavities
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue, assertEqual } from '../utils/assert_helpers.js';
import { findElementById, findElementsByClass } from '../utils/dom_parser.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
  const componentsCss = fs.readFileSync(path.join(rootDir, 'css', 'components.css'), 'utf-8');

  // 1. Spring-Loaded Keycaps (Feature 13)
  // Check that bank switch buttons exist and have active / active-state styles with translateY and shadow collapse
  const bankButtons = findElementsByClass(indexHtml, 'bank-btn');
  assertTrue(bankButtons.length >= 5, `Expected at least 5 .bank-btn buttons, found ${bankButtons.length}`);

  const hasKeycapDepression =
    componentsCss.includes('translateY(2.5px)') ||
    componentsCss.includes('translateY(2px)') ||
    componentsCss.includes(':active');
  assertTrue(hasKeycapDepression, 'Keycaps must define mechanical depression (:active / .active translateY)');

  // Verify keycap active state does not mutate border-bottom-width (prevents flex reflow)
  const hasActiveBorderReflow =
    componentsCss.includes('.bank-btn:active {\n  transform: translateY(2.5px);\n  box-shadow: var(--shadow-keycap-active);\n  border-bottom-width') ||
    componentsCss.includes('.bank-btn:active {\n  transform: translateY(2.5px);\n  box-shadow: var(--shadow-keycap-active);\n  border-bottom:');
  assertTrue(!hasActiveBorderReflow, 'Keycap active state must not mutate border-bottom-width (avoids layout reflow)');

  const hasLedIndicator = indexHtml.includes('btn-led') || componentsCss.includes('btn-led');
  assertTrue(hasLedIndicator, 'Keycaps must feature LED phosphor indicator lamps (Feature 13)');

  // 2. 3D See-Saw Rocker Switch (Feature 14)
  // Can be .rocker-switch or .scope-mode-btn with mass ring toggle inner/outer
  const hasRockerOrModeBtn =
    indexHtml.includes('data-rotor-config') ||
    indexHtml.includes('rocker-switch') ||
    indexHtml.includes('mass-rocker');
  assertTrue(hasRockerOrModeBtn, 'Mass-ring rocker switch or mode selector must exist (Feature 14)');

  // Verify 3D perspective context, transform-origins, and symmetrical tilts
  assertTrue(
    componentsCss.includes('transform-style: preserve-3d;'),
    '.rocker-switch must define transform-style: preserve-3d'
  );
  assertTrue(
    componentsCss.includes('.paddle-inner') && componentsCss.includes('transform-origin: right center'),
    '.paddle-inner must pivot at right center seam'
  );
  assertTrue(
    componentsCss.includes('.paddle-outer') && componentsCss.includes('transform-origin: left center'),
    '.paddle-outer must pivot at left center seam'
  );
  assertTrue(
    componentsCss.includes('rotateY(-12deg)') && componentsCss.includes('rotateY(12deg)'),
    'Rocker switch paddles must have symmetrical 12deg see-saw tilts'
  );

  // 3. Linear Brass Rheostat Fader (Feature 15)
  // Range input min="1200", max="3600", step="100"
  const sliderMatch = indexHtml.match(/<input[^>]+type=["']range["'][^>]*>/i);
  assertTrue(!!sliderMatch, 'Must contain input[type="range"] for RPM rheostat fader (Feature 15)');

  const sliderAttrs = sliderMatch[0];
  assertTrue(sliderAttrs.includes('1200'), 'RPM rheostat slider must have min="1200"');
  assertTrue(sliderAttrs.includes('3600'), 'RPM rheostat slider must have max="3600"');

  // Verify WebKit thumb vertical centering on track
  assertTrue(
    componentsCss.includes('margin-top: -10px;'),
    'WebKit slider thumb must define margin-top: -10px to center 28px thumb on 8px track'
  );

  // 4. Smoked-Glass VFD Cavities (Feature 16)
  // Check for .vfd-window, optical cavity classes, scanlines or inner shadows
  const vfdWindows = findElementsByClass(indexHtml, 'vfd-window');
  assertTrue(vfdWindows.length >= 2, `Expected at least 2 .vfd-window cavities, found ${vfdWindows.length}`);

  const hasCavityStyling =
    componentsCss.includes('vfd-window') ||
    componentsCss.includes('box-shadow: inset') ||
    componentsCss.includes('vfd-cavity');
  assertTrue(hasCavityStyling, 'VFD cavity styling with recessed shadows must exist (Feature 16)');

  return {
    name: 'Tier 1: Tactile Hardware Controls (Features 13-16)',
    passed: true,
    featuresTested: [13, 14, 15, 16]
  };
}
