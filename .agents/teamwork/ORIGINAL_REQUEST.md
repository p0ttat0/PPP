# Original User Request

## 2026-10-31T02:31:45Z

Overhaul the Physics Passion Project static website (`c:\Users\ericl\random`) into an authored, non-AI-looking **Art Deco × Streamline Moderne × 1980s Neo-Retro-Futurist Scientific Instrument** ("Deco-Lectronic Atelier"), eliminating all generic SaaS/card-grid conventions and featuring a large, living, animated central homepage schematic surrounded by asymmetric instrument flanks and tactile mechanical controls.

Working directory: c:\Users\ericl\random
Integrity mode: development

## Requirements

### R1. Aesthetic & Structural Overhaul (Art Deco × Neo-Retro-Futurism)
Eliminate all recognizable AI-generated website conventions (uniform rounded card grids, repetitive pill badges, top-heavy SaaS hero banners, uniform spacing, and generic sans-serif typography). Replace them with an authored **Art Deco + Streamline Moderne + 1980s Electronic Instrumentation** design system featuring:
- **Architectural Framing & Ornamentation**: Stepped Art Deco ziggurat corner brackets, double-line brass/gold (`#d4a853` / `#b88938`) and anodized slate rules, Streamline Moderne triple parallel "speed-line" moldings, radial sunburst compass ticks, and engraved brass/aluminum serial nameplates.
- **Gritty Tactile Materials**: Procedural SVG FractalNoise micro-grain simulating cast crinkle-enamel iron, phenolic Bakelite, matte textured ABS, and brushed brass trim, paired with deeply recessed smoked-glass CRT/VFD cavities.
- **Distinctive Typography**: Pair an architectural Art Deco display typeface (`Federo` / `Syne`), a pixel/bitmap readout face (`Silkscreen` / `VT323`) for VFD numeric counters, a technical monospace (`Share Tech Mono`), and a crisp humanist/editorial body face (`IBM Plex Sans`).
- **Component-Specific Physical Interactions**: Distinct mechanical behaviors for rotary/rocker switches, spring-loaded keycaps (physical depression, shadow collapse, localized phosphor lamp ignition), and brass-knob linear rheostats.

### R2. Central Living Homepage Schematic ("The Gyro-Triptych Observatory")
Restructure the Homepage (`#view-home`) around a commanding central visual centerpiece: a multi-layered, circular/octagonal Art Deco **Astrolabe & Vector Oscilloscope Chamber** flanked by asymmetric telemetry and governing-mechanics wings:
- **Animated Mechanical & Signal Layers**:
  1. Continuously rotating reaction-wheel rotor assembly (scaled dynamically by the user's RPM rheostat fader and respecting `prefers-reduced-motion`).
  2. Animated radial displacement of the 6× M3 stainless steel screws and washers sliding smoothly along the rotor spokes between the inner hub ($r = 36\text{ mm}$) and outer rim ($r = 68\text{ mm}$) when the user toggles the mass-ring rocker switch.
  3. Traveling SVG signal pulses (`stroke-dashoffset` animations) flowing along circuit traces from the `ESP32 + SimpleFOC` bus to the `220KV 2804 BLDC` hub and `ICM-20948` / `MT6701` sensor pickups.
  4. Live 3D gyroscopic precession orbit cone and angular momentum ($L = I \cdot \omega$) / torque ($\tau = r \times Mg$) vectors that dynamically recalibrate their geometry and orbital period in real time.

### R3. Asymmetric Redesign of Posts 1–3 & Conferencing (Preserving All Content & Features)
Re-architect the remaining views to break uniform card repetition while preserving all original user text and interactive capabilities:
- **Post 1 (`#view-post1` — Passions)**: Replace the uniform 5-card grid with an asymmetric **Architectural Dossier & Instrument Bay** layout featuring custom Art Deco + VFD technical plates for *Computers/Software*, *Electronics*, *Music*, *Video Games*, and *History and Politics* with 100% of the user's original prose preserved verbatim.
- **Post 2 (`#view-post2` — Driving Questions)**: Present the 3-stage refinement of Candidate 05 (*Gyroscopic Precession*) as a stepped Art Deco **Hypothesis Isolation Conduit**, paired with a brass-ruled laboratory ledger for the 6 candidate investigations and a mechanical ROM link to the external Gemini transcript (`https://share.gemini.google/1Isc2ZbPU9xN`).
- **Post 3 (`#view-post3` — Gantt Timeline & Task Breakdown)**: Maintain a side-by-side split layout on both **1080p (`1920x1080`)** and **1440p (`2560x1440`)** desktop viewports with the **Detailed Task Breakdown & Descriptions** on the left and the **Mermaid.js v10 Gantt Chart** on the right (6 milestones across *Secondary Research*, *Primary Research*, and *Deliverables*, Nov 1, 2026 – Jan 4, 2027), restyled with Art Deco stepped section headers, brass/cyan/amber/emerald phosphor bars, bidirectional hover tracing, and phase-isolation switches.
- **Conferencing (`#view-conferencing`)**: Style the teacher checkpoint log as an **Engraved Inspection & Calibration Logbook** preserving full **Add Conference**, **Remove**, and **Inline Note Editing** persisted to `localStorage` (`ppp_conferencing_entries_v1`).

### R4. Modular Static Architecture
Maintain a clean, framework-free static site structure (`index.html`, `css/`, `js/`, `assets/`) using semantic HTML5, modular CSS, and native ES modules with zero build tools or external frameworks required.

## Acceptance Criteria

### Visual & Functional Verification (`1920x1080` 1080p & `2560x1440` 1440p)
- [ ] Serving `c:\Users\ericl\random` over a local static HTTP server loads `index.html` and all `css/`, `js/`, and `assets/` files with `0` console errors, `0` warnings, and `0` failed network requests.
- [ ] Perform full browser visual and geometric verification at both **1080p (`1920x1080`)** and **1440p (`2560x1440`)** desktop viewports across all 5 views (`Home`, `Post 1`, `Post 2`, `Post 3`, `Conferencing`), confirming zero horizontal overflow, zero text clipping, and balanced architectural proportions at both resolutions.
- [ ] The Homepage (`#view-home`) features a prominent, centered, animated SVG schematic (rotating reaction wheel, animated radial screw translation between $36\text{ mm}$ and $68\text{ mm}$, traveling circuit signal pulses, and dynamic precession cone) framed by stepped Art Deco / Streamline Moderne ornamentation and gritty procedural surface texture.
- [ ] All 5 views (`Home`, `Post 1`, `Post 2`, `Post 3`, `Conferencing`) eliminate repetitive uniform rounded card grids in favor of asymmetric architectural framing, stepped ziggurat borders, speed-line moldings, and distinct typography (`Federo`, `Silkscreen`, `Share Tech Mono`, `IBM Plex Sans`).
- [ ] On `Post 3` at both `1920x1080` (1080p) and `2560x1440` (1440p), the left-hand Task Breakdown table and right-hand Mermaid.js v10 Gantt chart render side-by-side with `0` negative SVG `<rect>` widths and `0` overlapping text bounding boxes.
- [ ] On `Conferencing`, adding a new conference entry, toggling inline note editing (`contenteditable="true"`), and removing an entry all function cleanly and persist to `localStorage`.
