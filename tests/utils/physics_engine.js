/* ==========================================================================
   PHYSICS ENGINE REFERENCE ORACLE
   Implements authoritative physics equations from ORIGINAL_REQUEST.md & spec_schematic_mermaid.md:
   - Moment of Inertia: I = I_0 + sum(m * r^2)
   - Angular Velocity: omega = (2 * pi * RPM) / 60
   - Angular Momentum: L = I * omega
   - Torque: tau = r_cm x M * g (constant 0.048 N*m)
   - Precession Velocity: Omega_p = tau / (I * omega)
   - Precession Period: T_p = 2 * pi / Omega_p
   - Rotor Spin Animation Duration: T_rot = 7200 / RPM
   ========================================================================== */

export const I0 = 0.82e-4; // kg * m^2 (PETG wheel + motor bell)
export const MOVABLE_MASS = 0.036; // kg (6x M3 screws + washers)
export const R_INNER = 0.036; // m (36 mm)
export const R_OUTER = 0.068; // m (68 mm)
export const GRAVITY_TORQUE = 0.048; // N * m

export function computeInertia(config) {
  const r = config === 'outer' ? R_OUTER : R_INNER;
  const added = MOVABLE_MASS * r * r;
  return I0 + added;
}

export function computeOmega(rpm) {
  return (rpm * 2 * Math.PI) / 60;
}

export function computeAngularMomentum(config, rpm) {
  const I = computeInertia(config);
  const omega = computeOmega(rpm);
  return I * omega;
}

export function computePrecessionRate(config, rpm) {
  const I = computeInertia(config);
  const omega = computeOmega(rpm);
  return GRAVITY_TORQUE / (I * omega);
}

export function computePrecessionPeriod(config, rpm) {
  const omegaP = computePrecessionRate(config, rpm);
  return (2 * Math.PI) / omegaP;
}

export function computeRotorSpinDuration(rpm) {
  return 7200 / rpm;
}

export function formatInertiaDisplay(I_kg_m2) {
  const scaled = I_kg_m2 * 1e4;
  return `I = ${scaled.toFixed(2)}e-4 kg·m²`;
}

export function formatPrecessionDisplay(omegaP) {
  return `Ω_p = ${omegaP.toFixed(2)} rad/s`;
}
