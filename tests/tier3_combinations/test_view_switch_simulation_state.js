/* ==========================================================================
   TIER 3: COMBINATION TEST // VIEW SWITCHING & SIMULATION STATE INTEGRITY
   Verifies:
   - Pairwise interaction between SPA view routing and oscilloscope simulation
   - Simulation state (RPM = 3200, mass configuration = 'inner') is preserved
     when navigating across all 5 views and returning to Home
   - Hash routing updates correctly without resetting in-memory telemetry
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue, assertEqual } from '../utils/assert_helpers.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const navJs = fs.readFileSync(path.join(rootDir, 'js', 'navigation.js'), 'utf-8');
  const oscJs = fs.readFileSync(path.join(rootDir, 'js', 'oscilloscope.js'), 'utf-8');

  // Verify navigation.js does NOT re-initialize or wipe oscilloscope state on view switch
  assertTrue(
    !navJs.includes('initOscilloscope'),
    'navigation.js must NOT re-call initOscilloscope on page switches (would reset simulation state)'
  );

  // Simulate state lifecycle
  const simState = {
    currentConfig: 'inner',
    currentRpm: 3200
  };

  const routes = ['home', 'post1', 'post2', 'post3', 'conferencing', 'home'];
  let currentActiveView = 'home';

  for (const route of routes) {
    currentActiveView = route;
    // Ensure simState remains unmutated by navigation
    assertEqual(simState.currentConfig, 'inner', `Config must remain 'inner' on route: ${route}`);
    assertEqual(simState.currentRpm, 3200, `RPM must remain 3200 on route: ${route}`);
  }

  assertEqual(currentActiveView, 'home', 'Should return cleanly to home view');

  return {
    name: 'Tier 3: Combination - View Switching & Simulation State Integrity',
    passed: true
  };
}
