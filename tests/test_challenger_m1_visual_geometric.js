/* ==========================================================================
   CHALLENGER 2: VISUAL & GEOMETRIC TOKEN STRESS HARNESS
   Independent Empirical Verification of:
   1. Authoritative Color Tokens (8 Exact Hex Values)
   2. 4-Tier Typography Stack & Google Fonts CDN Specs
   3. Stepped Art Deco Ziggurat Bracket Geometry & Clip-Path Polygon Math
   4. Streamline Moderne Speed-Line Geometric Proportions
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

  // 1. FILE READS
  const tokensCssPath = path.join(rootDir, 'css', 'tokens.css');
  const decoCssPath = path.join(rootDir, 'css', 'deco-ornament.css');
  const indexHtmlPath = path.join(rootDir, 'index.html');

  assert(fs.existsSync(tokensCssPath), 'css/tokens.css must exist');
  assert(fs.existsSync(decoCssPath), 'css/deco-ornament.css must exist');
  assert(fs.existsSync(indexHtmlPath), 'index.html must exist');

  const tokensCss = fs.readFileSync(tokensCssPath, 'utf-8');
  const decoCss = fs.readFileSync(decoCssPath, 'utf-8');
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Helper to extract CSS custom properties
  function extractVariables(css) {
    const vars = {};
    const regex = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
    let match;
    while ((match = regex.exec(css)) !== null) {
      vars[`--${match[1]}`] = match[2].trim();
    }
    return vars;
  }

  const cssVars = extractVariables(tokensCss);

  // ------------------------------------------------------------------------
  // TEST 1: AUTHORITATIVE COLOR TOKENS (8 EXACT HEX VALUES)
  // ------------------------------------------------------------------------
  const expectedColors = [
    { name: '--brass-primary', hex: '#d4a853', label: 'Art Deco Brass Gold' },
    { name: '--brass-deep', hex: '#b88938', label: 'Machined Brass Shadow' },
    { name: '--chassis-env-bg', hex: '#0c0e12', label: 'Chassis Ambient Background' },
    { name: '--chassis-cast-iron', hex: '#12151b', label: 'Cast Iron Enamel Base' },
    { name: '--vfd-cyan', hex: '#00f0d0', label: 'VFD Cyan Phosphor' },
    { name: '--vfd-amber', hex: '#ff9f1c', label: 'Nixie Amber Phosphor' },
    { name: '--vfd-emerald', hex: '#2ee57d', label: 'CRT Emerald Phosphor' },
    { name: '--vfd-crimson', hex: '#ff3b5c', label: 'Ruby / Crimson Hazard' }
  ];

  results.details.colorTokens = [];
  for (const exp of expectedColors) {
    const actualVal = cssVars[exp.name];
    const matchesHex = actualVal && actualVal.toLowerCase().includes(exp.hex.toLowerCase());
    assert(
      matchesHex,
      `Color token ${exp.name} must match exact hex ${exp.hex} (${exp.label})`,
      { expected: exp.hex, actual: actualVal }
    );
    results.details.colorTokens.push({
      token: exp.name,
      expected: exp.hex,
      actual: actualVal,
      pass: matchesHex
    });
  }

  // ------------------------------------------------------------------------
  // TEST 2: 4-TIER TYPOGRAPHY STACK
  // ------------------------------------------------------------------------
  const expectedFontStacks = [
    {
      tier: 'Display',
      token: '--font-display',
      requiredFamilies: ['Federo', 'Syne']
    },
    {
      tier: 'VFD Pixel Readout',
      token: '--font-pixel',
      requiredFamilies: ['Silkscreen', 'VT323']
    },
    {
      tier: 'Technical Monospace',
      token: '--font-mono',
      requiredFamilies: ['Share Tech Mono']
    },
    {
      tier: 'Humanist Editorial Body',
      token: '--font-sans',
      requiredFamilies: ['IBM Plex Sans']
    }
  ];

  results.details.fontStacks = [];
  for (const stack of expectedFontStacks) {
    const fontValue = cssVars[stack.token];
    assert(
      fontValue !== undefined,
      `Typography stack ${stack.token} must be defined in tokens.css`,
      { token: stack.token }
    );
    if (fontValue) {
      for (const fam of stack.requiredFamilies) {
        const containsFamily = fontValue.includes(fam);
        assert(
          containsFamily,
          `${stack.token} (${stack.tier}) must contain font family '${fam}'`,
          { token: stack.token, fontValue, missing: fam }
        );
      }
    }
    results.details.fontStacks.push({
      token: stack.token,
      tier: stack.tier,
      value: fontValue
    });
  }

  // ------------------------------------------------------------------------
  // TEST 3: GOOGLE FONTS CDN LINK IN index.html
  // ------------------------------------------------------------------------
  const googleFontsLinkMatch = indexHtml.match(/<link[^>]*href=["'](https:\/\/fonts\.googleapis\.com\/css2\?[^"']+)["'][^>]*>/i);
  assert(
    !!googleFontsLinkMatch,
    'index.html must contain a Google Fonts css2 link in <head>',
    { match: googleFontsLinkMatch ? googleFontsLinkMatch[0] : null }
  );

  if (googleFontsLinkMatch) {
    const fontsUrl = googleFontsLinkMatch[1];
    const requiredCdnFamilies = [
      'Federo',
      'Syne',
      'Silkscreen',
      'VT323',
      'Share+Tech+Mono',
      'IBM+Plex+Sans'
    ];

    for (const fam of requiredCdnFamilies) {
      assert(
        fontsUrl.includes(`family=${fam}`),
        `Google Fonts link must request family '${fam}'`,
        { fontsUrl }
      );
    }

    // Verify weights
    assert(
      fontsUrl.includes('IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400'),
      'IBM Plex Sans must request 400, 500, 600 and italic weights',
      { fontsUrl }
    );
    assert(
      fontsUrl.includes('Silkscreen:wght@400;700'),
      'Silkscreen must request 400 and 700 weights',
      { fontsUrl }
    );
    assert(
      fontsUrl.includes('Syne:wght@700;800'),
      'Syne must request 700 and 800 weights',
      { fontsUrl }
    );
    assert(
      fontsUrl.includes('display=swap'),
      'Google Fonts link must use display=swap for seamless font loading',
      { fontsUrl }
    );

    // Preconnect verification
    assert(
      indexHtml.includes('<link rel="preconnect" href="https://fonts.googleapis.com">') &&
      indexHtml.includes('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'),
      'index.html must preconnect to fonts.googleapis.com and fonts.gstatic.com crossorigin'
    );
  }

  // ------------------------------------------------------------------------
  // TEST 4: STEPPED ART DECO ZIGGURAT BRACKET GEOMETRY & CLIP-PATH POLYGON
  // ------------------------------------------------------------------------
  // 4a. Frame & Bracket Containers
  assert(
    decoCss.includes('.ziggurat-bracket-frame'),
    'deco-ornament.css must define .ziggurat-bracket-frame'
  );
  assert(
    decoCss.includes('.zig-bracket.zig-tl') &&
    decoCss.includes('.zig-bracket.zig-tr') &&
    decoCss.includes('.zig-bracket.zig-bl') &&
    decoCss.includes('.zig-bracket.zig-br'),
    'deco-ornament.css must define all 4 corner positions (.zig-tl, .zig-tr, .zig-bl, .zig-br)'
  );

  // 4b. Pure CSS Stepped Clip-Path Panel Geometry
  const clipPathMatch = decoCss.match(/\.deco-ziggurat-panel\s*\{[\s\S]*?clip-path:\s*polygon\(([\s\S]*?)\);/);
  assert(
    !!clipPathMatch,
    '.deco-ziggurat-panel must define a clip-path: polygon(...)',
    { found: !!clipPathMatch }
  );

  if (clipPathMatch) {
    const rawPolygon = clipPathMatch[1];
    // Split polygon into vertex pairs
    const vertices = rawPolygon
      .split(',')
      .map(v => v.replace(/\/\*[\s\S]*?\*\//g, '').trim())
      .filter(v => v.length > 0);

    assert(
      vertices.length === 20,
      `Stepped Art Deco ziggurat polygon must have exactly 20 vertices (4 corners * 4 steps + 4 cardinal edges), found ${vertices.length}`,
      { vertices }
    );

    // Parse each vertex into normalized (x, y) coordinates relative to W, H
    // Example format: "0% 12px", "calc(100% - 12px) 0%"
    function parseCoord(token) {
      token = token.trim();
      const parts = token.split(/\s+/);
      return { x: parts[0], y: parts[1] };
    }

    const parsedVertices = vertices.map(parseCoord);
    results.details.polygonVertices = parsedVertices;

    // Verify 4-fold geometric symmetry
    // Corner 1: Top-Left (Vertices 0..4)
    // 0: (0%, 12px)
    // 1: (4px, 12px)
    // 2: (4px, 6px)
    // 3: (12px, 6px)
    // 4: (12px, 0%)
    assert(parsedVertices[0].x === '0%' && parsedVertices[0].y === '12px', 'Vertex 0 must be (0%, 12px)');
    assert(parsedVertices[1].x === '4px' && parsedVertices[1].y === '12px', 'Vertex 1 must be (4px, 12px)');
    assert(parsedVertices[2].x === '4px' && parsedVertices[2].y === '6px', 'Vertex 2 must be (4px, 6px)');
    assert(parsedVertices[3].x === '12px' && parsedVertices[3].y === '6px', 'Vertex 3 must be (12px, 6px)');
    assert(parsedVertices[4].x === '12px' && parsedVertices[4].y === '0%', 'Vertex 4 must be (12px, 0%)');

    // Corner 2: Top-Right (Vertices 5..9)
    // 5: (calc(100% - 12px), 0%)
    // 6: (calc(100% - 12px), 6px)
    // 7: (calc(100% - 4px), 6px)
    // 8: (calc(100% - 4px), 12px)
    // 9: (100%, 12px)
    assert(parsedVertices[5].x.includes('100% - 12px') && parsedVertices[5].y === '0%', 'Vertex 5 must be (100% - 12px, 0%)');
    assert(parsedVertices[6].x.includes('100% - 12px') && parsedVertices[6].y === '6px', 'Vertex 6 must be (100% - 12px, 6px)');
    assert(parsedVertices[7].x.includes('100% - 4px') && parsedVertices[7].y === '6px', 'Vertex 7 must be (100% - 4px, 6px)');
    assert(parsedVertices[8].x.includes('100% - 4px') && parsedVertices[8].y === '12px', 'Vertex 8 must be (100% - 4px, 12px)');
    assert(parsedVertices[9].x === '100%' && parsedVertices[9].y === '12px', 'Vertex 9 must be (100%, 12px)');

    // Corner 3: Bottom-Right (Vertices 10..14)
    // 10: (100%, calc(100% - 12px))
    // 11: (calc(100% - 4px), calc(100% - 12px))
    // 12: (calc(100% - 4px), calc(100% - 6px))
    // 13: (calc(100% - 12px), calc(100% - 6px))
    // 14: (calc(100% - 12px), 100%)
    assert(parsedVertices[10].x === '100%' && parsedVertices[10].y.includes('100% - 12px'), 'Vertex 10 must be (100%, 100% - 12px)');
    assert(parsedVertices[11].x.includes('100% - 4px') && parsedVertices[11].y.includes('100% - 12px'), 'Vertex 11 must be (100% - 4px, 100% - 12px)');
    assert(parsedVertices[12].x.includes('100% - 4px') && parsedVertices[12].y.includes('100% - 6px'), 'Vertex 12 must be (100% - 4px, 100% - 6px)');
    assert(parsedVertices[13].x.includes('100% - 12px') && parsedVertices[13].y.includes('100% - 6px'), 'Vertex 13 must be (100% - 12px, 100% - 6px)');
    assert(parsedVertices[14].x.includes('100% - 12px') && parsedVertices[14].y === '100%', 'Vertex 14 must be (100% - 12px, 100%)');

    // Corner 4: Bottom-Left (Vertices 15..19)
    // 15: (12px, 100%)
    // 16: (12px, calc(100% - 6px))
    // 17: (4px, calc(100% - 6px))
    // 18: (4px, calc(100% - 12px))
    // 19: (0%, calc(100% - 12px))
    assert(parsedVertices[15].x === '12px' && parsedVertices[15].y === '100%', 'Vertex 15 must be (12px, 100%)');
    assert(parsedVertices[16].x === '12px' && parsedVertices[16].y.includes('100% - 6px'), 'Vertex 16 must be (12px, 100% - 6px)');
    assert(parsedVertices[17].x === '4px' && parsedVertices[17].y.includes('100% - 6px'), 'Vertex 17 must be (4px, 100% - 6px)');
    assert(parsedVertices[18].x === '4px' && parsedVertices[18].y.includes('100% - 12px'), 'Vertex 18 must be (4px, 100% - 12px)');
    assert(parsedVertices[19].x === '0%' && parsedVertices[19].y.includes('100% - 12px'), 'Vertex 19 must be (0%, 100% - 12px)');
  }

  // ------------------------------------------------------------------------
  // TEST 5: STREAMLINE MODERNE SPEED-LINE PROPORTIONS & DOUBLE BRASS RULES
  // ------------------------------------------------------------------------
  assert(
    decoCss.includes('.speed-lines-horizontal .speed-line:nth-child(1)') &&
    decoCss.includes('width: 100%'),
    'Speed line 1 must have 100% width'
  );
  assert(
    decoCss.includes('.speed-lines-horizontal .speed-line:nth-child(2)') &&
    decoCss.includes('width: 82%'),
    'Speed line 2 must have 82% width'
  );
  assert(
    decoCss.includes('.speed-lines-horizontal .speed-line:nth-child(3)') &&
    decoCss.includes('width: 56%'),
    'Speed line 3 must have 56% width'
  );

  assert(
    decoCss.includes('.rule-double-brass') &&
    decoCss.includes('var(--brass-primary)') &&
    decoCss.includes('var(--brass-deep)'),
    'Double-line brass rule must be defined with --brass-primary and --brass-deep'
  );
  assert(
    decoCss.includes('.rule-double-brass.with-diamond::after') &&
    decoCss.includes('rotate(45deg)'),
    'Double-line brass rule with diamond break must define 45-degree diamond glyph'
  );

  return results;
}

// Self-execution check if run directly via Node
if (process.argv[1] && process.argv[1].endsWith('test_challenger_m1_visual_geometric.js')) {
  const summary = runEmpiricalVerification();
  console.log('\n======================================================');
  console.log(`CHALLENGER 2 SUITE SUMMARY: ${summary.passedAssertions} / ${summary.totalAssertions} Passed`);
  console.log(`Failures: ${summary.failures.length}`);
  console.log('======================================================');
  if (summary.failures.length > 0) {
    process.exit(1);
  }
}
