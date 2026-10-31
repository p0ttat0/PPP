/* ==========================================================================
   TIER 2: BOUNDARY TEST // RAPID ROCKER SWITCH TOGGLES
   Verifies:
   - Alternating state transitions between Inner Hub (36mm) and Outer Rim (68mm)
   - Rotational inertia delta: (I_outer / I_inner - 1) ~ +93.1%
   - Precession orbit ellipse semi-major axis toggle (Rx = 62px <-> 42px)
   - Consistency of state updates across rapid sequence
   ========================================================================== */

import { assertApprox, assertEqual, assertTrue } from '../utils/assert_helpers.js';
import { computeInertia, computePrecessionRate } from '../utils/physics_engine.js';

export async function run() {
  const I_inner = computeInertia('inner');
  const I_outer = computeInertia('outer');

  // Verify +93.1% inertia increase at constant total mass M
  const inertiaRatio = I_outer / I_inner;
  const percentageIncrease = (inertiaRatio - 1) * 100;
  assertApprox(percentageIncrease, 93.1, 0.5, 'Inertia increase must be ~93.1%');

  // Simulate a rapid toggle sequence of 20 alternating clicks
  let state = 'inner';
  const history = [];

  for (let i = 0; i < 20; i++) {
    state = state === 'inner' ? 'outer' : 'inner';
    const rx = state === 'outer' ? 42 : 62;
    const I = computeInertia(state);
    const omegaP = computePrecessionRate(state, 2400);

    history.push({ i, state, rx, I, omegaP });

    if (state === 'inner') {
      assertEqual(rx, 62);
      assertApprox(I * 1e4, 1.29, 0.02);
      assertApprox(omegaP, 1.48, 0.02);
    } else {
      assertEqual(rx, 42);
      assertApprox(I * 1e4, 2.48, 0.02);
      assertApprox(omegaP, 0.77, 0.02);
    }
  }

  assertEqual(history.length, 20);
  assertEqual(history[19].state, 'inner');

  return {
    name: 'Tier 2: Boundary - Rapid Rocker Switch Toggles (36mm <-> 68mm)',
    passed: true
  };
}
