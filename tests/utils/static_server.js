/* ==========================================================================
   STATIC HTTP TEST SERVER
   Spins up an ephemeral HTTP server serving c:\Users\ericl\random.
   Tracks all requested URLs, response status codes, and network latency.
   ========================================================================== */

import http from 'http';
import fs from 'fs';
import path from 'path';

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8'
};

export class StaticTestServer {
  constructor(rootDir, port = 0) {
    this.rootDir = rootDir;
    this.port = port;
    this.server = null;
    this.activePort = 0;
    this.requestLog = [];
    this.failedRequests = [];
  }

  start() {
    return new Promise((resolve, reject) => {
      this.server = http.createServer((req, res) => {
        const parsedUrl = new URL(req.url, `http://localhost:${this.activePort || 8080}`);
        let relativePath = decodeURIComponent(parsedUrl.pathname);
        if (relativePath === '/' || relativePath === '') {
          relativePath = '/index.html';
        }

        const safePath = path.normalize(path.join(this.rootDir, relativePath));

        if (!safePath.startsWith(path.normalize(this.rootDir))) {
          this.failedRequests.push({ url: req.url, status: 403, error: 'Directory traversal forbidden' });
          res.writeHead(403);
          res.end('Forbidden');
          return;
        }

        fs.stat(safePath, (err, stats) => {
          if (err || !stats.isFile()) {
            this.failedRequests.push({ url: req.url, status: 404, error: 'File not found' });
            this.requestLog.push({ url: req.url, status: 404 });
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`404 Not Found: ${relativePath}`);
            return;
          }

          const ext = path.extname(safePath).toLowerCase();
          const contentType = MIME_TYPES[ext] || 'application/octet-stream';

          fs.readFile(safePath, (readErr, content) => {
            if (readErr) {
              this.failedRequests.push({ url: req.url, status: 500, error: readErr.message });
              this.requestLog.push({ url: req.url, status: 500 });
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('500 Internal Server Error');
              return;
            }

            this.requestLog.push({ url: req.url, status: 200, size: content.length });
            res.writeHead(200, {
              'Content-Type': contentType,
              'Content-Length': content.length,
              'Access-Control-Allow-Origin': '*'
            });
            res.end(content);
          });
        });
      });

      this.server.listen(this.port, '127.0.0.1', () => {
        this.activePort = this.server.address().port;
        resolve({
          port: this.activePort,
          url: `http://127.0.0.1:${this.activePort}`
        });
      });

      this.server.on('error', err => reject(err));
    });
  }

  stop() {
    return new Promise(resolve => {
      if (this.server) {
        this.server.close(() => resolve());
      } else {
        resolve();
      }
    });
  }

  getFailedRequests() {
    return [...this.failedRequests];
  }

  getRequestCount() {
    return this.requestLog.length;
  }
}
