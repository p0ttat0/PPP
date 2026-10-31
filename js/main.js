/* ==========================================================================
   MAIN APPLICATION ENTRY POINT // PHYSICS PASSION PROJECT (GP-2804)
   Coordinates navigation, interactive CRT rotor simulation, Mermaid.js v10
   Gantt rendering, and Teacher Conferencing checkpoint persistence.
   ========================================================================== */

import { initNavigation } from './navigation.js';
import { ensureGanttRendered } from './gantt.js';
import { initOscilloscope } from './oscilloscope.js';
import { initConferencing } from './conferencing.js';

document.addEventListener('DOMContentLoaded', () => {
  initOscilloscope();
  initConferencing();
  initNavigation({
    onEnterPost3: () => ensureGanttRendered()
  });
});
