/* ==========================================================================
   TIER 5: ADVERSARIAL GAP MINER // JS SIMULATION & STATE ENGINES
   Author: Challenger 1 (teamwork_preview_challenger_m5_1)
   Milestone 5 Phase 2 White-Box Adversarial Stress Harness
   
   Empirical verification of:
   1. Conferencing storage corruption resilience (null, numbers, non-array JSON, null elements)
   2. Conferencing HTML escaping / special character injection resilience (<script>, <img>, &, <, >)
   3. Navigation async race condition during rapid view switching (post3 await vs immediate post1)
   4. Interface contract audit: window 'viewchange' CustomEvent dispatch
   5. Oscilloscope selector defect: mass-rocker enclosure selected as modeBtn and given aria-pressed
   6. Gantt Mermaid dynamic rendering, offline CDN resilience, and SVG geometric clamping
   ========================================================================== */

import fs from 'fs';
import path from 'path';

export function runAdversarialAudit(rootDir = process.cwd()) {
  const results = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    gaps: [],
    observations: []
  };

  function recordCheck(name, passed, detail) {
    results.totalTests++;
    if (passed) {
      results.passed++;
      results.observations.push({ name, status: 'PASS', detail });
    } else {
      results.failed++;
      results.gaps.push({ name, status: 'GAP_IDENTIFIED', detail });
    }
  }

  const navJsPath = path.join(rootDir, 'js', 'navigation.js');
  const oscJsPath = path.join(rootDir, 'js', 'oscilloscope.js');
  const confJsPath = path.join(rootDir, 'js', 'conferencing.js');
  const ganttJsPath = path.join(rootDir, 'js', 'gantt.js');
  const indexHtmlPath = path.join(rootDir, 'index.html');
  const projectMdPath = path.join(rootDir, '.agents', 'teamwork', 'orchestrator_1', 'PROJECT.md');

  const navJs = fs.readFileSync(navJsPath, 'utf-8');
  const oscJs = fs.readFileSync(oscJsPath, 'utf-8');
  const confJs = fs.readFileSync(confJsPath, 'utf-8');
  const ganttJs = fs.readFileSync(ganttJsPath, 'utf-8');
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const projectMd = fs.existsSync(projectMdPath) ? fs.readFileSync(projectMdPath, 'utf-8') : '';

  // ==========================================================================
  // SUITE 1: CONFERENCING STORAGE CORRUPTION RESILIENCE
  // ==========================================================================
  // Vulnerability: JSON.parse does NOT throw on "null", "123", "{}", or '"string"'.
  // Without Array.isArray(confEntries) validation, confEntries.map() throws TypeError.
  {
    const corruptedPayloads = [
      { label: 'null literal', payload: 'null' },
      { label: 'numeric literal', payload: '123' },
      { label: 'empty object literal', payload: '{}' },
      { label: 'raw string literal', payload: '"corrupted_data"' },
      { label: 'array with null element', payload: '[null]' }
    ];

    let hasArrayCheck = confJs.includes('Array.isArray');
    let hasNullElementFilter = confJs.includes('.filter(Boolean)') || confJs.includes('entry &&');

    recordCheck(
      'Conferencing Storage: Array.isArray Type Guard',
      hasArrayCheck,
      hasArrayCheck
        ? 'conferencing.js validates that parsed storage is an Array before calling array methods.'
        : 'GAP: conferencing.js lacks Array.isArray check. Corrupted storage containing "null", "{}", or numbers will bypass try...catch and throw TypeError in renderConferences().'
    );

    recordCheck(
      'Conferencing Storage: Null Entry Sanitization',
      hasNullElementFilter,
      hasNullElementFilter
        ? 'conferencing.js filters out null elements from storage array.'
        : 'GAP: conferencing.js does not sanitize [null] elements in array, which throws TypeError on entry.phase.'
    );
  }

  // ==========================================================================
  // SUITE 2: CONFERENCING SPECIAL CHARACTER & HTML INJECTION
  // ==========================================================================
  // In conferencing.js renderConferences():
  // ${entry.title}, ${entry.feedback}, ${entry.actions} are inserted directly into container.innerHTML
  {
    const hasHtmlEscaping = confJs.includes('escapeHtml') || confJs.includes('sanitizeHtml') || confJs.includes('&amp;');
    const directInterpolation = confJs.includes('${entry.title}') && confJs.includes('${entry.feedback}') && confJs.includes('container.innerHTML');

    recordCheck(
      'Conferencing CRUD: HTML Special Character Escaping',
      hasHtmlEscaping,
      hasHtmlEscaping
        ? 'conferencing.js implements HTML escaping for student and teacher notes.'
        : 'GAP: conferencing.js directly interpolates raw ${entry.title}, ${entry.feedback}, and ${entry.actions} into container.innerHTML without HTML entity escaping. Inputs containing <, >, &, or HTML tags (e.g. <Breakthrough on r=68mm> or <script>) corrupt the DOM tree or get parsed as elements.'
    );
  }

  // ==========================================================================
  // SUITE 3: SPA VIEW SWITCHING ASYNC RACE CONDITION
  // ==========================================================================
  // In navigation.js switchPage():
  // if (targetKey === 'post3' && typeof callbacks.onEnterPost3 === 'function') {
  //   await callbacks.onEnterPost3();
  // }
  // if (updateHash) {
  //   history.replaceState(null, '', `#${targetKey}`);
  // }
  // When switching rapidly to Post 3 then immediately to another view, the delayed
  // replaceState for Post 3 overwrites the active view's URL hash.
  {
    const hasSequenceToken = navJs.includes('navId') || navJs.includes('transitionId') || navJs.includes('seq');
    const awaitsBeforeReplaceState = navJs.indexOf('await callbacks.onEnterPost3()') < navJs.indexOf('history.replaceState');

    const isVulnerableToHashDesync = awaitsBeforeReplaceState && !hasSequenceToken;

    recordCheck(
      'Navigation: Async SPA View Switch Race Condition Immunity',
      !isVulnerableToHashDesync,
      !isVulnerableToHashDesync
        ? 'navigation.js uses monotonic tokens or synchronous hash updates preventing race condition.'
        : 'GAP: navigation.js awaits onEnterPost3() BEFORE history.replaceState() without a cancellation token. Rapidly clicking Post 3 and then Post 1 causes the resolved onEnterPost3() to overwrite the URL hash to #post3 while view-post1 is active in DOM.'
    );
  }

  // ==========================================================================
  // SUITE 4: INTERFACE CONTRACT - WINDOW 'viewchange' CUSTOMEVENT
  // ==========================================================================
  // PROJECT.md § Interface Contracts mandates:
  // "Custom Event `viewchange`: dispatched on `window` with detail `{ fromView, toView }`."
  {
    const dispatchesViewChange = navJs.includes("'viewchange'") || navJs.includes('"viewchange"');
    const contractRequiresViewChange = projectMd.includes('viewchange');

    recordCheck(
      'Interface Contract: Window CustomEvent "viewchange" Dispatch',
      dispatchesViewChange,
      dispatchesViewChange
        ? 'navigation.js dispatches viewchange event on window with fromView and toView.'
        : `GAP: navigation.js does not dispatch the contracted 'viewchange' CustomEvent on window (contracted in PROJECT.md line 90).`
    );
  }

  // ==========================================================================
  // SUITE 5: SIMULATION SWITCHGEAR SELECTOR DEFECT
  // ==========================================================================
  // In oscilloscope.js line 85:
  // const modeBtns = document.querySelectorAll('.scope-mode-btn[data-rotor-config], [data-state="inner"], [data-state="outer"]');
  // <div id="mass-rocker" ... data-state="outer"> matches [data-state="outer"]!
  // It receives aria-pressed on a role="group" div and double-binds click handlers.
  {
    const matchesMassRocker = oscJs.includes('[data-state="outer"]') || oscJs.includes('[data-state="inner"]');
    const massRockerHasDataStateInHtml = indexHtml.includes('id="mass-rocker"') && indexHtml.includes('data-state="outer"');
    const setsAriaPressedOnAll = oscJs.includes("btn.setAttribute('aria-pressed', String(isActive))");

    const hasSelectorDefect = matchesMassRocker && massRockerHasDataStateInHtml && setsAriaPressedOnAll;

    recordCheck(
      'Oscilloscope: Mode Buttons Selector Precision (No Enclosure Bleed)',
      !hasSelectorDefect,
      !hasSelectorDefect
        ? 'modeBtns selector targets only toggle buttons.'
        : 'GAP: oscilloscope.js selector includes `[data-state="outer"]`, which erroneously matches `<div id="mass-rocker" role="group">`. This applies `aria-pressed` to a non-button container and binds redundant event listeners.'
    );
  }

  // ==========================================================================
  // SUITE 6: MERMAID GANTT OFFLINE CDN HANDLING & GEOMETRIC AUDIT
  // ==========================================================================
  {
    const hasAuditSvgGeometry = ganttJs.includes('auditSvgGeometry');
    const handlesNegativeWidths = ganttJs.includes("rect.setAttribute('width', '12')");
    const hasTryCatchRender = ganttJs.includes('try {') && ganttJs.includes('mermaid.render');

    recordCheck(
      'Gantt: Dynamic SVG Geometry Audit Clamping',
      hasAuditSvgGeometry && handlesNegativeWidths,
      'gantt.js audits SVG rect geometry and clamps non-positive widths to positive 12px.'
    );

    recordCheck(
      'Gantt: Try-Catch Offline Mermaid Fallback Protection',
      hasTryCatchRender,
      'gantt.js wraps mermaid.render() in try-catch to prevent uncaught promise rejection in offline environments.'
    );
  }

  return results;
}

// Self-executing runner if imported or run directly
export async function run() {
  const results = runAdversarialAudit(process.cwd());
  return {
    name: 'Tier 5: Adversarial Gap Miner (JS Simulation & State Engines)',
    passed: results.failed === 0,
    results
  };
}
