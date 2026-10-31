/* ==========================================================================
   GANTT MODULE // MERMAID.JS v10 RENDERER & BIDIRECTIONAL HOVER TRACE
   ========================================================================== */

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

const CHART_DEFINITION = `gantt
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

function configureMermaid() {
  if (isMermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    gantt: {
      useWidth: 1180,
      useMaxWidth: true,
      titleTopMargin: 15,
      barHeight: 48,
      barGap: 18,
      topPadding: 40,
      rightPadding: 45,
      leftPadding: 175,
      gridLineStartPadding: 20,
      fontSize: 13,
      sectionFontSize: 13,
      numberSectionStyles: 3,
      axisFormat: '%b %d',
      tickInterval: '1week'
    },
    themeVariables: {
      darkMode: true,
      background: '#060a09',
      fontFamily: 'Chakra Petch, sans-serif',
      primaryColor: '#00f0d0',
      primaryTextColor: '#060a09',
      primaryBorderColor: '#00f0d0',
      lineColor: '#153833',
      sectionBkgColor: '#091210',
      altSectionBkgColor: '#060a09',
      sectionBkgColor2: '#091210',
      taskBkgColor: '#00f0d0',
      taskBorderColor: '#00f0d0',
      taskTextColor: '#eef0f4',
      taskTextDarkColor: '#eef0f4',
      taskTextOutsideColor: '#eef0f4',
      gridColor: '#153833'
    },
    themeCSS: `
      .section0 { fill: rgba(0, 240, 208, 0.05) !important; }
      .section1 { fill: rgba(255, 159, 28, 0.05) !important; }
      .section2 { fill: rgba(46, 229, 125, 0.05) !important; }

      #sr1, #sr2 {
        fill: rgba(0, 240, 208, 0.24) !important;
        stroke: #00f0d0 !important;
        stroke-width: 2px !important;
        rx: 4px;
        ry: 4px;
        transition: filter 0.15s ease, fill 0.15s ease;
      }
      #pr1, #pr2, #pr3 {
        fill: rgba(255, 159, 28, 0.24) !important;
        stroke: #ff9f1c !important;
        stroke-width: 2px !important;
        rx: 4px;
        ry: 4px;
        transition: filter 0.15s ease, fill 0.15s ease;
      }
      #del1 {
        fill: rgba(46, 229, 125, 0.24) !important;
        stroke: #2ee57d !important;
        stroke-width: 2px !important;
        rx: 4px;
        ry: 4px;
        transition: filter 0.15s ease, fill 0.15s ease;
      }
      rect.bar-highlight {
        filter: brightness(1.45) drop-shadow(0 0 10px rgba(0, 240, 208, 0.65));
        stroke: #ffffff !important;
        stroke-width: 2.5px !important;
      }
      .taskText, .taskTextOutsideRight, .taskTextOutsideLeft {
        font-family: 'Share Tech Mono', monospace !important;
        font-weight: 600 !important;
        font-size: 13px !important;
        fill: #eef0f4 !important;
      }
      .sectionTitle {
        font-family: 'Chakra Petch', sans-serif !important;
        font-weight: 700 !important;
        fill: #00f0d0 !important;
        font-size: 12px !important;
        letter-spacing: 0.05em !important;
      }
      .grid .tick text {
        fill: #ff9f1c !important;
        font-family: 'Share Tech Mono', monospace !important;
        font-size: 12px !important;
      }
      .grid .tick line {
        stroke: #153833 !important;
        stroke-dasharray: 3, 3;
      }
      .grid path.domain {
        stroke: #1f4d46 !important;
      }
    `
  });
  isMermaidInitialized = true;
}

/**
 * Renders the Mermaid Gantt chart into #gantt-container and binds bidirectional
 * hover and phase-filter controls.
 */
export async function ensureGanttRendered() {
  const container = document.getElementById('gantt-container');
  if (!container || ganttRendered) return;

  configureMermaid();
  const { svg } = await mermaid.render('gantt-svg-' + Date.now(), CHART_DEFINITION);
  container.innerHTML = svg;
  ganttRendered = true;

  const msRows = document.querySelectorAll('.ms-row[data-task-id]');
  msRows.forEach(row => {
    const taskId = row.dataset.taskId;
    const barEl = container.querySelector(`#${taskId}`);
    if (!barEl) return;

    row.addEventListener('mouseenter', () => {
      row.classList.add('highlighted');
      barEl.classList.add('bar-highlight');
    });

    row.addEventListener('mouseleave', () => {
      row.classList.remove('highlighted');
      barEl.classList.remove('bar-highlight');
    });

    barEl.style.cursor = 'pointer';
    barEl.addEventListener('mouseenter', () => {
      row.classList.add('highlighted');
      barEl.classList.add('bar-highlight');
    });
    barEl.addEventListener('mouseleave', () => {
      row.classList.remove('highlighted');
      barEl.classList.remove('bar-highlight');
    });
  });

  // Bind tactile phase filter buttons on Post 3 if present
  const filterBtns = document.querySelectorAll('.gantt-phase-btn[data-phase-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const phase = btn.dataset.phaseFilter;
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));

      msRows.forEach(row => {
        const rowPhase = row.dataset.phaseGroup;
        const match = phase === 'all' || rowPhase === phase;
        row.style.opacity = match ? '1' : '0.32';
        const barEl = container.querySelector(`#${row.dataset.taskId}`);
        if (barEl) {
          barEl.style.opacity = match ? '1' : '0.25';
        }
      });
    });
  });
}
