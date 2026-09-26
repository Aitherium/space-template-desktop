// Tests for space.js: the route allowlist and config cleaning.
//
// Usage: node --test test/
// SPACE_JS=<path> tests another copy (build.sh points it at the built site).
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const target = process.env.SPACE_JS || path.join(__dirname, '..', 'src', 'space.js');
const { clean, ROUTES, ORIGIN } = require(path.resolve(target));

const EXPECTED = [
  '/desktop/',
  '/desktop/?app=terminal',
  '/playground/',
  '/saga/',
  '/iris/',
  '/lyra/',
  '/atlas/',
  '/hera/',
  '/vera/',
  '/demo/adk/',
  '/demo/connect/',
];

test('the allowlist is exactly the framable pages', () => {
  assert.deepEqual(ROUTES, EXPECTED);
  assert.equal(ORIGIN, 'https://aitherium.com');
});

test('an absent route frames the desktop', () => {
  assert.equal(clean(null).route, '/desktop/');
  assert.equal(clean({}).route, '/desktop/');
});

test('every allowlisted route is kept as written', () => {
  for (const r of EXPECTED) assert.equal(clean({ route: r }).route, r);
});

test('anything off the allowlist falls back to the desktop', () => {
  const bad = [
    '/admin/',
    '/launch/',
    '/demo/sense-panel/',
    '/iris',
    '/iris/../admin/',
    '/IRIS/',
    '/demo/',
    '/desktop/?app=settings',
    'https://evil.example/',
    '//evil.example/',
    'javascript:alert(1)',
    ' /iris/',
    ['/iris/'],
    42,
    null,
  ];
  for (const r of bad) assert.equal(clean({ route: r }).route, '/desktop/', String(r));
});

test('the rest of the config still cleans as before', () => {
  const c = clean({ name: '  Hi  ', accentColor: 'red', apiBase: 'http://x.example' });
  assert.equal(c.name, 'Hi');
  assert.equal(c.accentColor, '#5ad1ff');
  assert.equal(c.apiBase, 'https://api.aitherium.com');
});
