/**
 * Fallback sanity test script
 * Runs if Jest is not available or fails to initialize.
 * This script performs basic checks to verify the project structure.
 */

const fs = require('fs');
const path = require('path');

console.log('Running sanity tests...\n');

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`✓ ${description}`);
    passed++;
  } catch (error) {
    console.log(`✗ ${description}`);
    console.log(`  Error: ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test: package.json exists
test('package.json exists', () => {
  const pkgPath = path.join(__dirname, '..', 'package.json');
  assert(fs.existsSync(pkgPath), 'package.json not found');
});

// Test: package.json has required scripts
test('package.json has lint script', () => {
  const pkg = require(path.join(__dirname, '..', 'package.json'));
  assert(pkg.scripts && pkg.scripts.lint, 'lint script not found');
});

// Test: package.json has test script
test('package.json has test script', () => {
  const pkg = require(path.join(__dirname, '..', 'package.json'));
  assert(pkg.scripts && pkg.scripts.test, 'test script not found');
});

// Test: ESLint config exists
test('.eslintrc.json exists', () => {
  const eslintPath = path.join(__dirname, '..', '.eslintrc.json');
  assert(fs.existsSync(eslintPath), '.eslintrc.json not found');
});

// Test: Jest config exists
test('jest.config.js exists', () => {
  const jestPath = path.join(__dirname, '..', 'jest.config.js');
  assert(fs.existsSync(jestPath), 'jest.config.js not found');
});

// Test: CI workflow exists
test('.github/workflows/ci.yml exists', () => {
  const ciPath = path.join(__dirname, '..', '.github', 'workflows', 'ci.yml');
  assert(fs.existsSync(ciPath), 'CI workflow not found');
});

// Summary
console.log(`\n${'='.repeat(40)}`);
console.log(`Tests: ${passed} passed, ${failed} failed`);
console.log('='.repeat(40));

process.exit(failed > 0 ? 1 : 0);
