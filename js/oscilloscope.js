/* ==========================================================================
   OSCILLOSCOPE MODULE // INTERACTIVE ROTOR MASS & PRECESSION SIMULATOR
   Allows the user to toggle the 6x M3 screw/washer weights between the
   Inner Hub (r = 36mm) and Outer Rim (r = 68mm) and adjust motor RPM via
   tactile hardware controls, updating the CRT vector traces and VFD readouts.
   ========================================================================== */

export function initOscilloscope() {
  const modeBtns = document.querySelectorAll('.scope-mode-btn[data-rotor-config]');
  const rpmSlider = document.getElementById('rotor-rpm-slider');
  const rpmReadout = document.getElementById('rotor-rpm-readout');

  const inertiaReadout = document.getElementById('vfd-inertia-val');
  const precessionReadout = document.getElementById('vfd-precession-val');
  const headerDriveVal = document.getElementById('header-rotor-val');

  // SVG elements inside the CRT vector scope
  const innerMassGroup = document.getElementById('svg-inner-weights');
  const outerMassGroup = document.getElementById('svg-outer-weights');
  const radiusVectorLine = document.getElementById('svg-active-radius-line');
  const radiusCalloutText = document.getElementById('svg-active-radius-label');
  const precessionOrbitEllipse = document.getElementById('svg-precession-orbit');
  const precessionAxisLabel = document.getElementById('svg-precession-rate-label');
  const angularMomentumLine = document.getElementById('svg-spin-vector-line');

  if (!modeBtns.length) return;

  // Physical constants for educational demonstration
  // Base rotor inertia I_0 = 0.82e-4 kg*m^2
  // 6x M3 stainless steel screws + washers total movable mass m = 0.036 kg
  const I0 = 0.82; // scaled in 10^-4 kg·m²
  const MOVABLE_MASS = 0.036; // kg
  const R_INNER = 0.036; // 36 mm in meters
  const R_OUTER = 0.068; // 68 mm in meters
  const GRAVITY_TORQUE = 0.048; // N·m (M * g * d_pivot)

  let currentConfig = 'outer'; // 'inner' | 'outer'
  let currentRpm = 2400;

  function updateSimulation() {
    const r = currentConfig === 'outer' ? R_OUTER : R_INNER;
    // Calculate I in units of 10^-4 kg·m²
    const addedInertia = MOVABLE_MASS * r * r * 1e4;
    const totalInertia = I0 + addedInertia; // ~1.29 (inner) vs ~2.48 (outer)

    // Convert RPM to rad/s
    const omega = (currentRpm * 2 * Math.PI) / 60;
    // Precession angular velocity Omega_p = tau / (I * omega)
    const inertiaKgM2 = totalInertia * 1e-4;
    const omegaP = GRAVITY_TORQUE / (inertiaKgM2 * omega);

    // Update VFD digital equation readouts if present
    if (inertiaReadout) {
      inertiaReadout.textContent = `I = ${totalInertia.toFixed(2)}e-4 kg·m²`;
    }
    if (precessionReadout) {
      precessionReadout.textContent = `Ω_p = ${omegaP.toFixed(2)} rad/s`;
    }
    if (rpmReadout) {
      rpmReadout.textContent = `${currentRpm} RPM`;
    }
    if (headerDriveVal) {
      headerDriveVal.textContent = `${currentRpm} RPM // ${currentConfig.toUpperCase()}`;
    }

    // Update SVG Rotor Geometry (CH1)
    if (innerMassGroup && outerMassGroup) {
      if (currentConfig === 'outer') {
        outerMassGroup.setAttribute('opacity', '1');
        innerMassGroup.setAttribute('opacity', '0.28');
      } else {
        outerMassGroup.setAttribute('opacity', '0.25');
        innerMassGroup.setAttribute('opacity', '1');
      }
    }

    if (radiusVectorLine && radiusCalloutText) {
      if (currentConfig === 'outer') {
        radiusVectorLine.setAttribute('x2', '231');
        radiusVectorLine.setAttribute('y2', '139');
        radiusVectorLine.setAttribute('stroke', '#ff9f1c');
        radiusCalloutText.textContent = 'r_outer = 68mm (MAX I)';
        radiusCalloutText.setAttribute('fill', '#ff9f1c');
      } else {
        radiusVectorLine.setAttribute('x2', '205');
        radiusVectorLine.setAttribute('y2', '154');
        radiusVectorLine.setAttribute('stroke', '#00f0d0');
        radiusCalloutText.textContent = 'r_inner = 36mm (LOW I)';
        radiusCalloutText.setAttribute('fill', '#00f0d0');
      }
    }

    // Update SVG Precession Cone & Vector (CH2)
    if (precessionOrbitEllipse) {
      const rx = currentConfig === 'outer' ? 42 : 62;
      precessionOrbitEllipse.setAttribute('rx', String(rx));
    }
    if (precessionAxisLabel) {
      const rateDesc = currentConfig === 'outer' ? 'SLOWER' : 'FASTER';
      precessionAxisLabel.textContent = `Ω_p = ${omegaP.toFixed(2)} rad/s (${rateDesc})`;
    }
    if (angularMomentumLine) {
      const strokeW = currentConfig === 'outer' ? '3.2' : '2.1';
      angularMomentumLine.setAttribute('stroke-width', strokeW);
    }
  }

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentConfig = btn.dataset.rotorConfig;
      modeBtns.forEach(b => b.classList.toggle('active', b === btn));
      updateSimulation();
    });
  });

  if (rpmSlider) {
    rpmSlider.addEventListener('input', e => {
      currentRpm = Number(e.target.value);
      updateSimulation();
    });
  }

  updateSimulation();
}
