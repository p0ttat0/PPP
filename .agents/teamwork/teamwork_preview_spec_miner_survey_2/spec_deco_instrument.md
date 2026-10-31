# Authoritative Specification: Deco-Lectronic Atelier Design System & Modular Static Architecture
**Document Reference**: `spec_deco_instrument.md`  
**Revision**: 1.0 (Survey Phase Specification Mining)  
**Target System**: Physics Passion Project Overhaul (`c:\Users\ericl\random`)  
**Scope**: Requirements R1 (Aesthetic & Structural Overhaul) and R4 (Modular Static Architecture)

---

## 1. Executive Summary & Design System Manifesto

The **Deco-Lectronic Atelier** design system reconciles three distinct historical aesthetics into a unified, authored, non-AI-looking physical instrument:
1. **Art Deco (1925–1939)**: Stepped ziggurats, sunburst compass ticks, dual-line gold/brass rules, geometric chevron anchors, and majestic architectural typography (`Federo` / `Syne`).
2. **Streamline Moderne (1930s–1940s)**: Aerodynamic triple parallel speed-lines, continuous horizontal chrome/brass ribs, radiused bullnose capsule corners, and nautical brass instruments.
3. **1980s Neo-Retro-Futurist Electronic Instrumentation (1978–1989)**: Heavy cast crinkle-enamel chassis, compression-molded phenolic Bakelite, matte textured ABS panels, recessed smoked-glass CRT/VFD cavity displays, illuminated annunciator status lamps, and tactile electromechanical switchgear (spring-loaded keycaps with drop shadow collapse, rocker switches, linear brass rheostats).

This specification eliminates all generic SaaS/AI website conventions (uniform rounded card grids, repetitive pill badges, top-heavy SaaS hero banners, uniform spacing, and generic sans-serif typography), providing exact mathematical tokens, procedural SVG shader definitions, geometric polygon coordinates, CSS rules, and component interaction physics.

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Typography | Architectural Display Face (`Federo` / `Syne`) | Primary display typeface for instrument consoles, module titles, and banner headings. Replaces generic sans-serif `Chakra Petch`. | Google Fonts request, CSS `font-family: var(--font-display)` | Rendered Art Deco display headers with uppercase tracking | FOUT/FOIT avoided via `display=swap` and fallback to `'Cinzel', 'Trebuchet MS', serif` | `ORIGINAL_REQUEST.md` § R1, § Acceptance Criteria |
| 2 | Typography | VFD Numeric Readout Face (`Silkscreen` / `VT323`) | Bitmap/pixelated monospace display face for equation parameters, frequency, and telemetry counters. | Numeric/alphanumeric telemetry strings | Calibrated phosphor matrix characters | Fallback to `'Courier New', monospace` | `ORIGINAL_REQUEST.md` § R1, § Acceptance Criteria |
| 3 | Typography | Technical Monospace Face (`Share Tech Mono`) | Monospaced technical face for engineering notes, bus channels, table metadata, and serial plates. | System metadata strings | High-legibility monospaced labels with 0.08em letter spacing | Fallback to `'Consolas', 'Monaco', monospace` | `ORIGINAL_REQUEST.md` § R1 |
| 4 | Typography | Editorial Prose Face (`IBM Plex Sans`) | Humanist editorial body face for student project prose, research narratives, and teacher feedback. | Multiline editorial text | Crisp, readable paragraphs at 1.62 line-height | Fallback to `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | `ORIGINAL_REQUEST.md` § R1 |
| 5 | Palette | Brass & Gold Double-Line Rules | Double-line gilded division rules (`#d4a853`, `#b88938`) framing headers, consoles, and module boundaries. | CSS `.rule-double-brass`, `border-top: 3px double #d4a853` or dual-line box-shadows | Double metallic parallel lines with 2px gap | Resolves to solid 1px brass rule if browser does not render double borders | `ORIGINAL_REQUEST.md` § R1 |
| 6 | Palette | Anodized Slate & Cast-Iron Palette | Deep charcoal/slate chassis colors (`#0c0e12`, `#14181f`, `#1c222b`, `#252d3a`) simulating cast industrial equipment. | CSS custom variables `--slate-*` | Rich, non-flat dark-mode surfaces with structural contrast | Graceful fallback to dark gray `#1a1e24` | `ORIGINAL_REQUEST.md` § R1 |
| 7 | Palette | Calibrated Phosphor Emission System | Restrained emission accents for VFD Cyan (`#00f0d0`), Amber Nixie (`#ff9f1c`), Emerald CRT (`#2ee57d`), and Ruby Warning (`#ff3b5c`). | CSS tokens `--vfd-*`, element glow classes | Focused phosphor text glow with outer optical bloom | Reduced opacity when unpowered/disabled | `ORIGINAL_REQUEST.md` § R1, `tokens.css` |
| 8 | Materials | Cast Crinkle-Enamel Iron Micro-Grain | Procedural SVG `feTurbulence` / `feColorMatrix` filter simulating heavy wrinkle-finish laboratory chassis. | SVG filter `#crinkleEnamelIron` (baseFrequency 0.65, 4 octaves) | Subtle tactile crinkle texture via `mix-blend-mode: overlay` | Gracefully falls back to CSS radial noise if SVG filters unsupported | `ORIGINAL_REQUEST.md` § R1 |
| 9 | Materials | Phenolic Bakelite Micro-Grain | Procedural SVG filter simulating warm, swirled compression-molded phenolic resin. | SVG filter `#phenolicBakelite` (anisotropic baseFrequency 0.85 0.25) | Deep chocolate-amber resin texture with mold flow lines | Fallback to linear gradient `#2a1c16` to `#120d0a` | `ORIGINAL_REQUEST.md` § R1 |
| 10 | Materials | Matte Textured ABS Micro-Grain | Procedural SVG filter simulating 1980s injection-molded stippled matte plastic. | SVG filter `#matteABS` (baseFrequency 0.75, 3 octaves) | Uniform micro-grain housing finish | Fallback to solid ABS color | `ORIGINAL_REQUEST.md` § R1 |
| 11 | Materials | Brushed Brass Trim & Bezel Lustre | Procedural directional noise combined with multi-stop linear gradient simulating brushed metallic bezels. | SVG filter `#brushedBrass` (baseFrequency 0.01 0.9) | Anisotropic brushed grain with specular metallic sheen | Fallback to CSS metallic gradient | `ORIGINAL_REQUEST.md` § R1 |
| 12 | Materials | Recessed Smoked-Glass CRT/VFD Cavities | Multi-layered inner shadows, optical anode mesh grid, scanlines, and curved faceplate reflection. | CSS class `.vfd-window`, `.crt-screen` | Deep optical instrument display well with cathode glow | Fallback to solid dark background `#060a09` | `ORIGINAL_REQUEST.md` § R1, `components.css` |
| 13 | Ornamentation | Stepped Art Deco Ziggurat Corner Brackets | Geometrical stepped corner brackets (3-tier stepped terraces) anchoring panels, modules, and hero containers. | CSS `clip-path: polygon(...)` or SVG corner decorators | Distinctive architectural Art Deco corner geometry | Rectangular bounding box fallback if clip-path unsupported | `ORIGINAL_REQUEST.md` § R1 |
| 14 | Ornamentation | Streamline Moderne Triple Speed-Lines | Triple parallel horizontal or vertical bars with aerodynamic bullnose caps. | CSS `.speed-lines-horizontal`, `.speed-lines-vertical` | Three gleaming parallel brass/slate accent bars | Single bar fallback on narrow viewports | `ORIGINAL_REQUEST.md` § R1 |
| 15 | Ornamentation | Radial Sunburst Compass Ticks | Circular angular compass dial with 30°, 15°, and 5° radial tick marks and radiating sunburst rays. | SVG dial graticule `<g class="sunburst-ticks">` | Astrolabe/compass navigational graticule | Hidden or simplified in compact mobile viewports | `ORIGINAL_REQUEST.md` § R1, § R2 |
| 16 | Ornamentation | Engraved Brass/Aluminum Serial Plates | Beveled metal plate with recessed letter-press typography and 4× corner hex/slotted machine screws. | HTML `<div class="serial-nameplate">` | Stamped industrial identification badge | Flattened border fallback | `ORIGINAL_REQUEST.md` § R1, `components.css` |
| 17 | Tactile Controls | Spring-Loaded Keycaps with Shadow Collapse | Molded pushbutton keycaps with deep mechanical depression travel, bottom shadow collapse, and phosphor lamp ignition. | User click/tap, `:hover`, `:active`, `.active` | Keycap translates 2-3px downward, bottom shadow collapses, LED pill ignites | No animation if `prefers-reduced-motion: reduce` | `ORIGINAL_REQUEST.md` § R1, `components.css` |
| 18 | Tactile Controls | Mass-Ring Dual-Position Rocker Switch | Center-pivot rocker toggle switching reaction-wheel screws between Inner Hub (36mm) and Outer Rim (68mm). | User toggle event | 3D see-saw tilt (`rotateX` / `rotateY`), bevel lighting swap, latched state | 2D segmented button fallback | `ORIGINAL_REQUEST.md` § R1, § R2 |
| 19 | Tactile Controls | Rotary Detent Selector Switches | Knurled circular dial stepping through discrete angular detents for phase filtering or channel selection. | User click/drag or step buttons | Dial rotates to calibrated angle with detent click feedback | Standard dropdown or segmented buttons fallback | `ORIGINAL_REQUEST.md` § R1 |
| 20 | Tactile Controls | Linear Brass Rheostat Faders | Recessed longitudinal slider track with heavy knurled brass slider handle and engraved calibration tick marks. | Range input `input[type="range"].brass-rheostat` | Smooth continuous RPM adjustment (1200–3600 RPM) | Standard HTML range input fallback | `ORIGINAL_REQUEST.md` § R1, § R2 |
| 21 | Architecture | Modular Static Architecture (R4) | Pure vanilla HTML5, modular CSS, native ES modules; zero build step; zero runtime dependencies outside CDN Mermaid.js. | File system structure `index.html`, `css/`, `js/`, `assets/` | Servable over any static HTTP server with 0 console errors | Browser module loading error if file missing | `ORIGINAL_REQUEST.md` § R4 |
| 22 | Architecture | Dual-Viewport Desktop Support (1080p & 1440p) | Balanced layout proportions without text clipping or horizontal overflow on 1920×1080 and 2560×1440. | Media queries `@media (min-width: 1440px)`, fluid clamps | Side-by-side Gantt split view, asymmetric instrument bay balance | Stacks responsively below 1200px | `ORIGINAL_REQUEST.md` § Acceptance Criteria |

---

## 3. Edge Cases & Boundary Conditions

| # | Feature | Input | Observed / Specified Behavior |
|---|---------|-------|-------------------------------|
| 1 | Google Fonts Loading | Offline environment or CDN network outage | Strict fallback stack (`Federo` -> `Cinzel` -> `Trebuchet MS` -> `serif`; `Silkscreen` -> `VT323` -> `monospace`; `Share Tech Mono` -> `Consolas` -> `monospace`; `IBM Plex Sans` -> `system-ui`). Page layout remains 100% stable with zero text clipping. |
| 2 | Procedural SVG Noise | Browser with hardware acceleration disabled or low-power GPU | SVG filter overhead kept minimal by tiling small 128×128px noise patterns; CSS `will-change` applied judiciously. `feTurbulence` with fixed seeds ensures zero runtime CPU churn. |
| 3 | Spring-Loaded Keycaps | User holds mouse button down or rapidly clicks | Keycap depresses smoothly (`transform: translateY(2px)`), shadow collapses, phosphor LED ignites instantly without transition lag. On release, spring reset takes 0.08s with slight cubic-bezier overshoot. |
| 4 | Mass-Ring Rocker Switch | Rapid toggling between 36mm and 68mm states | Rocker switch state transitions cancel mid-flight cleanly; SVG rotor screw radial translation animates smoothly between $r=36\text{ mm}$ and $r=68\text{ mm}$ without detached screw coordinates. |
| 5 | Linear Rheostat Fader | User drags slider rapidly to extreme limits (1200 or 3600 RPM) | Thumb is clamped strictly within slider bounds; digital VFD readout updates synchronously; rotation speed scales smoothly without jitter. |
| 6 | 1080p Viewport (`1920×1080`) | Exact 1920px width desktop window | Workspace max-width constrained to 1780px with 32px padding, ensuring zero horizontal scrollbars (`overflow-x: hidden`). Post 3 Gantt and Task Breakdown remain side-by-side. |
| 7 | 1440p Viewport (`2560×1440`) | Exact 2560px width ultra-wide desktop window | `.view-container.wide-1440p` expands to max-width 2380px. Split-view grid allocates 45% (min 640px) to left Task table and 55% (min 740px) to right Mermaid Gantt SVG without negative widths. |
| 8 | Accessibility (`prefers-reduced-motion: reduce`) | Operating system setting enabled | Continuous rotor rotation stops or drops to static indicator; traveling signal pulses become solid illuminated circuit paths; spring-loaded keycap transitions become instantaneous. |
| 9 | High-DPI / Retina Displays (2x, 3x) | Device pixel ratio $\ge 2$ | Double-line brass rules maintain crisp 1px separation; SVG vector graticules and procedural grain render at native screen resolution without pixelation or blur. |
| 10 | Double-Line Brass Rules | Container resized to very narrow width (< 320px) | Rules contract cleanly; margin breaks collapse; no overflow created. |

---

## 4. Comprehensive Color Palette & CSS Tokens Specification

The palette is anchored in authoritative historical instrument materials: heavy cast iron, milled brass/bronze alloy, compression-molded phenolic resins, and precision gas-discharge phosphors.

### 4.1 Master Design Tokens (`css/tokens.css`)

```css
:root {
  /* ========================================================================
     1. BRASS & GILDED ALLOY SPECTRUM (ORNAMENTATION & PRECISION GAUGES)
     ======================================================================== */
  --brass-highlight:       #f7df9e;  /* Specular metallic catchlight */
  --brass-bright:          #f0c978;  /* Polished brass edge */
  --brass-primary:         #d4a853;  /* Authoritative Art Deco gold rule */
  --brass-deep:            #b88938;  /* Machined brass shadow / rule border */
  --brass-dark:            #825e22;  /* Recessed knurling groove */
  --brass-antique:         #5c4114;  /* Oxidized brass seam */
  --brass-glow:            rgba(212, 168, 83, 0.38);
  --brass-glow-soft:       rgba(212, 168, 83, 0.12);

  /* ========================================================================
     2. ANODIZED SLATE & CAST-IRON ENAMEL SURFACES (CHASSIS & CASINGS)
     ======================================================================== */
  --chassis-env-bg:        #0c0e12;  /* Deep atmospheric room ambient */
  --chassis-cast-iron:     #12151b;  /* Heavy crinkle-enamel cast iron base */
  --chassis-slate-dark:    #161a22;  /* Recessed chassis well */
  --chassis-slate-base:    #1c222c;  /* Standard modular chassis body */
  --chassis-slate-surface: #232a36;  /* Elevated module faceplate */
  --chassis-slate-lip:     #2b3442;  /* Milled beveled chamfer edge */
  --chassis-slate-accent:  #384456;  /* High-contrast dividing seam */

  --chassis-edge-highlight: rgba(255, 255, 255, 0.08);
  --chassis-edge-shadow:    rgba(0, 0, 0, 0.75);

  /* ========================================================================
     3. PHENOLIC BAKELITE & COMPRESSION RESINS (SWITCHES & KNOBS)
     ======================================================================== */
  --bakelite-dark:         #110c09;  /* Deep shadow cavity of switch */
  --bakelite-base:         #1c1410;  /* Polished brown-black phenolic resin */
  --bakelite-warm:         #2a1d17;  /* Specular amber reflection */
  --bakelite-rim:          #3d2b22;  /* Molded parting line highlight */

  /* ========================================================================
     4. OPTICAL SMOKED-GLASS & VFD / CRT CAVITY SUBSTRATES
     ======================================================================== */
  --vfd-cavity-bg:         #050807;  /* Absorptive smoked optical glass */
  --vfd-cavity-inner:      #081210;  /* Inner illuminated cavity substrate */
  --vfd-bezel-lip:         #111917;  /* Beveled optical filter retainer */
  --vfd-anode-mesh:        rgba(0, 240, 208, 0.038); /* Optical grid lines */
  --vfd-scanline:          rgba(0, 0, 0, 0.35);      /* 3px CRT raster scanlines */

  /* ========================================================================
     5. CALIBRATED PHOSPHOR & LED EMISSION ACCENTS
     ======================================================================== */
  /* VFD Cyan (Primary Telemetry & Logic Signals) */
  --vfd-cyan:              #00f0d0;
  --vfd-cyan-soft:         rgba(0, 240, 208, 0.14);
  --vfd-cyan-border:       rgba(0, 240, 208, 0.40);
  --vfd-cyan-glow:         0 0 8px rgba(0, 240, 208, 0.50);
  --vfd-cyan-bloom:        0 0 16px rgba(0, 240, 208, 0.28);

  /* Nixie / Phosphor Amber (Warning, Secondary Variables & Precession) */
  --vfd-amber:             #ff9f1c;
  --vfd-amber-soft:        rgba(255, 159, 28, 0.14);
  --vfd-amber-border:      rgba(255, 159, 28, 0.42);
  --vfd-amber-glow:        0 0 8px rgba(255, 159, 28, 0.50);
  --vfd-amber-bloom:       0 0 16px rgba(255, 159, 28, 0.28);

  /* CRT Emerald (Status Armed & Verification Targets) */
  --vfd-emerald:           #2ee57d;
  --vfd-emerald-soft:      rgba(46, 229, 125, 0.14);
  --vfd-emerald-border:    rgba(46, 229, 125, 0.40);
  --vfd-emerald-glow:      0 0 8px rgba(46, 229, 125, 0.45);

  /* Ruby / Crimson (Faults, Gravity Vector, Hazard Cutoffs) */
  --vfd-crimson:           #ff3b5c;
  --vfd-crimson-soft:      rgba(255, 59, 92, 0.14);
  --vfd-crimson-border:    rgba(255, 59, 92, 0.42);
  --vfd-crimson-glow:      0 0 8px rgba(255, 59, 92, 0.50);

  /* ========================================================================
     6. SILKSCREENED INKS & ENGRAVING METALLICS
     ======================================================================== */
  --ink-primary:           #f4edd9;  /* Parchment ivory silkscreen */
  --ink-secondary:         #b8c0cc;  /* Anodized aluminum grey */
  --ink-muted:             #758092;  /* Sub-label technical grey */
  --ink-engraved:          #465060;  /* Recessed stamp fill */
  --ink-gold:              #d4a853;  /* Gilded brass label print */

  /* ========================================================================
     7. DELIBERATE 4-TIER TYPOGRAPHY STACK
     ======================================================================== */
  --font-display:          'Federo', 'Syne', 'Cinzel', serif;
  --font-pixel:            'Silkscreen', 'VT323', 'Courier New', monospace;
  --font-mono:             'Share Tech Mono', 'Consolas', monospace;
  --font-sans:             'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  /* ========================================================================
     8. PHYSICAL TACTILE ELEVATION & INSET SHADOW TOKENS
     ======================================================================== */
  --shadow-chassis-heavy:
    0 16px 36px rgba(0, 0, 0, 0.70),
    0 4px 10px rgba(0, 0, 0, 0.50),
    inset 0 1px 0 var(--chassis-edge-highlight),
    inset 0 -1px 0 rgba(0, 0, 0, 0.85);

  --shadow-recessed-well:
    inset 0 3px 6px rgba(0, 0, 0, 0.85),
    inset 0 1px 2px rgba(0, 0, 0, 0.90),
    0 1px 0 rgba(255, 255, 255, 0.05);

  --shadow-vfd-cavity:
    inset 0 4px 14px rgba(0, 0, 0, 0.95),
    inset 0 0 28px rgba(0, 0, 0, 0.90),
    0 1px 0 rgba(255, 255, 255, 0.06);

  /* Keycap Travel Physics */
  --shadow-keycap-rest:
    0 4px 0 #090b0e,
    0 5px 8px rgba(0, 0, 0, 0.65),
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    inset 0 -1px 0 rgba(0, 0, 0, 0.50);

  --shadow-keycap-hover:
    0 4px 0 #090b0e,
    0 6px 12px rgba(0, 0, 0, 0.75),
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    inset 0 -1px 0 rgba(0, 0, 0, 0.50);

  --shadow-keycap-active:
    0 1px 0 #090b0e,
    0 2px 4px rgba(0, 0, 0, 0.50),
    inset 0 2px 5px rgba(0, 0, 0, 0.75),
    inset 0 1px 2px rgba(0, 0, 0, 0.60);

  --shadow-keycap-latched:
    0 1px 0 #090b0e,
    0 1px 2px rgba(0, 0, 0, 0.40),
    inset 0 3px 6px rgba(0, 0, 0, 0.80),
    0 0 12px rgba(0, 240, 208, 0.18);
}
```

---

## 5. Procedural SVG FractalNoise Micro-Grain Architecture

To break away from sterile flat CSS backgrounds and artificial AI web templates, the Deco-Lectronic Atelier employs **procedural SVG filters** based on `feTurbulence`, `feColorMatrix`, and `feDiffuseLighting` combined via CSS `mix-blend-mode`.

### 5.1 Procedural Filter Definitions (`assets/grain-filters.svg` or Inline SVG `<defs>`)

```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;" aria-hidden="true">
  <defs>
    <!-- ====================================================================
         1. CAST CRINKLE-ENAMEL IRON (HEAVY LABORATORY INSTRUMENT CHASSIS)
         ==================================================================== -->
    <filter id="crinkleEnamelIron" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
      <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" seed="42" result="coarseNoise"/>
      <feColorMatrix type="matrix" in="coarseNoise" result="crinkleMono"
        values="0.33 0.33 0.33 0 0
                0.33 0.33 0.33 0 0
                0.33 0.33 0.33 0 0
                0    0    0    0.09 0"/>
      <feDiffuseLighting in="coarseNoise" lighting-color="#ffffff" surfaceScale="1.4" diffuseConstant="0.8" result="lightBump">
        <feDistantLight azimuth="55" elevation="65"/>
      </feDiffuseLighting>
      <feBlend in="crinkleMono" in2="lightBump" mode="multiply" result="crinkleTex"/>
      <feComposite in="crinkleTex" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0.12" k4="0"/>
    </filter>

    <!-- ====================================================================
         2. PHENOLIC BAKELITE RESIN (SWIRLED COMPRESSION MOLDING)
         ==================================================================== -->
    <filter id="phenolicBakelite" x="0%" y="0%" width="100%" height="100%">
      <!-- Anisotropic baseFrequency creates horizontal resin flow lines -->
      <feTurbulence type="turbulence" baseFrequency="0.85 0.18" numOctaves="3" seed="17" result="flowNoise"/>
      <feColorMatrix type="matrix" in="flowNoise" result="amberSepia"
        values="0.45 0.15 0.05 0 0.10
                0.25 0.12 0.02 0 0.06
                0.10 0.05 0.01 0 0.02
                0    0    0    0.14 0"/>
      <feBlend in="SourceGraphic" in2="amberSepia" mode="overlay"/>
    </filter>

    <!-- ====================================================================
         3. MATTE TEXTURED ABS HOUSING (FINE STIPPLE)
         ==================================================================== -->
    <filter id="matteABS" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="88" result="stipple"/>
      <feColorMatrix type="matrix" in="stipple" result="absNoise"
        values="0.3 0.3 0.3 0 0
                0.3 0.3 0.3 0 0
                0.3 0.3 0.3 0 0
                0   0   0   0.06 0"/>
      <feBlend in="SourceGraphic" in2="absNoise" mode="overlay"/>
    </filter>

    <!-- ====================================================================
         4. BRUSHED BRASS TRIM & BEZEL LUSTRE (ANISOTROPIC LINEAR GRAIN)
         ==================================================================== -->
    <filter id="brushedBrass" x="0%" y="0%" width="100%" height="100%">
      <!-- Extremely low X frequency, high Y frequency simulates linear wire-brushing -->
      <feTurbulence type="fractalNoise" baseFrequency="0.015 0.95" numOctaves="2" seed="9" result="brushedGrain"/>
      <feColorMatrix type="matrix" in="brushedGrain" result="metallicGrain"
        values="0.75 0.55 0.20 0 0
                0.60 0.45 0.15 0 0
                0.20 0.15 0.05 0 0
                0    0    0    0.20 0"/>
      <feBlend in="SourceGraphic" in2="metallicGrain" mode="color-dodge"/>
    </filter>

    <!-- ====================================================================
         5. PHOSPHOR CRT / VFD BLOOM GLOW
         ==================================================================== -->
    <filter id="vfdPhosphorBloom" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.2" result="tightGlow"/>
      <feGaussianBlur stdDeviation="6.5" result="broadBloom"/>
      <feMerge>
        <feMergeNode in="broadBloom"/>
        <feMergeNode in="tightGlow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>
```

### 5.2 CSS Texture Utility Classes & Standalone SVG Data-URI Support

For maximum performance and compatibility across all desktop browsers without SVG DOM overhead, the crinkle noise is also codified into an optimized, self-contained SVG data-URI overlay:

```css
/* Procedural Background Noise Shaders */
.tex-cast-iron {
  position: relative;
  background-color: var(--chassis-cast-iron);
}

.tex-cast-iron::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 160px 160px;
  mix-blend-mode: overlay;
  border-radius: inherit;
}

.tex-brushed-brass {
  background: linear-gradient(
    135deg,
    var(--brass-dark) 0%,
    var(--brass-primary) 35%,
    var(--brass-highlight) 50%,
    var(--brass-deep) 65%,
    var(--brass-antique) 100%
  );
  position: relative;
}

.tex-brushed-brass::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0px,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px,
    transparent 3px
  );
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

---

## 6. Architectural Framing & Ornamentation Geometry

Art Deco and Streamline Moderne geometry provides structural cadence and eliminates generic SaaS borders.

### 6.1 Stepped Art Deco Ziggurat Corner Brackets

Ziggurats step inward symmetrically at 45-degree angles, creating the unmistakable stepped silhouette of 1930s industrial facades.

```
Ziggurat Geometry (Corner Step 12px x 12px total):
(0,0) ---- (12,0)
  |          |
(0,4) --- (8,4)
  |         |
(0,8) -- (4,8)
  |        |
(0,12) - (0,12)
```

#### Exact CSS Implementation Options:

**Option A: 4× Decorative SVG Corner Brackets (Recommended for Precision & Shadows)**:
```html
<div class="ziggurat-bracket-frame">
  <svg class="zig-bracket zig-tl" viewBox="0 0 24 24" fill="none">
    <path d="M0 0 H24 V4 H16 V10 H8 V18 H4 V24 H0 Z" fill="var(--brass-primary)" stroke="var(--brass-deep)" stroke-width="0.5"/>
  </svg>
  <svg class="zig-bracket zig-tr" viewBox="0 0 24 24" fill="none">
    <path d="M24 0 H0 V4 H8 V10 H16 V18 H20 V24 H24 Z" fill="var(--brass-primary)" stroke="var(--brass-deep)" stroke-width="0.5"/>
  </svg>
  <svg class="zig-bracket zig-bl" viewBox="0 0 24 24" fill="none">
    <path d="M0 24 H24 V20 H16 V14 H8 V6 H4 V0 H0 Z" fill="var(--brass-primary)" stroke="var(--brass-deep)" stroke-width="0.5"/>
  </svg>
  <svg class="zig-bracket zig-br" viewBox="0 0 24 24" fill="none">
    <path d="M24 24 H0 V20 H8 V14 H16 V6 H20 V0 H24 Z" fill="var(--brass-primary)" stroke="var(--brass-deep)" stroke-width="0.5"/>
  </svg>
  <div class="bracket-content">...</div>
</div>
```

**Option B: Pure CSS Stepped Clip-Path**:
```css
.deco-ziggurat-panel {
  clip-path: polygon(
    /* Top edge & top-right steps */
    0% 12px, 4px 12px, 4px 6px, 12px 6px, 12px 0%,
    calc(100% - 12px) 0%, calc(100% - 12px) 6px, calc(100% - 4px) 6px, calc(100% - 4px) 12px, 100% 12px,
    /* Right edge & bottom-right steps */
    100% calc(100% - 12px), calc(100% - 4px) calc(100% - 12px), calc(100% - 4px) calc(100% - 6px), calc(100% - 12px) calc(100% - 6px), calc(100% - 12px) 100%,
    /* Bottom edge & bottom-left steps */
    12px 100%, 12px calc(100% - 6px), 4px calc(100% - 6px), 4px calc(100% - 12px), 0% calc(100% - 12px)
  );
}
```

### 6.2 Double-Line Brass / Gold Rules (`#d4a853` / `#b88938`)

Rules separate functional banks and telemetry chambers.

```css
/* Authoritative Double Brass Divider */
.rule-double-brass {
  position: relative;
  height: 6px;
  width: 100%;
  border-top: 1.5px solid var(--brass-primary);
  border-bottom: 1.5px solid var(--brass-deep);
  margin: 16px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

/* Center Art Deco Diamond Break */
.rule-double-brass.with-diamond::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 10px;
  height: 10px;
  background-color: var(--brass-bright);
  border: 1px solid var(--chassis-cast-iron);
  box-shadow: 0 0 6px var(--brass-glow);
}
```

### 6.3 Streamline Moderne Triple Speed-Lines

Three parallel horizontal speed-lines with aerodynamic bullnose caps anchor the header console and module dividers.

```css
.speed-lines-horizontal {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px 0;
}

.speed-lines-horizontal .speed-line {
  display: block;
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--brass-primary) 0%, rgba(212, 168, 83, 0.3) 80%, transparent 100%);
}

.speed-lines-horizontal .speed-line:nth-child(1) { width: 100%; opacity: 1.0; }
.speed-lines-horizontal .speed-line:nth-child(2) { width: 82%;  opacity: 0.75; }
.speed-lines-horizontal .speed-line:nth-child(3) { width: 56%;  opacity: 0.45; }
```

### 6.4 Radial Sunburst Compass Ticks

A circular astronomical compass dial framing the central gyro schematic with angular division ticks:

```xml
<g class="radial-sunburst-graticule" transform="translate(340, 220)">
  <!-- Outer brass index ring -->
  <circle r="190" stroke="var(--brass-primary)" stroke-width="1.8" fill="none"/>
  <circle r="184" stroke="var(--brass-deep)" stroke-width="0.8" stroke-dasharray="2 4" fill="none"/>

  <!-- 360-degree ticks via SVG repeated transforms (0° to 330° step 30°) -->
  <line x1="0" y1="-190" x2="0" y2="-176" stroke="var(--brass-highlight)" stroke-width="2"/>
  <line x1="0" y1="-190" x2="0" y2="-181" stroke="var(--brass-deep)" stroke-width="1" transform="rotate(10)"/>
  <line x1="0" y1="-190" x2="0" y2="-181" stroke="var(--brass-deep)" stroke-width="1" transform="rotate(20)"/>
  <line x1="0" y1="-190" x2="0" y2="-176" stroke="var(--brass-primary)" stroke-width="1.5" transform="rotate(30)"/>
  <!-- ... continues for all 36 major ticks and 72 minor ticks ... -->
</g>
```

### 6.5 Engraved Brass / Aluminum Serial Nameplates

Serial nameplates present hardware specifications with physical machined character:

```css
.engraved-serial-plate {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(180deg, #241d13 0%, #15110a 100%);
  border: 1.5px solid var(--brass-deep);
  border-radius: 4px;
  padding: 6px 16px;
  box-shadow:
    inset 0 1px 1px rgba(240, 201, 120, 0.35),
    inset 0 -1px 2px rgba(0, 0, 0, 0.80),
    0 4px 10px rgba(0, 0, 0, 0.60);
  position: relative;
}

.plate-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.96rem;
  letter-spacing: 0.08em;
  color: var(--brass-bright);
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
}

.plate-serial {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--brass-highlight);
  letter-spacing: 0.14em;
}
```

---

## 7. Typography Stack & Font Loading Architecture

### 7.1 Font Hierarchy & Pairing Matrix

| Tier | Role | Primary Font | Secondary / Fallback | Open-Source Source | Typical Use Cases |
|------|------|--------------|----------------------|--------------------|-------------------|
| **Tier 1** | Architectural Display | `Federo` (400) | `Syne` (700/800), `Cinzel` | Google Fonts | Instrument Console Brand, Section Headers, Bank Cards, View Banners |
| **Tier 2** | VFD / CRT Numeric Counter | `Silkscreen` (400/700) | `VT323`, `monospace` | Google Fonts | Equations ($I, \Omega_p$), RPM Readouts, Anode Matrix Readouts, Latched Annunciators |
| **Tier 3** | Technical Monospace | `Share Tech Mono` (400) | `Consolas`, `Monaco` | Google Fonts | Bus telemetry descriptors, serial nameplates, table metadata, date tags |
| **Tier 4** | Humanist Editorial Body | `IBM Plex Sans` (400/500/600) | `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Google Fonts | Verbatim student essays (Post 1), AI critique notes (Post 2), task descriptions (Post 3), conferencing entries |

### 7.2 Optimal Font Loading Strategy (`index.html`)

To satisfy the Acceptance Criteria requirement of 0 console errors, 0 failed network requests, and rapid, flicker-free rendering, load all four faces in a single HTTP/2 multiplexed preconnected stylesheet:

```html
<!-- High-Priority Font Preconnections -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Consolidated Google Fonts Request -->
<link href="https://fonts.googleapis.com/css2?family=Federo&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Share+Tech+Mono&family=Silkscreen:wght@400;700&family=Syne:wght@700;800&family=VT323&display=swap" rel="stylesheet">
```

### 7.3 Typographic Scale & Styling Rules

```css
/* Tier 1: Architectural Art Deco Display */
h1, .hero-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.4rem, 2.2vw, 2.1rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-primary);
  line-height: 1.25;
}

h2, .module-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.1rem, 1.4vw, 1.35rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-primary);
}

/* Tier 2: Numeric VFD Phosphor Readout */
.pixel-readout {
  font-family: var(--font-pixel);
  letter-spacing: 0.04em;
  line-height: 1.3;
}

/* Tier 3: Technical Monospace */
.tech-spec {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  color: var(--ink-muted);
}

/* Tier 4: Editorial Prose */
p, .editorial-prose {
  font-family: var(--font-sans);
  font-size: 0.94rem;
  line-height: 1.66;
  color: var(--ink-secondary);
}

p strong {
  color: var(--ink-primary);
  font-weight: 600;
}
```

---

## 8. Tactile Controls & Mechanical Interaction Physics

### 8.1 Spring-Loaded Keycaps with Shadow Collapse

Standard web buttons feel weightless. In the Deco-Lectronic Atelier, keycaps possess simulated spring resistance and travel.

```css
.bank-btn,
.tactile-action-btn {
  appearance: none;
  position: relative;
  background: linear-gradient(180deg, #2b3340 0%, #1c222c 100%);
  border: 1px solid #3d485a;
  border-bottom: 2px solid #0e1217;
  border-radius: 4px;
  color: var(--ink-secondary);
  padding: 8px 18px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-keycap-rest);
  transform: translateY(0);
  transition:
    transform 0.07s cubic-bezier(0.2, 0, 0.2, 1),
    box-shadow 0.07s cubic-bezier(0.2, 0, 0.2, 1),
    background 0.12s ease,
    color 0.12s ease;
  user-select: none;
}

/* Hover: Edge highlights gleam */
.bank-btn:hover,
.tactile-action-btn:hover {
  background: linear-gradient(180deg, #343e4e 0%, #222935 100%);
  color: var(--ink-primary);
  border-color: var(--brass-primary);
  box-shadow: var(--shadow-keycap-hover);
}

/* Active: Physical Depression (3px travel) & Shadow Collapse */
.bank-btn:active,
.tactile-action-btn:active {
  transform: translateY(3px);
  box-shadow: var(--shadow-keycap-active);
  border-bottom-width: 1px;
}

/* Latched Selected State (.active) */
.bank-btn.active,
.tactile-action-btn.is-latched {
  transform: translateY(2px);
  background: linear-gradient(180deg, #14181f 0%, #1b212a 100%);
  border-color: var(--vfd-cyan-border);
  color: var(--ink-primary);
  box-shadow: var(--shadow-keycap-latched);
}

/* Embedded Phosphor Ignition LED */
.btn-led {
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background-color: #0d1115;
  border: 1px solid #080a0d;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.8);
  transition: background-color 0.12s ease, box-shadow 0.12s ease;
}

.bank-btn.active .btn-led {
  background-color: var(--vfd-cyan);
  border-color: #a5fff0;
  box-shadow: var(--vfd-cyan-glow), var(--vfd-cyan-bloom);
}
```

### 8.2 Dual-Position Mass-Ring Rocker Switch

Controls the 6× M3 screw mass displacement ($36\text{ mm}$ inner vs $68\text{ mm}$ outer).

```css
.rocker-switch-enclosure {
  display: inline-flex;
  background-color: var(--chassis-slate-dark);
  padding: 5px;
  border-radius: 5px;
  border: 1.5px solid var(--chassis-slate-lip);
  box-shadow: var(--shadow-recessed-well);
}

.rocker-switch {
  position: relative;
  display: flex;
  width: 170px;
  height: 38px;
  background: #11151c;
  border-radius: 3px;
  cursor: pointer;
  perspective: 400px;
}

.rocker-paddle {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
  transition: all 0.14s cubic-bezier(0.2, 0, 0.2, 1);
  background: linear-gradient(180deg, #252c38 0%, #181d24 100%);
  border: 1px solid #333d4e;
}

/* Inner 36mm Active: Left depressed, Right tilted up */
.rocker-switch[data-state="inner"] .paddle-inner {
  transform: rotateY(-14deg);
  background: linear-gradient(180deg, #12161c 0%, #1a2028 100%);
  color: var(--vfd-cyan);
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 240, 208, 0.15);
  border-color: var(--vfd-cyan-border);
}

.rocker-switch[data-state="inner"] .paddle-outer {
  transform: rotateY(-8deg);
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.5);
}

/* Outer 68mm Active: Right depressed, Left tilted up */
.rocker-switch[data-state="outer"] .paddle-outer {
  transform: rotateY(14deg);
  background: linear-gradient(180deg, #12161c 0%, #1a2028 100%);
  color: var(--vfd-amber);
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.8), 0 0 8px rgba(255, 159, 28, 0.15);
  border-color: var(--vfd-amber-border);
}

.rocker-switch[data-state="outer"] .paddle-inner {
  transform: rotateY(8deg);
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.5);
}
```

### 8.3 Linear Brass Rheostat Faders (RPM Control)

A mechanical fader governing rotor spin speed between 1200 and 3600 RPM.

```css
.rheostat-assembly {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--chassis-slate-dark);
  padding: 6px 14px;
  border-radius: 4px;
  border: 1px solid var(--chassis-slate-lip);
  box-shadow: var(--shadow-recessed-well);
}

/* Custom WebKit Range Slider */
input[type="range"].brass-rheostat {
  -webkit-appearance: none;
  appearance: none;
  width: 140px;
  height: 8px;
  background: #090c0f;
  border-radius: 4px;
  border: 1px solid #232b36;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.95);
  cursor: ew-resize;
  outline: none;
}

input[type="range"].brass-rheostat::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 28px;
  border-radius: 3px;
  background: linear-gradient(
    180deg,
    var(--brass-highlight) 0%,
    var(--brass-primary) 45%,
    var(--brass-deep) 70%,
    var(--brass-dark) 100%
  );
  border: 1px solid var(--brass-bright);
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.75),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  position: relative;
  transition: filter 0.12s ease;
}

input[type="range"].brass-rheostat::-webkit-slider-thumb:hover {
  filter: brightness(1.15) drop-shadow(0 0 6px var(--brass-glow));
}

input[type="range"].brass-rheostat::-webkit-slider-thumb:active {
  filter: brightness(0.95);
  transform: scale(0.97);
}
```

---

## 9. Modular Static Architecture (R4)

### 9.1 File Decomposition & Responsibilities

The codebase strictly adheres to standard static ES6 web principles with zero bundlers (`npm`, `webpack`, `vite` are strictly forbidden):

```
c:\Users\ericl\random\
├── index.html                  # Semantic HTML5 single-page application entry point
├── assets/
│   ├── favicon.svg             # Precision Art Deco compass icon
│   └── grain-filters.svg       # Standalone SVG procedural micro-grain filters (optional/linked)
├── css/
│   ├── tokens.css              # Master color, material, shadow, and typography CSS variables
│   ├── deco-ornament.css       # Ziggurat corner brackets, double brass rules, triple speed-lines, nameplates
│   ├── components.css          # Tactile switches, faders, annunciator lamps, CRT/VFD cavity styles
│   └── views.css               # Architectural view layouts, asymmetric bays, split Gantt grids, media queries
└── js/
    ├── main.js                 # App initialization, lifecycle coordination
    ├── navigation.js           # View routing, tabpanel aria sync, hashchange listener
    ├── oscilloscope.js         # Gyro-Triptych simulator, physics calculations, vector graticule updates
    ├── gantt.js                # Mermaid v10 Gantt rendering, phase filters, bidirectional hover
    └── conferencing.js         # Checkpoint log CRUD, inline note editing, localStorage persistence
```

### 9.2 Viewport Proportions & Geometric Integrity (1080p vs 1440p)

The CSS layout handles both required display viewports deterministically:
- **1080p (`1920×1080`)**:
  - Container: `max-width: 1780px; width: 100%; margin: 0 auto; padding: 20px 32px;`
  - Zero horizontal scroll (`overflow-x: hidden` on body).
  - Central homepage schematic: Centered circular astrolabe (diameter 440px) flanked by 320px telemetry wings.
  - Post 3: Side-by-side split layout: Left task table ($45\% \approx 780\text{px}$), Right Mermaid Gantt ($55\% \approx 950\text{px}$).
- **1440p (`2560×1440`)**:
  - Container `.view-container.wide-1440p`: `max-width: 2380px; width: 100%;`
  - Central homepage schematic expands to 560px diameter chamber with 420px flanking bays.
  - Post 3: Side-by-side split layout: Left task table ($42\% \approx 980\text{px}$), Right Mermaid Gantt ($58\% \approx 1350\text{px}$).
  - Clean SVG bounding boxes with $0$ negative rect widths and $0$ truncated text.

### 9.3 Accessibility & `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .rotating-rotor,
  .signal-pulse-trace {
    animation: none !important;
  }
}
```

---

## 10. Downstream Implementation Guidance & Integration Checklist

1. **Tokens (`tokens.css`)**:
   - Replace old `--font-display: 'Chakra Petch'` with `--font-display: 'Federo', 'Syne', 'Cinzel', serif;`.
   - Add all brass spectrum tokens (`--brass-primary: #d4a853`, `--brass-deep: #b88938`, etc.).
   - Insert procedural texture utility classes.
2. **HTML Header (`index.html`)**:
   - Update Google Fonts `<link>` to request `Federo`, `Syne:wght@700;800`, `Silkscreen`, `VT323`, `Share+Tech+Mono`, and `IBM+Plex+Sans`.
   - Embed the `<svg>` procedural `<filter>` definitions before `<header>` or within a dedicated SVG sprite.
3. **Framing & Ornamentation (`deco-ornament.css` / `components.css`)**:
   - Style all module containers with stepped Art Deco ziggurat brackets or `.deco-ziggurat-panel`.
   - Apply `.rule-double-brass` across header boundaries and module dividing lines.
   - Insert Streamline Moderne triple speed-lines along top navigation rack.
4. **Physical Controls (`components.css`)**:
   - Bind spring-loaded keycap travel (`translateY(2px-3px)`) and shadow collapse on `.bank-btn` and `.tactile-action-btn`.
   - Implement the `.brass-rheostat` fader styling for the RPM slider.
   - Refactor the inner/outer toggle into the 3D `.rocker-switch`.

---
*End of Authoritative Specification: Deco-Lectronic Atelier Design System & Modular Static Architecture.*
