/* ==========================================================================
   GANTT MODULE // MERMAID.JS v10 RENDERER & BIDIRECTIONAL HOVER TRACE
   Post 3 Master Chronological Schedule (Nov 1, 2026 - Jan 4, 2027)
   Includes resilient dynamic Mermaid v10 loader + high-precision native SVG
   fallback plotter so the site never breaks if the CDN is unreachable.
   ========================================================================== */

let mermaidInstance = null;

export const CHART_DEFINITION = `gantt
    dateFormat  YYYY-MM-DD
    axisFormat  %b %d
    todayMarker off

    section Secondary Research
    Finalize Parts List & Hardware Orders :sr1, 2026-11-01, 2026-11-07
    Secondary Research & Math Relations   :sr2, 2026-11-07, 2026-11-16

    section Primary Research
    Draft CAD & 3D Printing               :pr1, 2026-11-06, 2026-11-23
    Solder, Wire & Code PID               :pr2, 2026-11-23, 2026-12-07
    Precession Experiments & Video        :pr3, 2026-12-07, 2026-12-19

    section Deliverables
    Data Analysis & Trifold Design        :del1, 2026-12-19, 2027-01-05
`;

let isMermaidInitialized = false;
let ganttRendered = false;
let currentPhaseFilter = 'all';

/**
 * High-precision native SVG Gantt chart matching Mermaid v10 structure and IDs
 * (#sr1, #sr2, #pr1, #pr2, #pr3, #del1) used whenever CDN is offline/blocked.
 */
function buildFallbackGanttSvg() {
  return `<svg id="gantt-fallback-svg" viewBox="0 0 1080 420" width="100%" xmlns="http://www.w3.org/2000/svg" aria-roledescription="gantt">
    <rect x="0" y="0" width="1080" height="420" fill="#070a0e"/>
    <!-- Section Bands -->
    <rect class="section section0" x="0" y="34" width="1080" height="118" fill="rgba(0, 240, 208, 0.04)"/>
    <rect class="section section1" x="0" y="152" width="1080" height="174" fill="rgba(255, 159, 28, 0.04)"/>
    <rect class="section section2" x="0" y="326" width="1080" height="62" fill="rgba(46, 229, 125, 0.04)"/>

    <!-- Vertical Week Grid Lines (Nov 01 to Jan 05 = 65 days across x=175..1030, 13.15px/day) -->
    <g class="grid">
      <line x1="175" y1="34" x2="175" y2="388" stroke="#1b2635" stroke-dasharray="4,3"/>
      <text x="175" y="408" text-anchor="middle" fill="#ff9f1c" font-family="Share Tech Mono, monospace" font-size="11">Nov 01</text>
      <line x1="267" y1="34" x2="267" y2="388" stroke="#1b2635" stroke-dasharray="4,3"/>
      <text x="267" y="408" text-anchor="middle" fill="#ff9f1c" font-family="Share Tech Mono, monospace" font-size="11">Nov 08</text>
      <line x1="359" y1="34" x2="359" y2="388" stroke="#1b2635" stroke-dasharray="4,3"/>
      <text x="359" y="408" text-anchor="middle" fill="#ff9f1c" font-family="Share Tech Mono, monospace" font-size="11">Nov 15</text>
      <line x1="451" y1="34" x2="451" y2="388" stroke="#1b2635" stroke-dasharray="4,3"/>
      <text x="451" y="408" text-anchor="middle" fill="#ff9f1c" font-family="Share Tech Mono, monospace" font-size="11">Nov 22</text>
      <line x1="543" y1="34" x2="543" y2="388" stroke="#1b2635" stroke-dasharray="4,3"/>
      <text x="543" y="408" text-anchor="middle" fill="#ff9f1c" font-family="Share Tech Mono, monospace" font-size="11">Nov 29</text>
      <line x1="635" y1="34" x2="635" y2="388" stroke="#1b2635" stroke-dasharray="4,3"/>
      <text x="635" y="408" text-anchor="middle" fill="#ff9f1c" font-family="Share Tech Mono, monospace" font-size="11">Dec 06</text>
      <line x1="727" y1="34" x2="727" y2="388" stroke="#1b2635" stroke-dasharray="4,3"/>
      <text x="727" y="408" text-anchor="middle" fill="#ff9f1c" font-family="Share Tech Mono, monospace" font-size="11">Dec 13</text>
      <line x1="819" y1="34" x2="819" y2="388" stroke="#1b2635" stroke-dasharray="4,3"/>
      <text x="819" y="408" text-anchor="middle" fill="#ff9f1c" font-family="Share Tech Mono, monospace" font-size="11">Dec 20</text>
      <line x1="911" y1="34" x2="911" y2="388" stroke="#1b2635" stroke-dasharray="4,3"/>
      <text x="911" y="408" text-anchor="middle" fill="#ff9f1c" font-family="Share Tech Mono, monospace" font-size="11">Dec 27</text>
      <line x1="1003" y1="34" x2="1003" y2="388" stroke="#1b2635" stroke-dasharray="4,3"/>
      <text x="1003" y="408" text-anchor="middle" fill="#ff9f1c" font-family="Share Tech Mono, monospace" font-size="11">Jan 03</text>
    </g>

    <!-- Section Titles -->
    <text class="sectionTitle" x="14" y="96" fill="#d4a853" font-family="Federo, sans-serif" font-weight="700" font-size="12" letter-spacing="0.06em">SECONDARY RESEARCH</text>
    <text class="sectionTitle" x="14" y="242" fill="#d4a853" font-family="Federo, sans-serif" font-weight="700" font-size="12" letter-spacing="0.06em">PRIMARY RESEARCH</text>
    <text class="sectionTitle" x="14" y="362" fill="#d4a853" font-family="Federo, sans-serif" font-weight="700" font-size="12" letter-spacing="0.06em">DELIVERABLES</text>

    <!-- Current Date Marker (Nov 06, 2026) -->
    <g class="today-marker">
      <line x1="241" y1="26" x2="241" y2="388" stroke="#00f0d0" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.75"/>
      <text x="241" y="20" text-anchor="middle" fill="#00f0d0" font-family="Share Tech Mono, monospace" font-size="10" font-weight="700" letter-spacing="0.06em">TODAY // NOV 06</text>
    </g>

    <!-- Task Bars & Non-Overlapping Labels -->
    <rect id="sr1" x="175" y="42" width="79" height="44" rx="4" ry="4" fill="rgba(0, 240, 208, 0.22)" stroke="#00f0d0" stroke-width="2"/>
    <text class="taskTextOutsideRight" x="262" y="69" fill="#eef0f4" font-family="Share Tech Mono, monospace" font-size="12" font-weight="600">Finalize Parts List &amp; Hardware Orders</text>

    <rect id="sr2" x="254" y="98" width="118" height="44" rx="4" ry="4" fill="rgba(0, 240, 208, 0.14)" stroke="#00f0d0" stroke-width="2" stroke-dasharray="5,3"/>
    <text class="taskTextOutsideRight" x="380" y="125" fill="#eef0f4" font-family="Share Tech Mono, monospace" font-size="12" font-weight="600">Secondary Research &amp; Math Relations</text>

    <rect id="pr1" x="241" y="160" width="223" height="44" rx="4" ry="4" fill="rgba(255, 159, 28, 0.22)" stroke="#ff9f1c" stroke-width="2"/>
    <text class="taskText" x="352" y="187" text-anchor="middle" fill="#eef0f4" font-family="Share Tech Mono, monospace" font-size="12" font-weight="600">Draft CAD &amp; 3D Printing</text>

    <rect id="pr2" x="464" y="216" width="184" height="44" rx="4" ry="4" fill="rgba(255, 159, 28, 0.22)" stroke="#ff9f1c" stroke-width="2"/>
    <text class="taskText" x="556" y="243" text-anchor="middle" fill="#eef0f4" font-family="Share Tech Mono, monospace" font-size="12" font-weight="600">Solder, Wire &amp; Code PID</text>

    <rect id="pr3" x="648" y="272" width="158" height="44" rx="4" ry="4" fill="rgba(255, 159, 28, 0.22)" stroke="#ff9f1c" stroke-width="2"/>
    <text class="taskTextOutsideRight" x="814" y="299" fill="#eef0f4" font-family="Share Tech Mono, monospace" font-size="12" font-weight="600">Precession Experiments &amp; Video</text>

    <rect id="del1" x="806" y="334" width="224" height="44" rx="4" ry="4" fill="rgba(46, 229, 125, 0.22)" stroke="#2ee57d" stroke-width="2"/>
    <text class="taskText" x="918" y="361" text-anchor="middle" fill="#eef0f4" font-family="Share Tech Mono, monospace" font-size="12" font-weight="600">Data Analysis &amp; Trifold Design</text>
  </svg>`;
}

/**
 * Configure Mermaid v10 Gantt rendering engine with Art Deco & phosphor styling.
 * Enforces generous vertical clearances (barHeight, barGap, leftPadding) to prevent text overlap.
 */
export function configureMermaid(mermaidLib = mermaidInstance) {
  if (isMermaidInitialized || !mermaidLib) return;
  mermaidLib.initialize({
    startOnLoad: false,
    theme: 'dark',
    gantt: {
      useWidth: 1080,
      useMaxWidth: true,
      titleTopMargin: 15,
      barHeight: 46,
      barGap: 16,
      topPadding: 38,
      rightPadding: 40,
      leftPadding: 165,
      gridLineStartPadding: 20,
      fontSize: 12,
      sectionFontSize: 13,
      numberSectionStyles: 3,
      axisFormat: '%b %d',
      tickInterval: '1week'
    },
    themeVariables: {
      darkMode: true,
      background: '#070a0e',
      fontFamily: 'Share Tech Mono, monospace',
      primaryColor: '#00f0d0',
      primaryTextColor: '#070a0e',
      primaryBorderColor: '#00f0d0',
      lineColor: '#1a2636',
      sectionBkgColor: '#0b1017',
      altSectionBkgColor: '#070a0e',
      sectionBkgColor2: '#0b1017',
      taskBkgColor: '#00f0d0',
      taskBorderColor: '#00f0d0',
      taskTextColor: '#eef0f4',
      taskTextDarkColor: '#eef0f4',
      taskTextOutsideColor: '#eef0f4',
      gridColor: '#1a2636'
    },
    themeCSS: `
      .section0 { fill: rgba(0, 240, 208, 0.04) !important; }
      .section1 { fill: rgba(255, 159, 28, 0.04) !important; }
      .section2 { fill: rgba(46, 229, 125, 0.04) !important; }

      #sr1, #sr2 {
        fill: rgba(0, 240, 208, 0.22) !important;
        stroke: #00f0d0 !important;
        stroke-width: 2px !important;
        rx: 4px;
        ry: 4px;
        transition: filter 0.15s ease, fill 0.15s ease, opacity 0.2s ease;
      }
      #pr1, #pr2, #pr3 {
        fill: rgba(255, 159, 28, 0.22) !important;
        stroke: #ff9f1c !important;
        stroke-width: 2px !important;
        rx: 4px;
        ry: 4px;
        transition: filter 0.15s ease, fill 0.15s ease, opacity 0.2s ease;
      }
      #del1 {
        fill: rgba(46, 229, 125, 0.22) !important;
        stroke: #2ee57d !important;
        stroke-width: 2px !important;
        rx: 4px;
        ry: 4px;
        transition: filter 0.15s ease, fill 0.15s ease, opacity 0.2s ease;
      }
      rect.bar-highlight {
        filter: brightness(1.5) drop-shadow(0 0 12px rgba(0, 240, 208, 0.85)) !important;
        stroke: #ffffff !important;
        stroke-width: 2.5px !important;
      }
      #pr1.bar-highlight, #pr2.bar-highlight, #pr3.bar-highlight {
        filter: brightness(1.5) drop-shadow(0 0 12px rgba(255, 159, 28, 0.85)) !important;
        stroke: #ffffff !important;
        stroke-width: 2.5px !important;
      }
      #del1.bar-highlight {
        filter: brightness(1.5) drop-shadow(0 0 12px rgba(46, 229, 125, 0.85)) !important;
        stroke: #ffffff !important;
        stroke-width: 2.5px !important;
      }
      .taskText, .taskTextOutsideRight, .taskTextOutsideLeft {
        font-family: 'Share Tech Mono', monospace !important;
        font-weight: 600 !important;
        font-size: 12px !important;
        fill: #eef0f4 !important;
      }
      .sectionTitle {
        font-family: 'Federo', 'Syne', sans-serif !important;
        font-weight: 700 !important;
        fill: #d4a853 !important;
        font-size: 13px !important;
        letter-spacing: 0.06em !important;
        text-transform: uppercase !important;
      }
      .grid .tick text {
        fill: #ff9f1c !important;
        font-family: 'Share Tech Mono', monospace !important;
        font-size: 11px !important;
      }
      .grid .tick line {
        stroke: #1b2635 !important;
        stroke-dasharray: 4, 3;
      }
      .grid path.domain {
        stroke: #2b3a4f !important;
      }
      .dimmed-phase {
        opacity: 0.28 !important;
      }
    `
  });
  isMermaidInitialized = true;
}

/**
 * Enforces zero negative SVG rect widths across the rendered Gantt chart.
 * Clamps any non-positive or NaN widths to a minimum positive visible width.
 */
export function auditSvgGeometry(container) {
  if (!container) return;
  const rects = container.querySelectorAll('rect');
  rects.forEach(rect => {
    const w = parseFloat(rect.getAttribute('width') || '0');
    if (isNaN(w) || w <= 0) {
      rect.setAttribute('width', '12');
    }
  });
}

/**
 * Applies phase isolation filter ('all', 'sr', 'pr', 'del') across both
 * the task breakdown table rows and the rendered Mermaid Gantt bars.
 * Matching items receive 100% opacity; non-matching items dim to 28% opacity.
 */
export function applyPhaseFilter(phase) {
  currentPhaseFilter = phase || 'all';
  const container = document.getElementById('gantt-container');
  const msRows = document.querySelectorAll('.ms-row[data-task-id]');
  const filterBtns = document.querySelectorAll('.gantt-phase-btn[data-phase-filter], .phase-filter-btn[data-phase-filter]');

  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.phaseFilter === currentPhaseFilter);
  });

  msRows.forEach(row => {
    const rowPhase = row.dataset.phaseGroup;
    const match = currentPhaseFilter === 'all' || rowPhase === currentPhaseFilter;
    row.style.opacity = match ? '1' : '0.28';
    row.classList.toggle('dimmed-phase', !match);

    if (container) {
      const taskId = row.dataset.taskId;
      const barEl = container.querySelector(`#${taskId}`);
      if (barEl) {
        barEl.style.opacity = match ? '1' : '0.28';
        barEl.classList.toggle('dimmed-phase', !match);
        const childRect = barEl.querySelector('rect');
        if (childRect) {
          childRect.style.opacity = match ? '1' : '0.28';
          childRect.classList.toggle('dimmed-phase', !match);
        }
      }
    }
  });
}

/**
 * Binds bidirectional hover tracing between task breakdown table rows and Mermaid SVG bars.
 */
export function bindBidirectionalHover(container) {
  if (!container) return;
  const msRows = document.querySelectorAll('.ms-row[data-task-id]');

  msRows.forEach(row => {
    const taskId = row.dataset.taskId;
    const barEl = container.querySelector(`#${taskId}`);
    if (!barEl) return;

    const onEnter = () => {
      row.classList.add('highlighted');
      barEl.classList.add('bar-highlight');
      const childRect = barEl.tagName.toLowerCase() === 'rect' ? barEl : barEl.querySelector('rect');
      if (childRect) childRect.classList.add('bar-highlight');
    };

    const onLeave = () => {
      row.classList.remove('highlighted');
      barEl.classList.remove('bar-highlight');
      const childRect = barEl.tagName.toLowerCase() === 'rect' ? barEl : barEl.querySelector('rect');
      if (childRect) childRect.classList.remove('bar-highlight');
    };

    row.addEventListener('mouseenter', onEnter);
    row.addEventListener('mouseleave', onLeave);

    barEl.style.cursor = 'pointer';
    barEl.addEventListener('mouseenter', onEnter);
    barEl.addEventListener('mouseleave', onLeave);
  });
}

/**
 * Renders or re-renders the Mermaid Gantt chart into #gantt-container.
 * Audits geometry, binds bidirectional hover, and synchronizes phase filter.
 */
export async function renderGantt(force = false) {
  const container = document.getElementById('gantt-container');
  if (!container) return;
  if (ganttRendered && !force) return;

  // Render high-precision SVG Gantt immediately so offline/restricted browsers never show an empty panel
  container.innerHTML = buildFallbackGanttSvg();
  auditSvgGeometry(container);
  bindBidirectionalHover(container);
  applyPhaseFilter(currentPhaseFilter);
  ganttRendered = true;

  // Attempt dynamic upgrade with Mermaid v10 CDN if reachable within 2.5s
  try {
    if (!mermaidInstance) {
      const mod = await Promise.race([
        import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('CDN timeout')), 2500))
      ]);
      mermaidInstance = mod.default || mod;
    }
    if (mermaidInstance) {
      configureMermaid(mermaidInstance);
      const renderId = 'gantt-svg-' + Date.now();
      const { svg } = await mermaidInstance.render(renderId, CHART_DEFINITION);
      container.innerHTML = svg;
      auditSvgGeometry(container);
      bindBidirectionalHover(container);
      applyPhaseFilter(currentPhaseFilter);
    }
  } catch {
    // Keep high-precision fallback SVG already rendered in container
  }
}

/**
 * Primary lifecycle hook invoked by navigation.js onEnterPost3().
 */
export async function ensureGanttRendered() {
  return renderGantt(false);
}

/**
 * Binds phase-isolation buttons and initializes Gantt chart.
 */
export function initGantt() {
  const filterBtns = document.querySelectorAll('.gantt-phase-btn[data-phase-filter], .phase-filter-btn[data-phase-filter]');
  filterBtns.forEach(btn => {
    if (btn.dataset.filterBound) return;
    btn.dataset.filterBound = 'true';
    btn.addEventListener('click', () => {
      applyPhaseFilter(btn.dataset.phaseFilter);
    });
  });

  const viewPost3 = document.getElementById('view-post3');
  if (viewPost3 && !viewPost3.hidden && viewPost3.classList.contains('active')) {
    ensureGanttRendered();
  }
}

// Auto-bind phase filter buttons on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initGantt());
  } else {
    initGantt();
  }
}

export default {
  ensureGanttRendered,
  initGantt,
  renderGantt,
  applyPhaseFilter,
  configureMermaid,
  CHART_DEFINITION
};
