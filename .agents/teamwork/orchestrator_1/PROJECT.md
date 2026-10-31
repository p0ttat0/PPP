# Project: Physics Passion Project Overhaul ("Deco-Lectronic Atelier")

## Architecture
- **Paradigm**: Framework-free, zero-build Semantic HTML5, Modular CSS, and Native ES6 Modules.
- **Entry Point**: `index.html` (single-page application hosting 5 views: `#view-home`, `#view-post1`, `#view-post2`, `#view-post3`, `#view-conferencing`).
- **Styling Pipeline**:
  - `css/tokens.css`: Color palettes (brass/gold spectrum, cast-iron slate, phenolic Bakelite, calibrated phosphors), elevation/shadows, typography tokens (`Federo`/`Syne`, `Silkscreen`/`VT323`, `Share Tech Mono`, `IBM Plex Sans`).
  - `css/deco-ornament.css`: Stepped Art Deco ziggurat brackets, double-line brass rules, Streamline Moderne triple speed-lines, radial sunburst ticks, engraved serial plates.
  - `css/components.css`: Tactile physical switchgear (spring-loaded keycaps with shadow collapse & phosphor ignition, 3D rocker switches, linear brass rheostat fader, rotary switches, VFD/CRT optical cavities).
  - `css/views.css`: Asymmetric instrument bay layouts, 1080p and 1440p responsive grid geometries, side-by-side split Gantt view.
- **Module Architecture**:
  - `js/main.js`: Main bootstrap; coordinates view lifecycle, initializes simulation, conferencing, and navigation.
  - `js/navigation.js`: SPA routing with hash validation (`#home`, `#post1`, `#post2`, `#post3`, `#conferencing`), tabpanel ARIA sync, view-transition hooks.
  - `js/oscilloscope.js`: "The Gyro-Triptych Observatory" 4-layer physics simulation engine ($I = I_0 + \sum mr^2$, $\omega = 2\pi\text{RPM}/60$, $L = I\omega$, $\tau = r\times Mg$, $\Omega_p = \tau / (I\omega)$), SVG coordinate manipulation, live vector rendering.
  - `js/gantt.js`: Mermaid.js v10 dynamic loader, 6-milestone Gantt render, non-negative rect width enforcement, text collision prevention, bidirectional hover tracing, phase isolation switches.
  - `js/conferencing.js`: Inspection & calibration logbook CRUD, inline note editing (`contenteditable="true"`), fault-tolerant `localStorage` persistence (`ppp_conferencing_entries_v1`).

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Display Typography Stack | `Federo` / `Syne` loaded via Google Fonts for all console headers, ziggurat titles, and instrument banners | M1 | Survey 2 § 2.1 |
| 2 | VFD Numeric Readout Stack | `Silkscreen` / `VT323` loaded for pixelated phosphor counters and equation readouts | M1 | Survey 2 § 2.2 |
| 3 | Technical Monospace Stack | `Share Tech Mono` loaded for hardware bus specifications, metadata, and serial plates | M1 | Survey 2 § 2.3 |
| 4 | Humanist Editorial Body Stack | `IBM Plex Sans` loaded for student personal essays, research notes, and feedback prose | M1 | Survey 2 § 2.4 |
| 5 | Brass & Gold Color Spectrum | Metallic spectrum tokens (`#d4a853`, `#b88938`, `#f0c978`, `#825e22`) with glowing specular borders | M1 | Survey 2 § 4.1 |
| 6 | Anodized Slate & Cast-Iron Palette | Deep structural chassis shades (`#0c0e12`, `#12151b`, `#1c222c`, `#252d3a`) for instrument casings | M1 | Survey 2 § 4.1 |
| 7 | Calibrated Phosphor Emission System | Restrained optical emissions for Cyan (`#00f0d0`), Amber (`#ff9f1c`), Emerald (`#2ee57d`), Ruby (`#ff3b5c`) | M1 | Survey 2 § 4.1 |
| 8 | Procedural SVG Micro-Grain Filters | Procedural SVG `feTurbulence` / `feColorMatrix` / `feDiffuseLighting` filters for cast crinkle-enamel iron, phenolic Bakelite, matte ABS, and brushed brass | M1 | Survey 2 § 5.1 |
| 9 | Stepped Art Deco Ziggurat Brackets | 3-tier stepped terraces anchoring module corners, view frames, and hero plinths | M1 | Survey 2 § 6.1 |
| 10 | Double-Line Brass Division Rules | Precision double brass rules (`#d4a853` / `#b88938`) with central Art Deco diamond breaks | M1 | Survey 2 § 6.2 |
| 11 | Streamline Moderne Triple Speed-Lines | Aerodynamic 3-line parallel brass/slate accent moldings along headers and boundaries | M1 | Survey 2 § 6.3 |
| 12 | Engraved Serial Plates | Machined identification nameplates with beveled border, serial codes, and slotted screw heads | M1 | Survey 2 § 6.5 |
| 13 | Spring-Loaded Keycaps | Pushbuttons with 2-3px mechanical depression, bottom shadow collapse, and phosphor LED ignition | M1 | Survey 2 § 8.1 |
| 14 | 3D See-Saw Rocker Switch | Center-pivot rocker toggle with 3D perspective tilt (`rotateY`) and state lighting | M1 | Survey 2 § 8.2 |
| 15 | Linear Brass Rheostat Fader | Machined linear slider fader with knurled brass handle and calibration tick marks for RPM | M1 | Survey 2 § 8.3 |
| 16 | Smoked-Glass VFD Cavities | Multi-layered inner shadow cavities with optical anode mesh grid and scanline textures | M1 | Survey 2 § 4.1 |
| 17 | Gyro-Triptych Observatory Chamber | Multi-layered circular/octagonal central Astrolabe & Oscilloscope chamber with asymmetric wings | M2 | Survey 3 § 2.1 |
| 18 | R2 Layer 1: Continuous Rotating Rotor | Reaction wheel rotor spinning continuously around BLDC hub scaled dynamically by user RPM | M2 | Survey 3 § 2.3 |
| 19 | R2 Layer 1: Reduced-Motion Support | Automatic pause of continuous spin with static reference graticule under `prefers-reduced-motion` | M2 | Survey 3 § 2.3 |
| 20 | R2 Layer 2: Radial Screw Translation | 6× M3 stainless steel screws & washers sliding smoothly along spokes between 36mm hub and 68mm rim over 450ms while wheel rotates | M2 | Survey 3 § 2.3 |
| 21 | R2 Layer 3: Traveling Circuit Signal Pulses | SVG `stroke-dashoffset` pulse animations along 45° PCB traces connecting ESP32 to BLDC and sensors | M2 | Survey 3 § 2.3 |
| 22 | R2 Layer 4: Live 3D Precession Cone | Axonometric 3D orbit cone with dynamic ellipse recalibration ($R_x = 62\text{px} \leftrightarrow 42\text{px}$) | M2 | Survey 3 § 2.3 |
| 23 | R2 Layer 4: Dynamic Momentum & Torque Vectors | Real-time angular momentum $\vec{L} = I\vec{\omega}$ and orthogonal torque $\vec{\tau} = \frac{d\vec{L}}{dt}$ vector rendering | M2 | Survey 3 § 2.3 |
| 24 | R2 Live Equation Counters | Dual recessed VFD equation counters calculating $I$ and $\Omega_p$ in real time from physical parameters | M2 | Survey 3 § 2.2 |
| 25 | Post 1 Asymmetric Architectural Dossier | Asymmetric Instrument Bay layout replacing uniform 5 cards; custom Art Deco + VFD technical plates | M3 | Survey 1 § 1.2 |
| 26 | Post 1 Verbatim Prose Preservation | 100% verbatim retention of Computers/Software, Electronics, Music, Video Games, History & Politics essays | M3 | Survey 1 § 1.2 |
| 27 | Post 2 Hypothesis Isolation Conduit | 3-stage refinement of Candidate 05 (Gyroscopic Precession) as stepped Art Deco conduit | M3 | Survey 1 § 1.2 |
| 28 | Post 2 Candidate Investigation Ledger | Brass-ruled laboratory ledger for all 6 candidate investigations (CAND 01 through CAND 06) | M3 | Survey 1 § 1.2 |
| 29 | Post 2 Gemini Transcript Mechanical ROM Link | Engraved mechanical ROM link button to `https://share.gemini.google/1Isc2ZbPU9xN` | M3 | Survey 1 § 1.2 |
| 30 | Conferencing Inspection Logbook | Engraved calibration logbook displaying checkpoint records with status, feedback, and action items | M3 | Survey 3 § 4.1 |
| 31 | Conferencing CRUD Operations | Add new conference via drawer form; delete conference via card removal button | M3 | Survey 3 § 4.3 |
| 32 | Conferencing Inline Note Editing | Master toggle enabling in-place editing (`contenteditable="true"`) for feedback and student actions | M3 | Survey 3 § 4.3 |
| 33 | Conferencing LocalStorage Cache | Persistence under `ppp_conferencing_entries_v1` with 4 baseline fallback records | M3 | Survey 3 § 4.2 |
| 34 | Post 3 1080p & 1440p Side-by-Side Split Grid | Desktop split layout (Task Breakdown on left, Mermaid Gantt on right) on both 1920x1080 and 2560x1440 | M4 | Survey 3 § 3.1 |
| 35 | Post 3 6-Milestone Master Schedule | Synchronized 65-day schedule (Nov 1, 2026 – Jan 4, 2027) spanning Secondary, Primary, and Deliverables | M4 | Survey 3 § 3.2 |
| 36 | Post 3 Zero Negative SVG Rect Widths | Guaranteed positive rect widths ($\ge 10\text{px}$) via non-inclusive date formatting & post-render audit | M4 | Survey 3 § 3.3 |
| 37 | Post 3 Zero Overlapping Text Bounding Boxes | Collision-free text layout via generous bar clearances (`barHeight: 46`, `barGap: 16`, `leftPadding: 165`) | M4 | Survey 3 § 3.3 |
| 38 | Post 3 Phosphor Gantt Styling | Art Deco stepped headers, cyan/amber/emerald phosphor bar glows with drop-shadow blooms | M4 | Survey 3 § 3.4 |
| 39 | Post 3 Bidirectional Hover Tracing | Synchronized highlight between table rows and SVG Gantt bars on hover | M4 | Survey 3 § 3.4 |
| 40 | Post 3 Phase-Isolation Switches | Tactile segmented rocker buttons to isolate project phases, dimming non-matching rows to 28% opacity | M4 | Survey 3 § 3.4 |
| 41 | Modular Static Architecture (R4) | Zero build tools, zero bundlers, pure semantic HTML5, modular CSS, native ES modules | M5 | Survey 2 § 9.1 |
| 42 | Zero Console Errors & Failed Requests | Clean load over static HTTP server with 0 console errors, 0 warnings, 0 failed network requests | M5 | Acceptance Criteria |
| 43 | Multi-Viewport Geometric Verification | Verification across all 5 views at 1080p (1920x1080) and 1440p (2560x1440) viewports | M5 | Acceptance Criteria |
| 44 | Adversarial Coverage Hardening | Tier 5 adversarial stress testing covering boundary conditions, rapid toggles, and corrupted storage | M5 | Project Pattern |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Independent opaque-box test suite: HTTP verification, 5-view headless tests, 1080p & 1440p geometry, negative tests; produce TEST_INFRA.md and TEST_READY.md | none | DONE |
| M1 | Design System & Aesthetic Foundation | CSS tokens, typography `<link>`, procedural SVG micro-grain filters, stepped ziggurat brackets, double brass rules, triple speed-lines, serial nameplates, spring-loaded keycaps, 3D rocker switch, linear brass rheostat fader | none | DONE |
| M2 | The Gyro-Triptych Observatory Centerpiece | Overhaul `#view-home`: circular/octagonal Astrolabe & Oscilloscope chamber, 4 animated mechanical/signal layers, dynamic momentum & torque vectors, live VFD equation counters, tactile controls | M1 | DONE |
| M3 | Asymmetric Posts 1 & 2 + Conferencing Logbook | Post 1 Architectural Dossier & Instrument Bays (100% verbatim prose); Post 2 Hypothesis Conduit, 6 candidate ledger, Gemini ROM link; Conferencing Logbook CRUD & inline note editing (`ppp_conferencing_entries_v1`) | M1 | DONE |
| M4 | Post 3 Gantt Split Layout & Mermaid.js v10 | Post 3 side-by-side split layout on 1080p and 1440p, 6-milestone schedule (Nov 1, 2026 – Jan 4, 2027), 0 negative rect widths, 0 overlapping text boxes, phosphor styling, bidirectional hover, phase switches | M1 | IN_PROGRESS |
| M5 | Final Milestone: Pass 100% E2E Tests & Adversarial Hardening | Phase 1: Pass 100% of E2E test suite (Tiers 1-4). Phase 2: Adversarial coverage hardening (Tier 5) with Challengers and Reviewers. Forensic Integrity Audit. | M2, M3, M4, E2E | PLANNED |

---

## Interface Contracts

### 1. Navigation ↔ Views (`js/navigation.js` ↔ `index.html`)
- **Active Route Representation**:
  - URL hash: `#home`, `#post1`, `#post2`, `#post3`, `#conferencing`.
  - DOM View Section: `<section id="view-<name>" class="page-view [active|hidden]" role="tabpanel" aria-labelledby="tab-<name>">`.
  - Pushbutton Nav: `<button id="tab-<name>" class="bank-btn [active]" role="tab" data-view="<name>">`.
- **Event Dispatch**:
  - Custom Event `viewchange`: dispatched on `window` with detail `{ fromView, toView }`.
  - Callback Hook: `onEnterPost3()` triggers `ensureGanttRendered()` upon `#post3` activation.

### 2. Simulation Engine ↔ DOM Controls (`js/oscilloscope.js` ↔ `index.html`)
- **Inputs**:
  - RPM Rheostat: `#rpm-slider` (`input[type="range"].brass-rheostat`, `min="1200"`, `max="3600"`, `step="100"`, `value="2400"`).
  - Mass Ring Rocker: `#mass-rocker` (`.rocker-switch[data-state="inner|outer"]`).
- **Physical Output Quantities**:
  - $I$ Readout: `#readout-inertia` (`.pixel-readout`, format: `${(I * 1e4).toFixed(2)}e-4 kg·m²`).
  - $\Omega_p$ Readout: `#readout-precession` (`.pixel-readout`, format: `${Omega_p.toFixed(2)} rad/s`).
  - RPM Display: `#rpm-display` (`.pixel-readout`, format: `${rpm} RPM`).
- **SVG Animation Hooks**:
  - Rotor Group: `#rotor-spinning-assembly` with inline CSS property `--rotor-spin-duration: ${T_rot}s`.
  - Screw Washers: `.m3-screw-washer` with classes `.at-inner` ($r = 44\text{px}$) and `.at-outer` ($r = 82\text{px}$).
  - PCB Signal Pulses: `.pcb-trace-pulse` with inline CSS property `--pulse-period: ${T_pulse}s`.
  - 3D Precession Vector: `#vector-l` and `#vector-tau` recalculated per frame or phase step.

### 3. Mermaid Gantt ↔ Task Breakdown Table (`js/gantt.js` ↔ `index.html`)
- **Data Binding**:
  - Table Rows: `.ms-row[data-task-id="sr1|sr2|pr1|pr2|pr3|del1"]`.
  - Mermaid SVG Bars: `<rect id="sr1">` through `<rect id="del1">`.
- **Bidirectional Hover**:
  - Table to SVG: `.ms-row.mouseenter` adds `.highlighted` to row and `.bar-highlight` to matching SVG rect.
  - SVG to Table: `rect.mouseenter` adds `.bar-highlight` to rect and `.highlighted` to matching table row.
- **Phase Filter**:
  - Switch: `.phase-filter-btn[data-phase-filter="all|sr|pr|del"]`.
  - Non-matching rows & bars receive `.dimmed-phase` (`opacity: 0.28`).

### 4. Conferencing Storage ↔ DOM (`js/conferencing.js` ↔ `localStorage`)
- **Storage Key**: `ppp_conferencing_entries_v1`.
- **Record Schema**:
  ```typescript
  interface ConferenceRecord {
    id: string;        // 'conf-1', 'conf-2', ... or 'conf-' + timestamp
    title: string;     // Checkpoint meeting title
    date: string;      // Date string, e.g. 'Oct 2026', 'Nov 10, 2026'
    phase: string;     // 'Secondary Research' | 'Primary Research' | 'Deliverables'
    status: string;    // 'Scheduled' | 'In Progress' | 'Completed'
    feedback: string;  // Verbatim teacher feedback
    actions: string;   // Student action items
  }
  ```
- **Inline Editing**:
  - Master button: `#toggle-edit-conf-btn` toggles state `isEditingInline`.
  - Editable targets: `.conf-log-title`, `.ms-dates`, `.conf-box-text` receive `contenteditable="true"` and save on `blur`.

---

## Code Layout
```
c:\Users\ericl\random\
├── index.html                  # Semantic HTML5 SPA containing all 5 views
├── assets/
│   ├── favicon.svg             # Art Deco reaction-wheel rotor icon
│   └── grain-filters.svg       # Standalone SVG procedural micro-grain filters
├── css/
│   ├── tokens.css              # Design tokens (brass, slate, phosphors, typography)
│   ├── deco-ornament.css       # Ziggurat corner brackets, double brass rules, speed-lines, serial plates
│   ├── components.css          # Tactile switches, faders, VFD/CRT cavity styles
│   └── views.css               # Architectural view layouts, 1080p and 1440p responsive grids
├── js/
│   ├── main.js                 # App initialization, lifecycle coordination
│   ├── navigation.js           # View routing, tabpanel aria sync, hashchange listener
│   ├── oscilloscope.js         # Gyro-Triptych simulator, physics calculations, vector graticule updates
│   ├── gantt.js                # Mermaid v10 Gantt rendering, phase filters, bidirectional hover
│   └── conferencing.js         # Checkpoint log CRUD, inline note editing, localStorage persistence
└── tests/                      # E2E test suite created by E2E Testing Track
    ├── runner.js (or test scripts)
    └── ...
```

## Write Ownership Boundaries
- **E2E Testing Track**: Owns `c:\Users\ericl\random\tests\` exclusively. Must NOT modify production files.
- **Milestone 1 Worker**: Owns `css/tokens.css`, `css/deco-ornament.css`, `css/components.css`, and `<head>` fonts/filter definitions in `index.html`.
- **Milestone 2 Worker**: Owns `#view-home` in `index.html`, `js/oscilloscope.js`, and Home section in `css/views.css`.
- **Milestone 3 Worker**: Owns `#view-post1`, `#view-post2`, `#view-conferencing` in `index.html`, `js/conferencing.js`, and corresponding sections in `css/views.css`.
- **Milestone 4 Worker**: Owns `#view-post3` in `index.html`, `js/gantt.js`, and Post 3 split-view grid in `css/views.css`.
- **Milestone 5 Worker**: Integration fixes across files to achieve 100% pass on E2E test suite.
