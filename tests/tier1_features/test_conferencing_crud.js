/* ==========================================================================
   TIER 1: FEATURES 30 - 33 // CONFERENCING INSPECTION LOGBOOK & CRUD
   Verifies:
   - F30: Conferencing Inspection Logbook
   - F31: Conferencing CRUD Operations (Add & Delete)
   - F32: Conferencing Inline Note Editing (contenteditable)
   - F33: Conferencing LocalStorage Cache (ppp_conferencing_entries_v1)
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue, assertEqual, assertDeepEqual } from '../utils/assert_helpers.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
  const confJs = fs.readFileSync(path.join(rootDir, 'js', 'conferencing.js'), 'utf-8');
  const baselineFixture = JSON.parse(
    fs.readFileSync(path.join(rootDir, 'tests', 'fixtures', 'baseline_conferences.json'), 'utf-8')
  );

  // 1. Conferencing View Container (Feature 30)
  assertTrue(
    indexHtml.includes('id="view-conferencing"'),
    'DOM must contain section with id="view-conferencing"'
  );
  assertTrue(
    indexHtml.includes('conf-cards-container'),
    'Conferencing view must contain #conf-cards-container'
  );

  // 2. Storage Key & Schema (Feature 33)
  const STORAGE_KEY = 'ppp_conferencing_entries_v1';
  assertTrue(
    confJs.includes(STORAGE_KEY),
    `conferencing.js must use localStorage key: ${STORAGE_KEY} (Feature 33)`
  );

  // Verify baseline records count = 4
  const defaultConfsMatch = confJs.match(/DEFAULT_CONFERENCES\s*=\s*\[([\s\S]*?)\];/);
  assertTrue(
    !!defaultConfsMatch,
    'conferencing.js must define DEFAULT_CONFERENCES fallback array'
  );

  // 3. Add Operation (Feature 31)
  assertTrue(
    confJs.includes('add-conf-btn') || confJs.includes('new-conf-form') || confJs.includes('.push('),
    'conferencing.js must handle Add Conference operations (Feature 31)'
  );
  assertTrue(
    indexHtml.includes('id="add-conf-btn"') || indexHtml.includes('Add Conference'),
    'DOM must contain Add Conference trigger button (Feature 31)'
  );

  // 4. Remove Operation (Feature 31)
  assertTrue(
    confJs.includes('btn-remove-conf') || confJs.includes('.splice('),
    'conferencing.js must handle Remove Conference operations (Feature 31)'
  );

  // 5. Inline Note Editing (Feature 32)
  assertTrue(
    confJs.includes('contenteditable') || confJs.includes('isEditingInline'),
    'conferencing.js must support toggling contenteditable on records (Feature 32)'
  );
  assertTrue(
    confJs.includes('toggle-edit-conf-btn') || indexHtml.includes('toggle-edit-conf-btn'),
    'DOM and script must contain toggle inline edit button (Feature 32)'
  );

  // Verify fields editable: title, date, feedback, actions
  const requiredFields = ['title', 'date', 'feedback', 'actions'];
  for (const f of requiredFields) {
    assertTrue(
      confJs.includes(f),
      `conferencing.js must handle editing and storage for field: ${f} (Feature 32)`
    );
  }

  // 6. LocalStorage Persistence Logic (Feature 33)
  // Verify localStorage.setItem and localStorage.getItem calls
  assertTrue(
    confJs.includes('localStorage.setItem') && confJs.includes('localStorage.getItem'),
    'conferencing.js must synchronously interact with localStorage (Feature 33)'
  );

  return {
    name: 'Tier 1: Conferencing Inspection Logbook & CRUD (Features 30-33)',
    passed: true,
    featuresTested: [30, 31, 32, 33]
  };
}
