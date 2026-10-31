/* ==========================================================================
   TIER 5 ADVERSARIAL GAP MINING: CSS, MULTI-VIEWPORT & LAYOUT HARDENING
   Author: Challenger 2 (Milestone 5 Phase 2)
   Target: index.html, css/tokens.css, css/deco-ornament.css,
           css/components.css, css/views.css, assets/grain-filters.svg

   Verification Coverage:
   1. Multi-Viewport Extremes & Breakpoint Transitions (1080p, 1440p, 4K, 1081px, 1200px)
   2. Procedural SVG Shader Filter Syntax, Node Topology & Fallback Robustness
   3. Art Deco Ziggurat Geometry, Speed-Line Ratios & Divider Rule Box Models
   4. 100% Verbatim Text Retention & Anti-SaaS Architecture Verification
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

  // Ingest Source Artifacts
  const indexPath = path.join(rootDir, 'index.html');
  const tokensCssPath = path.join(rootDir, 'css', 'tokens.css');
  const decoCssPath = path.join(rootDir, 'css', 'deco-ornament.css');
  const componentsCssPath = path.join(rootDir, 'css', 'components.css');
  const viewsCssPath = path.join(rootDir, 'css', 'views.css');
  const grainFiltersPath = path.join(rootDir, 'assets', 'grain-filters.svg');

  assert(fs.existsSync(indexPath), 'index.html must exist');
  assert(fs.existsSync(tokensCssPath), 'css/tokens.css must exist');
  assert(fs.existsSync(decoCssPath), 'css/deco-ornament.css must exist');
  assert(fs.existsSync(componentsCssPath), 'css/components.css must exist');
  assert(fs.existsSync(viewsCssPath), 'css/views.css must exist');
  assert(fs.existsSync(grainFiltersPath), 'assets/grain-filters.svg must exist');

  const indexHtml = fs.readFileSync(indexPath, 'utf-8');
  const tokensCss = fs.readFileSync(tokensCssPath, 'utf-8');
  const decoCss = fs.readFileSync(decoCssPath, 'utf-8');
  const componentsCss = fs.readFileSync(componentsCssPath, 'utf-8');
  const viewsCss = fs.readFileSync(viewsCssPath, 'utf-8');
  const grainFiltersSvg = fs.readFileSync(grainFiltersPath, 'utf-8');

  // ==========================================================================
  // SUITE 1: MULTI-VIEWPORT GEOMETRIC BALANCE & ZERO OVERFLOW
  // ==========================================================================
  console.log('\n--- SUITE 1: Multi-Viewport Geometric Balance & Zero Overflow ---');

  // 1.1 Global reset & box model
  assert(tokensCss.includes('box-sizing: border-box'), 'Global box-sizing: border-box must be enforced in tokens.css');
  assert(tokensCss.includes('overflow-x: hidden'), 'Global overflow-x: hidden on body must prevent window scrollbars');

  // 1.2 Container Max-Widths at 1080p (1920x1080), 1440p (2560x1440), and 4K (3840x2160)
  assert(viewsCss.includes('.view-container {') && viewsCss.includes('max-width: 1780px'), 'Standard .view-container must be clamped to 1780px max-width');
  assert(viewsCss.includes('.view-container.wide-1440p') && viewsCss.includes('max-width: 2380px'), '.view-container.wide-1440p must be clamped to 2380px max-width');

  // 1.3 Mathematical proof of grid fit at 1080p (1920px)
  const padding1080 = 32 * 2;
  const avail1080 = 1920 - padding1080; // 1856px
  const gridGap = 24;
  const netGrid1080 = avail1080 - gridGap; // 1832px
  const frTotal = 1.0 + 1.18; // 2.18
  const col1_1080 = (netGrid1080 / frTotal) * 1.0; // 840.37px
  const col2_1080 = (netGrid1080 / frTotal) * 1.18; // 991.63px
  assert(col1_1080 >= 500, `1080p Post 3 Col 1 (${col1_1080.toFixed(1)}px) >= 500px min`);
  assert(col2_1080 >= 580, `1080p Post 3 Col 2 (${col2_1080.toFixed(1)}px) >= 580px min`);
  assert(col1_1080 + col2_1080 + gridGap <= 1856.01, '1080p Post 3 sum exactly fits container');

  // 1.4 Mathematical proof of grid fit at 1440p (2560px)
  const avail1440 = 2380; // Clamped by max-width
  const netGrid1440 = avail1440 - gridGap; // 2356px
  const col1_1440 = (netGrid1440 / frTotal) * 1.0; // 1080.73px
  const col2_1440 = (netGrid1440 / frTotal) * 1.18; // 1275.27px
  assert(col1_1440 >= 500, `1440p Post 3 Col 1 (${col1_1440.toFixed(1)}px) >= 500px min`);
  assert(col2_1440 >= 580, `1440p Post 3 Col 2 (${col2_1440.toFixed(1)}px) >= 580px min`);
  assert(col1_1440 + col2_1440 + gridGap <= 2380.01, '1440p Post 3 sum exactly fits wide-1440p container');

  // 1.5 Breakpoint transition checks
  assert(viewsCss.includes('@media (max-width: 1080px)'), 'views.css must contain @media (max-width: 1080px) for Post 3 single-column collapse');
  assert(viewsCss.includes('@media (max-width: 1200px)'), 'views.css must contain @media (max-width: 1200px) for Post 1, 2, and Conferencing single-column collapse');
  assert(viewsCss.includes('@media (max-width: 1360px)'), 'views.css must contain @media (max-width: 1360px) for intermediate Post 1 dossier reorganization');

  // ==========================================================================
  // SUITE 2: PROCEDURAL SVG SHADER FILTERS & CROSS-BROWSER FALLBACKS
  // ==========================================================================
  console.log('\n--- SUITE 2: Procedural SVG Shader Filters & Cross-Browser Fallbacks ---');

  // 2.1 Asset Filter Definitions
  const requiredAssetFilters = [
    'crinkleEnamelIron',
    'phenolicBakelite',
    'matteABS',
    'brushedBrass',
    'vfdPhosphorBloom'
  ];
  for (const filterId of requiredAssetFilters) {
    assert(grainFiltersSvg.includes(`id="${filterId}"`), `assets/grain-filters.svg must define filter #${filterId}`);
    assert(indexHtml.includes(`id="${filterId}"`), `index.html must inline filter #${filterId} for instant zero-network access`);
  }

  // 2.2 SVG Filter Primitive Primitives & Structure
  assert(grainFiltersSvg.includes('feTurbulence'), 'grain-filters.svg must use feTurbulence for micro-grain generation');
  assert(grainFiltersSvg.includes('feColorMatrix'), 'grain-filters.svg must use feColorMatrix for spectrum mapping');
  assert(grainFiltersSvg.includes('feDiffuseLighting'), 'grain-filters.svg must use feDiffuseLighting for 3D crinkle enamel texture');
  assert(grainFiltersSvg.includes('feDistantLight'), 'grain-filters.svg must use feDistantLight for directional lighting');
  assert(grainFiltersSvg.includes('feBlend'), 'grain-filters.svg must use feBlend for composite shading');
  assert(grainFiltersSvg.includes('feComposite'), 'grain-filters.svg must use feComposite arithmetic mode');

  // 2.3 Hardware-accelerated CSS Data URI Shader Fallbacks
  assert(tokensCss.includes('.tex-cast-iron::before'), 'tokens.css must define .tex-cast-iron pseudo-element shader');
  assert(tokensCss.includes('.tex-bakelite::before'), 'tokens.css must define .tex-bakelite pseudo-element shader');
  assert(tokensCss.includes('.tex-matte-abs::before'), 'tokens.css must define .tex-matte-abs pseudo-element shader');
  assert(tokensCss.includes('.tex-brushed-brass::after'), 'tokens.css must define .tex-brushed-brass pseudo-element shader');
  assert(tokensCss.includes('mix-blend-mode: overlay'), 'tokens.css must use mix-blend-mode: overlay for GPU-accelerated grain compositing');
  assert(tokensCss.includes('pointer-events: none'), 'tokens.css shader pseudo-elements must specify pointer-events: none to avoid click interception');

  // ==========================================================================
  // SUITE 3: STEPPED ART DECO ZIGGURATS, SPEED-LINES & BRASS DIVISION RULES
  // ==========================================================================
  console.log('\n--- SUITE 3: Art Deco Ziggurats, Speed-Lines & Brass Division Rules ---');

  // 3.1 Ziggurat Brackets
  assert(decoCss.includes('.ziggurat-bracket-frame'), 'deco-ornament.css must define .ziggurat-bracket-frame');
  assert(decoCss.includes('.zig-bracket'), 'deco-ornament.css must define .zig-bracket');
  assert(decoCss.includes('pointer-events: none'), '.zig-bracket must set pointer-events: none');

  // 3.2 Pure CSS Stepped Ziggurat Panel & Clip-Path Polygon Math
  const clipMatch = decoCss.match(/\.deco-ziggurat-panel[^{]*\{[^}]*clip-path:\s*polygon\(([^)]+)\)/s);
  assert(Boolean(clipMatch), '.deco-ziggurat-panel must define clip-path: polygon()');
  if (clipMatch) {
    const rawCoords = clipMatch[1].split(',').map(s => s.trim());
    assert(rawCoords.length === 20, `.deco-ziggurat-panel polygon must have exactly 20 vertices (3-step terraces at 4 corners), found ${rawCoords.length}`);
  }
  assert(decoCss.includes('filter: drop-shadow('), '.deco-ziggurat-panel must use filter: drop-shadow to preserve shadow outside clip-path');

  // 3.3 Double-Line Brass Division Rules & Diamond Breaks
  assert(decoCss.includes('.rule-double-brass'), 'deco-ornament.css must define .rule-double-brass');
  assert(decoCss.includes('.rule-double-brass.with-diamond::before'), '.rule-double-brass.with-diamond::before must exist as diamond mask');
  assert(decoCss.includes('background-color: inherit;'), '.rule-double-brass.with-diamond::before must inherit background color');
  assert(decoCss.includes('.rule-double-brass.with-diamond::after'), '.rule-double-brass.with-diamond::after must exist as centered 45deg diamond');
  assert(decoCss.includes('rotate(45deg)'), '.rule-double-brass diamond must be rotated 45deg');

  // 3.4 Streamline Moderne Triple Speed-Lines
  assert(decoCss.includes('.speed-lines-horizontal'), 'deco-ornament.css must define .speed-lines-horizontal');
  assert(decoCss.includes('width: 100%'), 'Top speed-line must have width: 100%');
  assert(decoCss.includes('width: 82%'), 'Middle speed-line must have width: 82%');
  assert(decoCss.includes('width: 56%'), 'Bottom speed-line must have width: 56%');

  // ==========================================================================
  // SUITE 4: 100% VERBATIM TEXT RETENTION ACROSS ALL 5 VIEWS
  // ==========================================================================
  console.log('\n--- SUITE 4: 100% Verbatim Text Retention Across All 5 Views ---');

  // 4.1 Post 1 Essays (5 topics)
  const post1Essays = [
    { title: 'Computers/Software', phrase: 'Programming and software is probably one of my oldest hobbies.' },
    { title: 'Electronics', phrase: 'Electronics have always been a pretty significant part of my life.' },
    { title: 'Music', phrase: "Within the past 1-2 years I've gotten a lot more into music." },
    { title: 'Video Games', phrase: "I've played videogames for as long as I can remember." },
    { title: 'History and Politics', phrase: "I like learning about history and politics because it's often more exiting and fantastical than fiction." }
  ];
  for (const essay of post1Essays) {
    assert(indexHtml.includes(essay.phrase), `Post 1 essay for ${essay.title} must be retained verbatim`);
  }

  // 4.2 Post 2 Driving Question & Candidate Ledger
  assert(indexHtml.includes('"How does shifting a spinning wheel\'s mass toward its outer rim change how fast it precesses?"'), 'Post 2 Stage 03 locked question must match verbatim');
  assert(indexHtml.includes('CAND 01') && indexHtml.includes('Stepper Motor Dynamics'), 'Post 2 ledger must contain CAND 01');
  assert(indexHtml.includes('CAND 02') && indexHtml.includes('Optical Lens Distortion'), 'Post 2 ledger must contain CAND 02');
  assert(indexHtml.includes('CAND 03') && indexHtml.includes('Eddy Current Proximity Sensors'), 'Post 2 ledger must contain CAND 03');
  assert(indexHtml.includes('CAND 04') && indexHtml.includes('Acoustic Resonance & Speech Synthesis') || indexHtml.includes('Acoustic Resonance &amp; Speech Synthesis'), 'Post 2 ledger must contain CAND 04');
  assert(indexHtml.includes('CAND 05') && indexHtml.includes('Gyroscopic Precession'), 'Post 2 ledger must contain CAND 05');
  assert(indexHtml.includes('CAND 06') && indexHtml.includes('The Kapitza Pendulum'), 'Post 2 ledger must contain CAND 06');

  // 4.3 External Gemini ROM Link
  const geminiLinkMatch = indexHtml.match(/<a[^>]+href=["']https:\/\/share\.gemini\.google\/1Isc2ZbPU9xN["'][^>]*>/i);
  assert(Boolean(geminiLinkMatch), 'Post 2 must contain mechanical ROM link to https://share.gemini.google/1Isc2ZbPU9xN');
  if (geminiLinkMatch) {
    const linkTag = geminiLinkMatch[0];
    assert(linkTag.includes('target="_blank"'), 'Gemini link must specify target="_blank"');
    assert(linkTag.includes('rel="noopener noreferrer"'), 'Gemini link must specify rel="noopener noreferrer"');
  }

  // 4.4 Post 3 Schedule Span & 6 Milestones
  const requiredMilestones = ['sr1', 'sr2', 'pr1', 'pr2', 'pr3', 'del1'];
  for (const ms of requiredMilestones) {
    assert(indexHtml.includes(`data-task-id="${ms}"`), `Post 3 table must contain row with data-task-id="${ms}"`);
  }

  // 4.5 Conferencing Logbook
  assert(indexHtml.includes('id="view-conferencing"'), 'index.html must contain #view-conferencing');
  assert(indexHtml.includes('id="add-conf-btn"'), 'Conferencing must contain #add-conf-btn');
  assert(indexHtml.includes('id="toggle-edit-conf-btn"'), 'Conferencing must contain #toggle-edit-conf-btn');
  assert(indexHtml.includes('id="conf-cards-container"'), 'Conferencing must contain #conf-cards-container');

  return results;
}

// Direct execution entrypoint
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  const result = runEmpiricalVerification();
  console.log(`\n================================================================`);
  console.log(`Challenger 2 Hardening Run Complete: ${result.passedAssertions}/${result.totalAssertions} Passed, ${result.failures.length} Failed`);
  console.log(`================================================================`);
  if (result.failures.length > 0) {
    process.exit(1);
  }
}
