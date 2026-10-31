/* ==========================================================================
   ASSERTION HELPERS // E2E TEST TRACK
   Authoritative assertion and reporting utilities for the test suite.
   ========================================================================== */

export class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

export function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    const msg = message
      ? `${message} -> Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
      : `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`;
    throw new AssertionError(msg, actual, expected);
  }
}

export function assertDeepEqual(actual, expected, message = '') {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    const msg = message
      ? `${message} -> Deep mismatch: Expected ${expectedStr}, got ${actualStr}`
      : `Deep mismatch: Expected ${expectedStr}, got ${actualStr}`;
    throw new AssertionError(msg, actual, expected);
  }
}

export function assertApprox(actual, expected, tolerance = 0.02, message = '') {
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    const msg = message
      ? `${message} -> Value ${actual} differs from expected ${expected} by ${diff} (tol: ${tolerance})`
      : `Value ${actual} differs from expected ${expected} by ${diff} (tol: ${tolerance})`;
    throw new AssertionError(msg, actual, expected);
  }
}

export function assertTrue(value, message = '') {
  if (!value) {
    throw new AssertionError(message || `Expected truthy, got ${JSON.stringify(value)}`, value, true);
  }
}

export function assertFalse(value, message = '') {
  if (value) {
    throw new AssertionError(message || `Expected falsy, got ${JSON.stringify(value)}`, value, false);
  }
}

export function assertContains(haystack, needle, message = '') {
  if (typeof haystack === 'string') {
    if (!haystack.includes(needle)) {
      throw new AssertionError(
        message || `Expected string to contain "${needle}"`,
        haystack.slice(0, 100) + '...',
        needle
      );
    }
  } else if (Array.isArray(haystack)) {
    if (!haystack.includes(needle)) {
      throw new AssertionError(
        message || `Expected array to contain item`,
        haystack,
        needle
      );
    }
  } else {
    throw new AssertionError('Haystack is neither string nor array', typeof haystack, 'string|array');
  }
}

export function assertMatches(text, regex, message = '') {
  if (!regex.test(text)) {
    throw new AssertionError(
      message || `Expected text to match pattern ${regex}`,
      text.slice(0, 100),
      regex.toString()
    );
  }
}

export function assertGreaterThanOrEqual(actual, expected, message = '') {
  if (actual < expected) {
    throw new AssertionError(
      message || `Expected ${actual} >= ${expected}`,
      actual,
      expected
    );
  }
}

export function assertLessThanOrEqual(actual, expected, message = '') {
  if (actual > expected) {
    throw new AssertionError(
      message || `Expected ${actual} <= ${expected}`,
      actual,
      expected
    );
  }
}
