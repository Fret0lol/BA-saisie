// Vérification minimale : fill.js se charge sous Node et expose son API.
// Les tests de rendu PDF et e2e viennent dans des fichiers séparés (étape 2).
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

test('fill.js expose fillBA, TEXT et MARKS sous Node', () => {
  const fill = require(path.join(__dirname, '..', 'fill.js'));
  assert.equal(typeof fill.fillBA, 'function');
  assert.ok(Array.isArray(fill.TEXT) && fill.TEXT.length > 0);
  assert.ok(Array.isArray(fill.MARKS) && fill.MARKS.length > 0);
});
