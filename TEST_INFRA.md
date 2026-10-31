# E2E Test Track Infrastructure & Methodology
**Project**: Physics Passion Project Overhaul ("Deco-Lectronic Atelier")  
**Target Root**: `c:\Users\ericl\random`  
**Test Suite Directory**: `c:\Users\ericl\random\tests\`  
**Architect**: E2E Test Track Architect  
**Date**: 2026-10-31  

---

## 1. Executive Summary & Test Philosophy

The E2E Test Suite for the **Deco-Lectronic Atelier** overhaul is designed as a strict, opaque-box, contract-driven verification pipeline. It verifies that the static website (`index.html`, `css/`, `js/`, `assets/`) satisfies 100% of the functional, mathematical, aesthetic, and architectural requirements defined in `ORIGINAL_REQUEST.md`, `PROJECT.md`, and the survey specifications.

### Guiding Principles:
1. **Opaque-Box Verification**: The test suite treats the application as an integrated system, testing against observable contracts: rendered DOM structures, CSS computed rules, SVG geometry, event handling, mathematical output fidelity, localStorage transactions, and viewport rendering.
2. **Zero-Dependency Native Execution**: To guarantee execution in constrained or sandboxed CI/CD environments without requiring `npm install` of gigabyte-heavy browser bundles, the test suite provides an automated, zero-external-dependency Node.js test runner (`tests/runner.js`) that boots an in-process HTTP static server, performs deep contract audits, executes real physics computations, and verifies DOM/CSS/JS constraints.
3. **Full Headless Browser Integration (Playwright)**: Alongside the native runner, an authoritative Playwright E2E suite (`tests/e2e_playwright.spec.js` + `playwright.config.js`) provides real Chromium/Firefox/WebKit execution to assert real pixel geometry, bounding boxes, 0 console errors, 0 warnings, and 0 failed requests at 1080p (`1920x1080`) and 1440p (`2560x1440`).
4. **Progressive Testability**: Tests are designed to test both current implementation states and future milestone deliverables, reporting clear failure diagnostics whenever planned features are not yet implemented.

---

## 2. 4-Tier Test Methodology & Feature Mapping

The test suite is structured around a rigorous 4-tier hierarchy mapping all 44 features identified in `PROJECT.md`:

```
========================================================================================
TIER 1: FEATURE COVERAGE (44 Features)
Representative inputs & contractual outputs for every feature across M1–M5
----------------------------------------------------------------------------------------
TIER 2: BOUNDARY & CORNER CASES
Extreme RPM limits (1200/3600), rapid switch reversals, empty notes, reduced motion, corruption
----------------------------------------------------------------------------------------
TIER 3: CROSS-FEATURE COMBINATIONS
Multi-view switching preserving simulation state, phase filter + hover tracing, CRUD cycle
----------------------------------------------------------------------------------------
TIER 4: REAL-WORLD APPLICATION SCENARIOS
End-to-end user journeys across all 5 views at 1080p (1920x1080) and 1440p (2560x1440)
========================================================================================
```

### Complete 44-Feature Mapping Matrix

| Feature # | Feature Name | Test Specification File | Target Verification & Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **F01** | Display Typography Stack | `tier1_features/test_typography_and_tokens.js` | `Federo` / `Syne` linked via Google Fonts; `--font-display` token defined and applied to headers. |
| **F02** | VFD Numeric Readout Stack | `tier1_features/test_typography_and_tokens.js` | `Silkscreen` / `VT323` linked; `--font-vfd` applied to `.vfd-cell-val`, `.pixel-readout`. |
| **F03** | Technical Monospace Stack | `tier1_features/test_typography_and_tokens.js` | `Share Tech Mono` linked; `--font-mono` applied to hardware buses, serials, metadata. |
| **F04** | Humanist Editorial Body Stack | `tier1_features/test_typography_and_tokens.js` | `IBM Plex Sans` linked; `--font-body` applied to paragraphs and essays. |
| **F05** | Brass & Gold Color Spectrum | `tier1_features/test_typography_and_tokens.js` | Gilded tokens `--brass-primary` (`#d4a853`), `--brass-deep` (`#b88938`), `--brass-bright` (`#f0c978`). |
| **F06** | Anodized Slate Chassis Palette | `tier1_features/test_typography_and_tokens.js` | Chassis tokens `--chassis-env-bg` (`#0c0e12`), `--chassis-slate-*` (`#12151b`, `#1c222c`, `#252d3a`). |
| **F07** | Calibrated Phosphor Emission System | `tier1_features/test_typography_and_tokens.js` | Cyan (`#00f0d0`), Amber (`#ff9f1c`), Emerald (`#2ee57d`), Ruby/Crimson (`#ff3b5c`) glow tokens. |
| **F08** | Procedural SVG Micro-Grain Filters | `tier1_features/test_materials_and_ornament.js` | SVG `feTurbulence` / `feColorMatrix` filters (`#crinkleEnamelIron`, `#phenolicBakelite`, `#matteABS`). |
| **F09** | Stepped Art Deco Ziggurat Brackets | `tier1_features/test_materials_and_ornament.js` | 3-tier stepped terraces or `.ziggurat-bracket`, `.ziggurat-corner` CSS rules. |
| **F10** | Double-Line Brass Division Rules | `tier1_features/test_materials_and_ornament.js` | Dual brass lines (`.rule-double-brass`, `border-top: 3px double #d4a853`). |
| **F11** | Streamline Moderne Triple Speed-Lines | `tier1_features/test_materials_and_ornament.js` | Triple parallel moldings (`.speed-lines-horizontal`, `.speed-lines-vertical`). |
| **F12** | Engraved Serial Plates | `tier1_features/test_materials_and_ornament.js` | Machined nameplates with beveled border, serial codes, hex/slotted screw anchors. |
| **F13** | Spring-Loaded Keycaps | `tier1_features/test_tactile_controls.js` | Mechanical depression travel (`translateY(2px)`), shadow collapse, active LED pill. |
| **F14** | 3D See-Saw Rocker Switch | `tier1_features/test_tactile_controls.js` | Center-pivot rocker toggle (`.rocker-switch`) with 3D perspective tilt (`rotateY` / `rotateX`). |
| **F15** | Linear Brass Rheostat Fader | `tier1_features/test_tactile_controls.js` | Machined slider fader (`input[type="range"]`, min 1200, max 3600, step 100). |
| **F16** | Smoked-Glass VFD Cavities | `tier1_features/test_tactile_controls.js` | Multi-layered inner shadow cavities (`.vfd-window`, `.vfd-cavity`, optical mesh grid). |
| **F17** | Gyro-Triptych Observatory Chamber | `tier1_features/test_gyro_observatory_layers.js` | Octagonal/circular central astrolabe chamber flanked by asymmetric telemetry/thesis wings. |
| **F18** | R2 Layer 1: Continuous Rotating Rotor | `tier1_features/test_gyro_observatory_layers.js` | Continuous spin animation (`--rotor-spin-duration = 7200 / RPM`). |
| **F19** | R2 Layer 1: Reduced-Motion Support | `tier2_boundaries/test_reduced_motion_accessibility.js` | Respects `@media (prefers-reduced-motion: reduce)`, pausing continuous spin with static graticule. |
| **F20** | R2 Layer 2: Radial Screw Translation | `tier1_features/test_gyro_observatory_layers.js` | 6× M3 screws sliding smoothly between $r=36\text{ mm}$ (inner) and $r=68\text{ mm}$ (outer). |
| **F21** | R2 Layer 3: Traveling Circuit Signal Pulses | `tier1_features/test_gyro_observatory_layers.js` | SVG `stroke-dashoffset` pulse animations along 45° PCB traces connecting MCU to motor/sensors. |
| **F22** | R2 Layer 4: Live 3D Precession Cone | `tier1_features/test_gyro_observatory_layers.js` | Dynamic precession orbit ellipse ($R_x = 62\text{px} \leftrightarrow 42\text{px}$) scaling with state. |
| **F23** | R2 Layer 4: Dynamic Momentum & Torque Vectors | `tier1_features/test_gyro_observatory_layers.js` | Real-time angular momentum $\vec{L} = I\vec{\omega}$ and orthogonal torque $\vec{\tau}$ rendering. |
| **F24** | R2 Live Equation Counters | `tier1_features/test_gyro_observatory_layers.js` | Dual VFD readouts calculating $I$ ($1.29 \leftrightarrow 2.48\text{e-4}$) and $\Omega_p$ ($0.51 \leftrightarrow 2.97\text{ rad/s}$). |
| **F25** | Post 1 Asymmetric Architectural Dossier | `tier1_features/test_post1_dossier_and_prose.js` | Asymmetric instrument bay layout replacing generic uniform 5 cards. |
| **F26** | Post 1 Verbatim Prose Preservation | `tier1_features/test_post1_dossier_and_prose.js` | 100% verbatim retention of Computers, Electronics, Music, Video Games, History essays. |
| **F27** | Post 2 Hypothesis Isolation Conduit | `tier1_features/test_post2_hypothesis_conduit.js` | 3-stage stepped refinement of Candidate 05 (Gyroscopic Precession). |
| **F28** | Post 2 Candidate Investigation Ledger | `tier1_features/test_post2_hypothesis_conduit.js` | Brass-ruled laboratory ledger for all 6 candidate investigations (CAND 01 to CAND 06). |
| **F29** | Post 2 Gemini Transcript ROM Link | `tier1_features/test_post2_hypothesis_conduit.js` | Mechanical ROM link button to `https://share.gemini.google/1Isc2ZbPU9xN`. |
| **F30** | Conferencing Inspection Logbook | `tier1_features/test_conferencing_crud.js` | Engraved inspection ledger displaying checkpoint records with status, feedback, actions. |
| **F31** | Conferencing CRUD Operations | `tier1_features/test_conferencing_crud.js` | Add conference via drawer form; remove conference via card delete button. |
| **F32** | Conferencing Inline Note Editing | `tier1_features/test_conferencing_crud.js` | Master toggle enabling `contenteditable="true"` on titles, dates, feedback, actions. |
| **F33** | Conferencing LocalStorage Cache | `tier1_features/test_conferencing_crud.js` | Synchronous JSON persistence to `ppp_conferencing_entries_v1` with 4 baseline records. |
| **F34** | Post 3 1080p & 1440p Split Grid | `tier1_features/test_post3_gantt_split.js` | Side-by-side Task Breakdown + Mermaid Gantt layout on both 1920x1080 and 2560x1440. |
| **F35** | Post 3 6-Milestone Master Schedule | `tier1_features/test_post3_gantt_split.js` | 65-day schedule (Nov 1, 2026 – Jan 5, 2027) covering SR, PR, and Deliverables. |
| **F36** | Post 3 Zero Negative SVG Rect Widths | `tier1_features/test_post3_gantt_split.js` | All SVG task rects have strictly positive widths ($\ge 10\text{px}$). |
| **F37** | Post 3 Zero Overlapping Text Boxes | `tier1_features/test_post3_gantt_split.js` | Task labels, dates, section headings render with zero bounding-box collisions. |
| **F38** | Post 3 Phosphor Gantt Styling | `tier1_features/test_post3_gantt_split.js` | Cyan (`#00f0d0`), amber (`#ff9f1c`), emerald (`#2ee57d`) phosphor glows. |
| **F39** | Post 3 Bidirectional Hover Tracing | `tier1_features/test_post3_gantt_split.js` | Hovering table row highlights SVG bar; hovering SVG bar highlights table row. |
| **F40** | Post 3 Phase-Isolation Switches | `tier1_features/test_post3_gantt_split.js` | Segmented rocker switches dim non-matching rows and bars to 28% opacity. |
| **F41** | Modular Static Architecture (R4) | `tier4_scenarios/test_console_and_network_integrity.js` | Zero build step, zero bundlers, semantic HTML5, modular CSS, native ES modules. |
| **F42** | Zero Console Errors & Failed Requests | `tier4_scenarios/test_console_and_network_integrity.js` | Serving over local HTTP yields 0 console errors, 0 warnings, 0 failed network requests. |
| **F43** | Multi-Viewport Geometric Verification | `tier4_scenarios/test_viewport_1080p_1440p_geometry.js` | Full verification at 1080p (`1920x1080`) and 1440p (`2560x1440`) across all 5 views. |
| **F44** | Adversarial Coverage Hardening | `tier2_boundaries/*` + `tier3_combinations/*` | Stress testing boundary values, rapid state toggling, and corrupted storage payloads. |

---

## 3. Test Directory Structure

The test suite is organized inside `c:\Users\ericl\random\tests\`:

```
c:\Users\ericl\random\tests\
├── fixtures\
│   ├── baseline_conferences.json       # Authoritative 4 baseline conference records
│   ├── expected_prose.json              # Verbatim text catalog for Post 1 & Post 2
│   └── physics_oracle.json              # Tabulated physical values (I, omega, L, tau, Omega_p)
├── tier1_features\
│   ├── test_typography_and_tokens.js   # Features 1–7 (Fonts, Tokens, Phosphors)
│   ├── test_materials_and_ornament.js   # Features 8–12 (Grain filters, Ziggurats, Speed-lines, Plates)
│   ├── test_tactile_controls.js         # Features 13–16 (Keycaps, Rockers, Rheostat, Cavities)
│   ├── test_gyro_observatory_layers.js  # Features 17–18, 20–24 (Gyro Observatory 4 layers & physics)
│   ├── test_post1_dossier_and_prose.js  # Features 25–26 (Post 1 Dossier & verbatim prose)
│   ├── test_post2_hypothesis_conduit.js # Features 27–29 (Post 2 Hypothesis conduit & ROM link)
│   ├── test_post3_gantt_split.js        # Features 34–40 (Post 3 Gantt split, rects, hover, filters)
│   └── test_conferencing_crud.js        # Features 30–33 (Conferencing CRUD, inline edit, localStorage)
├── tier2_boundaries\
│   ├── test_extreme_rpm_limits.js       # Bound 1200 RPM and 3600 RPM physics clamping
│   ├── test_rapid_rocker_toggles.js     # Rapid toggling (<200ms) between inner and outer mass
│   ├── test_empty_notes_inline_edit.js  # Inline editing empty string placeholder preservation
│   ├── test_reduced_motion_accessibility.js # prefers-reduced-motion pause of rotor and signal pulses
│   └── test_storage_corruption_fallback.js  # Corrupted localStorage JSON handling & fallback
├── tier3_combinations\
│   ├── test_view_switch_simulation_state.js # SPA routing preserving rotor state across 5 views
│   ├── test_gantt_filter_hover_tracing.js   # Phase filtering combined with hover highlight
│   └── test_conference_crud_persistence_cycle.js # Multi-step add -> edit -> reload -> remove cycle
├── tier4_scenarios\
│   ├── test_viewport_1080p_1440p_geometry.js # Geometric split verification at 1920x1080 & 2560x1440
│   ├── test_full_user_voyage_5_views.js      # Complete user navigation walkthrough across all 5 views
│   └── test_console_and_network_integrity.js # Zero console errors, 0 warnings, 0 failed network requests
├── utils\
│   ├── static_server.js                # Built-in Node.js HTTP static server
│   ├── dom_parser.js                   # Lightweight regex-based / AST DOM inspector
│   ├── assert_helpers.js               # Assertion library with formatted diffs
│   └── physics_engine.js               # Mathematical reference oracle
├── runner.js                           # Master automated Node.js test runner (zero npm dependencies)
├── playwright.config.js                # Authoritative Playwright configuration
├── e2e_playwright.spec.js              # Complete Playwright browser E2E test suite
└── run_all_tests.js                    # CLI wrapper generating formatted test reports
```

---

## 4. Authoritative Physics & Mathematical Oracles

All tests validating physical simulation behavior (Features 18, 20, 22, 23, 24) compare against the exact mathematical formulations specified in `ORIGINAL_REQUEST.md:21-25` and `spec_schematic_mermaid.md:94-140`:

1. **Moment of Inertia**:
   $$I = I_0 + m_{\text{total}} r^2$$
   - $I_0 = 0.82 \times 10^{-4}\text{ kg}\cdot\text{m}^2$
   - $m_{\text{total}} = 0.036\text{ kg}$
   - $r_{\text{inner}} = 0.036\text{ m} \implies I_{\text{inner}} = 1.2866 \times 10^{-4}\text{ kg}\cdot\text{m}^2 \approx 1.29 \times 10^{-4}\text{ kg}\cdot\text{m}^2$
   - $r_{\text{outer}} = 0.068\text{ m} \implies I_{\text{outer}} = 2.4846 \times 10^{-4}\text{ kg}\cdot\text{m}^2 \approx 2.48 \times 10^{-4}\text{ kg}\cdot\text{m}^2$

2. **Spin Angular Velocity**:
   $$\omega = \frac{2\pi \times \text{RPM}}{60}\text{ rad/s}$$

3. **Precession Angular Velocity & Period**:
   $$\Omega_p = \frac{\tau}{I \omega}\text{ rad/s}, \qquad T_p = \frac{2\pi}{\Omega_p}\text{ s} \quad (\tau = 0.048\text{ N}\cdot\text{m})$$

4. **Continuous Rotor Animation Duration**:
   $$T_{\text{rot\_anim}} = \frac{7200}{\text{RPM}}\text{ s}$$

---

## 5. Execution Instructions

### Mode A: Automated Node.js Native Runner (Zero NPM Dependencies)
To run the complete 4-tier test suite using native Node.js:
```powershell
node tests/runner.js
```
This spins up an in-process HTTP static server on an ephemeral port (e.g. `http://localhost:8080`), audits all static files, runs the full 44-feature verification suite, validates boundary conditions, checks cross-feature interactions, and tests multi-viewport CSS grid geometry.

### Mode B: Playwright Headless Browser E2E Suite
If `@playwright/test` is installed in the environment:
```powershell
npx playwright test
```
Or targeting specific viewports:
```powershell
npx playwright test --project=desktop-1080p
npx playwright test --project=desktop-1440p
```
