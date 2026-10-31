# White-Box Adversarial Gap Analysis Report: JS Simulation & State Engines

**Agent**: Challenger 1 (`teamwork_preview_challenger_m5_1`)  
**Role**: Tier 5 White-Box Adversarial Gap Miner (JS Simulation & State Engines)  
**Milestone**: Milestone 5 Phase 2 (Adversarial Coverage Hardening & Gap Mining)  
**Target Root**: `c:\Users\ericl\random`  
**Date**: 2026-10-31  
**Verdict**: **GAPS_IDENTIFIED (Fixes Required)**

---

## 1. Observation

A deep, line-by-line white-box adversarial analysis was conducted across all JavaScript implementation modules (`js/main.js`, `js/navigation.js`, `js/oscilloscope.js`, `js/gantt.js`, `js/conferencing.js`), HTML markup (`index.html`), CSS stylesheets (`css/tokens.css`, `css/components.css`, `css/views.css`, `css/deco-ornament.css`), and the existing test suites in `tests/`.

The following specific code structures, lines, and behaviors were directly observed:

### A. Async Race Condition & URL Hash Desynchronization (`js/navigation.js:34-40`)
In `js/navigation.js`, the `switchPage` routing function implements an asynchronous wait before updating `history.replaceState`:
```javascript
// js/navigation.js:34-40
if (targetKey === 'post3' && typeof callbacks.onEnterPost3 === 'function') {
  await callbacks.onEnterPost3();
}

if (updateHash) {
  history.replaceState(null, '', `#${targetKey}`);
}
```
`callbacks.onEnterPost3()` is mapped in `js/main.js:15-17` to `ensureGanttRendered()`, which executes `mermaid.render(...)`, an asynchronous Promise taking 50–200ms. If a user clicks Post 3, and then clicks another tab (e.g. Post 1 or Home) within this window:
- First invocation `switchPage('post3', true)` suspends at `await callbacks.onEnterPost3()`.
- Second invocation `switchPage('post1', true)` executes synchronously, updates DOM views, sets `#tab-post1` active, and immediately executes `history.replaceState(null, '', '#post1')`.
- First invocation resumes upon Promise resolution and executes line 39: `history.replaceState(null, '', '#post3')`.
- Result: Active DOM view is `#view-post1`, but browser URL hash is `#post3`. A subsequent page reload (`F5`) or bookmark loads Post 3 instead of Post 1.

### B. Unhandled Non-Array / Null JSON Deserialization Crash (`js/conferencing.js:80-87`, `js/conferencing.js:97-109`)
In `js/conferencing.js`:
```javascript
// js/conferencing.js:80-87
function loadConferences() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    confEntries = saved ? JSON.parse(saved) : [...DEFAULT_CONFERENCES];
  } catch {
    confEntries = [...DEFAULT_CONFERENCES];
  }
}
```
Immediately followed by:
```javascript
// js/conferencing.js:97-109
function renderConferences() {
  if (confEntries.length === 0) { ... }
  container.innerHTML = confEntries.map((entry, idx) => `...`).join('');
```
If `localStorage` contains valid JSON that does not parse into an Array of objects (e.g. `"null"`, `"123"`, `"{}"`, `'"corrupted"'`, or `"[null]"`):
- `JSON.parse("null")` evaluates to `null` without throwing a syntax error.
- `confEntries` becomes `null`.
- In `renderConferences()`, `confEntries.length` throws `TypeError: Cannot read properties of null (reading 'length')`.
- For `"{}"` or numbers: `confEntries.map` throws `TypeError: confEntries.map is not a function`.
- For `"[null]"`: `entry.phase` throws `TypeError: Cannot read properties of null (reading 'phase')`.
- `initConferencing()` halts uncaught, leaving the Conferencing UI in an uninitialized state.
- Existing test `tests/tier2_boundaries/test_storage_corruption_fallback.js` only tested malformed JSON syntax (`'{ INVALID_JSON...'`), which threw a syntax error and masked this flaw.

### C. Unescaped Raw HTML Interpolation in Conferencing Logbook (`js/conferencing.js:107-171`)
In `js/conferencing.js`:
```javascript
// js/conferencing.js:148, 157, 165
<h3 class="conf-log-title" contenteditable="${isEditingInline}" data-field="title" data-idx="${idx}">${entry.title}</h3>
...
<div class="conf-box-text" contenteditable="${isEditingInline}" data-field="feedback" data-idx="${idx}">${entry.feedback}</div>
...
<div class="conf-box-text" contenteditable="${isEditingInline}" data-field="actions" data-idx="${idx}">${entry.actions}</div>
```
User-submitted strings via `newConfForm` or inline editing (`contenteditable`) are passed directly into template literals and assigned to `container.innerHTML = ...` without HTML entity encoding (`&amp;`, `&lt;`, `&gt;`, `&quot;`).
If student or teacher notes contain:
- Mathematical or physics inequalities (e.g. `Momentum check: r_inner < r_outer & tau = 0.048`), `< r_outer & tau = 0.048>` is parsed by the browser as an unclosed HTML element `<r_outer>`, which breaks DOM formatting and corrupts text on subsequent `innerText` readback.
- Malicious or adversarial payloads (e.g. `<img src="x" onerror="alert(1)">` or `<script>`), the browser evaluates executable elements within the document DOM context.

### D. Missing Interface Contract Event: `viewchange` (`js/navigation.js:17-43` vs `PROJECT.md:90`)
`PROJECT.md § Interface Contracts (1. Navigation ↔ Views)` explicitly specifies:
```markdown
- **Event Dispatch**:
  - Custom Event `viewchange`: dispatched on `window` with detail `{ fromView, toView }`.
```
Inspection of `js/navigation.js` confirms that no `CustomEvent('viewchange')` is constructed or dispatched on `window` at any point during `switchPage`.

### E. Switchgear Selector Defect: `massRocker` Container Receives Button Attributes (`js/oscilloscope.js:85`, `js/oscilloscope.js:219-224`)
In `js/oscilloscope.js`:
```javascript
// js/oscilloscope.js:85
const modeBtns = document.querySelectorAll('.scope-mode-btn[data-rotor-config], [data-state="inner"], [data-state="outer"]');
```
In `index.html:620`:
```html
<div id="mass-rocker" class="rocker-switch" data-state="outer" role="group" aria-label="M3 Screw Mass Ring Radial Shift">
```
Because `<div id="mass-rocker">` has attribute `data-state="outer"`, the selector `[data-state="outer"]` selects the outer enclosure `<div>` as one of the `modeBtns`.
In `updateSimulation()`:
```javascript
// js/oscilloscope.js:219-224
modeBtns.forEach(btn => {
  const cfg = btn.dataset.rotorConfig || btn.dataset.state;
  const isActive = cfg === currentConfig;
  btn.classList.toggle('active', isActive);
  btn.setAttribute('aria-pressed', String(isActive));
});
```
This applies `aria-pressed="true"` or `aria-pressed="false"` to `<div id="mass-rocker" role="group">`. Per W3C WAI-ARIA 1.2 specifications, `aria-pressed` is permitted only on toggle buttons (`role="button"`), not on container groups (`role="group"`). Additionally, clicking the enclosure attaches duplicate click listeners (from `modeBtns` and `massRocker.addEventListener`).

### F. Unrestricted Background Animation Frame Loop When View is Hidden (`js/oscilloscope.js:423-424`)
In `js/oscilloscope.js`:
```javascript
// js/oscilloscope.js:423
animationFrameId = requestAnimationFrame(renderVectorFrame);
```
`renderVectorFrame` continuously schedules itself at 60Hz/120Hz indefinitely. When the user navigates to `#post1`, `#post2`, `#post3`, or `#conferencing`, `#view-home` has `hidden = true`. The loop continues computing trigonometric orbits and mutating SVG attributes on hidden DOM nodes for the entire session.

---

## 2. Logic Chain

1. **SPA Route Desynchronization (Observation A)**:
   - Premise: `switchPage` is async and awaits `callbacks.onEnterPost3()`.
   - Observation: `history.replaceState` is called AFTER `await callbacks.onEnterPost3()`.
   - Fact: User interactions can trigger new synchronous routing calls before the awaited microtask queue finishes.
   - Inference: Rapid user clicks between `#post3` and other views trigger an out-of-order execution of `history.replaceState`. The URL hash reverts to `#post3` while the visible DOM view is `#view-post1`, creating severe state desynchronization.

2. **Conferencing Deserialization Vulnerability (Observation B)**:
   - Premise: `loadConferences()` wraps `JSON.parse` in `try...catch` under the assumption that all corrupted storage causes parse exceptions.
   - Fact: `JSON.parse("null") === null`, `JSON.parse("{}") === {}`, `JSON.parse("123") === 123`. None of these throw syntax errors.
   - Inference: `confEntries` is assigned non-array values. The subsequent call to `renderConferences()` executes `confEntries.length` or `confEntries.map()`, resulting in an uncaught `TypeError` that halts script execution and crashes the conferencing module.

3. **Conferencing DOM Injection / Sanitization Failure (Observation C)**:
   - Premise: `renderConferences()` uses `container.innerHTML = ...` with template literals `${entry.title}`, `${entry.feedback}`, and `${entry.actions}`.
   - Observation: No character escaping function exists in `js/conferencing.js`.
   - Fact: Text input containing `<`, `>`, `&`, or HTML tags is parsed as HTML markup rather than plain text.
   - Inference: Notes with mathematical inequality comparisons (e.g. `r < 68mm`) or ampersands are mangled into broken DOM tags, and malicious payloads execute within the origin context.

4. **Interface Contract Inconsistency (Observation D)**:
   - Premise: `PROJECT.md § Interface Contracts` establishes `viewchange` CustomEvent as part of the public contract of `navigation.js`.
   - Observation: `js/navigation.js` does not dispatch `viewchange`.
   - Inference: The implementation is non-compliant with its architectural interface contract.

5. **Accessibility & Event Handler Selector Leak (Observation E)**:
   - Premise: `.rocker-switch` is an enclosure `<div role="group">`, while `.rocker-paddle` are `<button role="button">`.
   - Observation: `document.querySelectorAll('.scope-mode-btn[data-rotor-config], [data-state="inner"], [data-state="outer"]')` includes `div#mass-rocker`.
   - Inference: Setting `aria-pressed` on a `role="group"` violates WAI-ARIA validation, and attaching `modeBtns` click listeners to the outer switch enclosure results in double handler execution.

---

## 3. Caveats

- **Physics & Mathematical Consistency**: The core rigid-body physics calculations in `js/oscilloscope.js` ($I_0 = 0.82\times 10^{-4}\text{ kg}\cdot\text{m}^2$, $M = 0.036\text{ kg}$, $r = 0.036\text{ m} / 0.068\text{ m}$, $\tau = 0.048\text{ N}\cdot\text{m}$, $\Omega_p = \tau / (I\omega)$, $+93.1\%$ inertia delta, $T_{\text{rot}} = 7200/\text{RPM}$) were verified and are mathematically flawless.
- **Mermaid Geometry & Clamping**: `js/gantt.js` properly implements `auditSvgGeometry`, enforcing positive width clamping ($\ge 12\text{px}$) and collision-free vertical clearances (`barHeight: 46`, `barGap: 16`, `leftPadding: 165`).
- **Command Tool Denial**: The user environment denied terminal command execution (`run_command`). Verification was conducted via static AST analysis, source code tracing, and authoring an in-tree adversarial test harness in `tests/test_adversarial_m5_challenger1.js`.

---

## 4. Conclusion

**Verdict: GAPS_IDENTIFIED (Fixes Required)**

The website implementation has achieved substantial fidelity to the design system and core physics equations, but white-box adversarial stress testing surfaces **6 concrete gaps** (3 high-priority functional gaps, 2 contract/accessibility gaps, and 1 efficiency gap):

1. **[HIGH] Navigation Async Race Condition (`js/navigation.js`)**: Delayed `history.replaceState` after `await callbacks.onEnterPost3()` causes URL hash desynchronization during rapid tab clicks.
2. **[HIGH] Conferencing Corrupted Storage Crash (`js/conferencing.js`)**: Lacks `Array.isArray()` guard, throwing uncaught `TypeError` on valid non-array JSON (`null`, `{}`, `123`, `[null]`).
3. **[HIGH] Conferencing Unescaped HTML Interpolation (`js/conferencing.js`)**: Directly interpolates unescaped text into `container.innerHTML`, causing DOM corruption on inequality symbols (`<`, `>`) and XSS exposure.
4. **[MEDIUM] Navigation Missing Contracted `viewchange` Event (`js/navigation.js`)**: Fails to dispatch `window.dispatchEvent(new CustomEvent('viewchange', ...))` specified in `PROJECT.md`.
5. **[MEDIUM] Oscilloscope Selector Defect (`js/oscilloscope.js`)**: Selects `<div id="mass-rocker" role="group">` as a mode button, applying invalid `aria-pressed` to a non-button element.
6. **[LOW] Oscilloscope Hidden RAF Loop (`js/oscilloscope.js`)**: Runs 60Hz vector calculations and SVG attribute updates continuously while `#view-home` is hidden.

---

## 5. Verification Method

To verify these findings and confirm resolution:

### A. Adversarial Test Harness Inspection
Inspect the newly authored Tier 5 adversarial stress harness:
`c:\Users\ericl\random\tests\test_adversarial_m5_challenger1.js`

### B. Automated Test Execution (When Terminal Access is Available)
Run the adversarial test runner:
```powershell
node -e "import('./tests/test_adversarial_m5_challenger1.js').then(m => console.log(JSON.stringify(m.runAdversarialAudit(), null, 2)))"
```

### C. Specific File Inspections
- Inspect `js/navigation.js:34-40`: Verify whether `history.replaceState` is called before awaiting `onEnterPost3()` or guarded with a monotonic token.
- Inspect `js/conferencing.js:80-87`: Verify whether `Array.isArray(confEntries)` is checked before calling array methods.
- Inspect `js/conferencing.js:107-171`: Verify whether dynamic string inputs are escaped before being assigned to `container.innerHTML`.
- Inspect `js/navigation.js:17-43`: Verify whether `window.dispatchEvent(new CustomEvent('viewchange', ...))` is dispatched.
- Inspect `js/oscilloscope.js:85`: Verify whether `modeBtns` selector excludes `<div id="mass-rocker">`.

### D. Invalidation Conditions
The gap findings are invalidated if:
1. `navigation.js` can be shown to handle out-of-order rapid view switches without hash mismatch under any network latency.
2. `conferencing.js` can be loaded with `localStorage.setItem('ppp_conferencing_entries_v1', 'null')` without throwing a `TypeError`.
3. `conferencing.js` can display notes containing `<r_inner < r_outer>` without parsing as an HTML element in the DOM tree.
4. `PROJECT.md` is updated to remove the requirement for the `viewchange` CustomEvent.
