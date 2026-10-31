## 2026-10-31T02:44:23Z
You are the Worker for Milestone 1 (Design System & Aesthetic Foundation) of the Physics Passion Project static website overhaul.
Your working directory is: c:\Users\ericl\random\.agents\teamwork\teamwork_preview_worker_m1\
The project root is: c:\Users\ericl\random

MANDATORY: You MUST read the authoritative user request at:
c:\Users\ericl\random\.agents\teamwork\ORIGINAL_REQUEST.md
Also read the master project plan at:
c:\Users\ericl\random\.agents\teamwork\orchestrator_1\PROJECT.md
and the detailed aesthetic specification at:
c:\Users\ericl\random\.agents\teamwork\teamwork_preview_spec_miner_survey_2\spec_deco_instrument.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Write Ownership:
You own and modify:
- `css/tokens.css`
- `css/deco-ornament.css` (create this modular stylesheet)
- `css/components.css`
- `<head>` in `index.html` (add Google Fonts link and stylesheet links, embed SVG procedural filters)
- Optional asset: `assets/grain-filters.svg` (if storing SVG filters in external file)
DO NOT modify view contents in `js/` or views-specific layout in `css/views.css` outside of referencing new component classes.

Tasks for Milestone 1:
1. Update `css/tokens.css`:
   - Define full brass/gold spectrum (`--brass-primary: #d4a853`, `--brass-deep: #b88938`, `--brass-bright: #f0c978`, `--brass-highlight: #f7df9e`, `--brass-dark: #825e22`, `--brass-glow`, etc.).
   - Define anodized slate & cast-iron chassis surfaces (`#0c0e12`, `#12151b`, `#161a22`, `#1c222c`, `#232a36`, `#2b3442`).
   - Define phenolic Bakelite resin tokens (`#110c09`, `#1c1410`, `#2a1d17`).
   - Define optical smoked-glass & VFD cavity substrates (`#050807`, `#081210`, anode mesh, scanlines).
   - Define calibrated phosphor accents: VFD Cyan (`#00f0d0`), Nixie Amber (`#ff9f1c`), CRT Emerald (`#2ee57d`), Crimson (`#ff3b5c`).
   - Define 4-tier typography variables: `--font-display: 'Federo', 'Syne', 'Cinzel', serif;`, `--font-pixel: 'Silkscreen', 'VT323', monospace;`, `--font-mono: 'Share Tech Mono', 'Consolas', monospace;`, `--font-sans: 'IBM Plex Sans', sans-serif;`.
   - Define tactile elevation, recessed well, and keycap physics shadow tokens.
2. Embed Procedural SVG Micro-Grain Filters:
   - Provide SVG filters for: `#crinkleEnamelIron` (feTurbulence 0.68, 4 octaves, feDiffuseLighting), `#phenolicBakelite` (anisotropic turbulence 0.85 0.18), `#matteABS` (stipple 0.82), `#brushedBrass` (anisotropic 0.015 0.95), and `#vfdPhosphorBloom`.
   - Provide CSS utility classes (`.tex-cast-iron`, `.tex-brushed-brass`, `.tex-bakelite`) with standalone SVG data-URI fallbacks.
3. Create `css/deco-ornament.css`:
   - Stepped Art Deco ziggurat corner brackets (`.ziggurat-bracket-frame`, `.deco-ziggurat-panel` with stepped clip-path/SVG decorators).
   - Double-line brass/gold rules (`.rule-double-brass` with `.with-diamond` center breaks).
   - Streamline Moderne triple speed-lines (`.speed-lines-horizontal` with aerodynamic lengths 100%, 82%, 56%).
   - Radial sunburst compass tick styling.
   - Engraved brass & aluminum serial nameplates (`.engraved-serial-plate`).
4. Update `css/components.css`:
   - Tactile spring-loaded keycaps (`.bank-btn`, `.tactile-action-btn`) with 2-3px mechanical depression travel, bottom shadow collapse, and phosphor LED ignition pill.
   - 3D see-saw mass-ring rocker switch (`.rocker-switch-enclosure`, `.rocker-switch` with `perspective: 400px` and `rotateY` paddles).
   - Linear brass rheostat fader (`.brass-rheostat` WebKit range slider thumb with knurled brass gradient, specular catchlight, and calibration ticks).
   - Smoked-glass VFD/CRT optical cavities (`.vfd-window`, `.crt-screen`) with scanlines and anode mesh.
5. Update `index.html` `<head>`:
   - Insert preconnected Google Fonts link loading `Federo`, `Syne:wght@700;800`, `Silkscreen:wght@400;700`, `VT323`, `Share+Tech+Mono`, `IBM+Plex+Sans:wght@400;500;600`.
   - Link `css/deco-ornament.css`.
   - Embed procedural SVG filters in a hidden `<svg>` at the top of the body or in `<head>`.
6. Verification:
   - Run local HTTP server to verify that `index.html` loads cleanly with all new stylesheets, fonts, and SVG filters with 0 console errors, 0 warnings, and 0 failed network requests.
7. Write your handoff report to `c:\Users\ericl\random\.agents\teamwork\teamwork_preview_worker_m1\handoff.md` and send a message back to the orchestrator with your results and verification details.
