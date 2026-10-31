## 2026-10-31T03:16:28Z
You are the Worker for Milestone 2 (The Gyro-Triptych Observatory Centerpiece) of the Physics Passion Project static website overhaul.
Your working directory is: c:\Users\ericl\random\.agents\teamwork\teamwork_preview_worker_m2\
The project root is: c:\Users\ericl\random

MANDATORY: You MUST read the authoritative user request at:
c:\Users\ericl\random\.agents\teamwork\ORIGINAL_REQUEST.md
Also read the master project plan at:
c:\Users\ericl\random\.agents\teamwork\orchestrator_1\PROJECT.md
and the authoritative technical specifications:
- c:\Users\ericl\random\.agents\teamwork\teamwork_preview_spec_miner_survey_3\spec_schematic_mermaid.md (§ 2: Detailed Technical Specification: R2 Homepage Schematic)
- c:\Users\ericl\random\.agents\teamwork\teamwork_preview_spec_miner_survey_2\spec_deco_instrument.md (§ 8 & § 9)

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Write Ownership:
You own and modify:
- `#view-home` in `index.html` (lines ~93–400)
- `js/oscilloscope.js`
- Home section in `css/views.css` (lines ~47–222)
DO NOT modify `js/navigation.js`, `js/gantt.js`, `js/conferencing.js`, or the other view sections in `index.html` (`#view-post1`, `#view-post2`, `#view-post3`, `#view-conferencing`).

Milestone 2 Tasks:
1. Restructure `#view-home` in `index.html` around "The Gyro-Triptych Observatory":
   - West Wing: Governing Mechanics & Experimental Thesis with stepped Art Deco ziggurat plinth, brass rules, verbatim primary driving question ("How does shifting a spinning wheel's mass toward its outer rim change how fast it precesses?"), and dual recessed VFD digital equation counters for $I$ and $\Omega_p$.
   - Central Chamber: The circular/octagonal Art Deco Astrolabe and Vector Oscilloscope chamber:
     * Layer 1: Continuously rotating reaction-wheel rotor assembly (`#rotor-spinning-assembly`), scaled dynamically by user RPM slider ($T_{\text{rot}} = 7200 / \text{RPM}$ seconds), with 6 structural spokes, brass calibration notches, radial sunburst degree ticks ($0^\circ-360^\circ$). Reduced motion disables continuous spin and displays static reference graticule.
     * Layer 2: 6× M3 stainless steel screws and washers sliding smoothly along rotating spoke tracks between inner hub ($r = 36\text{mm} \implies 44\text{px}$) and outer rim ($r = 68\text{mm} \implies 82\text{px}$) over 450ms cubic-bezier transition, altering moment of inertia $I$ from $1.29\times 10^{-4}$ to $2.48\times 10^{-4}\text{ kg}\cdot\text{m}^2$ (+93.1%) while the rotor continues to spin.
     * Layer 3: Traveling SVG signal pulses (`stroke-dashoffset` animations) flowing along 45° chamfered PCB conduits connecting ESP32 bus to BLDC hub, MT6701 encoder, and ICM-20948 IMU.
     * Layer 4: Live axonometric 3D precession orbit cone where tilted spin shaft orbits vertical precession axis at rate $\Omega_p = \tau / (I\omega)$, with real-time vector lines for angular momentum $\vec{L} = I\vec{\omega}$, orthogonal torque $\vec{\tau} = \frac{d\vec{L}}{dt}$, and downward gravity vector $\vec{F}_g = M\vec{g}$.
   - East Wing: 4-slot hardware bus telemetry (ESP32, 220KV 2804 BLDC, ICM-20948 / MT6701, Onshape CAD).
   - Bottom Flank: Tactile mechanical controls with linear brass rheostat fader (`.brass-rheostat`), 3D mass-ring rocker switch (`.rocker-switch`), and illuminated annunciator lamps.
2. Implement/update `js/oscilloscope.js`:
   - Synchronize RPM slider ($1200-3600\text{ RPM}$) with rotor spin speed, pulse speed, and orbital kinematics.
   - Implement mass-ring toggle switching state between `inner` and `outer`:
     * Calculate $I = 1.2866\times 10^{-4}\text{ kg}\cdot\text{m}^2$ (inner) vs $2.4846\times 10^{-4}\text{ kg}\cdot\text{m}^2$ (outer).
     * Update `#readout-inertia` and `#readout-precession` formatted values.
     * Animate screw translation classes `.at-inner` vs `.at-outer`.
     * Dynamically recalibrate 3D precession orbit cone semi-major axis ($R_x = 62\text{px}$ inner vs $42\text{px}$ outer) and vector lines/arrowheads in real time.
   - Listen to `prefers-reduced-motion` and suspend continuous spin when active.
3. Update `css/views.css` for Home:
   - Ensure the centerpiece chamber and asymmetric wings render with high architectural dignity, zero horizontal scroll, and clean visual balance at both 1080p and 1440p viewports.
4. Verify changes:
   - Verify that all Tier 1-4 tests in `tests/` pass with 0 errors.
5. Write your handoff report to `c:\Users\ericl\random\.agents\teamwork\teamwork_preview_worker_m2\handoff.md` and message the orchestrator when complete.
