/* ==========================================================================
   MINDMAP MODULE // POST 4 INTERACTIVE RESEARCH MINDMAP
   Draggable VFD/Brass Nodes, Live SVG Connectors, Pan/Zoom & Jot-Note Dropdowns
   ========================================================================== */

const MINDMAP_NODES = [
  // CENTRAL ROOT
  {
    id: 'root',
    parentId: null,
    branch: 'core',
    tier: 'root',
    tag: 'CENTRAL QUESTION',
    title: 'Mass Distribution, Angular Momentum & Precession',
    badge: 'L = I·ω  |  Ω_p = rMg / (Iω)',
    x: 820,
    y: 440,
    expanded: true,
    notes: [
      'Guiding idea: Moving the exact same mass farther from a spinning axle increases moment of inertia (I) without changing total weight.',
      'At constant spin speed (ω), a larger I directly increases angular momentum (L = I·ω).',
      'Drives two measurable effects: stronger momentum transfer in a self-balancing cube reaction wheel, and slower, steadier precession in a suspended spinning wheel.'
    ]
  },

  // BRANCH 1: CORE PHYSICS & BASIC EQUATIONS (Top-Left)
  {
    id: 'b-physics',
    parentId: 'root',
    branch: 'physics',
    tier: 'branch',
    tag: 'BRANCH 01',
    title: 'Core Physics & Basic Equations',
    badge: 'I · ω · L · τ · K_rot',
    x: 420,
    y: 170,
    notes: [
      'Rotational analogues of linear mass, velocity, momentum, force, and kinetic energy.',
      'Mass distribution (r²) is the core variable governing both reaction torque and gyroscopic stability.'
    ]
  },
  {
    id: 'p-inertia',
    parentId: 'b-physics',
    branch: 'physics',
    tier: 'leaf',
    tag: 'KEY VARIABLE',
    title: 'Moment of Inertia (I)',
    badge: 'I = Σ m·r²',
    x: 70,
    y: 35,
    notes: [
      'Rotational version of mass: measures how hard it is to start, stop, or change spin (solid disk: ½mr²; hollow ring: mr²).',
      'Why r² dominates: mass at 2× radius travels 2× faster AND has 2× the lever arm, resisting spin changes 4× as strongly.',
      'Bolting identical screws/washers into inner, middle, or outer rings on a 3D-printed flywheel dramatically changes I at constant total mass.'
    ]
  },
  {
    id: 'p-momentum',
    parentId: 'b-physics',
    branch: 'physics',
    tier: 'leaf',
    tag: 'VECTORS',
    title: 'Angular Velocity (ω) & Momentum (L)',
    badge: 'L = I·ω  |  α = dω/dt',
    x: 70,
    y: 170,
    notes: [
      'ω (rad/s) points along the spin axle via the right-hand rule; α = dω/dt measures how fast spin rate changes.',
      'L = I·ω measures "rotational stubbornness": pushing mass outward increases I and L at fixed ω.',
      'Because L is a vector, it changes whenever its size (spin speed) OR direction (axle tilt) changes.'
    ]
  },
  {
    id: 'p-torque',
    parentId: 'b-physics',
    branch: 'physics',
    tier: 'leaf',
    tag: 'ENERGY & FORCE',
    title: 'Torque (τ) & Kinetic Energy (K_rot)',
    badge: 'τ = dL/dt  |  K = ½Iω²',
    x: 70,
    y: 305,
    notes: [
      'τ = r × F = I·α = dL/dt; rotational kinetic energy K_rot = ½Iω² (doubling ω stores 4× energy).',
      'Battery energy stored in a spinning flywheel can be dumped rapidly during a hard brake to flip the cube upright.',
      'Torque along the spin axis changes wheel speed (reaction wheels); perpendicular torque tilts L (precession).'
    ]
  },
  {
    id: 'p-conservation',
    parentId: 'b-physics',
    branch: 'physics',
    tier: 'leaf',
    tag: 'EQUILIBRIUM',
    title: 'Conservation of L & Gravity Torque',
    badge: 'τ_g = m·g·l·sin(θ)',
    x: 420,
    y: 35,
    notes: [
      'Without external torque, L_initial = L_final (figure skater pulls arms in → I drops, ω rises).',
      'Internal Newton\'s 3rd law: motor torque +τ on flywheel exerts −τ on cube frame (+L in wheel ↔ −L on cube).',
      'Unstable inverted pendulum: at θ = 0, lever arm is 0; past a critical tilt angle, τ_g exceeds max motor reaction torque and the cube falls.'
    ]
  },

  // BRANCH 2: GYROSCOPIC PRECESSION (Top-Right)
  {
    id: 'b-precession',
    parentId: 'root',
    branch: 'precession',
    tier: 'branch',
    tag: 'BRANCH 02',
    title: 'How Gyroscopic Precession Works',
    badge: '90° ORTHOGONAL SWEEP',
    x: 1220,
    y: 170,
    notes: [
      'Tilting a fast-spinning wheel deflects its axle 90° sideways instead of tipping in the push direction.',
      'Increasing I via outer-rim weights slows Ω_p and makes the wheel feel more locked in space.'
    ]
  },
  {
    id: 'pr-why',
    parentId: 'b-precession',
    branch: 'precession',
    tier: 'leaf',
    tag: 'MECHANISM',
    title: 'Why It Swings 90° Sideways',
    badge: 'VECTOR & INERTIA VIEWS',
    x: 1550,
    y: 60,
    notes: [
      'Vector view (τ = dL/dt): Gravity on a tilted wheel creates a horizontal torque τ; adding sideways dL rotates L horizontally (Moebs et al., 2016).',
      'Particle / inertia view: Pushing down on the top of a fast rim gives it downward velocity that carries 90° around before displacing downward (HowStuffWorks, n.d.).',
      'Observed effect: The axle sweeps sideways perpendicular to both the spin axis and gravity (Britannica Editors, 2026).'
    ]
  },
  {
    id: 'pr-formula',
    parentId: 'b-precession',
    branch: 'precession',
    tier: 'leaf',
    tag: 'EQUATION & WOBBLE',
    title: 'Precession Rate (Ω_p) & Nutation',
    badge: 'Ω_p = r·M·g / (I·ω)',
    x: 1550,
    y: 220,
    notes: [
      'Stronger gravity torque (r·M·g) speeds up precession; larger I in the denominator slows Ω_p (Moebs et al., 2016).',
      'Holding M, r, and ω constant while shifting weights outward raises I and L, making precession noticeably slower and steadier.',
      'Nutation: small up-and-down nodding wobble at release as gravitational energy trades into sideways kinetic energy, damped by friction (Britannica, 2026).'
    ]
  },

  // BRANCH 3: TWO MECHANISMS (Middle-Left)
  {
    id: 'b-mechanisms',
    parentId: 'root',
    branch: 'mechanisms',
    tier: 'branch',
    tag: 'BRANCH 03',
    title: 'Reaction Wheels vs. Precession (CMGs)',
    badge: 'SIZE OF L vs. DIRECTION OF L',
    x: 420,
    y: 440,
    notes: [
      'One rule (τ = dL/dt), two engineering mechanisms: change the magnitude of L (reaction wheels) or change the direction of L (CMGs).',
      'Both benefit directly from concentrating mass near the outer rim to maximize I per unit weight.'
    ]
  },
  {
    id: 'm-rw',
    parentId: 'b-mechanisms',
    branch: 'mechanisms',
    tier: 'leaf',
    tag: 'FIXED AXIS',
    title: 'Reaction Wheels (Magnitude of L)',
    badge: 'τ_cube = −I·α',
    x: 70,
    y: 440,
    notes: [
      'Fixed axle bolted to cube (like ETH Zurich\'s Cubli): coils push rotor magnets; rotor inertia pushes back with τ_cube = −I·α (Gajamohan et al., 2013).',
      'To catch a clockwise fall, accelerate the wheel clockwise; torque requires acceleration (α), not constant RPM (0 RPM can give max torque).',
      'Continuous balance vs. hard-brake impulse (dL/dt spike); main limit is wheel saturation at max RPM (Zaborniak et al., 2024).',
      'Outer-rim mass gives a stronger braking kick AND smaller α = τ/I for the same torque, delaying saturation.'
    ]
  },
  {
    id: 'm-cmg',
    parentId: 'b-mechanisms',
    branch: 'mechanisms',
    tier: 'leaf',
    tag: 'TILTING GIMBAL',
    title: 'Control Moment Gyros & 3D Coupling',
    badge: 'TORQUE AMPLIFICATION',
    x: 70,
    y: 590,
    notes: [
      'CMGs tilt a constant-speed flywheel in a motorized gimbal to redirect L, producing huge torque from a small motor (Li et al., 2022; Romtrairat et al., 2019).',
      'Rim-weighted rotors maximize L without extreme RPM; pairing two counter-rotating gyros cancels unwanted cross-axis twists.',
      'In a 3-axis cube with orthogonal wheels, reaction torque handles primary balance while body rotation introduces secondary gyroscopic coupling (Gajamohan et al., 2013).'
    ]
  },

  // BRANCH 4: TWO-IN-ONE EXPERIMENT & DEMO (Bottom-Left)
  {
    id: 'b-experiments',
    parentId: 'root',
    branch: 'experiments',
    tier: 'branch',
    tag: 'BRANCH 04',
    title: 'Two-in-One Experiment & ESP32 Demo',
    badge: 'ISOLATING I = Σ m·r²',
    x: 420,
    y: 720,
    notes: [
      'Shared independent variable: concentric inner, middle, and outer rings on a 3D-printed flywheel move identical screws & washers outward.',
      'Controlled variables: total mass, fixed target RPM (verified by magnetic encoder), and test geometry.'
    ]
  },
  {
    id: 'e-cube',
    parentId: 'b-experiments',
    branch: 'experiments',
    tier: 'leaf',
    tag: 'EXPERIMENT 01',
    title: 'Cube Angular Momentum Transfer',
    badge: 'HARD BRAKE & SATURATION',
    x: 70,
    y: 735,
    notes: [
      'Procedure: Rest cube on a flat face, spin flywheel to fixed RPM, then command an immediate hard brake (or balance against an offset weight).',
      'Measured: Peak kick-up tilt angle via IMU, or seconds of balance before wheel saturation.',
      'Expected: Outer weights raise I and L = I·ω at identical RPM → larger kick-up angle and longer endurance.'
    ]
  },
  {
    id: 'e-rig',
    parentId: 'b-experiments',
    branch: 'experiments',
    tier: 'leaf',
    tag: 'EXPERIMENT 02 + DEMO',
    title: 'Suspended Precession Rig & Telemetry',
    badge: 'Ω_p = 2π / T  |  ESP32',
    x: 420,
    y: 865,
    notes: [
      'Procedure: Mount the same adjustable flywheel on a suspended horizontal rod, spin to fixed RPM, release, and time a full sweep (Ω_p = 2π/T).',
      'Expected: Larger I at constant M·g·r and ω slows precession and steadies the spinning wheel.',
      'Live ESP32 telemetry graphs: Tilt Angle vs. Time (kick-up & tap disturbance rejection) and Wheel RPM vs. Time (start RPM parity & saturation) (Zaborniak et al., 2024).'
    ]
  },

  // BRANCH 5: REAL-WORLD APPLICATIONS (Middle-Right)
  {
    id: 'b-apps',
    parentId: 'root',
    branch: 'apps',
    tier: 'branch',
    tag: 'BRANCH 05',
    title: 'Real-World Applications & Impact',
    badge: 'SPACE · MARINE · HEALTH · ROBOTS',
    x: 1220,
    y: 440,
    notes: [
      'Rotational momentum exchange and rim-weighted inertia solve fuel, safety, and stability challenges across aerospace, maritime, and healthcare.'
    ]
  },
  {
    id: 'a-space',
    parentId: 'b-apps',
    branch: 'apps',
    tier: 'leaf',
    tag: 'AEROSPACE',
    title: 'Space Telescopes & Climate Satellites',
    badge: 'HUBBLE & JWST',
    x: 1550,
    y: 380,
    notes: [
      'No air to push off and thruster fuel limits mission life; Hubble & JWST use solar-powered, rim-weighted reaction wheels to point fuel-free (NASA, n.d.; 2024).',
      'Hubble holds a laser steady on a human hair 1 mile away using 19,200 RPM gyros + 4 reaction wheel assemblies.',
      'Earth-observing satellites track wildfires, storms, and climate change cleanly for years.'
    ]
  },
  {
    id: 'a-marine',
    parentId: 'b-apps',
    branch: 'apps',
    tier: 'leaf',
    tag: 'MARITIME',
    title: 'Marine Gyrostabilizers on Ships',
    badge: 'ZERO-SPEED ANTI-ROLL',
    x: 1550,
    y: 525,
    notes: [
      'Heavy ocean roll endangers crews and risks cargo/fuel spills; underwater fins fail at low speed or anchor (Li et al., 2022).',
      'Hull-mounted flywheels actively control precession to produce anti-roll torque even at zero forward speed on rescue vessels, tugs, and workboats.'
    ]
  },
  {
    id: 'a-wearable',
    parentId: 'b-apps',
    branch: 'apps',
    tier: 'leaf',
    tag: 'BIOMECHANICS & ROBOTICS',
    title: 'Fall-Prevention Backpacks & Robots',
    badge: 'SCISSORED-PAIR CMGs',
    x: 1550,
    y: 670,
    notes: [
      'Wearable elder-care backpacks use counter-rotating "scissored-pair" CMGs to cancel sideways twist and double uprighting torque without locking joints (Romtrairat et al., 2019).',
      'Maximizing flywheel I via rim mass keeps backpacks lightweight and wearable.',
      'Double-gyro unicycle robots and self-balancing motorcycles stay upright at a standstill in narrow rescue spaces (Zhang et al., 2023).'
    ]
  },

  // BRANCH 6: REFERENCES (Bottom-Right)
  {
    id: 'b-refs',
    parentId: 'root',
    branch: 'refs',
    tier: 'branch',
    tag: 'BRANCH 06',
    title: 'Research References (10 Sources)',
    badge: 'APA BIBLIOGRAPHY',
    x: 1220,
    y: 720,
    notes: [
      'Peer-reviewed engineering papers, NASA observatory documentation, and university physics references supporting the project.'
    ]
  },
  {
    id: 'r-physics',
    parentId: 'b-refs',
    branch: 'refs',
    tier: 'leaf',
    tag: 'PHYSICS SOURCES',
    title: 'Precession & Rotational Mechanics',
    badge: '3 SOURCES',
    x: 840,
    y: 865,
    notes: [
      'Britannica Editors (2026, Oct 23). Precession. Encyclopaedia Britannica.',
      'Moebs, W., Ling, S. J., & Sanny, J. (2016). 11.4 Precession of a gyroscope. OpenStax University Physics Vol. 1.',
      'HowStuffWorks (n.d.). How the gyroscope works.'
    ]
  },
  {
    id: 'r-engineering',
    parentId: 'b-refs',
    branch: 'refs',
    tier: 'leaf',
    tag: 'ENGINEERING SOURCES',
    title: 'Cubli, NASA, Marine & CMG Papers',
    badge: '7 SOURCES',
    x: 1220,
    y: 865,
    notes: [
      'Gajamohan et al. (2013). The Cubli: A reaction wheel based 3D inverted pendulum. ECC 2013.',
      'Zaborniak, Patan, & Witczak (2024). Wheel-based inverted pendulum. Electronics, 13(3), 514.',
      'NASA (n.d.; 2024). Hubble Pointing Control & Webb FAQs.',
      'Li et al. (2022) Marine gyrostabilizer (JMSE); Romtrairat et al. (2019) Wearable CMGs (J. Biomech.); Zhang et al. (2023) Double gyros unicycle robot (Sensors).'
    ]
  }
];

const BRANCH_COLORS = {
  core: '#d4a853',
  physics: '#00f0d0',
  precession: '#ff9f1c',
  mechanisms: '#2ee57d',
  experiments: '#38bdf8',
  apps: '#a78bfa',
  refs: '#f59e0b'
};

let mindmapInitialized = false;
let nodePositions = new Map();
let nodeElements = new Map();
let edgeElements = new Map();
let activeFilter = 'all';
let topZIndex = 10;

// Pan & Zoom state
let viewScale = 1;
let panX = 0;
let panY = 0;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getStageElements() {
  return {
    stage: document.getElementById('mindmap-stage'),
    world: document.getElementById('mindmap-world'),
    edgesSvg: document.getElementById('mindmap-edges'),
    nodesLayer: document.getElementById('mindmap-nodes'),
    zoomReadout: document.getElementById('mm-zoom-readout')
  };
}

function applyWorldTransform() {
  const { world, zoomReadout } = getStageElements();
  if (!world) return;
  world.style.transform = `translate(${panX}px, ${panY}px) scale(${viewScale})`;
  if (zoomReadout) {
    zoomReadout.textContent = `${Math.round(viewScale * 100)}%`;
  }
}

function computeFitTransform() {
  const { stage } = getStageElements();
  if (!stage) return;
  const rect = stage.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;

  if (rect.width < 640) {
    // Center on the root node at a readable mobile zoom; user can pan/zoom freely
    viewScale = 0.68;
    const rootCenterX = 986;
    const rootCenterY = 530;
    panX = Math.round(rect.width / 2 - rootCenterX * viewScale);
    panY = Math.round(rect.height / 2 - rootCenterY * viewScale);
    applyWorldTransform();
    return;
  }

  // World bounding box across default node layout (~1920 x 1060)
  const worldW = 1900;
  const worldH = 1060;
  const pad = 28;
  const scaleX = (rect.width - pad * 2) / worldW;
  const scaleY = (rect.height - pad * 2) / worldH;
  viewScale = Math.max(0.28, Math.min(1.05, Math.min(scaleX, scaleY)));
  panX = Math.round((rect.width - worldW * viewScale) / 2);
  panY = Math.round((rect.height - worldH * viewScale) / 2);
  applyWorldTransform();
}

function getNodeCenter(id) {
  const pos = nodePositions.get(id);
  const el = nodeElements.get(id);
  if (!pos || !el) return { x: 0, y: 0 };
  const w = el.offsetWidth || 260;
  const h = el.offsetHeight || 96;
  return {
    x: pos.x + w / 2,
    y: pos.y + h / 2
  };
}

function updateEdges() {
  MINDMAP_NODES.forEach(node => {
    if (!node.parentId) return;
    const pathEl = edgeElements.get(node.id);
    if (!pathEl) return;

    const p1 = getNodeCenter(node.parentId);
    const p2 = getNodeCenter(node.id);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const c1x = p1.x + dx * 0.45;
    const c1y = p1.y;
    const c2x = p2.x - dx * 0.45;
    const c2y = p2.y;

    pathEl.setAttribute('d', `M ${p1.x} ${p1.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`);
  });
}

function applyBranchFilter(branchKey) {
  activeFilter = branchKey || 'all';
  const filterBtns = document.querySelectorAll('.mm-branch-btn[data-branch-filter]');
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.branchFilter === activeFilter);
  });

  MINDMAP_NODES.forEach(node => {
    const el = nodeElements.get(node.id);
    const edgeEl = edgeElements.get(node.id);
    const isMatch =
      activeFilter === 'all' ||
      node.branch === 'core' ||
      node.branch === activeFilter;

    if (el) {
      el.classList.toggle('mm-dimmed', !isMatch);
    }
    if (edgeEl) {
      edgeEl.classList.toggle('mm-edge-dimmed', !isMatch);
    }
  });
}

function setAllDropdowns(open) {
  MINDMAP_NODES.forEach(node => {
    const el = nodeElements.get(node.id);
    if (!el) return;
    const toggleBtn = el.querySelector('.mm-toggle-btn');
    const dropdown = el.querySelector('.mm-dropdown');
    el.classList.toggle('is-open', open);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', String(open));
      const labelSpan = toggleBtn.querySelector('.mm-toggle-label');
      if (labelSpan) labelSpan.textContent = open ? 'HIDE NOTES' : `NOTES (${node.notes.length})`;
    }
    if (dropdown) {
      dropdown.hidden = !open;
    }
  });
  requestAnimationFrame(updateEdges);
}

function resetNodeLayout() {
  MINDMAP_NODES.forEach(node => {
    nodePositions.set(node.id, { x: node.x, y: node.y });
    const el = nodeElements.get(node.id);
    if (el) {
      el.style.left = `${node.x}px`;
      el.style.top = `${node.y}px`;
    }
  });
  computeFitTransform();
  requestAnimationFrame(updateEdges);
}

function createNodeElement(node) {
  const el = document.createElement('article');
  el.className = `mm-node mm-tier-${node.tier} mm-branch-${node.branch}${node.expanded ? ' is-open' : ''}`;
  el.dataset.nodeId = node.id;
  el.dataset.branch = node.branch;
  el.style.left = `${node.x}px`;
  el.style.top = `${node.y}px`;
  el.style.setProperty('--mm-accent', BRANCH_COLORS[node.branch] || '#d4a853');

  const notesHtml = node.notes
    .map(note => `<li>${escapeHtml(note)}</li>`)
    .join('');

  el.innerHTML = `
    <div class="mm-node-head" title="Drag to reposition node">
      <div class="mm-node-meta">
        <span class="mm-node-tag">${escapeHtml(node.tag)}</span>
        <span class="mm-drag-grip" aria-hidden="true">:: DRAG</span>
      </div>
      <h3 class="mm-node-title">${escapeHtml(node.title)}</h3>
      <div class="mm-node-footer-row">
        <span class="mm-node-badge">${escapeHtml(node.badge)}</span>
        <button type="button" class="mm-toggle-btn" aria-expanded="${node.expanded ? 'true' : 'false'}" aria-controls="mm-drop-${node.id}">
          <span class="mm-toggle-label">${node.expanded ? 'HIDE NOTES' : `NOTES (${node.notes.length})`}</span>
          <span class="mm-chevron" aria-hidden="true">&#9662;</span>
        </button>
      </div>
    </div>
    <div id="mm-drop-${node.id}" class="mm-dropdown" ${node.expanded ? '' : 'hidden'}>
      <ul class="mm-notes-list">
        ${notesHtml}
      </ul>
    </div>
  `;

  // Dropdown toggle handler
  const toggleBtn = el.querySelector('.mm-toggle-btn');
  const dropdown = el.querySelector('.mm-dropdown');
  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = !el.classList.contains('is-open');
    el.classList.toggle('is-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    const labelSpan = toggleBtn.querySelector('.mm-toggle-label');
    if (labelSpan) labelSpan.textContent = isOpen ? 'HIDE NOTES' : `NOTES (${node.notes.length})`;
    dropdown.hidden = !isOpen;
    el.style.zIndex = String(++topZIndex);
    requestAnimationFrame(updateEdges);
  });

  // Draggable node via Pointer Events (supports mouse + touch)
  let dragging = false;
  let startClientX = 0;
  let startClientY = 0;
  let startNodeX = 0;
  let startNodeY = 0;

  el.addEventListener('pointerdown', e => {
    if (e.target.closest('.mm-toggle-btn') || e.target.closest('.mm-dropdown')) {
      return;
    }
    e.stopPropagation();
    dragging = true;
    startClientX = e.clientX;
    startClientY = e.clientY;
    const pos = nodePositions.get(node.id);
    startNodeX = pos.x;
    startNodeY = pos.y;
    el.classList.add('is-dragging');
    el.style.zIndex = String(++topZIndex);
    if (el.setPointerCapture) {
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        // Ignore capture errors in synthetic test environments
      }
    }
  });

  el.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = (e.clientX - startClientX) / viewScale;
    const dy = (e.clientY - startClientY) / viewScale;
    const nextX = Math.round(startNodeX + dx);
    const nextY = Math.round(startNodeY + dy);
    nodePositions.set(node.id, { x: nextX, y: nextY });
    el.style.left = `${nextX}px`;
    el.style.top = `${nextY}px`;
    updateEdges();
  });

  const endDrag = e => {
    if (!dragging) return;
    dragging = false;
    el.classList.remove('is-dragging');
    if (el.releasePointerCapture && e.pointerId !== undefined) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
  };

  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);

  return el;
}

function bindCanvasPanAndZoom() {
  const { stage } = getStageElements();
  if (!stage) return;

  let panning = false;
  let startX = 0;
  let startY = 0;
  let startPanX = 0;
  let startPanY = 0;

  stage.addEventListener('pointerdown', e => {
    if (e.target.closest('.mm-node')) return;
    panning = true;
    startX = e.clientX;
    startY = e.clientY;
    startPanX = panX;
    startPanY = panY;
    stage.classList.add('is-panning');
    if (stage.setPointerCapture) {
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
  });

  stage.addEventListener('pointermove', e => {
    if (!panning) return;
    panX = Math.round(startPanX + (e.clientX - startX));
    panY = Math.round(startPanY + (e.clientY - startY));
    applyWorldTransform();
  });

  const endPan = e => {
    if (!panning) return;
    panning = false;
    stage.classList.remove('is-panning');
    if (stage.releasePointerCapture && e.pointerId !== undefined) {
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
  };

  stage.addEventListener('pointerup', endPan);
  stage.addEventListener('pointercancel', endPan);

  // Ctrl + Wheel or direct Wheel zoom on stage
  stage.addEventListener(
    'wheel',
    e => {
      e.preventDefault();
      const rect = stage.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const prevScale = viewScale;
      const factor = e.deltaY < 0 ? 1.1 : 0.91;
      viewScale = Math.max(0.25, Math.min(1.6, viewScale * factor));
      const ratio = viewScale / prevScale;
      panX = Math.round(mx - (mx - panX) * ratio);
      panY = Math.round(my - (my - panY) * ratio);
      applyWorldTransform();
    },
    { passive: false }
  );
}

function bindToolbarControls() {
  const filterBtns = document.querySelectorAll('.mm-branch-btn[data-branch-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => applyBranchFilter(btn.dataset.branchFilter));
  });

  const expandBtn = document.getElementById('mm-expand-all-btn');
  const collapseBtn = document.getElementById('mm-collapse-all-btn');
  const resetBtn = document.getElementById('mm-reset-layout-btn');
  const zoomInBtn = document.getElementById('mm-zoom-in-btn');
  const zoomOutBtn = document.getElementById('mm-zoom-out-btn');

  if (expandBtn) expandBtn.addEventListener('click', () => setAllDropdowns(true));
  if (collapseBtn) collapseBtn.addEventListener('click', () => setAllDropdowns(false));
  if (resetBtn) resetBtn.addEventListener('click', () => resetNodeLayout());
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      viewScale = Math.min(1.6, +(viewScale + 0.12).toFixed(2));
      applyWorldTransform();
    });
  }
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      viewScale = Math.max(0.25, +(viewScale - 0.12).toFixed(2));
      applyWorldTransform();
    });
  }
}

export function initMindmap() {
  if (mindmapInitialized) return;
  const { stage, edgesSvg, nodesLayer } = getStageElements();
  if (!stage || !edgesSvg || !nodesLayer) return;

  nodesLayer.innerHTML = '';
  edgesSvg.innerHTML = '';
  nodePositions.clear();
  nodeElements.clear();
  edgeElements.clear();

  // Build SVG connector edges
  MINDMAP_NODES.forEach(node => {
    nodePositions.set(node.id, { x: node.x, y: node.y });
    if (node.parentId) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', `mm-edge mm-edge-${node.branch}`);
      path.setAttribute('stroke', BRANCH_COLORS[node.branch] || '#d4a853');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-width', node.tier === 'branch' ? '2.5' : '1.7');
      edgesSvg.appendChild(path);
      edgeElements.set(node.id, path);
    }
  });

  // Build draggable HTML nodes
  MINDMAP_NODES.forEach(node => {
    const el = createNodeElement(node);
    nodesLayer.appendChild(el);
    nodeElements.set(node.id, el);
  });

  bindCanvasPanAndZoom();
  bindToolbarControls();
  applyBranchFilter('all');

  window.addEventListener('resize', () => {
    const post4 = document.getElementById('view-post4');
    if (post4 && post4.classList.contains('active')) {
      computeFitTransform();
      requestAnimationFrame(updateEdges);
    }
  });

  mindmapInitialized = true;
}

export function ensureMindmapVisible() {
  if (!mindmapInitialized) {
    initMindmap();
  }
  requestAnimationFrame(() => {
    computeFitTransform();
    updateEdges();
  });
}
