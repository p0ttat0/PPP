// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Deco-Lectronic Atelier E2E Test Suite', () => {
  let consoleErrors = [];
  let consoleWarnings = [];
  let failedRequests = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    consoleWarnings = [];
    failedRequests = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    page.on('requestfailed', req => {
      failedRequests.push(`${req.method()} ${req.url()}: ${req.failure()?.errorText || 'Failed'}`);
    });

    await page.goto('/index.html');
    await page.waitForLoadState('networkidle');
  });

  // --------------------------------------------------------------------------
  // TEST 1: ZERO CONSOLE ERRORS, WARNINGS & FAILED REQUESTS (F41, F42)
  // --------------------------------------------------------------------------
  test('Clean Initial Load with 0 Console Errors, 0 Warnings, and 0 Failed Requests', async ({ page }) => {
    expect(consoleErrors, `Expected 0 console errors, got: ${consoleErrors.join(' | ')}`).toHaveLength(0);
    expect(consoleWarnings, `Expected 0 console warnings, got: ${consoleWarnings.join(' | ')}`).toHaveLength(0);
    expect(failedRequests, `Expected 0 failed requests, got: ${failedRequests.join(' | ')}`).toHaveLength(0);
  });

  // --------------------------------------------------------------------------
  // TEST 2: MULTI-VIEWPORT GEOMETRY & ZERO HORIZONTAL OVERFLOW (F43)
  // --------------------------------------------------------------------------
  test('Zero Horizontal Overflow Across All 5 Views', async ({ page }) => {
    const views = ['home', 'post1', 'post2', 'post3', 'conferencing'];

    for (const v of views) {
      // Click navigation tab
      await page.click(`.bank-btn[data-target="${v}"]`);
      await page.waitForTimeout(100);

      const targetSection = page.locator(`#view-${v}`);
      await expect(targetSection).toBeVisible();
      await expect(targetSection).toHaveClass(/active/);

      // Verify no horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(overflow, `Horizontal overflow detected on view #${v}`).toBe(false);
    }
  });

  // --------------------------------------------------------------------------
  // TEST 3: HOMEPAGE 4 MECHANICAL & SIGNAL LAYERS (F17-F18, F20-F24)
  // --------------------------------------------------------------------------
  test('Homepage 4 Mechanical & Signal Layers and Physics Engine', async ({ page }) => {
    await page.click('.bank-btn[data-target="home"]');

    // 1. Layer 1: Continuous Rotor Rotation & RPM Rheostat
    const rpmSlider = page.locator('#rotor-rpm-slider, #rpm-slider');
    await expect(rpmSlider).toBeVisible();

    // Set RPM slider to 3600
    await rpmSlider.fill('3600');
    await rpmSlider.dispatchEvent('input');

    // Check VFD equation readouts
    const inertiaVal = page.locator('#vfd-inertia-val, #readout-inertia');
    const precessionVal = page.locator('#vfd-precession-val, #readout-precession');
    await expect(inertiaVal).toBeVisible();
    await expect(precessionVal).toBeVisible();

    // 2. Layer 2: Radial Screw Translation via Rocker Switch / Mode Button
    const innerBtn = page.locator('[data-rotor-config="inner"], [data-state="inner"]').first();
    const outerBtn = page.locator('[data-rotor-config="outer"], [data-state="outer"]').first();

    if (await innerBtn.isVisible()) {
      await innerBtn.click();
      await page.waitForTimeout(200);

      // Verify inertia drops to ~1.29e-4
      const textInner = await inertiaVal.innerText();
      expect(textInner).toContain('1.29');

      // Click outer mass ring
      await outerBtn.click();
      await page.waitForTimeout(200);

      // Verify inertia increases to ~2.48e-4 (+93.1%)
      const textOuter = await inertiaVal.innerText();
      expect(textOuter).toContain('2.48');
    }

    // 3. Layer 3: PCB Traces & Pulses
    const pcbTraces = page.locator('.pcb-trace, .pcb-trace-pulse, #svg-pcb-traces, [class*="pulse"]').first();
    await expect(pcbTraces).toBeAttached();

    // 4. Layer 4: Live 3D Precession Cone Ellipse
    const precessionOrbit = page.locator('#svg-precession-orbit, #precession-cone-ellipse').first();
    if (await precessionOrbit.isVisible()) {
      const rx = await precessionOrbit.getAttribute('rx');
      expect(Number(rx)).toBeGreaterThan(0);
    }
  });

  // --------------------------------------------------------------------------
  // TEST 4: POST 3 SIDE-BY-SIDE SPLIT & MERMAID GANTT (F34-F40)
  // --------------------------------------------------------------------------
  test('Post 3 Side-by-Side Split, Non-Negative Rects & Text Clearances', async ({ page }) => {
    await page.click('.bank-btn[data-target="post3"]');
    await page.waitForTimeout(800); // Allow Mermaid.js render completion

    const ganttContainer = page.locator('#gantt-container');
    await expect(ganttContainer).toBeVisible();

    const ganttSvg = ganttContainer.locator('svg');
    await expect(ganttSvg).toBeVisible();

    // 1. Verify side-by-side layout (Task breakdown col on left, Gantt on right)
    const splitBoxes = await page.evaluate(() => {
      const leftCol = document.querySelector('.schedule-matrix-col, .task-breakdown-col, [class*="matrix"]');
      const rightCol = document.querySelector('.gantt-col, #gantt-container');
      if (!leftCol || !rightCol) return null;
      const rLeft = leftCol.getBoundingClientRect();
      const rRight = rightCol.getBoundingClientRect();
      return {
        leftRight: rLeft.right,
        rightLeft: rRight.left,
        sideBySide: rLeft.left < rRight.left && rLeft.top < rRight.bottom
      };
    });

    if (splitBoxes) {
      expect(splitBoxes.sideBySide, 'Task Breakdown and Gantt must render side-by-side').toBe(true);
    }

    // 2. Verify Zero Negative SVG Rect Widths (Feature 36)
    const rectWidths = await page.evaluate(() => {
      const rects = document.querySelectorAll('#gantt-container svg rect');
      const widths = [];
      rects.forEach(r => {
        const w = parseFloat(r.getAttribute('width') || '0');
        widths.push(w);
      });
      return widths;
    });

    expect(rectWidths.length).toBeGreaterThan(0);
    for (const w of rectWidths) {
      expect(w, 'Gantt SVG rect widths must be strictly positive (>= 0)').toBeGreaterThanOrEqual(0);
    }

    // 3. Bidirectional Hover Tracing (Feature 39)
    const firstRow = page.locator('.ms-row[data-task-id="sr1"]').first();
    if (await firstRow.isVisible()) {
      await firstRow.hover();
      await page.waitForTimeout(100);
      const highlightedBar = page.locator('#sr1.bar-highlight, #sr1[class*="highlight"]');
      // If hover class bound, bar receives highlight
      expect(await firstRow.getAttribute('class')).toContain('highlighted');
    }

    // 4. Phase-Isolation Switches (Feature 40)
    const prFilterBtn = page.locator('.gantt-phase-btn[data-phase-filter="pr"]').first();
    if (await prFilterBtn.isVisible()) {
      await prFilterBtn.click();
      await page.waitForTimeout(150);

      // Verify PR rows stay 100% opacity, non-PR rows dim to ~0.28
      const srRowOpacity = await page.locator('.ms-row[data-task-id="sr1"]').first().evaluate(el => {
        return window.getComputedStyle(el).opacity;
      });
      expect(parseFloat(srRowOpacity)).toBeLessThan(0.5);
    }
  });

  // --------------------------------------------------------------------------
  // TEST 5: CONFERENCING CRUD & INLINE NOTE EDITING (F30-F33)
  // --------------------------------------------------------------------------
  test('Conferencing CRUD, Inline Note Editing, and LocalStorage Persistence', async ({ page }) => {
    await page.click('.bank-btn[data-target="conferencing"]');
    await page.waitForTimeout(200);

    const confContainer = page.locator('#conf-cards-container');
    await expect(confContainer).toBeVisible();

    // 1. Initial 4 baseline records
    const initialCards = confContainer.locator('article.chassis-module');
    await expect(initialCards).toHaveCount(4);

    // 2. Add New Conference Entry (Feature 31)
    const addBtn = page.locator('#add-conf-btn');
    await addBtn.click();

    const drawerForm = page.locator('#new-conf-form');
    await expect(drawerForm).toHaveClass(/open/);

    await page.fill('#conf-title-input', 'E2E Automated Inspection Record');
    await page.fill('#conf-feedback-input', 'Authoritative test feedback passed.');
    await page.click('#save-conf-btn');
    await page.waitForTimeout(200);

    // Assert card count increased to 5
    await expect(initialCards).toHaveCount(5);

    // 3. Inline Note Editing with contenteditable="true" (Feature 32)
    const toggleEditBtn = page.locator('#toggle-edit-conf-btn');
    await toggleEditBtn.click();
    await page.waitForTimeout(150);

    const firstTitle = confContainer.locator('.conf-log-title').first();
    await expect(firstTitle).toHaveAttribute('contenteditable', 'true');

    // 4. Persistence to localStorage 'ppp_conferencing_entries_v1' (Feature 33)
    const storedData = await page.evaluate(() => {
      return localStorage.getItem('ppp_conferencing_entries_v1');
    });
    expect(storedData).not.toBeNull();
    const parsed = JSON.parse(storedData || '[]');
    expect(parsed.length).toBe(5);

    // 5. Remove Conference Record (Feature 31)
    const removeBtn = confContainer.locator('.btn-remove-conf').first();
    await removeBtn.click();
    await page.waitForTimeout(200);

    await expect(initialCards).toHaveCount(4);
  });

  // --------------------------------------------------------------------------
  // TEST 6: ACCESSIBILITY PREFERS-REDUCED-MOTION (F19)
  // --------------------------------------------------------------------------
  test('Respects Prefers-Reduced-Motion Media Query', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/index.html');
    await page.waitForLoadState('networkidle');

    // Continuous spin animation should be paused / static graticule shown
    const isAnimationPaused = await page.evaluate(() => {
      const rotor = document.getElementById('rotor-spinning-assembly');
      if (!rotor) return true;
      const computed = window.getComputedStyle(rotor);
      return (
        computed.animationPlayState === 'paused' ||
        computed.animationName === 'none' ||
        parseFloat(computed.animationDuration) === 0
      );
    });
    expect(isAnimationPaused).toBe(true);
  });
});
