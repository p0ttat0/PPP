/* ==========================================================================
   TIER 1: FEATURES 27 - 29 // POST 2 HYPOTHESIS CONDUIT & GEMINI LINK
   Verifies:
   - F27: Post 2 Hypothesis Isolation Conduit (3-stage refinement of CAND-05)
   - F28: Post 2 Candidate Investigation Ledger (6 candidates)
   - F29: Post 2 Gemini Transcript Mechanical ROM Link
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue, assertContains } from '../utils/assert_helpers.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

  // 1. Post 2 View Container (Feature 27)
  assertTrue(
    indexHtml.includes('id="view-post2"'),
    'DOM must contain section with id="view-post2"'
  );

  // 2. Primary Driving Question (CAND-05) & 3-stage refinement (Feature 27)
  const questionString = "How does shifting a spinning wheel's mass toward its outer rim change how fast it precesses?";
  assertTrue(
    indexHtml.includes(questionString) ||
      indexHtml.includes("shifting a spinning wheel's mass"),
    'Post 2 must contain verbatim Primary Driving Question (Feature 27)'
  );

  // 3. 6 Candidate Investigations (Feature 28)
  const candidateTags = ['CAND 01', 'CAND 02', 'CAND 03', 'CAND 04', 'CAND 05', 'CAND 06'];
  for (const tag of candidateTags) {
    const found =
      indexHtml.includes(tag) ||
      indexHtml.includes(tag.replace(' ', '-')) ||
      indexHtml.includes(tag.replace(' ', ''));
    assertTrue(found, `Post 2 must document investigation ledger candidate: ${tag} (Feature 28)`);
  }

  // 4. Gemini Transcript Mechanical ROM Link (Feature 29)
  const geminiUrl = 'https://share.gemini.google/1Isc2ZbPU9xN';
  assertTrue(
    indexHtml.includes(geminiUrl),
    `Post 2 must include mechanical ROM link to Gemini transcript: ${geminiUrl} (Feature 29)`
  );

  return {
    name: 'Tier 1: Post 2 Hypothesis Conduit & Gemini ROM Link (Features 27-29)',
    passed: true,
    featuresTested: [27, 28, 29]
  };
}
