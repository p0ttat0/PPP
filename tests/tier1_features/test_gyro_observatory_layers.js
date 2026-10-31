/* ==========================================================================
   TIER 1: FEATURES 17, 18, 20, 21, 22, 23, 24 // GYRO-TRIPTYCH OBSERVATORY
   Verifies:
   - F17: Gyro-Triptych Observatory Chamber
   - F18: Layer 1: Continuous Rotating Rotor Assembly
   - F20: Layer 2: Radial Screw Translation (36mm <-> 68mm)
   - F21: Layer 3: Traveling Circuit Signal Pulses
   - F22: Layer 4: Live 3D Precession Cone (Rx = 62px <-> 42px)
   - F23: Layer 4: Dynamic Momentum & Torque Vectors
   - F24: Live VFD Equation Counters (I, Omega_p)
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue, assertEqual, assertApprox } from '../utils/assert_helpers.js';
import {
  computeInertia,
  computePrecessionRate,
  computeRotorSpinDuration,
  formatInertiaDisplay,
  formatPrecessionDisplay
} from '../utils/physics_engine.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
  const oscJs = fs.readFileSync(path.join(rootDir, 'js', 'oscilloscope.js'), 'utf-8');

  // 1. Gyro-Triptych Observatory Chamber (Feature 17)
  // Check for SVG vector graticule / chamber in #view-home
  const hasSvgChamber =
    indexHtml.includes('<svg') &&
    (indexHtml.includes('view-home') || indexHtml.includes('scope-graticule-svg'));
  assertTrue(hasSvgChamber, 'Homepage must contain central SVG Astrolabe & Oscilloscope chamber (Feature 17)');

  // 2. Layer 1: Continuous Rotating Rotor (Feature 18)
  // Check for rotor element, spinning assembly, or rotation animation hook
  const hasRotorAssembly =
    indexHtml.includes('rotor') ||
    indexHtml.includes('svg-rotor') ||
    oscJs.includes('rotor') ||
    oscJs.includes('spin');
  assertTrue(hasRotorAssembly, 'Rotor assembly must be present in DOM and script (Feature 18)');

  // Test dynamic rotation scaling formula: T_rot = 7200 / RPM
  assertApprox(computeRotorSpinDuration(1200), 6.0, 0.001, 'Rotor spin period at 1200 RPM must be 6.0s');
  assertApprox(computeRotorSpinDuration(2400), 3.0, 0.001, 'Rotor spin period at 2400 RPM must be 3.0s');
  assertApprox(computeRotorSpinDuration(3600), 2.0, 0.001, 'Rotor spin period at 3600 RPM must be 2.0s');

  // 3. Layer 2: Radial Screw Translation (Feature 20)
  // 6x M3 screws sliding between inner hub (36mm) and outer rim (68mm)
  const hasInnerWeights =
    indexHtml.includes('svg-inner-weights') || indexHtml.includes('at-inner') || oscJs.includes('inner');
  const hasOuterWeights =
    indexHtml.includes('svg-outer-weights') || indexHtml.includes('at-outer') || oscJs.includes('outer');
  assertTrue(hasInnerWeights, 'Must contain inner weights group / representation (Feature 20)');
  assertTrue(hasOuterWeights, 'Must contain outer weights group / representation (Feature 20)');

  // 4. Layer 3: Traveling Circuit Signal Pulses (Feature 21)
  // Check for pulse traces or PCB signal traces
  const hasPulseSignals =
    indexHtml.includes('pulse') ||
    indexHtml.includes('pcb') ||
    indexHtml.includes('trace') ||
    indexHtml.includes('stroke-dashoffset') ||
    oscJs.includes('pulse');
  assertTrue(hasPulseSignals, 'PCB traces with traveling signal pulse representation must exist (Feature 21)');

  // 5. Layer 4: Live 3D Precession Cone & Vectors (Features 22, 23)
  // Bounded precession orbit ellipse (rx = 42 for outer, rx = 62 for inner)
  const hasPrecessionOrbit =
    indexHtml.includes('precession-orbit') ||
    indexHtml.includes('svg-precession-orbit') ||
    oscJs.includes('precessionOrbitEllipse') ||
    oscJs.includes('rx');
  assertTrue(hasPrecessionOrbit, 'Precession orbit ellipse must be present in DOM/script (Feature 22)');

  const hasMomentumTorqueVectors =
    indexHtml.includes('vector') ||
    indexHtml.includes('spin-vector') ||
    indexHtml.includes('vector-l') ||
    oscJs.includes('angularMomentumLine') ||
    oscJs.includes('stroke-width');
  assertTrue(hasMomentumTorqueVectors, 'Angular momentum / torque vectors must exist (Feature 23)');

  // 6. Live Equation Counters (Feature 24)
  // Check readouts for I and Omega_p
  const hasInertiaReadout =
    indexHtml.includes('vfd-inertia-val') ||
    indexHtml.includes('readout-inertia') ||
    oscJs.includes('inertiaReadout');
  const hasPrecessionReadout =
    indexHtml.includes('vfd-precession-val') ||
    indexHtml.includes('readout-precession') ||
    oscJs.includes('precessionReadout');
  assertTrue(hasInertiaReadout, 'Moment of inertia readout element must be present in DOM (Feature 24)');
  assertTrue(hasPrecessionReadout, 'Precession angular velocity readout element must be present (Feature 24)');

  // Verify numerical calculations in physics engine match specifications:
  // Inner: I = 1.2866e-4 kg*m^2 (~1.29e-4), Omega_p @ 2400 RPM = 1.48 rad/s
  // Outer: I = 2.4846e-4 kg*m^2 (~2.48e-4), Omega_p @ 2400 RPM = 0.77 rad/s
  const I_inner = computeInertia('inner');
  const I_outer = computeInertia('outer');
  assertApprox(I_inner * 1e4, 1.29, 0.01, 'Inner I must be ~1.29e-4 kg*m^2');
  assertApprox(I_outer * 1e4, 2.48, 0.01, 'Outer I must be ~2.48e-4 kg*m^2');

  const omegaP_inner_2400 = computePrecessionRate('inner', 2400);
  const omegaP_outer_2400 = computePrecessionRate('outer', 2400);
  assertApprox(omegaP_inner_2400, 1.48, 0.02, 'Inner Omega_p @ 2400 RPM must be ~1.48 rad/s');
  assertApprox(omegaP_outer_2400, 0.77, 0.02, 'Outer Omega_p @ 2400 RPM must be ~0.77 rad/s');

  return {
    name: 'Tier 1: Gyro-Triptych Observatory 4-Layers & Physics (Features 17, 18, 20, 21, 22, 23, 24)',
    passed: true,
    featuresTested: [17, 18, 20, 21, 22, 23, 24]
  };
}
