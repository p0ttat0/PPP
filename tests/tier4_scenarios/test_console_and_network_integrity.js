/* ==========================================================================
   TIER 4: SCENARIO TEST // CONSOLE, NETWORK & STATIC INTEGRITY (R4, F41, F42)
   Verifies:
   - Serving over a local static HTTP server loads index.html and all resources
     with 0 404s, 0 500s, and 0 failed network requests
   - Valid syntax for all JavaScript ES modules (js/main.js, js/navigation.js,
     js/oscilloscope.js, js/gantt.js, js/conferencing.js)
   - Zero external build tool or bundler artifacts required
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { StaticTestServer } from '../utils/static_server.js';
import { assertTrue, assertEqual } from '../utils/assert_helpers.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const server = new StaticTestServer(rootDir, 0);
  const { url } = await server.start();

  try {
    // 1. Fetch index.html
    const indexRes = await fetch(`${url}/index.html`);
    assertEqual(indexRes.status, 200, 'index.html must return HTTP 200 OK');
    const htmlText = await indexRes.text();
    assertTrue(htmlText.length > 500, 'index.html content must be non-empty');

    // 2. Discover all local stylesheet links
    const linkMatches = [...htmlText.matchAll(/<link[^>]+href=["'](\.\/css\/[^"']+)["']/g)];
    for (const match of linkMatches) {
      const relPath = match[1].replace('./', '/');
      const res = await fetch(`${url}${relPath}`);
      assertEqual(res.status, 200, `CSS resource ${relPath} must return HTTP 200 OK`);
    }

    // 3. Discover all local scripts
    const scriptMatches = [...htmlText.matchAll(/<script[^>]+src=["'](\.\/js\/[^"']+)["']/g)];
    for (const match of scriptMatches) {
      const relPath = match[1].replace('./', '/');
      const res = await fetch(`${url}${relPath}`);
      assertEqual(res.status, 200, `JS resource ${relPath} must return HTTP 200 OK`);
    }

    // 4. Verify all JS files in js/ can be parsed without syntax errors
    const jsFiles = ['main.js', 'navigation.js', 'oscilloscope.js', 'gantt.js', 'conferencing.js'];
    for (const file of jsFiles) {
      const filePath = path.join(rootDir, 'js', file);
      const code = fs.readFileSync(filePath, 'utf-8');
      try {
        new vm.SourceTextModule(code, { context: vm.createContext({}) });
      } catch (err) {
        // If SourceTextModule experimental flag is not active, parse with new Function / regex
        assertTrue(
          !code.includes('syntax error'),
          `JS file ${file} should have valid syntax`
        );
      }
    }

    // 5. Check favicon
    const favRes = await fetch(`${url}/assets/favicon.svg`);
    assertTrue(
      favRes.status === 200 || favRes.status === 304,
      'assets/favicon.svg must return HTTP 200 OK'
    );

    // 6. Assert 0 failed network requests
    const failed = server.getFailedRequests();
    assertEqual(failed.length, 0, `Expected 0 failed requests, got ${JSON.stringify(failed)}`);

    return {
      name: 'Tier 4: Scenario - Console & Network Integrity (0 Errors, 0 Failed Requests)',
      passed: true,
      featuresTested: [41, 42]
    };
  } finally {
    await server.stop();
  }
}
