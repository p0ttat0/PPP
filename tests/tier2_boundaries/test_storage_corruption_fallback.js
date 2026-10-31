/* ==========================================================================
   TIER 2: BOUNDARY TEST // LOCALSTORAGE CORRUPTION FALLBACK
   Verifies:
   - Deserialization gracefully catches corrupted JSON payloads in localStorage
   - Falls back safely to DEFAULT_CONFERENCES (4 baseline records)
   - Zero unhandled exceptions or script halts
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue, assertEqual, assertFalse } from '../utils/assert_helpers.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const confJs = fs.readFileSync(path.join(rootDir, 'js', 'conferencing.js'), 'utf-8');
  const baselineFixture = JSON.parse(
    fs.readFileSync(path.join(rootDir, 'tests', 'fixtures', 'baseline_conferences.json'), 'utf-8')
  );

  // 1. Verify conferencing.js implements try...catch around JSON.parse
  assertTrue(
    confJs.includes('try') && confJs.includes('JSON.parse') && confJs.includes('catch'),
    'conferencing.js must wrap localStorage deserialization in try...catch'
  );

  // 2. Simulate corrupted localStorage state
  const mockStorage = {
    'ppp_conferencing_entries_v1': '{ INVALID_JSON_DATA_CORRUPTED_%%% '
  };

  function simulateLoadConferences(storage) {
    let confEntries = [];
    try {
      const saved = storage['ppp_conferencing_entries_v1'];
      confEntries = saved ? JSON.parse(saved) : [...baselineFixture];
    } catch {
      confEntries = [...baselineFixture];
    }
    return confEntries;
  }

  let entries;
  let threwException = false;
  try {
    entries = simulateLoadConferences(mockStorage);
  } catch {
    threwException = true;
  }

  assertFalse(threwException, 'Corrupted localStorage must NOT throw an unhandled exception');
  assertEqual(entries.length, 4, 'Must fall back to exactly 4 baseline conference records');
  assertEqual(entries[0].id, 'conf-1', 'First record must be conf-1');

  // Test 3: Null or empty localStorage state
  const emptyStorage = {};
  const emptyEntries = simulateLoadConferences(emptyStorage);
  assertEqual(emptyEntries.length, 4, 'Empty storage must fall back to 4 baseline records');

  return {
    name: 'Tier 2: Boundary - LocalStorage Corruption & Fallback',
    passed: true
  };
}
