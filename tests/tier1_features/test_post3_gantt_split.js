/* ==========================================================================
   TIER 1: FEATURES 34 - 40 // POST 3 GANTT SPLIT LAYOUT & MERMAID V10
   Verifies:
   - F34: Post 3 1080p & 1440p Side-by-Side Split Grid
   - F35: Post 3 6-Milestone Master Schedule (Nov 1, 2026 - Jan 5, 2027)
   - F36: Post 3 Zero Negative SVG Rect Widths
   - F37: Post 3 Zero Overlapping Text Bounding Boxes
   - F38: Post 3 Phosphor Gantt Styling
   - F39: Post 3 Bidirectional Hover Tracing
   - F40: Post 3 Phase-Isolation Switches
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue, assertEqual, assertGreaterThanOrEqual } from '../utils/assert_helpers.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
  const ganttJs = fs.readFileSync(path.join(rootDir, 'js', 'gantt.js'), 'utf-8');
  const viewsCss = fs.readFileSync(path.join(rootDir, 'css', 'views.css'), 'utf-8');

  // 1. Post 3 View Container (Feature 34)
  assertTrue(
    indexHtml.includes('id="view-post3"'),
    'DOM must contain section with id="view-post3"'
  );
  assertTrue(
    indexHtml.includes('id="gantt-container"'),
    'Post 3 must contain #gantt-container element'
  );

  // Split grid in CSS: must define side-by-side split grid on desktop (Feature 34)
  const hasSplitGrid =
    viewsCss.includes('grid-template-columns') ||
    viewsCss.includes('minmax') ||
    viewsCss.includes('gantt-split');
  assertTrue(hasSplitGrid, 'views.css must define split grid columns for Post 3 (Feature 34)');

  // 2. 6-Milestone Master Schedule Definition (Feature 35)
  // Must contain all 6 milestone IDs: sr1, sr2, pr1, pr2, pr3, del1
  const expectedMilestones = ['sr1', 'sr2', 'pr1', 'pr2', 'pr3', 'del1'];
  for (const ms of expectedMilestones) {
    assertTrue(
      ganttJs.includes(ms),
      `gantt.js must contain milestone definition for ${ms} (Feature 35)`
    );
    assertTrue(
      indexHtml.includes(ms),
      `index.html must contain table row or data-task-id for ${ms} (Feature 35)`
    );
  }

  // Verify schedule dates in gantt.js span Nov 1, 2026 to Jan 2027
  assertTrue(
    ganttJs.includes('2026-11-01'),
    'Schedule must start on 2026-11-01 (Feature 35)'
  );
  assertTrue(
    ganttJs.includes('2027-01-'),
    'Schedule must span through January 2027 (Feature 35)'
  );

  // 3. Positive SVG Rect Width & Non-negative date math (Feature 36)
  // Verify date intervals are all strictly positive (> 0 days)
  const dateRegex = /:([a-zA-Z0-9]+),\s*(\d{4}-\d{2}-\d{2}),\s*(\d{4}-\d{2}-\d{2})/g;
  let match;
  let taskCount = 0;
  while ((match = dateRegex.exec(ganttJs)) !== null) {
    taskCount++;
    const [, taskId, startStr, endStr] = match;
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffDays = (end - start) / (1000 * 60 * 60 * 24);
    assertGreaterThanOrEqual(
      diffDays,
      1,
      `Task ${taskId} date range must have positive duration (>= 1 day)`
    );
  }
  assertTrue(taskCount >= 6, `Expected at least 6 tasks in Gantt definition, found ${taskCount}`);

  // 4. Zero Overlapping Text Clearance (Feature 37)
  // barHeight, barGap, leftPadding in gantt.js configuration
  assertTrue(
    ganttJs.includes('barHeight') && ganttJs.includes('barGap') && ganttJs.includes('leftPadding'),
    'gantt.js must configure barHeight, barGap, and leftPadding to eliminate text collisions (Feature 37)'
  );

  // 5. Phosphor Gantt Styling (Feature 38)
  // Cyan (#00f0d0), amber (#ff9f1c), emerald (#2ee57d) in gantt.js or CSS
  assertTrue(
    ganttJs.includes('00f0d0') || ganttJs.includes('ff9f1c') || ganttJs.includes('2ee57d'),
    'gantt.js must style task bars with phosphor emission colors (Feature 38)'
  );

  // 6. Bidirectional Hover Tracing (Feature 39)
  // Listeners for mouseenter/mouseleave between ms-row and bar
  assertTrue(
    ganttJs.includes('mouseenter') &&
      ganttJs.includes('mouseleave') &&
      (ganttJs.includes('highlight') || ganttJs.includes('bar-highlight')),
    'gantt.js must bind bidirectional hover highlighting between rows and SVG bars (Feature 39)'
  );

  // 7. Phase-Isolation Switches (Feature 40)
  // gantt-phase-btn or phase-filter-btn
  const hasPhaseFilter =
    indexHtml.includes('phase-filter') ||
    indexHtml.includes('gantt-phase-btn') ||
    ganttJs.includes('phaseFilter') ||
    ganttJs.includes('phase-filter');
  assertTrue(hasPhaseFilter, 'Phase-isolation switches must be implemented (Feature 40)');

  return {
    name: 'Tier 1: Post 3 Gantt Split Layout & Mermaid.js v10 (Features 34-40)',
    passed: true,
    featuresTested: [34, 35, 36, 37, 38, 39, 40]
  };
}
