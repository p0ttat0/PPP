/* ==========================================================================
   STATIC SERVER CLI WRAPPER
   Starts the static test server on 127.0.0.1:8080 (or custom port).
   ========================================================================== */

import path from 'path';
import { fileURLToPath } from 'url';
import { StaticTestServer } from './static_server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../..');

const port = Number(process.argv[2]) || 8080;
const server = new StaticTestServer(PROJECT_ROOT, port);

server.start()
  .then(({ url }) => {
    console.log(`[StaticTestServer] Serving ${PROJECT_ROOT} at ${url}`);
  })
  .catch(err => {
    console.error('[StaticTestServer] Failed to start:', err);
    process.exit(1);
  });
