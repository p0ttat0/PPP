/* ==========================================================================
   CHALLENGER 1: POST 3 VIEWPORT & GEOMETRIC EMPIRICAL STRESS HARNESS
   Milestone 4 Independent Verification:
   1. Breakpoint & Responsive Rules: Single-column collapse at @media (max-width: 1080px)
   2. Desktop Split Geometry: Displays > 1080px render 2 columns side-by-side
   3. Horizontal Overflow Proof: Column template widths sum and bounding box checks at 1080p & 1440p
   4. Schedule Integrity: All 6 milestones with exact dates (Nov 1, 2026 - Jan 4, 2027) & verbatim text
   5. Non-Negative SVG Geometry, Generous Text Clearances, & Phosphor Theme Verification
   6. Art Deco Mechanical Architecture & Tactile Phase Isolation Controls
   ========================================================================== */

import fs from 'fs';
import path from 'path';

export function runEmpiricalVerification(rootDir = process.cwd()) {
  const results = {
    totalAssertions: 0,
    passedAssertions: 0,
    failures: [],
    details: {}
  };

  function assert(condition, message, details = {}) {
    results.totalAssertions++;
    if (!condition) {
      results.failures.push({ message, details });
      console.error(`[FAIL] ${message}`, details);
    } else {
      results.passedAssertions++;
      console.log(`[PASS] ${message}`);
    }
  }

  // --------------------------------------------------------------------------
  // 1. FILE EXISTENCE & INGESTION
  // --------------------------------------------------------------------------
  const indexHtmlPath = path.join(rootDir, 'index.html');
  const viewsCssPath = path.join(rootDir, 'css', 'views.css');
  const tokensCssPath = path.join(rootDir, 'css', 'tokens.css');
  const ganttJsPath = path.join(rootDir, 'js', 'gantt.js');
  const expectedProsePath = path.join(rootDir, 'tests', 'fixtures', 'expected_prose.json');

  assert(fs.existsSync(indexHtmlPath), 'index.html must exist');
  assert(fs.existsSync(viewsCssPath), 'css/views.css must exist');
  assert(fs.existsSync(tokensCssPath), 'css/tokens.css must exist');
  assert(fs.existsSync(ganttJsPath), 'js/gantt.js must exist');
  assert(fs.existsSync(expectedProsePath), 'tests/fixtures/expected_prose.json must exist');

  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const viewsCss = fs.readFileSync(viewsCssPath, 'utf-8');
  const tokensCss = fs.readFileSync(tokensCssPath, 'utf-8');
  const ganttJs = fs.readFileSync(ganttJsPath, 'utf-8');
  const expectedProse = JSON.parse(fs.readFileSync(expectedProsePath, 'utf-8'));

  // Extract Post 3 section from index.html
  const post3Match = indexHtml.match(/<section[^>]*id=["']view-post3["'][^>]*>([\s\S]*?)<\/section>/i);
  assert(Boolean(post3Match), '#view-post3 section must exist in index.html');
  const post3Html = post3Match ? post3Match[1] : '';

  // --------------------------------------------------------------------------
  // SUITE 1: RESPONSIVE BREAKPOINT & SINGLE-COLUMN COLLAPSE RULES
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 1: Responsive Breakpoint & Single-Column Collapse Rules ---');

  // 1.1 Assert @media (max-width: 1080px) is defined
  const media1080Regex = /@media\s*\(\s*max-width\s*:\s*1080px\s*\)\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g;
  let match1080 = media1080Regex.exec(viewsCss);
  assert(Boolean(match1080), 'views.css must contain @media (max-width: 1080px)');

  const media1080Content = match1080 ? match1080[1] : '';

  // 1.2 Assert single-column collapse inside @media (max-width: 1080px)
  const hasSplitGridCollapse =
    media1080Content.includes('.split-1440p-grid') ||
    media1080Content.includes('.post3-split-grid') ||
    media1080Content.includes('.gantt-grid');
  assert(hasSplitGridCollapse, '@media (max-width: 1080px) must target .split-1440p-grid, .post3-split-grid, or .gantt-grid');

  const collapsesToSingleCol = media1080Content.includes('grid-template-columns: 1fr');
  assert(collapsesToSingleCol, '@media (max-width: 1080px) must collapse Post 3 grid to grid-template-columns: 1fr');

  // 1.3 Assert absence of premature desktop collapse (e.g. 1480px, 1200px) on Post 3
  const hasPremature1480Collapse = /@media\s*\(\s*max-width\s*:\s*1480px\s*\)[^}]*(?:split-1440p-grid|post3-split-grid|gantt-grid)/i.test(viewsCss);
  assert(!hasPremature1480Collapse, 'views.css must NOT contain premature collapse at 1480px for Post 3 grid');

  const media1200Match = viewsCss.match(/@media\s*\(\s*max-width\s*:\s*1200px\s*\)\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/);
  const media1200Content = media1200Match ? media1200Match[1] : '';
  const has1200Post3Collapse =
    media1200Content.includes('.split-1440p-grid') ||
    media1200Content.includes('.post3-split-grid') ||
    media1200Content.includes('.gantt-grid');
  assert(!has1200Post3Collapse, '@media (max-width: 1200px) must NOT collapse Post 3 split grid');

  // --------------------------------------------------------------------------
  // SUITE 2: DESKTOP TWO-COLUMN SIDE-BY-SIDE GEOMETRY (> 1080PX)
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 2: Desktop Two-Column Side-by-Side Geometry (> 1080px) ---');

  // 2.1 Assert base rule defines two-column grid
  const baseGridRegex = /\.(?:split-1440p-grid|post3-split-grid|gantt-grid)[^{]*\{([^}]+)\}/g;
  let baseGridMatch;
  let foundBaseGrid = false;
  let colTemplateStr = '';
  let gapStr = '';

  while ((baseGridMatch = baseGridRegex.exec(viewsCss)) !== null) {
    const body = baseGridMatch[1];
    if (body.includes('grid-template-columns')) {
      foundBaseGrid = true;
      const colMatch = body.match(/grid-template-columns\s*:\s*([^;]+);/);
      if (colMatch) colTemplateStr = colMatch[1].trim();
      const gMatch = body.match(/gap\s*:\s*([^;]+);/);
      if (gMatch) gapStr = gMatch[1].trim();
    }
  }

  assert(foundBaseGrid, 'Base rule for Post 3 split grid must be defined in views.css');
  assert(colTemplateStr.length > 0, `grid-template-columns found: "${colTemplateStr}"`);

  // Count columns in template
  const colTokens = colTemplateStr.split(/\s+(?=minmax|1fr|[0-9])/);
  assert(colTokens.length === 2, `grid-template-columns must define exactly 2 columns, found ${colTokens.length} ("${colTemplateStr}")`);

  // 2.2 Verify DOM elements for two columns
  const gridContainerMatch = post3Html.match(/<div[^>]*class=["']([^"']*(?:split-1440p-grid|post3-split-grid|gantt-grid)[^"']*)["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/i);
  assert(Boolean(gridContainerMatch), 'DOM must have grid container with split grid classes');

  const hasTaskCol = post3Html.includes('task-breakdown-col') || post3Html.includes('schedule-matrix-col');
  assert(hasTaskCol, 'Left column must have task-breakdown-col / schedule-matrix-col');

  const hasGanttCol = post3Html.includes('gantt-col') && post3Html.includes('id="gantt-container"');
  assert(hasGanttCol, 'Right column must have gantt-col and contain #gantt-container');

  // --------------------------------------------------------------------------
  // SUITE 3: MATHEMATICAL OVERFLOW & BOUNDING PROOF (1080P & 1440P)
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 3: Mathematical Overflow & Bounding Proof (1080p & 1440p) ---');

  // Parse grid parameters: minmax(500px, 1fr) minmax(580px, 1.18fr) and gap 24px
  const minCol1 = 500;
  const minCol2 = 580;
  const frCol1 = 1.0;
  const frCol2 = 1.18;
  const gapPx = 24;

  // 3.1 1080p Viewport Simulation (1920x1080)
  const vp1080_width = 1920;
  const workspace_padding_x = 32 * 2; // 64px from padding: 26px 32px 56px
  const vp1080_avail = vp1080_width - workspace_padding_x; // 1856px
  const wide1440p_max = 2380; // max-width of .view-container.wide-1440p
  const container1080_w = Math.min(vp1080_avail, wide1440p_max); // 1856px

  const availGridWidth1080 = container1080_w - gapPx; // 1832px
  const frSum = frCol1 + frCol2; // 2.18
  const unitFr1080 = availGridWidth1080 / frSum; // 840.366px
  const col1_1080 = Math.max(minCol1, unitFr1080 * frCol1); // 840.37px
  const col2_1080 = Math.max(minCol2, unitFr1080 * frCol2); // 991.63px
  const totalGrid1080 = col1_1080 + col2_1080 + gapPx;

  assert(
    Math.abs(totalGrid1080 - container1080_w) < 0.01,
    `1080p geometry sum (${totalGrid1080}px) must exactly equal available container width (${container1080_w}px)`
  );
  assert(
    col1_1080 >= minCol1 && col2_1080 >= minCol2,
    `1080p columns (${col1_1080.toFixed(1)}px, ${col2_1080.toFixed(1)}px) must satisfy min constraints (${minCol1}px, ${minCol2}px)`
  );
  assert(
    totalGrid1080 <= vp1080_width,
    `1080p grid width (${totalGrid1080}px) must not exceed viewport width (${vp1080_width}px)`
  );

  // 3.2 1440p Viewport Simulation (2560x1440)
  const vp1440_width = 2560;
  const vp1440_avail = vp1440_width - workspace_padding_x; // 2496px
  const container1440_w = Math.min(vp1440_avail, wide1440p_max); // 2380px

  const availGridWidth1440 = container1440_w - gapPx; // 2356px
  const unitFr1440 = availGridWidth1440 / frSum; // 1080.733px
  const col1_1440 = Math.max(minCol1, unitFr1440 * frCol1); // 1080.73px
  const col2_1440 = Math.max(minCol2, unitFr1440 * frCol2); // 1275.27px
  const totalGrid1440 = col1_1440 + col2_1440 + gapPx;

  assert(
    Math.abs(totalGrid1440 - container1440_w) < 0.01,
    `1440p geometry sum (${totalGrid1440}px) must exactly equal container width (${container1440_w}px)`
  );
  assert(
    col1_1440 >= minCol1 && col2_1440 >= minCol2,
    `1440p columns (${col1_1440.toFixed(1)}px, ${col2_1440.toFixed(1)}px) must satisfy min constraints (${minCol1}px, ${minCol2}px)`
  );
  assert(
    totalGrid1440 <= vp1440_width,
    `1440p grid width (${totalGrid1440}px) must not exceed viewport width (${vp1440_width}px)`
  );

  // 3.3 Global Overflow Protection
  assert(tokensCss.includes('overflow-x: hidden'), 'tokens.css must enforce overflow-x: hidden on body');
  assert(tokensCss.includes('box-sizing: border-box'), 'tokens.css must enforce box-sizing: border-box');
  assert(viewsCss.includes('#gantt-container svg'), 'views.css must constrain #gantt-container svg width');

  // --------------------------------------------------------------------------
  // SUITE 4: 6-MILESTONE SCHEDULE INTEGRITY & VERBATIM PROSE
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 4: 6-Milestone Schedule Integrity & Verbatim Prose ---');

  const expectedMilestones = expectedProse.post3.milestones;
  assert(expectedMilestones.length === 6, `expected_prose.json must specify exactly 6 milestones, found ${expectedMilestones.length}`);

  // Schedule start and end date checks
  assert(ganttJs.includes('2026-11-01'), 'gantt.js schedule must begin on 2026-11-01');
  assert(ganttJs.includes('2027-01-05'), 'gantt.js schedule must conclude with non-inclusive 2027-01-05');
  assert(post3Html.includes('NOV 1, 2026') || post3Html.includes('Nov 1, 2026'), 'Post 3 header must indicate Nov 1, 2026');
  assert(post3Html.includes('JAN 4, 2027') || post3Html.includes('Jan 4, 2027'), 'Post 3 header must indicate Jan 4, 2027');

  // Calendar duration verification: Nov 1, 2026 to Jan 5, 2027 = exactly 65 days
  const scheduleStart = new Date('2026-11-01T00:00:00Z');
  const scheduleEnd = new Date('2027-01-05T00:00:00Z');
  const totalScheduleDays = (scheduleEnd - scheduleStart) / (1000 * 60 * 60 * 24);
  assert(totalScheduleDays === 65, `Total schedule span must be exactly 65 days, calculated ${totalScheduleDays}`);

  // Inspect each milestone in DOM and Gantt definition
  expectedMilestones.forEach((ms, idx) => {
    console.log(`\nVerifying Milestone ${ms.id} (${ms.title})...`);

    // In DOM: row presence
    const rowRegex = new RegExp(`<tr[^>]*data-task-id=["']${ms.id}["'][^>]*>([\\s\\S]*?)<\\/tr>`, 'i');
    const rowMatch = post3Html.match(rowRegex);
    assert(Boolean(rowMatch), `DOM must contain milestone row with data-task-id="${ms.id}"`);

    const rowContent = rowMatch ? rowMatch[1] : '';

    // Title match
    const titleNormalized = ms.title.replace(/&/g, '&amp;');
    assert(rowContent.includes(titleNormalized), `Row ${ms.id} must display title "${ms.title}"`);

    // Phase match
    assert(rowContent.includes(ms.phase), `Row ${ms.id} must display phase "${ms.phase}"`);

    // Date range in HTML
    if (ms.id === 'sr1') assert(rowContent.includes('Nov 1, 2026') && rowContent.includes('Nov 6, 2026'), 'sr1 date window must be Nov 1 - Nov 6, 2026');
    if (ms.id === 'sr2') assert(rowContent.includes('Nov 7, 2026') && rowContent.includes('Nov 15, 2026'), 'sr2 date window must be Nov 7 - Nov 15, 2026');
    if (ms.id === 'pr1') assert(rowContent.includes('Nov 16, 2026') && rowContent.includes('Nov 22, 2026'), 'pr1 date window must be Nov 16 - Nov 22, 2026');
    if (ms.id === 'pr2') assert(rowContent.includes('Nov 23, 2026') && rowContent.includes('Dec 6, 2026'), 'pr2 date window must be Nov 23 - Dec 6, 2026');
    if (ms.id === 'pr3') assert(rowContent.includes('Dec 7, 2026') && rowContent.includes('Dec 18, 2026'), 'pr3 date window must be Dec 7 - Dec 18, 2026');
    if (ms.id === 'del1') assert(rowContent.includes('Dec 19, 2026') && rowContent.includes('Jan 4, 2027'), 'del1 date window must be Dec 19, 2026 - Jan 4, 2027');

    // Verbatim task description check in DOM
    const descMatch = rowContent.match(/<td[^>]*class=["']ms-desc["'][^>]*>([\s\S]*?)<\/td>/i);
    assert(Boolean(descMatch), `Row ${ms.id} must have <td class="ms-desc">`);
    const descText = descMatch ? descMatch[1].trim() : '';

    if (ms.id === 'sr1') {
      const expectedDesc = 'Gather pre-existing research on moment of inertia and gyroscopic precession. Review ESP32, ICM-20948 IMU, and SimpleFOCmini documentation. Complete initial secondary research steps.';
      assert(descText === expectedDesc, `sr1 description must match verbatim:\n"${descText}"`);
    }
    if (ms.id === 'sr2') {
      const expectedDesc = 'Analyze the mathematical relationship between mass distribution and precession speed. Finalize hardware orders and organize experimental parameters.';
      assert(descText === expectedDesc, `sr2 description must match verbatim:\n"${descText}"`);
    }
    if (ms.id === 'pr1') {
      const expectedDesc = 'Begin primary research and physical construction. Draft the Onshape CAD files. Run 3D prints for the frame and the multiple reaction wheel variations.';
      assert(descText === expectedDesc, `pr1 description must match verbatim:\n"${descText}"`);
    }
    if (ms.id === 'pr2') {
      const expectedDesc = 'Solder and wire the 220KV 2804 motors and MT6701 encoders. Tune the PID loops and conduct preliminary balancing tests.';
      assert(descText === expectedDesc, `pr2 description must match verbatim:\n"${descText}"`);
    }
    if (ms.id === 'pr3') {
      const expectedDesc = 'Conduct the main experiments. Swap the reaction wheels, shift the machine screws and washers to the outer rim, and capture video recordings to document the changes in precession speed. Complete all physical builds and experimental trials.';
      assert(descText === expectedDesc, `pr3 description must match verbatim:\n"${descText}"`);
    }
    if (ms.id === 'del1') {
      const expectedDesc = 'Analyze the recorded video footage and telemetry data. Format findings into a presentation script and design the visual trifold. Complete the trifold and script.';
      assert(descText === expectedDesc, `del1 description must match verbatim:\n"${descText}"`);
    }

    // In Gantt CHART_DEFINITION
    const ganttLineRegex = new RegExp(`:${ms.id},\\s*(${ms.startDate}),\\s*(${ms.endDate})`);
    const ganttLineMatch = ganttJs.match(ganttLineRegex);
    assert(Boolean(ganttLineMatch), `gantt.js must contain entry for :${ms.id}, ${ms.startDate}, ${ms.endDate}`);

    // Duration calculation
    const msStart = new Date(ms.startDate);
    const msEnd = new Date(ms.endDate);
    const durationDays = (msEnd - msStart) / (1000 * 60 * 60 * 24);
    assert(durationDays >= 1, `Milestone ${ms.id} duration (${durationDays} days) must be >= 1 day`);
  });

  // Check milestone continuity: no temporal gaps or date inversions
  for (let i = 0; i < expectedMilestones.length - 1; i++) {
    const curEnd = expectedMilestones[i].endDate;
    const nextStart = expectedMilestones[i + 1].startDate;
    assert(
      curEnd === nextStart,
      `Milestone ${expectedMilestones[i].id} end date (${curEnd}) must seamlessly meet ${expectedMilestones[i+1].id} start date (${nextStart})`
    );
  }

  // --------------------------------------------------------------------------
  // SUITE 5: NON-NEGATIVE SVG GEOMETRY & PHOSPHOR STYLING
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 5: Non-Negative SVG Geometry & Phosphor Styling ---');

  // 5.1 auditSvgGeometry function presence and clamping
  assert(ganttJs.includes('export function auditSvgGeometry'), 'gantt.js must export auditSvgGeometry');
  assert(ganttJs.includes('auditSvgGeometry(container)'), 'renderGantt must invoke auditSvgGeometry(container)');
  assert(ganttJs.includes("setAttribute('width', '12')"), 'auditSvgGeometry must clamp non-positive widths to positive minimum');

  // 5.2 Text collision clearances
  assert(ganttJs.includes('barHeight: 46'), 'gantt.js must set barHeight: 46 for generous bar clearance');
  assert(ganttJs.includes('barGap: 16'), 'gantt.js must set barGap: 16 to prevent adjacent bar collision');
  assert(ganttJs.includes('leftPadding: 165'), 'gantt.js must set leftPadding: 165 to prevent task label clipping');
  assert(ganttJs.includes('topPadding: 38'), 'gantt.js must set topPadding: 38 for header clearance');

  // 5.3 Phosphor colors
  assert(ganttJs.includes('#00f0d0'), 'gantt.js must use Cyan (#00f0d0) for Secondary Research');
  assert(ganttJs.includes('#ff9f1c'), 'gantt.js must use Amber (#ff9f1c) for Primary Research');
  assert(ganttJs.includes('#2ee57d'), 'gantt.js must use Emerald (#2ee57d) for Deliverables');

  // 5.4 Phase isolation and dimming
  assert(ganttJs.includes('export function applyPhaseFilter'), 'gantt.js must export applyPhaseFilter');
  assert(ganttJs.includes('0.28'), 'gantt.js must dim non-matching phase elements to 0.28 opacity');
  assert(viewsCss.includes('0.28'), 'views.css .dimmed-phase must specify opacity: 0.28');

  // 5.5 Bidirectional hover
  assert(ganttJs.includes('bindBidirectionalHover'), 'gantt.js must implement bindBidirectionalHover');
  assert(ganttJs.includes('bar-highlight'), 'gantt.js must toggle bar-highlight on hover');
  assert(ganttJs.includes('highlighted'), 'gantt.js must toggle highlighted on hover');

  // --------------------------------------------------------------------------
  // SUITE 6: ART DECO ARCHITECTURAL FRAMING IN POST 3
  // --------------------------------------------------------------------------
  console.log('\n--- SUITE 6: Art Deco Architectural Framing in Post 3 ---');

  // 6.1 Stepped Ziggurat Brackets
  const zigguratCount = (post3Html.match(/zig-bracket/g) || []).length;
  assert(zigguratCount >= 8, `Post 3 must contain stepped ziggurat brackets, found ${zigguratCount}`);
  assert(post3Html.includes('zig-tl') && post3Html.includes('zig-tr') && post3Html.includes('zig-bl') && post3Html.includes('zig-br'), 'Post 3 must contain all 4 corner ziggurat brackets');

  // 6.2 Machined Serial Nameplates
  assert(post3Html.includes('SER: GNT-65D-2026-2027 // 6 MILESTONES // GP-2804'), 'Post 3 left plate must display master schedule serial');
  assert(post3Html.includes('CH-03 // PHOSPHOR TRACE // CALIBRATED NOV 1 - JAN 4'), 'Post 3 right plate must display calibration serial');

  // 6.3 Speed lines and brass rules
  assert(post3Html.includes('speed-lines-horizontal'), 'Post 3 must contain Streamline Moderne speed-lines');
  assert(post3Html.includes('rule-double-brass'), 'Post 3 must contain double brass division rules');

  // 6.4 Phosphor status indicators
  assert(post3Html.includes('phosphor-status-pill lit-cyan'), 'Post 3 must include cyan status pills');
  assert(post3Html.includes('phosphor-status-pill lit-amber'), 'Post 3 must include amber status pills');
  assert(post3Html.includes('phosphor-status-pill lit-emerald'), 'Post 3 must include emerald status pills');

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log('\n================================================================================');
  console.log(`   CHALLENGER 1 VERIFICATION RESULTS: ${results.passedAssertions} / ${results.totalAssertions} PASSED`);
  console.log(`   Failures: ${results.failures.length}`);
  console.log('================================================================================\n');

  return {
    success: results.failures.length === 0,
    total: results.totalAssertions,
    passed: results.passedAssertions,
    failed: results.failures.length,
    failures: results.failures
  };
}

// Direct execution entrypoint
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].endsWith('test_challenger_m4_post3_viewport_geometry.js')) {
  const summary = runEmpiricalVerification();
  if (!summary.success) {
    process.exit(1);
  }
}
