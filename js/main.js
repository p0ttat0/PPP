/* ==========================================================================
   MAIN APPLICATION ENTRY POINT // PHYSICS PASSION PROJECT (GP-2804)
   Coordinates navigation, interactive CRT rotor simulation, Mermaid.js v10
   Gantt rendering, and Teacher Conferencing checkpoint persistence.
   ========================================================================== */

import { initNavigation } from './navigation.js';
import { ensureGanttRendered } from './gantt.js';
import { initOscilloscope } from './oscilloscope.js';
import { initConferencing } from './conferencing.js';

function bootstrap() {
  initOscilloscope();
  initConferencing();
  initNavigation({
    onEnterPost3: () => ensureGanttRendered()
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
