/* ==========================================================================
   TIER 2: BOUNDARY TEST // EXTREME RPM LIMITS (1200 RPM & 3600 RPM)
   Verifies:
   - Clamping and calculation stability at absolute lower bound (1200 RPM)
   - Clamping and calculation stability at absolute upper bound (3600 RPM)
   - Non-NaN, positive periods, non-infinite vector scaling
   ========================================================================== */

import { assertApprox, assertGreaterThanOrEqual, assertLessThanOrEqual, assertFalse } from '../utils/assert_helpers.js';
import {
  computeInertia,
  computeOmega,
  computeAngularMomentum,
  computePrecessionRate,
  computePrecessionPeriod,
  computeRotorSpinDuration
} from '../utils/physics_engine.js';

export async function run() {
  const configs = ['inner', 'outer'];
  const testRpms = [1200, 3600];

  for (const config of configs) {
    for (const rpm of testRpms) {
      const I = computeInertia(config);
      const omega = computeOmega(rpm);
      const L = computeAngularMomentum(config, rpm);
      const omegaP = computePrecessionRate(config, rpm);
      const Tp = computePrecessionPeriod(config, rpm);
      const Trot = computeRotorSpinDuration(rpm);

      // Verify all calculations produce positive, non-NaN numbers
      assertFalse(Number.isNaN(I), `I must not be NaN at ${rpm} RPM`);
      assertFalse(Number.isNaN(omega), `omega must not be NaN at ${rpm} RPM`);
      assertFalse(Number.isNaN(L), `L must not be NaN at ${rpm} RPM`);
      assertFalse(Number.isNaN(omegaP), `Omega_p must not be NaN at ${rpm} RPM`);
      assertFalse(Number.isNaN(Tp), `T_p must not be NaN at ${rpm} RPM`);
      assertFalse(Number.isNaN(Trot), `T_rot must not be NaN at ${rpm} RPM`);

      assertGreaterThanOrEqual(I, 1e-4, 'Inertia must be >= 1.0e-4 kg*m^2');
      assertGreaterThanOrEqual(omega, 100, 'Omega must be >= 100 rad/s');
      assertGreaterThanOrEqual(L, 0.01, 'Angular momentum L must be >= 0.01 N*m*s');
      assertGreaterThanOrEqual(omegaP, 0.5, 'Omega_p must be >= 0.5 rad/s');
      assertLessThanOrEqual(omegaP, 3.0, 'Omega_p must be <= 3.0 rad/s');
      assertGreaterThanOrEqual(Tp, 2.0, 'Precession period must be >= 2.0s');
      assertLessThanOrEqual(Tp, 13.0, 'Precession period must be <= 13.0s');
    }
  }

  // Exact boundary assertion: at 1200 RPM Inner, Omega_p ~ 2.97 rad/s (Rapid precession)
  assertApprox(computePrecessionRate('inner', 1200), 2.97, 0.02);
  // At 3600 RPM Outer, Omega_p ~ 0.51 rad/s (Ultra-stable gyroscopic lock)
  assertApprox(computePrecessionRate('outer', 3600), 0.51, 0.02);

  return {
    name: 'Tier 2: Boundary - Extreme RPM Limits (1200 & 3600 RPM)',
    passed: true
  };
}
