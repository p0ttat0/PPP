#!/usr/bin/env node
/* ==========================================================================
   CLI TEST RUNNER ENTRYPOINT // DECO-LECTRONIC ATELIER
   Run with: node tests/run_all_tests.js
   ========================================================================== */

import { runAllTests } from './runner.js';

runAllTests()
  .then(summary => {
    if (!summary.success) {
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Fatal Test Exception:', err);
    process.exit(1);
  });
