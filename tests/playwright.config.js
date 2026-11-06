// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Authoritative Playwright configuration for Physics Passion Project E2E Track.
 * Configures desktop 1080p (1920x1080) and 1440p (2560x1440) viewports,
 * automatic local static server lifecycle, and console error trapping.
 */
export default defineConfig({
  testDir: './',
  testMatch: 'e2e_playwright.spec.js',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://127.0.0.1:8080',
    trace: 'on-first-retry',
    video: 'off',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'desktop-1080p',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'desktop-1440p',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 2560, height: 1440 }
      }
    },
    {
      name: 'mobile-375p',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 812 }
      }
    }
  ],

  webServer: {
    command: 'node tests/utils/static_server_cli.js',
    url: 'http://127.0.0.1:8080/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 10000
  }
});
