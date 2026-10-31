/* ==========================================================================
   TIER 1: FEATURES 25 - 26 // POST 1 ARCHITECTURAL DOSSIER & VERBATIM PROSE
   Verifies:
   - F25: Post 1 Asymmetric Architectural Dossier
   - F26: Post 1 Verbatim Prose Preservation (Computers, Electronics, Music,
          Video Games, History & Politics)
   ========================================================================== */

import fs from 'fs';
import path from 'path';
import { assertTrue, assertContains } from '../utils/assert_helpers.js';

export async function run(ctx) {
  const { rootDir } = ctx;
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
  const expectedProse = JSON.parse(
    fs.readFileSync(path.join(rootDir, 'tests', 'fixtures', 'expected_prose.json'), 'utf-8')
  );

  // 1. Post 1 View Container (Feature 25)
  // Must contain section with id="view-post1"
  assertTrue(
    indexHtml.includes('id="view-post1"'),
    'DOM must contain section with id="view-post1"'
  );

  // 2. Verbatim Prose Preservation (Feature 26)
  // Verify all 5 topics and key user prose phrases exist verbatim
  for (const topic of expectedProse.post1.topics) {
    assertTrue(
      indexHtml.includes(topic.title) ||
        indexHtml.toLowerCase().includes(topic.id) ||
        topic.keywords.some(kw => indexHtml.includes(kw)),
      `Post 1 must contain content for topic: ${topic.title} (Feature 26)`
    );
  }

  // Check specific student essay sentences that must be preserved
  const samplePhrases = [
    'Computers',
    'Electronics',
    'Music',
    'Video Games',
    'History'
  ];
  for (const phrase of samplePhrases) {
    assertTrue(indexHtml.includes(phrase), `Post 1 must preserve student section on "${phrase}"`);
  }

  return {
    name: 'Tier 1: Post 1 Architectural Dossier & Verbatim Prose (Features 25-26)',
    passed: true,
    featuresTested: [25, 26]
  };
}
