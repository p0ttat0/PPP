# Milestone 1 Review & Adversarial Challenge Report: CSS & Component Interaction

**Reviewer**: Reviewer 2 (CSS & Component Interaction Reviewer / Adversarial Critic)  
**Milestone**: Milestone 1 (Design System & Aesthetic Foundation)  
**Target Root**: `c:\Users\ericl\random`  
**Verdict**: **REQUEST_CHANGES**  
**Integrity Assessment**: **NO INTEGRITY VIOLATION DETECTED** (Work is authentic, fully authored, and non-synthetic, but contains 2 Major and 3 Minor interaction/cross-browser defects that should be resolved in `css/components.css` and `css/deco-ornament.css` before Milestone 2 proceeds).

---

## 1. Observation

A forensic static and architectural audit of Milestone 1 deliverables was conducted across:
- `css/tokens.css` (432 lines)
- `css/deco-ornament.css` (422 lines)
- `css/components.css` (904 lines)
- `assets/grain-filters.svg` (75 lines)
- `index.html` (lines 1–150)
- `tests/tier1_features/test_tactile_controls.js`, `test_materials_and_ornament.js`, `test_typography_and_tokens.js`

### Specific Code Observations:

1. **3D Rocker Switch Fulcrum Discontinuity** (`css/components.css:485–552`):
   ```css
   485: .rocker-switch {
   486:   position: relative;
   487:   display: flex;
   488:   width: 176px;
   489:   height: 40px;
   490:   background: #0f1217;
   491:   border-radius: var(--radius-control);
   492:   cursor: pointer;
   493:   perspective: 400px;
   494:   border: 1px solid #252b36;
   495: }
   ...
   519: .rocker-switch[data-state="inner"] .paddle-inner {
   520:   transform: rotateY(-14deg);
   ...
   530: .rocker-switch[data-state="inner"] .paddle-outer {
   531:   transform: rotateY(-8deg);
   ...
   537: .rocker-switch[data-state="outer"] .paddle-outer {
   538:   transform: rotateY(14deg);
   ...
   548: .rocker-switch[data-state="outer"] .paddle-inner {
   549:   transform: rotateY(8deg);
   ```
   - Neither `.rocker-paddle`, `.paddle-inner`, nor `.paddle-outer` specifies `transform-origin`. Default CSS `transform-origin` is `50% 50% 0` (the midpoint of each 88px paddle: $x=44\text{px}$ and $x=132\text{px}$).
   - Neither `.rocker-switch` nor `.rocker-paddle` specifies `transform-style: preserve-3d`.

2. **Linear Brass Rheostat Thumb Vertical Misalignment** (`css/components.css:589–659`):
   ```css
   589: input[type="range"].brass-rheostat,
   590: input[type="range"].hardware-slider {
   591:   -webkit-appearance: none;
   592:   appearance: none;
   593:   width: 140px;
   594:   height: 8px;
   ...
   605: input[type="range"].brass-rheostat::-webkit-slider-thumb,
   606: input[type="range"].hardware-slider::-webkit-slider-thumb {
   607:   -webkit-appearance: none;
   608:   appearance: none;
   609:   width: 18px;
   610:   height: 28px;
   ...
   ```
   - Track height is $8\text{px}$. WebKit slider thumb height is $28\text{px}$.
   - No `margin-top` offset is declared on `::-webkit-slider-thumb`.

3. **Keycap Active State Box-Model Height Mutation & Flex Reflow** (`css/components.css:121, 153–157, 701–706`):
   ```css
   120:   border: 1px solid #3c485c;
   121:   border-bottom: 2px solid #0a0d11;
   ...
   153: .bank-btn:active {
   154:   transform: translateY(2.5px);
   155:   box-shadow: var(--shadow-keycap-active);
   156:   border-bottom-width: 1px;
   157: }
   ...
   701: .tactile-action-btn:active,
   702: .ext-rom-link:active {
   703:   transform: translateY(2.5px);
   704:   box-shadow: var(--shadow-keycap-active);
   705:   border-bottom-width: 1px;
   706: }
   ```
   - On `:active`, `border-bottom-width` drops from $2\text{px}$ to $1\text{px}$. The elements have no fixed `height` constraint and sit inside `.bank-switch-group` with `display: flex; align-items: center;`.
   - On `.bank-btn.active` (latched state), `border-bottom-width` is omitted, reverting to $2\text{px}$.

4. **Ineffective `box-shadow` on Clipped Ziggurat Panel** (`css/deco-ornament.css:49–64`):
   ```css
   49: .deco-ziggurat-panel {
   ...
   53:   clip-path: polygon(...);
   62:   box-shadow: var(--shadow-chassis-heavy);
   63:   padding: 20px;
   64: }
   ```
   - `clip-path` clips off all exterior pixels, rendering `box-shadow: var(--shadow-chassis-heavy)` completely invisible in browser paint pipelines.

5. **Hardcoded Background in Double-Rule Diamond Mask** (`css/deco-ornament.css:136–147`):
   ```css
   136: .rule-double-brass.with-diamond::before {
   ...
   145:   background-color: var(--chassis-env-bg);
   146:   z-index: 0;
   147: }
   ```
   - Mask cutout uses `var(--chassis-env-bg)` (`#0c0e12`), leaving an opaque dark patch when used inside chassis cards or modules that have `#1c222c`–`#232a36` backgrounds.

6. **Accessibility & Prefers-Reduced-Motion** (`css/tokens.css:419–431`):
   ```css
   419: @media (prefers-reduced-motion: reduce) {
   420:   *, *::before, *::after {
   421:     animation-duration: 0.01ms !important;
   422:     animation-iteration-count: 1 !important;
   423:     transition-duration: 0.01ms !important;
   424:     scroll-behavior: auto !important;
   425:   }
   426:   .rotating-rotor,
   427:   .signal-pulse-trace,
   428:   #rotor-spinning-assembly {
   429:     animation: none !important;
   430:   }
   431: }
   ```
   - Transitions, keycap travels, and rotor rotations are properly suppressed under `prefers-reduced-motion: reduce`.

---

## 2. Logic Chain

1. *Mechanical Realism & 3D Optics*: A physical see-saw rocker switch pivots along the central fulcrum seam dividing its two halves ($x=88\text{px}$). Because `transform-origin` defaults to `50% 50% 0`, each 88px paddle rotates around its own independent center ($x=44\text{px}$ and $x=132\text{px}$). At the center dividing seam, rotating the inner paddle by `rotateY(-14deg)` pushes its right edge toward the viewer by $+10.6\text{px}$ ($Z > 0$), while rotating the outer paddle by `rotateY(-8deg)` pushes its left edge into the screen by $-6.1\text{px}$ ($Z < 0$). This produces a $16.7\text{px}$ depth discontinuity and optical fracture at the seam where the two paddles should be continuous and coplanar.
2. *Cross-Browser WebKit Slider Specification*: In Chromium and WebKit rendering engines, styling `input[type="range"]` with `-webkit-appearance: none` resets the track to the specified height ($8\text{px}$), but positions the thumb's top edge at the track's top edge ($y=0$) unless compensated by `margin-top`. With a $28\text{px}$ thumb on an $8\text{px}$ track, the formula $\frac{h_{\text{track}} - h_{\text{thumb}}}{2} = \frac{8 - 28}{2} = -10\text{px}$ must be supplied via `margin-top: -10px;`. Without this rule, the brass rheostat handle renders noticeably sagged below the fader slot on all Chrome, Edge, and Safari viewports.
3. *Layout Stability & Composite-Only Animation*: Changing `border-bottom-width` on click (`:active`) alters the element's box-model height by $1\text{px}$. Inside a flex container with `align-items: center`, this forces the browser to recalculate flex layout (reflow) on every mousedown and mouseup, causing sub-pixel text jitter. Because `transform: translateY(2.5px)` and `box-shadow` collapse already deliver authentic mechanical depression on the GPU compositor thread with zero reflow, mutating `border-bottom-width` is an anti-pattern.
4. *CSS Paint Specification for Shadows & Clip-Paths*: W3C CSS Masking Level 1 dictates that `clip-path` defines the exact boundary outside of which nothing is painted. Consequently, an outer `box-shadow` applied directly to a clipped container is discarded. The drop shadow must instead be applied to an unclipped parent or via `filter: drop-shadow(...)`.

---

## 3. Caveats

- Runtime terminal command execution (`node tests/runner.js`) was denied by the environment permission prompt during this session. All verification was therefore performed through direct static source inspection, W3C specification compliance auditing, and mathematical coordinate/depth tracing.
- View layouts (`css/views.css`) and JavaScript simulation modules (`js/`) were deliberately not evaluated for completion, as they are explicitly assigned to Milestones 2–5.

---

## 4. Conclusion & Findings

### Verdict: **REQUEST_CHANGES**

No integrity violations were found. The worker authored substantial, high-caliber aesthetic foundations. However, the following findings must be addressed to ensure physical realism, cross-browser consistency, and zero-jitter interaction.

### Findings Breakdown

#### [Major] Finding 1: Rocker Switch Fulcrum Discontinuity & Missing 3D Context
- **Where**: `css/components.css:485-552`
- **Why**: Missing `transform-origin` causes paddles to rotate about individual midpoints, creating a $16.7\text{px}$ Z-tear at the fulcrum seam. Missing `transform-style: preserve-3d;` risks flattening 3D transforms in WebKit/Safari.
- **Suggested Fix**:
  ```css
  .rocker-switch {
    /* Add preserve-3d */
    transform-style: preserve-3d;
  }

  .paddle-inner {
    transform-origin: right center;
  }

  .paddle-outer {
    transform-origin: left center;
  }

  /* Symmetrical, continuous see-saw tilt */
  .rocker-switch[data-state="inner"] .paddle-inner {
    transform: rotateY(-12deg);
  }
  .rocker-switch[data-state="inner"] .paddle-outer {
    transform: rotateY(-12deg);
  }
  .rocker-switch[data-state="outer"] .paddle-inner {
    transform: rotateY(12deg);
  }
  .rocker-switch[data-state="outer"] .paddle-outer {
    transform: rotateY(12deg);
  }
  ```

#### [Major] Finding 2: WebKit Slider Thumb Vertical Offset
- **Where**: `css/components.css:605-628`
- **Why**: In WebKit/Blink, a $28\text{px}$ thumb on an $8\text{px}$ track requires `margin-top: -10px;` to sit centered on the track. Without it, the thumb hangs $10\text{px}$ below the fader centerline.
- **Suggested Fix**:
  ```css
  input[type="range"].brass-rheostat::-webkit-slider-thumb,
  input[type="range"].hardware-slider::-webkit-slider-thumb {
    margin-top: -10px;
  }
  ```

#### [Minor] Finding 3: Reflow on Keycap Active State
- **Where**: `css/components.css:156, 705`
- **Why**: `border-bottom-width: 1px;` mutates box height on `:active`, causing layout reflow and flex jitter.
- **Suggested Fix**:
  Remove `border-bottom-width: 1px;` from `.bank-btn:active`, `.tactile-action-btn:active`, and `.ext-rom-link:active`. The `transform: translateY(2.5px);` and `box-shadow: var(--shadow-keycap-active);` fully convey mechanical travel without layout reflow.

#### [Minor] Finding 4: Ineffective Box-Shadow on `.deco-ziggurat-panel`
- **Where**: `css/deco-ornament.css:62`
- **Why**: `box-shadow` is clipped by `clip-path: polygon(...)`.
- **Suggested Fix**:
  Apply `filter: drop-shadow(0 14px 28px rgba(0,0,0,0.75));` instead of `box-shadow` to render the shadow contour along the stepped ziggurat perimeter.

#### [Minor] Finding 5: Double-Rule Diamond Center Mask Artifact
- **Where**: `css/deco-ornament.css:145`
- **Why**: Hardcoded `background-color: var(--chassis-env-bg)` creates a dark rectangular patch when placed over lighter chassis modules.
- **Suggested Fix**:
  Change `background-color` to `inherit` or construct the divider with a flex container (`rule-half` — `diamond` — `rule-half`) to eliminate background masking entirely.

---

## 5. Verification Method

To independently verify the corrections:
1. Inspect `css/components.css`:
   - Confirm `input[type="range"].brass-rheostat::-webkit-slider-thumb` defines `margin-top: -10px;`.
   - Confirm `.paddle-inner` defines `transform-origin: right center` and `.paddle-outer` defines `transform-origin: left center` (or equivalent continuous pivot).
   - Confirm `.rocker-switch` defines `transform-style: preserve-3d;`.
   - Confirm `.bank-btn:active` and `.tactile-action-btn:active` do not alter `border-bottom-width`.
2. Inspect `css/deco-ornament.css`:
   - Confirm `.deco-ziggurat-panel` uses `filter: drop-shadow(...)` instead of clipped `box-shadow`.
   - Confirm `.rule-double-brass.with-diamond::before` uses `background-color: inherit` or flex layout.
3. Invalidation Conditions:
   - Rocker switch paddles exhibit Z-depth tearing at the center seam when toggled.
   - Range slider thumb renders below the fader track groove in Chromium/WebKit.
   - Box height changes on `:active` clicks in DevTools layout inspector.
