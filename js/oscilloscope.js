/* ==========================================================================
   OSCILLOSCOPE MODULE // THE GYRO-TRIPTYCH OBSERVATORY SIMULATION ENGINE
   Physics equations, real-time SVG vector rendering, dynamic rotor rotation,
   radial M3 screw translation, PCB traveling signal pulses, and 3D gyroscopic
   precession orbit kinematics.
   ========================================================================== */

// Authoritative Physical Constants (Rigid-Body Rotational Dynamics)
export const I0 = 0.82e-4; // Base rotor inertia in kg·m² (3D-printed PETG wheel body + motor bell)
export const MOVABLE_MASS = 0.036; // 6x M3 stainless steel screws, nuts & washers = 0.036 kg (6.0g each)
export const R_INNER = 0.036; // Inner hub pitch radius in meters (36 mm => 44 px in SVG)
export const R_OUTER = 0.068; // Outer rim pitch radius in meters (68 mm => 82 px in SVG)
export const GRAVITY_TORQUE = 0.048; // Constant torque = M * g * d_cm = 0.160 * 9.80665 * 0.0306 ~ 0.048 N·m

/**
 * Computes moment of inertia I (kg·m²) based on radial mass configuration ('inner' | 'outer')
 */
export function computeInertia(config) {
  const r = config === 'outer' ? R_OUTER : R_INNER;
  return I0 + MOVABLE_MASS * r * r;
}

/**
 * Converts motor RPM to angular velocity omega (rad/s)
 */
export function computeOmega(rpm) {
  return (rpm * 2 * Math.PI) / 60;
}

/**
 * Computes angular momentum vector magnitude L = I * omega (N·m·s)
 */
export function computeAngularMomentum(config, rpm) {
  return computeInertia(config) * computeOmega(rpm);
}

/**
 * Computes gyroscopic precession rate Omega_p = tau / (I * omega) in rad/s
 */
export function computePrecessionRate(config, rpm) {
  const I = computeInertia(config);
  const omega = computeOmega(rpm);
  if (omega <= 0 || I <= 0) return 0;
  return GRAVITY_TORQUE / (I * omega);
}

/**
 * Computes precession orbital period T_p = 2*pi / Omega_p in seconds
 */
export function computePrecessionPeriod(config, rpm) {
  const omegaP = computePrecessionRate(config, rpm);
  if (omegaP <= 0) return 0;
  return (2 * Math.PI) / omegaP;
}

/**
 * Computes continuous rotor spin animation period T_rot = 7200 / RPM in seconds
 */
export function computeRotorSpinDuration(rpm) {
  if (rpm <= 0) return 3.0;
  return 7200 / rpm;
}

/**
 * Formats moment of inertia for VFD display
 */
export function formatInertiaDisplay(I_kg_m2) {
  const scaled = I_kg_m2 * 1e4;
  return `I = ${scaled.toFixed(2)}e-4 kg·m²`;
}

/**
 * Formats precession velocity for VFD display
 */
export function formatPrecessionDisplay(omegaP) {
  return `Ω_p = ${omegaP.toFixed(2)} rad/s`;
}

/**
 * Initializes The Gyro-Triptych Observatory interactive controls, physics oracle,
 * SVG coordinate manipulations, and real-time 3D vector rendering loop.
 */
export function initOscilloscope() {
  // DOM Controls
  const modeBtns = document.querySelectorAll('button.scope-mode-btn[data-rotor-config], button.rocker-paddle');
  const massRocker = document.getElementById('mass-rocker');
  const viewHome = document.getElementById('view-home');
  const paddleInner = document.querySelector('.paddle-inner');
  const paddleOuter = document.querySelector('.paddle-outer');

  const rpmSlider = document.getElementById('rpm-slider') || document.getElementById('rotor-rpm-slider');
  const rpmReadout = document.getElementById('rpm-display');
  const rotorRpmReadout = document.getElementById('rotor-rpm-readout');

  // VFD Readout Displays
  const inertiaReadout = document.getElementById('readout-inertia');
  const vfdInertiaVal = document.getElementById('vfd-inertia-val');
  const precessionReadout = document.getElementById('readout-precession');
  const vfdPrecessionVal = document.getElementById('vfd-precession-val');
  const headerDriveVal = document.getElementById('header-rotor-val');

  // Annunciator Indicators
  const annunInertiaTag = document.getElementById('annun-inertia-tag');
  const annunPrecessionTag = document.getElementById('annun-precession-tag');
  const annunSpeedTag = document.getElementById('annun-speed-tag');
  const annunMotion = document.getElementById('annun-motion');
  const annunMotionTag = document.getElementById('annun-motion-tag');

  // Layer 1 & 2 SVG Elements (Left Astrolabe Chamber)
  const rotorAssembly = document.getElementById('rotor-spinning-assembly');
  const screwWashers = document.querySelectorAll('.m3-screw-washer');
  const innerWeights = document.getElementById('svg-inner-weights');
  const outerWeights = document.getElementById('svg-outer-weights');
  const radiusVectorLine = document.getElementById('svg-active-radius-line');
  const radiusCalloutText = document.getElementById('svg-active-radius-label');

  // Layer 3 SVG Elements (Center PCB Conduits)
  const pcbTracesGroup = document.getElementById('svg-pcb-traces');

  // Layer 4 SVG Elements (Right 3D Precession Bay)
  const precessionOrbitEllipse = document.getElementById('svg-precession-orbit');
  const precessionConeEllipse = document.getElementById('precession-cone-ellipse');
  const coneTangentLeft = document.getElementById('svg-cone-tangent-left');
  const coneTangentRight = document.getElementById('svg-cone-tangent-right');
  const angularMomentumLine = document.getElementById('svg-spin-vector-line');
  const angularMomentumArrowhead = document.getElementById('svg-spin-arrowhead');
  const angularMomentumLabel = document.getElementById('svg-vector-l-label');
  const tiltedRotorDisc = document.getElementById('svg-tilted-rotor-disc');
  const gravityLine = document.getElementById('svg-gravity-vector-line');
  const gravityArrowhead = document.getElementById('svg-gravity-arrowhead');
  const torqueLine = document.getElementById('svg-torque-vector-line');
  const torqueArrowhead = document.getElementById('svg-torque-arrowhead');
  const torqueLabel = document.getElementById('svg-vector-tau-label');
  const precessionAxisLabel = document.getElementById('svg-precession-rate-label');

  // In-memory simulation state (persists across tab view switches)
  let currentConfig = 'outer'; // 'inner' | 'outer'
  let currentRpm = 2400; // 1200 - 3600 RPM
  let precessionPhase = 0; // Orbital angle phi in radians
  let lastFrameTime = performance.now();
  let animationFrameId = null;

  /**
   * Evaluates reduced motion preference
   */
  function isReducedMotionActive() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Recalculates all physical quantities and updates DOM/SVG state
   */
  function updateSimulation() {
    // 1. Rigorous Physics Calculations
    const I = computeInertia(currentConfig); // 1.28656e-4 or 2.48464e-4 kg·m²
    const omega = computeOmega(currentRpm); // rad/s
    const L = computeAngularMomentum(currentConfig, currentRpm); // N·m·s
    const omegaP = computePrecessionRate(currentConfig, currentRpm); // rad/s
    const Trot = computeRotorSpinDuration(currentRpm); // seconds
    const Tpulse = 2.4 * (2400 / currentRpm); // seconds

    const I_display = formatInertiaDisplay(I); // e.g. "I = 2.48e-4 kg·m²"
    const omegaP_display = formatPrecessionDisplay(omegaP); // e.g. "Ω_p = 0.77 rad/s"
    const rpm_display = `${currentRpm} RPM`;

    // 2. VFD Equation Counters & Text Readouts
    if (vfdInertiaVal && inertiaReadout && vfdInertiaVal !== inertiaReadout) {
      vfdInertiaVal.textContent = I_display;
    } else if (inertiaReadout) {
      inertiaReadout.textContent = I_display;
    } else if (vfdInertiaVal) {
      vfdInertiaVal.textContent = I_display;
    }

    if (vfdPrecessionVal && precessionReadout && vfdPrecessionVal !== precessionReadout) {
      vfdPrecessionVal.textContent = omegaP_display;
    } else if (precessionReadout) {
      precessionReadout.textContent = omegaP_display;
    } else if (vfdPrecessionVal) {
      vfdPrecessionVal.textContent = omegaP_display;
    }

    if (rotorRpmReadout && rpmReadout && rotorRpmReadout !== rpmReadout) {
      rotorRpmReadout.textContent = rpm_display;
    } else if (rpmReadout) {
      rpmReadout.textContent = rpm_display;
    } else if (rotorRpmReadout) {
      rotorRpmReadout.textContent = rpm_display;
    }

    if (headerDriveVal) {
      headerDriveVal.textContent = `${currentRpm} RPM // ${currentConfig.toUpperCase()}`;
    }

    // 3. Annunciator Lamp Status Updates
    const scaledI = (I * 1e4).toFixed(2);
    if (annunInertiaTag) annunInertiaTag.textContent = `I = ${scaledI}e-4`;
    if (annunPrecessionTag) annunPrecessionTag.textContent = `Ω_p = ${omegaP.toFixed(2)}`;
    if (annunSpeedTag) annunSpeedTag.textContent = rpm_display;

    const reducedMotion = isReducedMotionActive();
    if (annunMotion) {
      annunMotion.textContent = reducedMotion
        ? 'ROTOR: STATIC (ACCESSIBILITY LOCK)'
        : 'ROTOR: SPINNING';
      annunMotion.className = `annunciator-lamp ${reducedMotion ? 'lit-amber' : 'lit-emerald'}`;
    }
    if (annunMotionTag) {
      annunMotionTag.textContent = reducedMotion ? 'SPIN: SUSPENDED' : 'SPIN: ACTIVE';
      annunMotionTag.className = `annunciator-lamp ${reducedMotion ? 'lit-amber' : 'lit-emerald'}`;
    }

    // 4. Tactile Mass Rocker Switch Visual Alignment
    if (massRocker) {
      massRocker.setAttribute('data-state', currentConfig);
    }
    if (paddleInner) paddleInner.classList.toggle('active', currentConfig === 'inner');
    if (paddleOuter) paddleOuter.classList.toggle('active', currentConfig === 'outer');

    modeBtns.forEach(btn => {
      const cfg = btn.dataset.rotorConfig || btn.dataset.state;
      const isActive = cfg === currentConfig;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // 5. Layer 1: Rotor Rotation Animation Period
    if (rotorAssembly) {
      if (reducedMotion) {
        rotorAssembly.style.animationPlayState = 'paused';
      } else {
        rotorAssembly.style.animationPlayState = 'running';
        rotorAssembly.style.setProperty('--rotor-spin-duration', `${Trot.toFixed(3)}s`);
      }
    }

    // 6. Layer 2: Radial Screw & Washer Translation (44px inner vs 82px outer)
    const activeRadiusPx = currentConfig === 'outer' ? 82 : 44;
    screwWashers.forEach(washer => {
      washer.classList.toggle('at-inner', currentConfig === 'inner');
      washer.classList.toggle('at-outer', currentConfig === 'outer');
      washer.setAttribute('transform', `translate(${activeRadiusPx}, 0)`);
    });

    // Legacy / Reference Weight Groups Opacity
    if (innerWeights) {
      innerWeights.setAttribute('opacity', currentConfig === 'inner' ? '1' : '0.28');
    }
    if (outerWeights) {
      outerWeights.setAttribute('opacity', currentConfig === 'outer' ? '1' : '0.28');
    }

    // Radius Dimension Callout Line and Label
    if (radiusVectorLine) {
      radiusVectorLine.setAttribute('x2', String(240 + activeRadiusPx));
      radiusVectorLine.setAttribute('stroke', currentConfig === 'outer' ? '#ff9f1c' : '#00f0d0');
    }
    if (radiusCalloutText) {
      radiusCalloutText.textContent = currentConfig === 'outer'
        ? 'r_eff = 68mm (MAX I // +93.1%)'
        : 'r_eff = 36mm (LOW I // +0%)';
      radiusCalloutText.setAttribute('fill', currentConfig === 'outer' ? '#ff9f1c' : '#00f0d0');
    }

    // 7. Layer 3: Traveling Circuit Signal Pulses Duration
    document.documentElement.style.setProperty('--pulse-period', `${Tpulse.toFixed(2)}s`);
    if (pcbTracesGroup) {
      pcbTracesGroup.style.setProperty('--pulse-period', `${Tpulse.toFixed(2)}s`);
    }

    // 8. Layer 4: Recalibrate Precession Cone Semi-Major Axis (Rx = 62 inner vs 42 outer)
    const Rx = currentConfig === 'outer' ? 42 : 62;
    const Ry = currentConfig === 'outer' ? 13 : 19;

    if (precessionOrbitEllipse) {
      precessionOrbitEllipse.setAttribute('rx', String(Rx));
      precessionOrbitEllipse.setAttribute('ry', String(Ry));
    }
    if (precessionConeEllipse) {
      precessionConeEllipse.setAttribute('rx', String(Rx));
      precessionConeEllipse.setAttribute('ry', String(Ry));
    }
    if (coneTangentLeft) {
      coneTangentLeft.setAttribute('x2', String(840 - Rx));
    }
    if (coneTangentRight) {
      coneTangentRight.setAttribute('x2', String(840 + Rx));
    }

    if (precessionAxisLabel) {
      const desc = currentConfig === 'outer' ? 'SLOWER' : 'FASTER';
      precessionAxisLabel.textContent = `Ω_p = ${omegaP.toFixed(2)} rad/s (${desc})`;
    }

    // Angular momentum vector stroke-width scales with L (2.2px inner vs 3.6px outer)
    if (angularMomentumLine) {
      const strokeW = currentConfig === 'outer' ? '3.6' : '2.2';
      angularMomentumLine.setAttribute('stroke-width', strokeW);
    }
  }

  /**
   * Resumes vector rendering loop if #view-home is active and not hidden
   */
  function resumeLoopIfNeeded() {
    const isHidden =
      viewHome?.hasAttribute('hidden') ||
      viewHome?.classList.contains('hidden') ||
      (viewHome && viewHome.hidden);
    if (!isHidden) {
      if (!animationFrameId) {
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(renderVectorFrame);
      }
    }
  }

  /**
   * Real-Time Vector Rendering Frame (Layer 4 Axonometric Precession Cone)
   */
  function renderVectorFrame(timestamp) {
    // Pause / skip computations and SVG updates when #view-home is hidden
    if (viewHome?.hasAttribute('hidden') || viewHome?.classList.contains('hidden') || (viewHome && viewHome.hidden)) {
      animationFrameId = null;
      return;
    }

    const reduced = isReducedMotionActive();
    const omegaP = computePrecessionRate(currentConfig, currentRpm);

    if (!reduced) {
      const dt = Math.min((timestamp - lastFrameTime) / 1000, 0.1);
      lastFrameTime = timestamp;
      precessionPhase = (precessionPhase + omegaP * dt) % (2 * Math.PI);
    } else {
      precessionPhase = 0; // Frozen at nominal zero index for reduced motion
    }

    const Rx = currentConfig === 'outer' ? 42 : 62;
    const Ry = currentConfig === 'outer' ? 13 : 19;
    const pivotX = 840;
    const pivotY = 310;
    const orbitCenterY = 130;

    // Instantaneous spin shaft tip coordinate on precession orbit ellipse
    const shaftTipX = pivotX + Rx * Math.cos(precessionPhase);
    const shaftTipY = orbitCenterY + Ry * Math.sin(precessionPhase);

    // 1. Angular Momentum Shaft Vector (L = I * omega)
    if (angularMomentumLine) {
      angularMomentumLine.setAttribute('x1', String(pivotX));
      angularMomentumLine.setAttribute('y1', String(pivotY));
      angularMomentumLine.setAttribute('x2', shaftTipX.toFixed(1));
      angularMomentumLine.setAttribute('y2', shaftTipY.toFixed(1));
    }

    if (angularMomentumArrowhead) {
      const shaftAngle = Math.atan2(shaftTipY - pivotY, shaftTipX - pivotX);
      const headLen = currentConfig === 'outer' ? 13 : 8;
      const leftAngle = shaftAngle + Math.PI - 0.42;
      const rightAngle = shaftAngle + Math.PI + 0.42;
      const p1x = shaftTipX + headLen * Math.cos(leftAngle);
      const p1y = shaftTipY + headLen * Math.sin(leftAngle);
      const p2x = shaftTipX + headLen * Math.cos(rightAngle);
      const p2y = shaftTipY + headLen * Math.sin(rightAngle);
      angularMomentumArrowhead.setAttribute(
        'points',
        `${shaftTipX.toFixed(1)},${shaftTipY.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}`
      );
    }

    if (angularMomentumLabel) {
      angularMomentumLabel.setAttribute('x', (shaftTipX + 14).toFixed(1));
      angularMomentumLabel.setAttribute('y', (shaftTipY - 6).toFixed(1));
    }

    // 2. Center of Mass & Tilted Reaction Wheel Disc (at 70% distance from pivot)
    const cmX = pivotX + 0.70 * (shaftTipX - pivotX);
    const cmY = pivotY + 0.70 * (shaftTipY - pivotY);
    const shaftAngleDeg = Math.atan2(shaftTipY - pivotY, shaftTipX - pivotX) * (180 / Math.PI);
    const discAngleDeg = shaftAngleDeg + 90;

    if (tiltedRotorDisc) {
      tiltedRotorDisc.setAttribute('cx', cmX.toFixed(1));
      tiltedRotorDisc.setAttribute('cy', cmY.toFixed(1));
      tiltedRotorDisc.setAttribute(
        'transform',
        `rotate(${discAngleDeg.toFixed(1)} ${cmX.toFixed(1)} ${cmY.toFixed(1)})`
      );
    }

    // 3. Downward Gravitational Force Vector (F_g = M * g)
    if (gravityLine) {
      gravityLine.setAttribute('x1', cmX.toFixed(1));
      gravityLine.setAttribute('y1', cmY.toFixed(1));
      gravityLine.setAttribute('x2', cmX.toFixed(1));
      gravityLine.setAttribute('y2', (cmY + 56).toFixed(1));
    }
    if (gravityArrowhead) {
      const tipY = cmY + 56;
      gravityArrowhead.setAttribute(
        'points',
        `${cmX.toFixed(1)},${(tipY + 5).toFixed(1)} ${(cmX - 4).toFixed(1)},${tipY.toFixed(1)} ${(cmX + 4).toFixed(1)},${tipY.toFixed(1)}`
      );
    }

    // 4. Orthogonal Gyroscopic Torque Vector (tau = dL/dt = Omega_p x L)
    // Tangent to orbit ellipse: v_tangent = (-sin(phi), (Ry/Rx) * cos(phi))
    const vx = -Math.sin(precessionPhase);
    const vy = (Ry / Rx) * Math.cos(precessionPhase);
    const vLen = Math.sqrt(vx * vx + vy * vy) || 1;
    const tx = vx / vLen;
    const ty = vy / vLen;

    const torqueLen = 34; // px
    const torqueTipX = shaftTipX + torqueLen * tx;
    const torqueTipY = shaftTipY + torqueLen * ty;

    if (torqueLine) {
      torqueLine.setAttribute('x1', shaftTipX.toFixed(1));
      torqueLine.setAttribute('y1', shaftTipY.toFixed(1));
      torqueLine.setAttribute('x2', torqueTipX.toFixed(1));
      torqueLine.setAttribute('y2', torqueTipY.toFixed(1));
    }

    if (torqueArrowhead) {
      const torqueAngle = Math.atan2(ty, tx);
      const headLen = 9;
      const leftAngle = torqueAngle + Math.PI - 0.5;
      const rightAngle = torqueAngle + Math.PI + 0.5;
      const p1x = torqueTipX + headLen * Math.cos(leftAngle);
      const p1y = torqueTipY + headLen * Math.sin(leftAngle);
      const p2x = torqueTipX + headLen * Math.cos(rightAngle);
      const p2y = torqueTipY + headLen * Math.sin(rightAngle);
      torqueArrowhead.setAttribute(
        'points',
        `${torqueTipX.toFixed(1)},${torqueTipY.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}`
      );
    }

    if (torqueLabel) {
      torqueLabel.setAttribute('x', (torqueTipX + 8).toFixed(1));
      torqueLabel.setAttribute('y', (torqueTipY + 4).toFixed(1));
    }

    animationFrameId = requestAnimationFrame(renderVectorFrame);
  }

  // Bind Rocker Switch and Mode Selection Buttons
  modeBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const targetConfig = btn.dataset.rotorConfig || btn.dataset.state;
      if (targetConfig === 'inner' || targetConfig === 'outer') {
        currentConfig = targetConfig;
      } else {
        currentConfig = currentConfig === 'inner' ? 'outer' : 'inner';
      }
      updateSimulation();
    });
  });

  if (massRocker) {
    massRocker.addEventListener('click', e => {
      // If click was directly on enclosure rather than button
      if (e.target.closest('.rocker-paddle')) return;
      currentConfig = currentConfig === 'inner' ? 'outer' : 'inner';
      updateSimulation();
    });
  }

  // Bind Linear Brass Rheostat Fader (1200 - 3600 RPM)
  if (rpmSlider) {
    rpmSlider.addEventListener('input', e => {
      const rawVal = Number(e.target.value);
      // Strictly clamp within specified mechanical bounds [1200, 3600]
      currentRpm = Math.max(1200, Math.min(3600, isNaN(rawVal) ? 2400 : rawVal));
      updateSimulation();
    });
  }

  // Listen to prefers-reduced-motion media query changes
  if (window.matchMedia) {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      updateSimulation();
    };
    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', handleMotionChange);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(handleMotionChange);
    }
  }

  // Resume loop when view switches back to home or page becomes visible
  window.addEventListener('viewchange', e => {
    if (e.detail && e.detail.toView === 'home') {
      resumeLoopIfNeeded();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      resumeLoopIfNeeded();
    }
  });

  // Initial synchronization and launch of the vector animation loop
  updateSimulation();
  lastFrameTime = performance.now();
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  resumeLoopIfNeeded();

  return {
    updateSimulation,
    getState: () => ({ currentConfig, currentRpm, precessionPhase }),
    setConfig: cfg => {
      if (cfg === 'inner' || cfg === 'outer') {
        currentConfig = cfg;
        updateSimulation();
      }
    },
    setRpm: rpm => {
      currentRpm = Math.max(1200, Math.min(3600, rpm));
      if (rpmSlider) rpmSlider.value = String(currentRpm);
      updateSimulation();
    }
  };
}
