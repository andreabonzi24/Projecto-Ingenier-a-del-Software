# CI/CD Documentation

## Overview

This repository uses GitHub Actions for Continuous Integration (CI). The workflow automatically runs on:
- Push to `main`, `feature/*`, and `copilot/*` branches
- Pull requests targeting `main`

## Workflow Details

### CI Pipeline (`.github/workflows/ci.yml`)

The CI pipeline performs the following steps:

1. **Checkout**: Clones the repository
2. **Setup Node.js**: Configures Node.js LTS version
3. **Install Dependencies**: Runs `npm ci` for clean dependency installation
4. **Lint**: Runs ESLint to check code quality
5. **Test**: Runs Jest tests with coverage
6. **Build** (Optional): Runs build script if available

## Running Locally

### Prerequisites

- Node.js LTS (v18 or higher recommended)
- npm (comes with Node.js)

### Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### Running Linter

```bash
# Run ESLint
npm run lint

# Run ESLint and automatically fix issues
npm run lint:fix
```

### Running Tests

```bash
# Run all tests with coverage
npm test

# Run tests in watch mode (for development)
npm test -- --watch
```

## ESLint Configuration

The project uses ESLint with the following configuration:

- **Environment**: Browser, ES2021, Node.js, Jest
- **Style**: Based on recommended rules with custom modifications
- **Key Rules**:
  - 2-space indentation
  - Single quotes
  - Semicolons required
  - No `var` (use `const`/`let`)
  - Strict equality (`===`)

### Ignored Files

Files excluded from linting (see `.eslintignore`):
- `node_modules/`
- Build outputs (`dist/`, `build/`)
- Documentation (`docs/`, `*.md`)
- Static assets (images, HTML)
- Legacy directories (`cap_web/`, `webs/`)

## Test Framework

The project uses **Jest** for testing:

- Tests are located in `backend/tests/`
- Test files should follow the pattern `*.test.js`
- Coverage reports are generated automatically

### Writing Tests

Example test structure:

```javascript
describe('Feature Name', () => {
  test('should do something', () => {
    expect(true).toBe(true);
  });

  test('should handle async operations', async () => {
    const result = await someAsyncFunction();
    expect(result).toBeDefined();
  });
});
```

## Troubleshooting

### Lint Errors

If you encounter lint errors:

1. Run `npm run lint:fix` to auto-fix common issues
2. For remaining errors, fix manually following the error messages
3. Check `.eslintrc.json` for rule configurations

### Test Failures

If tests fail:

1. Run `npm test -- --verbose` for detailed output
2. Check the test file for expected vs actual values
3. Ensure all dependencies are installed (`npm install`)

### CI Pipeline Fails

If the CI pipeline fails:

1. Check the GitHub Actions logs for specific error messages
2. Run the same commands locally to reproduce the issue
3. Ensure your changes don't break existing functionality

## Adding New Tests

1. Create a new file in `backend/tests/` with `.test.js` extension
2. Follow the existing test patterns
3. Run tests locally before pushing
4. Ensure coverage doesn't decrease significantly

## Coverage Reports

Jest generates coverage reports in the `coverage/` directory. The CI pipeline includes coverage in test output but doesn't upload reports to external services (can be added later).

## Future Improvements

- [ ] Add coverage threshold enforcement
- [ ] Add E2E testing with Playwright or Cypress
- [ ] Add automated deployment workflows
- [ ] Add code coverage badges
- [ ] Add automated dependency updates
