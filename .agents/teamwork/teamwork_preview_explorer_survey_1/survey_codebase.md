# Codebase Survey & Verbatim Content Catalog
**Physics Passion Project (GP-2804) Static Website Overhaul**

Surveyed by: Explorer 1 (Codebase Archaeologist)  
Date: 2026-10-31  
Workspace: `c:\Users\ericl\random`

---

## 1. Executive Summary & Codebase File Inventory

The existing repository is a zero-build, framework-free static web application located in `c:\Users\ericl\random`. It implements a single-page architecture (SPA) presenting a high school experimental physics project focused on **Gyroscopic Precession and Reaction Wheel Dynamics (Model GP-2804)**.

### Complete File Inventory

| Relative Path | Type | Size (Bytes) | Lines | Purpose & Architectural Role |
| :--- | :--- | :--- | :--- | :--- |
| `index.html` | HTML5 | 58,279 | 939 | Main semantic document containing 5 primary views (`#view-home`, `#view-post1`, `#view-post2`, `#view-post3`, `#view-conferencing`), header rack console, SVG vector scope graticule, and modal drawer forms. |
| `assets/favicon.svg` | SVG | 730 | 13 | Vector site favicon showing reaction wheel rotor with 6 perimeter mass weights. |
| `css/tokens.css` | CSS | 5,792 | 207 | Design tokens: ABS housing colors, VFD/CRT phosphor glows, typography variables, physical elevation/keycap shadows, and global resets. |
| `css/components.css` | CSS | 17,813 | 734 | Reusable instrument component styles: top header console, interlocking bank switch pushbuttons, VFD optical display cavities, chassis modules, annunciator lamps, form inputs, tactile action buttons. |
| `css/views.css` | CSS | 13,906 | 695 | Layout rules for individual views: benchtop oscilloscope grid, 5-passion rack grid, hypothesis refinement conduits, matrix table, 1440p split-view Gantt layout, conferencing logbook grid. |
| `js/main.js` | JS (ESM) | 756 | 19 | Application entry point: initializes oscilloscope simulation, conferencing local persistence, and view navigation on `DOMContentLoaded`. |
| `js/navigation.js` | JS (ESM) | 2,443 | 76 | SPA router managing hash navigation (`#home`, `#post1`, `#post2`, `#post3`, `#conferencing`), view visibility switching, ARIA states, and Gantt lazy-render hook. |
| `js/oscilloscope.js` | JS (ESM) | 5,072 | 125 | Physics simulation engine: computes moment of inertia ($I$) and precession angular velocity ($\Omega_p$) for inner hub ($36\text{ mm}$) vs outer rim ($68\text{ mm}$) configurations across 1200–3600 RPM; updates SVG geometry and digital VFD readouts. |
| `js/gantt.js` | JS (ESM) | 6,000 | 190 | Master schedule Gantt module: dynamically loads Mermaid.js v10 via ESM CDN, configures custom dark phosphor theme, binds bidirectional hover highlighting between table rows and SVG bars, and handles phase filtering. |
| `js/conferencing.js` | JS (ESM) | 9,412 | 232 | Teacher conferencing log: handles CRUD operations (Add, Remove, Inline `contenteditable` note editing) with synchronous JSON persistence to `localStorage` under `ppp_conferencing_entries_v1`. |
| `ORIGINAL_REQUEST.md` | Markdown | 6,897 | 46 | Authoritative user requirements specification for the Art Deco × Streamline Moderne overhaul. |

---

## 2. Current Site Architecture Deep Dive

### 2.1 SPA Navigation & View Routing Mechanism
The site operates as a client-side Single Page Application without any page reloads or frontend routing libraries:
- **Valid Views**: Set of 5 strings: `'home'`, `'post1'`, `'post2'`, `'post3'`, `'conferencing'`.
- **View Container Element**: `<main class="workspace">` wrapping five `<section class="page-view" id="view-[key]">` elements.
- **Display Toggling**:
  - Inactive views receive `display: none` and `hidden` attribute.
  - Active view receives `.active` class (`display: block`, triggers `@keyframes powerOnFade 0.18s ease-out`) and has `hidden` removed.
- **Navigation Triggers**:
  1. Top console pushbutton keys: `.bank-btn[data-target]`
  2. Top brand nameplate: `.rack-brand[data-target="home"]` (supports `click` and `Enter`/`Space` keydown)
  3. Home bottom quick-launch cards: `.bank-card[data-nav]`
  4. Browser history and direct URLs: `window.addEventListener('hashchange')` and initial hash reading (`window.location.hash.replace('#', '')`).
- **URL Synchronization**: Updates URL hash via `history.replaceState(null, '', '#' + targetKey)` without adding redundant history stack entries.
- **Scroll Behavior**: Smooth scroll to top on view transition (`window.scrollTo({ top: 0, behavior: 'smooth' })`).
- **Post 3 Gantt Lifecycle Hook**: `initNavigation({ onEnterPost3: () => ensureGanttRendered() })` ensures the heavy Mermaid Gantt chart is rendered only when View 3 becomes visible or active, preventing zero-width SVG bounding box bugs when hidden.

### 2.2 External Dependencies & CDN Assets
The application has zero build tooling (no npm/vite/webpack). External assets are pulled purely at runtime via CDN:
1. **Google Fonts CDN**:
   - `https://fonts.googleapis.com` & `https://fonts.gstatic.com`
   - Currently loaded families in `index.html`:
     - `Chakra Petch:ital,wght@0,500;0,600;0,700;1,600`
     - `IBM Plex Sans:ital,wght@0,400;0,500;0,600;1,400`
     - `Share Tech Mono`
     - `Silkscreen:wght@400;700`
   - *Overhaul Requirement Note*: R1 requires replacing or pairing display typography with architectural Art Deco faces (`Federo` / `Syne`), bitmap readout face (`Silkscreen` / `VT323`), technical monospace (`Share Tech Mono`), and humanist body (`IBM Plex Sans`).
2. **Mermaid.js v10 ESM CDN**:
   - URL: `https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs`
   - Dynamically imported as an ES module inside `js/gantt.js`.
   - Initialized with dark theme overrides and rendered dynamically into `#gantt-container`.
3. **External Research Link**:
   - Gemini Transcript: `https://share.gemini.google/1Isc2ZbPU9xN` in Post 2 header.

### 2.3 LocalStorage Persistence Schema (`ppp_conferencing_entries_v1`)
- **Key**: `ppp_conferencing_entries_v1`
- **Data Structure**: Array of JSON objects conforming to the schema:
  ```typescript
  interface ConferenceEntry {
    id: string;        // 'conf-1', 'conf-2', or 'conf-' + timestamp
    title: string;     // e.g., 'Checkpoint 1: Topic Brainstorming & Driving Questions'
    date: string;      // e.g., 'Oct 2026', 'Nov 10, 2026'
    phase: string;     // 'Secondary Research' | 'Primary Research' | 'Deliverables'
    status: string;    // 'Scheduled' | 'In Progress' | 'Completed'
    feedback: string;  // Multi-line feedback notes from teacher
    actions: string;   // Bulleted or formatted student action items
  }
  ```
- **Operations Supported**:
  - **Load**: Reads key from `localStorage`. Falls back to `DEFAULT_CONFERENCES` (4 items) if empty or on parse failure.
  - **Add**: Drawer form collects `title`, `date`, `phase`, `status`, `feedback`, `actions`, appends new record with `id: 'conf-' + Date.now()`, serializes to JSON, re-renders.
  - **Remove**: Click on `.btn-remove-conf[data-delete-idx]`, splices array at index, serializes, re-renders.
  - **Inline Editing**: Toggling `#toggle-edit-conf-btn` enables `contenteditable="true"` on `.ms-dates` (date), `.conf-log-title` (title), and `.conf-box-text` (feedback & actions). `blur` event triggers field update and immediate `saveConferences()`.

### 2.4 Interactive Simulation Engine (`js/oscilloscope.js`)
- **Governing Physics Constants**:
  - Base rotor inertia $I_0 = 0.82 \times 10^{-4}\text{ kg}\cdot\text{m}^2$
  - Total movable mass (6× M3 screws + washers) $m = 0.036\text{ kg}$
  - Inner hub pitch radius $r_{\text{inner}} = 0.036\text{ m}$ ($36\text{ mm}$)
  - Outer rim pitch radius $r_{\text{outer}} = 0.068\text{ m}$ ($68\text{ mm}$)
  - Gravity torque lever arm $\tau = 0.048\text{ N}\cdot\text{m}$ ($M \cdot g \cdot d_{\text{pivot}}$)
- **Calculations**:
  - Added inertia: $\Delta I = m \cdot r^2$
  - Total inertia: $I = I_0 + \Delta I$ ($1.29 \times 10^{-4}\text{ kg}\cdot\text{m}^2$ inner vs $2.48 \times 10^{-4}\text{ kg}\cdot\text{m}^2$ outer)
  - Spin velocity in radians/sec: $\omega = \frac{\text{RPM} \times 2\pi}{60}$
  - Precession angular velocity: $\Omega_p = \frac{\tau}{I \cdot \omega}$
- **Hardware Controls**:
  - Segmented mass ring position: Inner Hub ($36\text{ mm}$) / Outer Rim ($68\text{ mm}$)
  - FOC spin slider: 1200 to 3600 RPM (default 2400 RPM)
- **Visual Feedback**:
  - Updates SVG vector screen: opacity of `#svg-inner-weights` vs `#svg-outer-weights`, radius indicator vector line `#svg-active-radius-line`, precession orbit ellipse radius `#svg-precession-orbit`, precession rate text `#svg-precession-rate-label`.
  - Updates digital VFD readouts: `#vfd-inertia-val`, `#vfd-precession-val`, `#rotor-rpm-readout`, `#header-rotor-val`.

---

## 3. Verbatim User Prose & Text Content Catalog

Every piece of user-authored text across all 5 views is captured below verbatim with exact character casing, punctuation, and typographical nuances.

### 3.1 Console Header & Branding
- **Nameplate Model**: `MODEL GP-2804 // INERTIAL DYNAMICS ANALYZER`
- **Nameplate Title**: `Physics Passion Project`
- **Navigation Tabs**:
  - Tab 1: `Home`
  - Tab 2: `Post 1`
  - Tab 3: `Post 2`
  - Tab 4: `Post 3`
  - Tab 5: `Conferencing`
- **VFD Header Telemetry**:
  - Cell 1 Label: `ROTOR DRIVE`
  - Cell 1 Initial Value: `2400 RPM // OUTER`
  - Cell 2 Label: `SCHEDULE SPAN`
  - Cell 2 Value: `NOV 26 - JAN 27`

---

### 3.2 View 0: Home (`#view-home`) — Benchtop Analyzer
- **VFD Sub-Tag**: `EXPERIMENTAL PHYSICS & ELECTROMECHANICAL INSTRUMENTATION`
- **Banner Heading**: `GYROSCOPIC PRECESSION & REACTION WHEEL DYNAMICS`
- **Banner Subtitle**: `Investigating how radial mass distribution governs rotational inertia (I) and precession angular velocity (Ω_p)`
- **Annunciator Status Lamps**:
  1. `FOC LOOP: ARMED`
  2. `IMU: ICM-20948`
  3. `ENC: MT6701 14-BIT`
  4. `OVERSPEED: OFF`

#### Unit 01: Experimental Thesis & Governing Mechanics
- **Module Index Tag**: `UNIT 01`
- **Module Title**: `Experimental Thesis & Governing Mechanics`
- **Module Header Right**: `MASS CONST: M = FIXED`
- **Section Heading**: `Radial Mass Shift & Precession Rate`
- **Thesis Body Prose**:
  > "This investigation measures how altering a spinning rotor's radial mass distribution changes its gyroscopic precession speed. By relocating six stainless steel machine screws and weighted washers from the inner hub ring to the outer rim of a 3D-printed reaction wheel spun at constant angular velocity, total gravitational mass (**M**) remains constant while moment of inertia (**I**) increases quadratically with radius."
- **Primary Driving Question Display**:
  - Header Tag: `PRIMARY DRIVING QUESTION // HYPOTHESIS LOCK`
  - Reference: `REF: CAND-05`
  - Verbatim Question: `"How does shifting a spinning wheel's mass toward its outer rim change how fast it precesses?"`
- **Dual Equation Counters**:
  - Channel A Label: `CH-A // MOMENT OF INERTIA`
  - Channel A Equation: `I = I_0 + Σ m_i * r_i^2`
  - Channel A Readout: `I = 2.48e-4 kg·m²`
  - Channel A Note: `Outward screw shift (Δr > 0) scales rotational inertia quadratically.`
  - Channel B Label: `CH-B // PRECESSION VELOCITY`
  - Channel B Equation: `Ω_p = τ / (I × ω)`
  - Channel B Readout: `Ω_p = 0.77 rad/s`
  - Channel B Note: `Higher inertia I at fixed spin ω yields slower precession Ω_p.`

#### CRT Scope & Oscilloscope Controls
- **Module Tag**: `CRT SCOPE`
- **Module Title**: `Dual-Channel Rotor Geometry & Precession Vector Graticule`
- **Module Header Right**: `SCALE: 10 MM/DIV`
- **Control Labels**:
  - Mass Ring Label: `M3 Mass Ring:`
  - Mass Ring Button 1: `Inner Hub (36mm)`
  - Mass Ring Button 2: `Outer Rim (68mm)`
  - Fader Label: `FOC Spin (ω):`
  - Fader Readout: `2400 RPM`
- **CRT Graticule Vector Labels**:
  - CH1 Header: `CH1 // ROTOR MASS GEOMETRY`
  - CH1 Subtitle: `OUTER RIM (r=68mm) vs INNER HUB (r=36mm)`
  - CH1 Dimension Label: `r_outer = 68mm (MAX I)` (alternates with `r_inner = 36mm (LOW I)`)
  - CH1 Footnote: `6x M3 SCREWS + WASHERS // 220KV 2804 HUB`
  - CH2 Header: `CH2 // ORTHOGONAL PRECESSION VECTORS`
  - CH2 Subtitle: `TORQUE (τ = r × Mg) → PRECESSION (Ω_p)`
  - CH2 Precession Rate: `Ω_p = 0.77 rad/s (SLOWER)` (alternates with `(FASTER)`)
  - CH2 Vector 1: `L = I * ω (SPIN)`
  - CH2 Vector 2: `F_g = M * g`
  - CH2 Vector 3: `τ = dL / dt`
  - CH2 Footnote: `TELEMETRY: ICM-20948 IMU + VIDEO TRACKING`
- **Hardware Bus Grid (4 Slots)**:
  - Bus 01: `BUS 01 // MCU` | `ESP32 + SimpleFOC` | `Closed-Loop PID Velocity`
  - Bus 02: `BUS 02 // MOTOR` | `220KV 2804 BLDC` | `SimpleFOCmini Driver`
  - Bus 03: `BUS 03 // SENSORS` | `ICM-20948 & MT6701` | `9-Axis IMU & Mag Encoder`
  - Bus 04: `BUS 04 // FRAME` | `Onshape 3D CAD` | `Modular Rim & Hub Mounts`

#### Bank Selector Cards (Home Navigation Grid)
- **Bank Card 1**:
  - Tag: `BANK 01` | `5 MODULES`
  - Heading: `Post 1 // Passions`
  - Body: `Personal background across open-source networking, custom electronics & 3D printing, audiophile DAC/IEMs, competitive gaming, and history.`
  - Footer: `SELECT BANK 01` | `OPEN MODULE →`
- **Bank Card 2**:
  - Tag: `BANK 02` | `6 CANDIDATES`
  - Heading: `Post 2 // Driving Questions`
  - Body: `Evaluation of six candidate physics investigations, AI critique summaries, and variable isolation for Gyroscopic Precession.`
  - Footer: `SELECT BANK 02` | `OPEN MODULE →`
- **Bank Card 3**:
  - Tag: `BANK 03` | `6 MILESTONES`
  - Heading: `Post 3 // Gantt Timeline`
  - Body: `1440p side-by-side milestone breakdown and Mermaid.js Gantt chart spanning Secondary Research, CAD & PID build, and Deliverables.`
  - Footer: `SELECT BANK 03` | `OPEN MODULE →`
- **Bank Card 4**:
  - Tag: `AUX LOG` | `READ / WRITE`
  - Heading: `Conferencing Log`
  - Body: `Dedicated teacher checkpoint log separate from blog posts with add, remove, and inline note editing persisted to local storage.`
  - Footer: `OPEN AUX LOG` | `OPEN MODULE →`

---

### 3.3 View 1: Post 1 (`#view-post1`) — Things I'm Passionate About
- **VFD Sub-Tag**: `BANK 01 // PERSONAL ENGINEERING & INTELLECTUAL FOUNDATIONS`
- **Banner Heading**: `POST 1 // THINGS I'M PASSIONATE ABOUT`
- **Banner Subtitle**: `Five core domains in software, custom hardware fabrication, audio electronics, competitive gaming, and history`
- **Annunciator Status Lamps**: `MODULES: 05` | `STATUS: ARCHIVED`

#### 1. Computers/Software
- **Channel Tag**: `CH 01`
- **Header Right**: `ROUTER // VPN`
- **Title**: `Computers/Software`
- **Verbatim Prose**:
  > "Programming and software is probably one of my oldest hobbies. I was introduced to it by my father who works in IT and the interest has stayed with me ever since. The ability to create and customize without the higher entry barrier of more physical fields really appeals to me. I've done tons of things over the years but recently I wanted to stop my router from bottlenecking my internet connection but the only ones which had the features I needed cost hundreds of dollars, so I bought an old computer off Facebook marketplace and I turned it into my own router for a fraction of the cost using free opensource tools. I'm also using the extra capacity on the computer to host my own vpn and media server all for free as well. To me software represents infinite possibilities accessible to anyone who puts in the time."

#### 2. Electronics
- **Channel Tag**: `CH 02`
- **Header Right**: `PCB // 3D PRINT`
- **Title**: `Electronics`
- **Verbatim Prose**:
  > "Electronics have always been a pretty significant part of my life. As such I've always been interested in how they work and what I can do to make them better. I really enjoy deepdiving into a niche to find that one product which is just right for me and if it doesn't exist I try to build it. I built my keyboard, computer, and 3d printer, and I've spent hours researching other peripherals and electronics. There's something really special about putting together something yourself and watching it turn electricity into something real and complex. It gives me a sense of accomplishment when I finish building a project that I can physically see and touch that software just can't match."

#### 3. Music
- **Channel Tag**: `CH 03`
- **Header Right**: `DAC // IEM FR`
- **Title**: `Music`
- **Verbatim Prose**:
  > "Within the past 1-2 years I've gotten a lot more into music. I've been able to find a whole bunch of smaller artists and songs I probably wouldn't have come across otherwise. I've also gotten into the hardware side of things; it's pretty interesting learning about different frequency response patterns, digital audio converters, and all the different specs there are. I've got a pretty pricey pair of openback headphones for my setup at home and a solid pair of IEMs for daily use. There's truly a world of difference between regular bluetooth earbuds and a nice pair of wired earbuds/headphones with a good DAC. I feel like being able to really experience music like this has added a lot more colour to daily life."

#### 4. Video Games
- **Channel Tag**: `CH 04`
- **Header Right**: `SKILL EXPRESSION // COMMUNITY`
- **Title**: `Video Games`
- **Verbatim Prose**:
  > "I've played videogames for as long as I can remember. I like videogames more for the people and community rather than the game itself. Since I don't play many story games the part that draws me in is the skill expression which means nothing if there's no one to share it with. Playing with and against other people while being a part of a larger community is what makes videogames worthwhile for me."

#### 5. History and Politics
- **Channel Tag**: `CH 05`
- **Header Right**: `WORLD SYSTEMS // CAUSALITY`
- **Title**: `History and Politics`
- **Verbatim Prose**:
  > "I like learning about history and politics because it's often more exiting and fantastical than fiction. Different times and places feel like completely different worlds compared to the one I live in, yet they still shape the place I go and the people I meet. The part I find cool is that all kinds of radically different events and ideas collapse into each other creating something new and unexpected which totally makes sense. Even if I mostly consume surface level knowledge Im still a little less confused about the world and I can understand others a little more which makes being here right now lot more exciting and interesting."

---

### 3.4 View 2: Post 2 (`#view-post2`) — Driving Questions & AI Evaluation Matrix
- **VFD Sub-Tag**: `BANK 02 // EXPERIMENTAL HYPOTHESIS ISOLATION`
- **Banner Heading**: `POST 2 // DRIVING QUESTIONS MATRIX`
- **Banner Subtitle**: `Comparative analysis of six candidate physics investigations and AI critique logs`
- **External Gemini Transcript ROM Link**:
  - Label: `Open Gemini Transcript Log ↗`
  - URL: `https://share.gemini.google/1Isc2ZbPU9xN`
  - Attributes: `target="_blank" rel="noopener noreferrer"`

#### Selected Topic Progression: Candidate 05 (Gyroscopic Precession) 3-Stage Refinement
- **Header Tag**: `LOCKED TARGET // CAND 05`
- **Title**: `Gyroscopic Precession — 3-Stage Question Refinement`
- **Header Right**: `INDEPENDENT: RADIUS (r) // DEPENDENT: PRECESSION (Ω_p)`
- **Stage 01**:
  - Tag: `STAGE 01 // INITIAL FORMULATION`
  - Text: `"How does varying the mass distribution of a spinning rotor affect its gyroscopic precession"`
- **Stage 02**:
  - Tag: `STAGE 02 // AI CRITIQUE SUMMARY`
  - Text: `The experimental physics is solid and directly measurable; it only required simpler, more concrete language describing the physical alteration to the rotor.`
- **Stage 03**:
  - Tag: `STAGE 03 // FINAL REFINED QUESTION`
  - Text: `"How does shifting a spinning wheel's mass toward its outer rim change how fast it precesses?"`

#### Candidate Physics Investigations (6 Topics Matrix Table)
- **Module Tag**: `MATRIX ROM`
- **Module Title**: `Candidate Physics Investigations (6 Topics)`
- **Header Right**: `REF: PPP #2 - SHEET1`
- **Table Column Headers**:
  1. `Candidate Topic`
  2. `Original Question`
  3. `AI Feedback Summary`
  4. `Final Refined Question`

| Slot | Candidate Topic | Original Question | AI Feedback Summary | Final Refined Question |
| :--- | :--- | :--- | :--- | :--- |
| **CAND 01** | Stepper Motor Dynamics | "How does rotational velocity govern the magnitude of back-EMF and regenerative braking deceleration in stepper motors." | Conflates two distinct physical phenomena (back-EMF vs. deceleration under load). Internal detent cogging also introduces confounding friction that obscures pure electromagnetic braking. | "How does the electrical resistance connected across a spinning motor affect how quickly it comes to a stop?" |
| **CAND 02** | Optical Lens Distortion | "How do computer vision algorithms mathematically correct for radial optical distortion caused lens curvature and focal length." | Frames the investigation as a software/computational review rather than a hands-on physics experiment measuring physical light paths and lens curvature directly. | "How does the curvature of a lens change the amount of radial distortion seen in a projected grid?" |
| **CAND 03** | Eddy Current Proximity Sensors | "How does material and distance affect an eddy current proximity sensors readings" | Tests two independent variables at once without a clean control group. "Readings" is ambiguous, driving the inquiry toward catalog lookup rather than hypothesis testing. | "How does a metal's electrical conductivity affect the output voltage of an eddy current sensor at a fixed distance?" |
| **CAND 04** | Acoustic Resonance & Speech Synthesis | "How does constructive and destructive interference among harmonic frequencies create synthesized voices" | Physically inaccurate premise; vocal timbre and vowel formation stem from acoustic cavity filtering and resonance (the source-filter model), not spatial wave interference. | "How does changing the shape and volume of an acoustic cavity filter a buzzing sound into distinct vowel sounds?" |
| **CAND 05 (LOCKED / SELECTED)** | Gyroscopic Precession (`✓ SELECTED`) | "How does varying the mass distribution of a spinning rotor affect its gyroscopic precession" | The experimental physics is solid and directly measurable; it only required simpler, more concrete language describing the physical alteration to the rotor. | "How does shifting a spinning wheel's mass toward its outer rim change how fast it precesses?" |
| **CAND 06** | The Kapitza Pendulum | "How does The Kapitza Pendulum work" | Too broad and expository. It lacks concrete independent and dependent variables to experimentally probe the stability boundaries of dynamic inverted balance. | "What minimum combination of vibration speed and stroke length is needed to keep an upside-down pendulum stable?" |

---

### 3.5 View 3: Post 3 (`#view-post3`) — Gantt Timeline & Milestone Breakdown
- **VFD Sub-Tag**: `BANK 03 // MASTER CHRONOLOGICAL SCHEDULE (NOV 1, 2026 – JAN 4, 2027)`
- **Banner Heading**: `POST 3 // GANTT TIMELINE & TASK BREAKDOWN`
- **Banner Subtitle**: `Synchronized 6-milestone research, CAD fabrication, PID loop tuning, and experimental trial schedule`
- **Phase Filter Buttons**:
  1. `All Phases (6)` (`data-phase-filter="all"`)
  2. `Secondary Research` (`data-phase-filter="sr"`)
  3. `Primary Research` (`data-phase-filter="pr"`)
  4. `Deliverables` (`data-phase-filter="del"`)

#### 6 Master Milestones (Left Table)
- **Module Tag**: `LOG TABLE`
- **Module Title**: `Detailed Task Breakdown & Descriptions`
- **Header Right**: `HOVER ROW TO TRACE GANTT BAR`

1. **MS-01: Initial Research & Documentation**
   - **Task ID**: `sr1`
   - **Phase**: `Secondary Research`
   - **Date Window**: `Nov 1, 2026 – Nov 6, 2026`
   - **Task Description**: `Gather pre-existing research on moment of inertia and gyroscopic precession. Review ESP32, ICM-20948 IMU, and SimpleFOCmini documentation. Complete initial secondary research steps.`
2. **MS-02: Analyze Math & Finalize Hardware**
   - **Task ID**: `sr2`
   - **Phase**: `Secondary Research`
   - **Date Window**: `Nov 7, 2026 – Nov 15, 2026`
   - **Task Description**: `Analyze the mathematical relationship between mass distribution and precession speed. Finalize hardware orders and organize experimental parameters.`
3. **MS-03: Draft CAD & 3D Printing**
   - **Task ID**: `pr1`
   - **Phase**: `Primary Research`
   - **Date Window**: `Nov 16, 2026 – Nov 22, 2026`
   - **Task Description**: `Begin primary research and physical construction. Draft the Onshape CAD files. Run 3D prints for the frame and the multiple reaction wheel variations.`
4. **MS-04: Solder, Wire & Code PID**
   - **Task ID**: `pr2`
   - **Phase**: `Primary Research`
   - **Date Window**: `Nov 23, 2026 – Dec 6, 2026`
   - **Task Description**: `Solder and wire the 220KV 2804 motors and MT6701 encoders. Tune the PID loops and conduct preliminary balancing tests.`
5. **MS-05: Precession Experiments & Video**
   - **Task ID**: `pr3`
   - **Phase**: `Primary Research`
   - **Date Window**: `Dec 7, 2026 – Dec 18, 2026`
   - **Task Description**: `Conduct the main experiments. Swap the reaction wheels, shift the machine screws and washers to the outer rim, and capture video recordings to document the changes in precession speed. Complete all physical builds and experimental trials.`
6. **MS-06: Data Analysis & Trifold Design**
   - **Task ID**: `del1`
   - **Phase**: `Deliverables`
   - **Date Window**: `Dec 19, 2026 – Jan 4, 2027`
   - **Task Description**: `Analyze the recorded video footage and telemetry data. Format findings into a presentation script and design the visual trifold. Complete the trifold and script.`

#### Mermaid.js v10 Gantt Chart Definition (Right Screen)
- **Module Tag**: `VFD PLOTTER`
- **Module Title**: `Project Schedule (Gantt Chart)`
- **Header Right**: `GRID: 7 DAYS/DIV // 65 DAYS TOTAL`
- **Exact Mermaid Definition**:
  ```mermaid
  gantt
      dateFormat  YYYY-MM-DD
      axisFormat  %b %d
      todayMarker off

      section Secondary Research
      Initial Research & Documentation :sr1, 2026-11-01, 2026-11-07
      Analyze Math & Finalize Hardware :sr2, 2026-11-07, 2026-11-16

      section Primary Research
      Draft CAD & 3D Printing          :pr1, 2026-11-16, 2026-11-23
      Solder, Wire & Code PID          :pr2, 2026-11-23, 2026-12-07
      Precession Experiments & Video   :pr3, 2026-12-07, 2026-12-19

      section Deliverables
      Data Analysis & Trifold Design   :del1, 2026-12-19, 2027-01-05
  ```

---

### 3.6 View 4: Conferencing Log (`#view-conferencing`)
- **VFD Sub-Tag**: `AUXILIARY RECORD // SEPARATE FROM BLOG POST SEQUENCE`
- **Banner Heading**: `TEACHER CONFERENCING & FEEDBACK LOG`
- **Banner Subtitle**: `Checkpoint record for logging teacher feedback, experimental adjustments, and student action items`
- **Toolbar Buttons**:
  - Edit Button: `Edit Inline Notes` (toggles to `Lock Inline Notes`)
  - Add Button: `+ Add Conference`
- **New Conference Drawer Form**:
  - Drawer Tag: `NEW TEACHER CONFERENCE RECORD`
  - Field 1: `Checkpoint / Meeting Title` (placeholder: `e.g., Checkpoint 5: Telemetry Review`)
  - Field 2: `Date Window` (placeholder: `e.g., Dec 15, 2026`)
  - Field 3: `Project Phase` (options: `Secondary Research`, `Primary Research`, `Deliverables`)
  - Field 4: `Status` (options: `Scheduled`, `In Progress`, `Completed`)
  - Field 5: `Teacher Feedback & Observations` (placeholder: `Record teacher questions, experimental critiques, and guidance...`)
  - Field 6: `Student Action Items & Next Steps` (placeholder: `List follow-up tasks or CAD/hardware adjustments...`)
  - Actions: `Cancel` | `Save Conference`
- **Empty State Text**: `No conference records logged. Press "+ Add Conference" above to create a checkpoint entry.`

#### Default Conference Entries (`DEFAULT_CONFERENCES` in `js/conferencing.js`)

1. **Checkpoint 1: Topic Brainstorming & Driving Questions**
   - **ID**: `conf-1`
   - **Date**: `Oct 2026`
   - **Phase**: `Secondary Research`
   - **Status**: `Completed`
   - **Teacher Feedback & Observations**:
     > "Reviewed the 6 candidate questions in Post 2. Stepper motor back-EMF had confounding friction from internal detent cogging, and optical lens distortion leaned too heavily toward software review. The Gyroscopic Precession topic offers the clearest independent variable (radial mass position of machine screws/washers) and directly measurable dependent variable (precession angular velocity)."
   - **Student Action Items & Next Steps**:
     > "• Finalize driving question: \"How does shifting a spinning wheel's mass toward its outer rim change how fast it precesses?\"\n• Begin literature review on moment of inertia and review ESP32 + SimpleFOCmini hardware specs."

2. **Checkpoint 2: Research Plan, BOM & Gantt Schedule Review**
   - **ID**: `conf-2`
   - **Date**: `Nov 10, 2026`
   - **Phase**: `Secondary Research`
   - **Status**: `In Progress`
   - **Teacher Feedback & Observations**:
     > "Verify that reaction wheel mass stays constant across trials when moving machine screws and washers from inner mounting holes to the outer rim so total gravitational torque remains controlled while moment of inertia (I) changes."
   - **Student Action Items & Next Steps**:
     > "• Design symmetrical inner and outer screw mounting rings in Onshape CAD.\n• Confirm 220KV 2804 brushless motor and MT6701 magnetic encoder delivery dates."

3. **Checkpoint 3: Physical Build, PID Tuning & Experimental Trials**
   - **ID**: `conf-3`
   - **Date**: `Dec 4, 2026`
   - **Phase**: `Primary Research`
   - **Status**: `Scheduled`
   - **Teacher Feedback & Observations**:
     > "Upcoming conference to inspect 3D-printed frame rigidity, closed-loop RPM stability via MT6701 encoder telemetry, and video tracking setup for measuring precession period."
   - **Student Action Items & Next Steps**:
     > "• Log motor angular velocity (ω) via serial telemetry during each precession trial.\n• Record multi-angle slow-motion video with reference protractors for accurate angular speed calculation."

4. **Checkpoint 4: Telemetry Analysis & Trifold Presentation Review**
   - **ID**: `conf-4`
   - **Date**: `Dec 22, 2026`
   - **Phase**: `Deliverables`
   - **Status**: `Scheduled`
   - **Teacher Feedback & Observations**:
     > "Final review of experimental graphs comparing theoretical vs. measured precession rates and visual layout of the project trifold."
   - **Student Action Items & Next Steps**:
     > "• Plot Precession Speed (rad/s) vs. Calculated Moment of Inertia (kg·m²).\n• Finalize presentation script and trifold diagrams."

---

## 4. Current vs. Target Requirements Delta (Overhaul Gap Analysis)

A systematic comparison between the current codebase state and the target requirements specified in `ORIGINAL_REQUEST.md`:

| Requirement Dimension | Current Codebase State | Target "Deco-Lectronic Atelier" Requirement (R1–R4) | Implementation Gap & Action Required |
| :--- | :--- | :--- | :--- |
| **Aesthetic Paradigm** | 1980s neo-retro ABS plastic instrument casing (dark greys `#14171c`, cyan `#00f0d0`, amber `#ff9f1c`). Generic rounded card borders (`8px`/`10px` radii). | **Art Deco × Streamline Moderne × 1980s Electronic Instrumentation**. Stepped ziggurat corner brackets, double-line brass/gold rules (`#d4a853`/`#b88938`), anodized slate, triple speed-line moldings, sunburst compass ticks, engraved nameplates. | Replace uniform card outlines with stepped ziggurats, speedlines, engraved brass borders, and sunburst motifs. |
| **Material Textures** | Flat radial gradients and subtle CSS dot pattern. | Procedural SVG `FractalNoise` micro-grain simulating cast crinkle-enamel iron, phenolic Bakelite, matte textured ABS, and brushed brass. Smoked-glass CRT/VFD cavities. | Create procedural SVG filters (`<feTurbulence type="fractalNoise">` + `<feColorMatrix>`) for tactile cast-iron/Bakelite texture. |
| **Typography** | `Chakra Petch`, `IBM Plex Sans`, `Share Tech Mono`, `Silkscreen`. | Architectural Art Deco display (`Federo` / `Syne`), VFD pixel readout (`Silkscreen` / `VT323`), monospace (`Share Tech Mono`), and humanist body (`IBM Plex Sans`). | Update Google Font imports in `index.html` and font-family tokens in `tokens.css` to feature `Federo` / `Syne`. |
| **Home Architecture** | 2-column bench grid (left text module, right CRT graticule module) over 4 bank cards. | **"The Gyro-Triptych Observatory"**: Commanding central circular/octagonal Art Deco Astrolabe & Vector Oscilloscope chamber flanked by asymmetric telemetry & governing-mechanics wings. | Re-architect `#view-home` layout into a grand central living schematic with asymmetric instrument flanks. |
| **Schematic Animations** | Basic SVG lines with manual slider RPM; radial weights swap opacity without physical translation; static orbit ellipse. | **4 Animated Mechanical & Signal Layers**: (1) Continuously rotating reaction-wheel rotor assembly scaled by RPM; (2) Animated radial displacement of the 6× M3 screws/washers sliding smoothly between hub ($36\text{ mm}$) and rim ($68\text{ mm}$); (3) Traveling SVG signal pulses (`stroke-dashoffset`) on circuit traces; (4) Live 3D precession orbit cone and dynamic $\vec{L}$ and $\vec{\tau}$ vectors. | Build comprehensive multi-layered SVG schematic with CSS keyframes / requestAnimationFrame for rotor spin, smooth screw translation, trace pulses, and dynamic 3D precession vector updates. |
| **Post 1 (Passions)** | Uniform 6-column grid with 5 cards (three span-2, two span-3). Standard cards. | Asymmetric **Architectural Dossier & Instrument Bay** layout with custom Art Deco + VFD technical plates; 100% verbatim text preserved. | Restructure `#view-post1` into an asymmetric dossier with staggered heights, technical plates, and architectural framing. |
| **Post 2 (Questions)** | Horizontal 3-card stage box above a standard 4-column HTML table. | Stepped Art Deco **Hypothesis Isolation Conduit** for Candidate 05, paired with a brass-ruled laboratory ledger for the 6 candidate investigations, and a mechanical ROM link to the Gemini transcript. | Restyle Post 2 into an architectural conduit with stepped progression channels and brass-ruled laboratory ledger. |
| **Post 3 (Gantt)** | Split grid (`minmax(640px, 45%) minmax(740px, 55%)`). Mermaidi.js Gantt loaded from CDN. | Side-by-side split layout on both **1080p (`1920x1080`)** and **1440p (`2560x1440`)** with zero negative SVG rect widths, zero overlapping text bounding boxes, stepped headers, phosphor bars, bidirectional hover, phase switches. | Validate and harden side-by-side split layout at both 1080p and 1440p desktop viewports; preserve all Mermaid styling and bidirectional hover. |
| **Conferencing** | Standard cards in a 2-column grid with drawer form. | **Engraved Inspection & Calibration Logbook** preserving full Add Conference, Remove, and Inline Note Editing persisted to `localStorage` (`ppp_conferencing_entries_v1`). | Re-theme conferencing cards into engraved inspection logbook sheets while maintaining 100% functional parity and data format. |

---

## 5. Interface Contract, DOM Selectors & Storage Reference

To guarantee zero regression during the static website overhaul, the following DOM identifiers, data attributes, event contracts, and storage keys must be maintained or mapped:

### 5.1 DOM Selectors & Event Contracts

| Selector | Element Type | Expected Event / Behavior | Module Owner |
| :--- | :--- | :--- | :--- |
| `.rack-brand[data-target="home"]` | Div / Button | Click, Enter/Space keydown $\to$ navigate to `#view-home` | `navigation.js` |
| `.bank-btn[data-target]` | Button (5 items) | Click $\to$ switches active page view, updates `.active`, sets `aria-selected` | `navigation.js` |
| `.bank-card[data-nav]` | Button / Card | Click $\to$ switches active page view to corresponding target | `navigation.js` |
| `#view-[home\|post1\|post2\|post3\|conferencing]` | Section | Active view toggles `.active` and removes `hidden` attribute | `navigation.js` |
| `.scope-mode-btn[data-rotor-config]` | Button (`inner` \| `outer`) | Click $\to$ updates `currentConfig`, triggers `updateSimulation()` | `oscilloscope.js` |
| `#rotor-rpm-slider` | Input range (1200–3600) | Input $\to$ updates `currentRpm`, triggers `updateSimulation()` | `oscilloscope.js` |
| `#rotor-rpm-readout` | Span | Displays current RPM text (e.g. `2400 RPM`) | `oscilloscope.js` |
| `#header-rotor-val` | Span | Displays header telemetry text (e.g. `2400 RPM // OUTER`) | `oscilloscope.js` |
| `#vfd-inertia-val` | Div | Displays inertia readout (e.g. `I = 2.48e-4 kg·m²`) | `oscilloscope.js` |
| `#vfd-precession-val` | Div | Displays precession velocity readout (e.g. `Ω_p = 0.77 rad/s`) | `oscilloscope.js` |
| `#gantt-container` | Div | Target mount for Mermaid SVG rendering | `gantt.js` |
| `.ms-row[data-task-id]` | Table Row | Hover $\to$ toggles `.highlighted` on row and `.bar-highlight` on corresponding Mermaid SVG rect | `gantt.js` |
| `.gantt-phase-btn[data-phase-filter]` | Button (`all` \| `sr` \| `pr` \| `del`) | Click $\to$ filters milestone rows and corresponding Mermaid bars | `gantt.js` |
| `#conf-cards-container` | Div | Dynamic render target for teacher conference log cards | `conferencing.js` |
| `#add-conf-btn` | Button | Opens conference creation drawer (`#new-conf-form.open`) | `conferencing.js` |
| `#cancel-conf-btn` | Button | Closes conference creation drawer | `conferencing.js` |
| `#save-conf-btn` | Button | Validates input, saves new entry to `localStorage`, re-renders | `conferencing.js` |
| `#toggle-edit-conf-btn` | Button | Toggles inline `contenteditable` state on conference cards | `conferencing.js` |
| `.btn-remove-conf[data-delete-idx]` | Button | Deletes conference record at specified index, updates `localStorage` | `conferencing.js` |
| `[contenteditable="true"]` | Date / Title / Feedback / Actions | On `blur`, captures updated text and persists to `localStorage` | `conferencing.js` |

### 5.2 LocalStorage Contract
- **Key**: `ppp_conferencing_entries_v1`
- **Integrity requirement**: Array of JSON objects. Any overhaul MUST read and write this exact key without breaking existing user data structure or field names (`id`, `title`, `date`, `phase`, `status`, `feedback`, `actions`).
