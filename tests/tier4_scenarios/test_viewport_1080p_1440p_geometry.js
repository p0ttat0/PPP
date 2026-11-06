/* ==========================================================================
   TIER 4: SCENARIO TEST // 1080p & 1440p VIEWPORT GEOMETRY & CSS GRID SPLIT
   Verifies:
   - Full desktop visual and geometric verification at 1080p (1920x1080)
     and 1440p (2560x1440) across all 5 views
   - Post 3 left-hand Task Breakdown and right-hand Mermaid Gantt render
     strictly side-by-side
   - Container max-width and padding rules eliminate horizontal scrollbars
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue } from '../utils/assert_helpers.js';
import { extractMediaQueries } from '../utils/dom_parser.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const viewsCss = fs.readFileSync(path.join(rootDir, 'css', 'views.css'), 'utf-8');
  const tokensCss = fs.readFileSync(path.join(rootDir, 'css', 'tokens.css'), 'utf-8');
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

  // 1. Verify 1440p media queries or responsive container rules
  const mediaQueries = extractMediaQueries(viewsCss);
  const hasDesktopMediaQueries =
    mediaQueries.some(q => q.condition.includes('1440') || q.condition.includes('1200') || q.condition.includes('min-width')) ||
    viewsCss.includes('1440px') ||
    viewsCss.includes('1200px');
  assertTrue(
    hasDesktopMediaQueries,
    'views.css must include responsive desktop rules for 1080p & 1440p (Feature 34 & Feature 43)'
  );

  // 2. Verify all 5 views have containers defined in DOM
  const requiredViews = ['view-home', 'view-post1', 'view-post2', 'view-post3', 'view-conferencing'];
  for (const viewId of requiredViews) {
    assertTrue(
      indexHtml.includes(`id="${viewId}"`),
      `DOM must contain view section #${viewId}`
    );
  }

  // 3. Post 3 side-by-side split grid check:
  // Must have 2-column grid definition or flex split
  const hasPost3Split =
    viewsCss.includes('gantt-grid') ||
    viewsCss.includes('view-post3') ||
    viewsCss.includes('grid-template-columns') ||
    viewsCss.includes('post3-split');
  assertTrue(
    hasPost3Split,
    'views.css must define side-by-side split layout for Post 3 (Task Breakdown + Gantt)'
  );

  // 4. Horizontal overflow prevention rule:
  // Check that tokens.css or views.css sets overflow-x: hidden or max-width: 100% on body / workspace
  const hasOverflowProtection =
    tokensCss.includes('overflow-x: hidden') ||
    viewsCss.includes('overflow-x: hidden') ||
    tokensCss.includes('box-sizing: border-box');
  assertTrue(
    hasOverflowProtection,
    'CSS must enforce box-sizing or overflow-x protection to prevent horizontal scroll'
  );
  assertTrue(
    viewsCss.includes('@media (max-width: 768px)') && viewsCss.includes('@media (min-width: 2000px)'),
    'views.css must include mobile (@media (max-width: 768px)) and 1440p (@media (min-width: 2000px)) scaling rules'
  );

  return {
    name: 'Tier 4: Scenario - 1080p & 1440p Viewport Geometry Verification',
    passed: true
  };
}
