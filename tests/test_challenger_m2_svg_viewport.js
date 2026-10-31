/* ==========================================================================
   CHALLENGER 2: SVG ANIMATION & VIEWPORT GEOMETRY EMPIRICAL STRESS HARNESS
   Independent Empirical Verification for Milestone 2:
   1. All required SVG element IDs in #view-home (index.html)
   2. Radial displacement coordinates (36mm -> 44px, 68mm -> 82px) & spoke groups (k * 60 deg)
   3. Prefers-reduced-motion suppression across CSS & JS
   4. 1080p and 1440p desktop viewport layout rules & zero horizontal scroll
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

  // 1. FILE EXISTENCE & READING
  const indexHtmlPath = path.join(rootDir, 'index.html');
  const viewsCssPath = path.join(rootDir, 'css', 'views.css');
  const tokensCssPath = path.join(rootDir, 'css', 'tokens.css');
  const oscJsPath = path.join(rootDir, 'js', 'oscilloscope.js');

  assert(fs.existsSync(indexHtmlPath), 'index.html must exist');
  assert(fs.existsSync(viewsCssPath), 'css/views.css must exist');
  assert(fs.existsSync(tokensCssPath), 'css/tokens.css must exist');
  assert(fs.existsSync(oscJsPath), 'js/oscilloscope.js must exist');

  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const viewsCss = fs.readFileSync(viewsCssPath, 'utf-8');
  const tokensCss = fs.readFileSync(tokensCssPath, 'utf-8');
  const oscJs = fs.readFileSync(oscJsPath, 'utf-8');

  // ==========================================================================
  // TEST SUITE 1: SVG ELEMENT IDS IN #view-home
  // ==========================================================================
  console.log('\n--- SUITE 1: SVG Element IDs & Selectors in #view-home ---');

  // Extract #view-home section
  const homeSectionMatch = indexHtml.match(/<section[^>]*id=["']view-home["'][^>]*>([\s\S]*?)<\/section>/i);
  assert(Boolean(homeSectionMatch), '#view-home section must exist in index.html');
  const homeHtml = homeSectionMatch ? homeSectionMatch[1] : '';

  // 1.1 #scope-graticule-svg
  const hasScopeSvg = homeHtml.includes('id="scope-graticule-svg"');
  assert(hasScopeSvg, '#scope-graticule-svg must exist within #view-home');
  const viewBoxMatch = homeHtml.match(/<svg[^>]*id=["']scope-graticule-svg["'][^>]*viewBox=["']([^"']+)["']/i);
  assert(
    Boolean(viewBoxMatch && viewBoxMatch[1] === '0 0 1080 480'),
    '#scope-graticule-svg must have viewBox="0 0 1080 480"',
    { viewBox: viewBoxMatch ? viewBoxMatch[1] : null }
  );

  // 1.2 #rotor-spinning-assembly
  const hasRotorAssembly = homeHtml.includes('id="rotor-spinning-assembly"');
  assert(hasRotorAssembly, '#rotor-spinning-assembly must exist within #view-home');
  const rotorGroupMatch = homeHtml.match(/<g[^>]*id=["']rotor-spinning-assembly["'][^>]*>/i);
  assert(
    Boolean(rotorGroupMatch && rotorGroupMatch[0].includes('rotating-rotor')),
    '#rotor-spinning-assembly must have class "rotating-rotor"'
  );

  // 1.3 .m3-screw-washer
  const screwWasherMatches = homeHtml.match(/class=["'][^"']*m3-screw-washer[^"']*["']/g) || [];
  assert(
    screwWasherMatches.length === 6,
    'There must be exactly 6 elements with class ".m3-screw-washer" in #view-home',
    { count: screwWasherMatches.length }
  );
  for (let i = 0; i < 6; i++) {
    assert(
      homeHtml.includes(`id="screw-washer-${i}"`),
      `Screw washer #${i} (#screw-washer-${i}) must exist`
    );
  }

  // 1.4 #svg-pcb-traces
  const hasPcbTraces = homeHtml.includes('id="svg-pcb-traces"');
  assert(hasPcbTraces, '#svg-pcb-traces must exist within #view-home');
  const pcbPulseOutboundMatches = homeHtml.match(/class=["'][^"']*pulse-outbound[^"']*["']/g) || [];
  const pcbPulseInboundMatches = homeHtml.match(/class=["'][^"']*pulse-inbound[^"']*["']/g) || [];
  assert(
    pcbPulseOutboundMatches.length >= 1 && pcbPulseInboundMatches.length >= 1,
    'PCB traces must contain both pulse-outbound and pulse-inbound signal paths',
    { outbound: pcbPulseOutboundMatches.length, inbound: pcbPulseInboundMatches.length }
  );

  // 1.5 #vector-l
  const hasVectorL = homeHtml.includes('id="vector-l"');
  assert(hasVectorL, '#vector-l (angular momentum vector group) must exist within #view-home');

  // 1.6 #vector-tau
  const hasVectorTau = homeHtml.includes('id="vector-tau"');
  assert(hasVectorTau, '#vector-tau (torque vector group) must exist within #view-home');

  // 1.7 #vector-fg
  const hasVectorFg = homeHtml.includes('id="vector-fg"');
  assert(hasVectorFg, '#vector-fg (gravity vector group) must exist within #view-home');

  // 1.8 #svg-precession-orbit
  const hasPrecessionOrbit = homeHtml.includes('id="svg-precession-orbit"');
  assert(hasPrecessionOrbit, '#svg-precession-orbit must exist within #view-home');

  // Auxiliary Graticule Elements
  assert(homeHtml.includes('id="svg-inner-pitch-ring"'), '#svg-inner-pitch-ring must exist');
  assert(homeHtml.includes('id="svg-outer-pitch-ring"'), '#svg-outer-pitch-ring must exist');
  assert(homeHtml.includes('id="svg-spin-vector-line"'), '#svg-spin-vector-line must exist');
  assert(homeHtml.includes('id="svg-torque-vector-line"'), '#svg-torque-vector-line must exist');
  assert(homeHtml.includes('id="svg-gravity-vector-line"'), '#svg-gravity-vector-line must exist');
  assert(homeHtml.includes('id="svg-tilted-rotor-disc"'), '#svg-tilted-rotor-disc must exist');

  // ==========================================================================
  // TEST SUITE 2: RADIAL DISPLACEMENT COORDINATES & SPOKE ORIENTATIONS
  // ==========================================================================
  console.log('\n--- SUITE 2: Radial Displacement & Spoke Geometry (k * 60 deg) ---');

  // 2.1 Spoke Orientation Groups: k * 60 deg around center (240, 240)
  const expectedAngles = [0, 60, 120, 180, 240, 300];
  const spokeRegex = /<g[^>]*class=["'][^"']*spoke-slot[^"']*["'][^>]*transform=["']rotate\((\d+)\s+240\s+240\)["'][^>]*>/g;
  const foundAngles = [];
  let spokeMatch;
  while ((spokeMatch = spokeRegex.exec(homeHtml)) !== null) {
    foundAngles.push(Number(spokeMatch[1]));
  }

  assert(
    foundAngles.length === 6,
    'There must be exactly 6 spoke-slot rotation groups centered at (240, 240)',
    { foundAngles }
  );

  expectedAngles.forEach(angle => {
    assert(
      foundAngles.includes(angle),
      `Spoke group with orientation rotate(${angle} 240 240) must exist`
    );
  });

  // 2.2 Radial Pitch Rings (36mm -> 44px, 68mm -> 82px)
  const innerRingMatch = homeHtml.match(/<circle[^>]*id=["']svg-inner-pitch-ring["'][^>]*r=["'](\d+)["']/i);
  const outerRingMatch = homeHtml.match(/<circle[^>]*id=["']svg-outer-pitch-ring["'][^>]*r=["'](\d+)["']/i);

  assert(
    Boolean(innerRingMatch && Number(innerRingMatch[1]) === 44),
    'Inner pitch ring (#svg-inner-pitch-ring) must have radius r=44px (representing 36mm hub)',
    { innerRadius: innerRingMatch ? innerRingMatch[1] : null }
  );

  assert(
    Boolean(outerRingMatch && Number(outerRingMatch[1]) === 82),
    'Outer pitch ring (#svg-outer-pitch-ring) must have radius r=82px (representing 68mm rim)',
    { outerRadius: outerRingMatch ? outerRingMatch[1] : null }
  );

  // 2.3 CSS Translation Rules for .m3-screw-washer
  assert(
    viewsCss.includes('.m3-screw-washer.at-inner') && viewsCss.includes('translate(44px, 0)'),
    '.m3-screw-washer.at-inner must specify transform: translate(44px, 0) in css/views.css'
  );
  assert(
    viewsCss.includes('.m3-screw-washer.at-outer') && viewsCss.includes('translate(82px, 0)'),
    '.m3-screw-washer.at-outer must specify transform: translate(82px, 0) in css/views.css'
  );

  // 2.4 Transition Timing & Easing (450ms smooth transition)
  const transitionMatch = viewsCss.match(/\.m3-screw-washer\s*\{[^}]*transition:\s*transform\s+([0-9.]+s|0-9.]+ms)[^}]*\}/i);
  assert(
    Boolean(transitionMatch && (transitionMatch[1] === '0.45s' || transitionMatch[1] === '450ms')),
    '.m3-screw-washer transition duration must be 0.45s (450ms) for smooth physical slide',
    { transitionDuration: transitionMatch ? transitionMatch[1] : null }
  );

  // 2.5 JS Constants & Coordinates in oscilloscope.js
  assert(
    oscJs.includes('R_INNER = 0.036') || oscJs.includes('R_INNER=0.036'),
    'js/oscilloscope.js must define R_INNER as 0.036 meters (36 mm)'
  );
  assert(
    oscJs.includes('R_OUTER = 0.068') || oscJs.includes('R_OUTER=0.068'),
    'js/oscilloscope.js must define R_OUTER as 0.068 meters (68 mm)'
  );
  assert(
    oscJs.includes('activeRadiusPx = currentConfig === \'outer\' ? 82 : 44'),
    'js/oscilloscope.js must map radial displacement to 44px (inner) and 82px (outer)'
  );

  // 2.6 Reference Circles Coordinates (svg-inner-weights and svg-outer-weights)
  const centerAstrolabe = { cx: 240, cy: 240 };
  expectedAngles.forEach((deg, idx) => {
    const rad = (deg * Math.PI) / 180;
    const expInnerX = Math.round(centerAstrolabe.cx + 44 * Math.cos(rad));
    const expInnerY = Math.round(centerAstrolabe.cy + 44 * Math.sin(rad));
    const expOuterX = Math.round(centerAstrolabe.cx + 82 * Math.cos(rad));
    const expOuterY = Math.round(centerAstrolabe.cy + 82 * Math.sin(rad));

    const innerCircleStr = `cx="${expInnerX}" cy="${expInnerY}"`;
    const outerCircleStr = `cx="${expOuterX}" cy="${expOuterY}"`;

    assert(
      homeHtml.includes(innerCircleStr),
      `Inner reference weight at ${deg}° must have coordinates (${expInnerX}, ${expInnerY})`
    );
    assert(
      homeHtml.includes(outerCircleStr),
      `Outer reference weight at ${deg}° must have coordinates (${expOuterX}, ${expOuterY})`
    );
  });

  // ==========================================================================
  // TEST SUITE 3: PREFERS-REDUCED-MOTION SUPPRESSION
  // ==========================================================================
  console.log('\n--- SUITE 3: Prefers-Reduced-Motion Accessibility Suppression ---');

  // 3.1 CSS Media Query in css/views.css
  const viewsReducedMatch = viewsCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\}/i);
  assert(Boolean(viewsReducedMatch), 'css/views.css must include @media (prefers-reduced-motion: reduce)');
  const viewsReducedBody = viewsReducedMatch ? viewsReducedMatch[1] : '';

  assert(
    viewsReducedBody.includes('#rotor-spinning-assembly') || viewsReducedBody.includes('.rotating-rotor'),
    'Reduced-motion block in css/views.css must target #rotor-spinning-assembly or .rotating-rotor'
  );
  assert(
    viewsReducedBody.includes('animation: none !important') || viewsReducedBody.includes('animation: none'),
    'Reduced-motion block in css/views.css must suppress animation with animation: none'
  );
  assert(
    viewsReducedBody.includes('.pulse-outbound') && viewsReducedBody.includes('.pulse-inbound'),
    'Reduced-motion block in css/views.css must suppress PCB traveling pulses'
  );
  assert(
    viewsReducedBody.includes('.m3-screw-washer') && viewsReducedBody.includes('transition: none'),
    'Reduced-motion block in css/views.css must disable washer transition'
  );

  // 3.2 CSS Media Query in css/tokens.css
  const tokensReducedMatch = tokensCss.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{([\s\S]*?)\}/i);
  assert(Boolean(tokensReducedMatch), 'css/tokens.css must include @media (prefers-reduced-motion: reduce)');
  const tokensReducedBody = tokensReducedMatch ? tokensReducedMatch[1] : '';
  assert(
    tokensReducedBody.includes('animation: none !important') || tokensReducedBody.includes('animation-duration: 0.01ms'),
    'css/tokens.css must nullify continuous animations under prefers-reduced-motion'
  );

  // 3.3 JS Accessibility & Pause Logic in js/oscilloscope.js
  assert(
    oscJs.includes('prefers-reduced-motion: reduce'),
    'js/oscilloscope.js must check window.matchMedia("(prefers-reduced-motion: reduce)")'
  );
  assert(
    oscJs.includes('animationPlayState = \'paused\''),
    'js/oscilloscope.js must set rotorAssembly.style.animationPlayState = "paused" on reduced motion'
  );
  assert(
    oscJs.includes('precessionPhase = 0'),
    'js/oscilloscope.js must freeze precession orbit phase at nominal index on reduced motion'
  );
  assert(
    oscJs.includes('ROTOR: STATIC (ACCESSIBILITY LOCK)'),
    'js/oscilloscope.js must display accessibility lock indicator on reduced motion'
  );
  assert(
    oscJs.includes('motionQuery.addEventListener') || oscJs.includes('motionQuery.addListener'),
    'js/oscilloscope.js must attach event listener for dynamic reduced-motion toggle'
  );

  // ==========================================================================
  // TEST SUITE 4: 1080p & 1440p VIEWPORT GEOMETRY & LAYOUT RULES
  // ==========================================================================
  console.log('\n--- SUITE 4: 1080p and 1440p Desktop Viewport Layout Rules ---');

  // 4.1 Container Max-Width & Padding
  assert(
    viewsCss.includes('.view-container.wide-1440p') && viewsCss.includes('max-width: 2380px'),
    'css/views.css must define .view-container.wide-1440p with max-width: 2380px to fill 1440p viewport'
  );

  // 4.2 Grid Layout Columns (Asymmetric 3-Wing Triptych)
  const standardGridMatch = viewsCss.match(/\.gyro-triptych-grid[\s\S]*?grid-template-columns:\s*([^;]+);/i);
  assert(Boolean(standardGridMatch), 'css/views.css must define grid-template-columns for .gyro-triptych-grid');
  const standardCols = standardGridMatch ? standardGridMatch[1] : '';
  assert(
    standardCols.includes('minmax(320px, 1.05fr)') &&
    standardCols.includes('minmax(620px, 2.2fr)') &&
    standardCols.includes('minmax(290px, 0.95fr)'),
    'Standard desktop grid must specify columns: minmax(320px, 1.05fr) minmax(620px, 2.2fr) minmax(290px, 0.95fr)',
    { standardCols }
  );

  // 4.3 1440p Wide Desktop Media Query (>= 1600px)
  const wideDesktopMatch = viewsCss.match(/@media\s*\(\s*min-width:\s*1600px\s*\)\s*\{([\s\S]*?)\}/i);
  assert(Boolean(wideDesktopMatch), 'css/views.css must include @media (min-width: 1600px) for wide 1440p viewports');
  const wideColsMatch = wideDesktopMatch ? wideDesktopMatch[1].match(/grid-template-columns:\s*([^;]+);/i) : null;
  assert(
    Boolean(wideColsMatch && wideColsMatch[1].includes('minmax(360px, 1.1fr)') && wideColsMatch[1].includes('minmax(760px, 2.4fr)') && wideColsMatch[1].includes('minmax(320px, 1fr)')),
    'Wide desktop query must scale columns to: minmax(360px, 1.1fr) minmax(760px, 2.4fr) minmax(320px, 1fr)',
    { wideCols: wideColsMatch ? wideColsMatch[1] : null }
  );

  // 4.4 Central Chamber Dominance
  // In both 1080p and 1440p, center column is >= 2.2fr / 4.2fr (~52% to 53% of width)
  assert(
    standardCols.includes('2.2fr') && (wideColsMatch && wideColsMatch[1].includes('2.4fr')),
    'Central Astrolabe Chamber must command >50% fractional grid width in both resolutions'
  );

  // 4.5 Responsive Breakpoint for <= 1200px
  const narrowMatch = viewsCss.match(/@media\s*\(\s*max-width:\s*1200px\s*\)\s*\{([\s\S]*?)\}/i);
  assert(Boolean(narrowMatch), 'css/views.css must include @media (max-width: 1200px) collapse rule');
  assert(
    Boolean(narrowMatch && narrowMatch[1].includes('grid-template-columns: 1fr')),
    'css/views.css must collapse triptych grid to 1 column at <= 1200px'
  );

  // 4.6 Zero Horizontal Scroll Enforcement
  assert(
    tokensCss.includes('overflow-x: hidden'),
    'css/tokens.css must enforce overflow-x: hidden on body to eliminate horizontal scrollbars'
  );

  // 4.7 SVG Fluid Responsiveness
  const svgCssMatch = viewsCss.match(/\.scope-graticule-svg\s*\{[^}]*\}/i);
  assert(
    Boolean(svgCssMatch && svgCssMatch[0].includes('width: 100%') && svgCssMatch[0].includes('height: auto')),
    '.scope-graticule-svg must have width: 100% and height: auto to scale fluidly without causing overflow'
  );

  // SUMMARY & REPORT
  console.log('\n================================================================================');
  console.log(`TOTAL ASSERTIONS: ${results.totalAssertions}`);
  console.log(`PASSED: ${results.passedAssertions}`);
  console.log(`FAILED: ${results.failures.length}`);
  console.log('================================================================================\n');

  return results;
}

// Auto-run if executed directly via Node.js
if (process.argv[1] && process.argv[1].endsWith('test_challenger_m2_svg_viewport.js')) {
  const res = runEmpiricalVerification();
  if (res.failures.length > 0) {
    process.exit(1);
  }
}
