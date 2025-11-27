# CI/CD Documentation

## Overview

This repository uses GitHub Actions for Continuous Integration (CI). The workflow automatically runs on every push and pull request to ensure code quality and test coverage.

## Workflow Configuration

The CI workflow is defined in `.github/workflows/ci.yml` and includes the following steps:

### Steps

1. **Checkout**: Clones the repository
2. **Setup Node.js**: Configures Node.js LTS version
3. **Install Dependencies**: Runs `npm ci` for clean install
4. **Run Linter**: Executes ESLint to check code quality
5. **Run Tests**: Executes Jest tests
6. **Build (Optional)**: Runs build script if available

### Trigger Events

- **push**: Runs on every push to any branch
- **pull_request**: Runs on every pull request

## Running Locally

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
npm install
```

### Available Scripts

#### Linting

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable linting errors
npm run lint:fix
```

#### Testing

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage
```

## ESLint Configuration

The project uses ESLint with the following configuration:

- **Environment**: Browser, CommonJS, ES2021, Node, Jest
- **Style**: Based on recommended rules with customizations
- **Key Rules**:
  - 2-space indentation
  - Single quotes
  - Semicolons required
  - No trailing spaces
  - Unix line breaks

### Ignored Paths

- `node_modules/`
- `dist/`
- `build/`
- `coverage/`
- Minified files (`*.min.js`)

## Jest Configuration

- **Test Environment**: Node
- **Test Files**: `tests/**/*.test.js`
- **Coverage**: Enabled (run with `npm run test:coverage`)

## Adding New Tests

1. Create test files in the `tests/` directory
2. Name files with `.test.js` suffix
3. Follow the existing test structure in `tests/example.test.js`

Example:

```javascript
describe('My Feature', () => {
  test('should do something', () => {
    expect(true).toBe(true);
  });
});
```

## Troubleshooting

### Lint Errors

If you see lint errors, try:

```bash
npm run lint:fix
```

For manual fixes, check the ESLint output for specific file and line numbers.

### Test Failures

1. Run tests locally: `npm test`
2. Check the specific test file for the failure
3. Use `npm test -- --verbose` for detailed output

### CI Build Failures

1. Check the GitHub Actions tab for the failing job
2. Review the logs for the specific step that failed
3. Fix issues locally and push a new commit

## Best Practices

1. **Run lint before committing**: `npm run lint`
2. **Run tests before pushing**: `npm test`
3. **Keep tests fast**: Unit tests should complete in seconds
4. **Write meaningful test descriptions**: Use descriptive test names
5. **Don't skip CI**: Fix failing builds promptly

## Related Files

- `.eslintrc.json` - ESLint configuration
- `.eslintignore` - Files ignored by ESLint
- `jest.config.js` - Jest configuration
- `package.json` - Scripts and dependencies
- `tests/example.test.js` - Example test file
