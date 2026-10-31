## 2026-10-31T04:06:24Z
You are the Worker for Milestone 4 (Post 3 Gantt Split Layout & Mermaid.js v10) of the Physics Passion Project static website overhaul.
Your working directory is: c:\Users\ericl\random\.agents\teamwork\teamwork_preview_worker_m4\
The project root is: c:\Users\ericl\random

MANDATORY: You MUST read the authoritative user request at:
c:\Users\ericl\random\.agents\teamwork\ORIGINAL_REQUEST.md
Also read the master project plan at:
c:\Users\ericl\random\.agents\teamwork\orchestrator_1\PROJECT.md
and the technical specifications:
- c:\Users\ericl\random\.agents\teamwork\teamwork_preview_spec_miner_survey_3\spec_schematic_mermaid.md (§ 3: Detailed Technical Specification: R3 Post 3 Gantt Timeline & Split Layout)
- c:\Users\ericl\random\.agents\teamwork\teamwork_preview_explorer_survey_1\survey_codebase.md (§ 3.5: Post 3 Verbatim Milestones & Tasks)

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Write Ownership:
You own and modify ONLY:
- `#view-post3` in `index.html`
- `js/gantt.js`
- Post 3 section in `css/views.css`
STRICTLY FORBIDDEN to touch `#view-home`, `#view-post1`, `#view-post2`, `#view-conferencing`, `<head>`, `js/oscilloscope.js`, `js/navigation.js`, `js/conferencing.js`, or `tests/`.

Milestone 4 Tasks:
1. Side-by-Side Split Layout (`#view-post3` in `index.html` & `css/views.css`):
   - Layout MUST render strictly side-by-side on BOTH 1080p (1920x1080) and 1440p (2560x1440) viewports:
     * Left Column: Detailed Task Breakdown (~45% - 48% width or 1fr in CSS grid) with Art Deco stepped ziggurat cards, serial nameplates, and phosphor status indicators.
     * Right Column: Mermaid.js v10 Gantt View (~52% - 55% width or 1.15fr in CSS grid) inside a recessed smoked-glass instrument bay with phosphor grid lines.
   - Set single-column responsive collapse breakpoint to `@media (max-width: 1080px)` so that desktop viewports (1920x1080 and 2560x1440) NEVER collapse into a single column!
   - Zero horizontal scroll (`overflow-x: hidden` / balanced proportions).
2. Schedule Dates & Milestone Structure:
   - 6 project milestones spanning strictly from Nov 1, 2026 to Jan 4, 2027:
     1. Milestone 01: Secondary Research (2026-11-01 to 2026-11-14)
     2. Milestone 02: Primary Research / CAD Rig Modeling (2026-11-15 to 2026-11-29)
     3. Milestone 03: Prototype Fabrication / 3D Printing (2026-11-30 to 2026-12-13)
     4. Milestone 04: Benchtop Data Acquisition / Tachometer Logging (2026-12-14 to 2026-12-24)
     5. Milestone 05: Mathematical Analysis / Fourier & Precession Derivations (2026-12-25 to 2027-01-01)
     6. Milestone 06: Deliverables Synthesis / Video & Interactive Dossier (2027-01-02 to 2027-01-04)
   - Preserve 100% of the verbatim milestone task descriptions and deliverables from `survey_codebase.md` § 3.5.
3. Mermaid.js v10 Gantt Diagram Generation (`js/gantt.js`):
   - Dynamically generate Mermaid gantt syntax with valid syntax, valid date formats (`YYYY-MM-DD`), and strictly ascending timestamps.
   - Enforce 0 negative rect widths (`width >= 0`) and 0 overlapping text bounding boxes in rendered SVG.
   - Apply Art Deco & phosphor styling to Mermaid SVG elements (VFD cyan, amber, emerald, crimson bars, dark slate grid backgrounds, and Share Tech Mono font).
   - Implement Phase Isolation switches (buttons for `ALL`, `Secondary Research`, `Primary Research`, `Deliverables`) that dynamically filter visible milestones in both the task breakdown list and the Mermaid chart.
   - Implement Bidirectional Hover Tracing: hovering over a task card on the left highlights the corresponding gantt bar on the right, and hovering over a gantt bar highlights the task card on the left.
4. Navigation Hook:
   - Ensure `initGantt()` and `renderGantt()` handle dynamic view changes (e.g., when the user switches to `#post3` via hash navigation) without layout collapse or race conditions.
5. Verify Deliverables:
   - Verify that all Post 3 tests in `tests/` pass with 0 errors (e.g., `tests/tier1_features/test_gantt_split_and_dates.js`, `tests/tier3_combinations/test_phase_filters_and_hover_tracing.js`, `tests/tier4_scenarios/test_viewport_1080p_1440p_geometry.js`).
6. Write your handoff report to `c:\Users\ericl\random\.agents\teamwork\teamwork_preview_worker_m4\handoff.md` and message the orchestrator when complete.
