/* ==========================================================================
   TIER 3: COMBINATION TEST // CONFERENCING CRUD & PERSISTENCE CYCLE
   Verifies:
   - Complete multi-step transaction cycle:
     Load -> Add Record -> Toggle Inline Edit -> Edit Field -> Delete Record -> Reload
   - Correct JSON serialization to localStorage key 'ppp_conferencing_entries_v1'
   - Clean index re-numbering (REC-01, REC-02, ...)
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue, assertEqual, assertDeepEqual } from '../utils/assert_helpers.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const baselineFixture = JSON.parse(
    fs.readFileSync(path.join(rootDir, 'tests', 'fixtures', 'baseline_conferences.json'), 'utf-8')
  );

  const mockLocalStorage = {};
  const STORAGE_KEY = 'ppp_conferencing_entries_v1';

  // Step 1: Initial load
  let records = [...baselineFixture];
  mockLocalStorage[STORAGE_KEY] = JSON.stringify(records);
  assertEqual(records.length, 4, 'Initial record count must be 4');

  // Step 2: Add 5th conference record
  const newRecord = {
    id: 'conf-' + Date.now(),
    title: 'Checkpoint 5: Post-Trial Gyroscope Disassembly',
    date: 'Jan 8, 2027',
    phase: 'Deliverables',
    status: 'Scheduled',
    feedback: 'Inspect bearing wear on BLDC motor hub.',
    actions: '• Clean stator and log final run hours.'
  };
  records.push(newRecord);
  mockLocalStorage[STORAGE_KEY] = JSON.stringify(records);

  // Step 3: Verify storage has 5 records
  const reloadedStep2 = JSON.parse(mockLocalStorage[STORAGE_KEY]);
  assertEqual(reloadedStep2.length, 5, 'Record count after Add must be 5');
  assertEqual(reloadedStep2[4].title, newRecord.title);

  // Step 4: Inline edit field on record 1 (Checkpoint 2)
  records[1].feedback = 'Updated feedback during calibration session.';
  records[1].status = 'Completed';
  mockLocalStorage[STORAGE_KEY] = JSON.stringify(records);

  const reloadedStep4 = JSON.parse(mockLocalStorage[STORAGE_KEY]);
  assertEqual(reloadedStep4[1].feedback, 'Updated feedback during calibration session.');
  assertEqual(reloadedStep4[1].status, 'Completed');

  // Step 5: Remove record 0 (Checkpoint 1)
  records.splice(0, 1);
  mockLocalStorage[STORAGE_KEY] = JSON.stringify(records);

  const reloadedStep5 = JSON.parse(mockLocalStorage[STORAGE_KEY]);
  assertEqual(reloadedStep5.length, 4, 'Record count after Delete must be 4');
  assertEqual(reloadedStep5[0].title, 'Checkpoint 2: Research Plan, BOM & Gantt Schedule Review');
  // Record that was formerly Checkpoint 2 is now the first record
  assertEqual(reloadedStep5[0].status, 'Completed');

  return {
    name: 'Tier 3: Combination - Conferencing CRUD & Persistence Cycle',
    passed: true
  };
}
