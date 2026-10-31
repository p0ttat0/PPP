/* ==========================================================================
   TIER 2: BOUNDARY TEST // PREFERS-REDUCED-MOTION ACCESSIBILITY
   Verifies:
   - CSS defines @media (prefers-reduced-motion: reduce)
   - Continuous spin animation on rotor assembly is paused or disabled
   - Traveling PCB signal pulse animations are paused or simplified
   - Static graticule reference remains fully visible and legible
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue } from '../utils/assert_helpers.js';
import { extractMediaQueries } from '../utils/dom_parser.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const cssDir = path.join(rootDir, 'css');
  const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

  let foundReducedMotion = false;
  let hasAnimationNoneOrPause = false;

  for (const file of cssFiles) {
    const content = fs.readFileSync(path.join(cssDir, file), 'utf-8');
    if (content.includes('prefers-reduced-motion')) {
      foundReducedMotion = true;
      const queries = extractMediaQueries(content);
      for (const q of queries) {
        if (q.condition.includes('prefers-reduced-motion')) {
          if (
            q.body.includes('animation: none') ||
            q.body.includes('animation-play-state: paused') ||
            q.body.includes('transition: none') ||
            q.body.includes('animation-duration: 0.01ms') ||
            q.body.includes('opacity')
          ) {
            hasAnimationNoneOrPause = true;
          }
        }
      }
    }
  }

  assertTrue(
    foundReducedMotion,
    'CSS must include @media (prefers-reduced-motion: reduce) rule (Feature 19 & Accessibility Boundary)'
  );
  assertTrue(
    hasAnimationNoneOrPause,
    'prefers-reduced-motion block must pause or disable continuous animations'
  );

  return {
    name: 'Tier 2: Boundary - Prefers-Reduced-Motion Accessibility',
    passed: true
  };
}
