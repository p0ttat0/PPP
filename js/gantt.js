/* ==========================================================================
   GANTT MODULE // MERMAID.JS v10 RENDERER & BIDIRECTIONAL HOVER TRACE
   Post 3 Master Chronological Schedule (Nov 1, 2026 - Jan 4, 2027)
   ========================================================================== */

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

export const CHART_DEFINITION = `gantt
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
`;

let isMermaidInitialized = false;
let ganttRendered = false;
let currentPhaseFilter = 'all';

/**
 * Configure Mermaid v10 Gantt rendering engine with Art Deco & phosphor styling.
 * Enforces generous vertical clearances (barHeight, barGap, leftPadding) to prevent text overlap.
 */
export function configureMermaid() {
  if (isMermaidInitialized) return;
  mermaid.initialize({
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

  configureMermaid();
  try {
    const renderId = 'gantt-svg-' + Date.now();
    const { svg } = await mermaid.render(renderId, CHART_DEFINITION);
    container.innerHTML = svg;
    auditSvgGeometry(container);
    bindBidirectionalHover(container);
    applyPhaseFilter(currentPhaseFilter);
    ganttRendered = true;
  } catch (err) {
    // Graceful error handling for offline or non-browser environments
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
