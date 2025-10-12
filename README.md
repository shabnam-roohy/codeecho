# Cypress E2E Test Project

A comprehensive end-to-end testing project built with Cypress and TypeScript.

## 🚀 Features

- **Cypress** - Modern E2E testing framework
- **TypeScript** - Type-safe test development
- **Custom Commands** - Reusable test utilities
- **API Testing** - Network request interception and testing
- **Responsive Testing** - Mobile and desktop viewport testing
- **ESLint** - Code quality and consistency
- **Fixtures** - Test data management

## 📁 Project Structure

```
cypress/
├── e2e/                    # Test specifications
│   ├── example.cy.ts       # Basic UI tests
│   └── api-tests.cy.ts     # API testing examples
├── fixtures/               # Test data files
│   ├── users.json         # Sample user data
│   └── test-data.json     # General test data
└── support/               # Support files
    ├── commands.ts        # Custom Cypress commands
    └── e2e.ts            # Global configuration
```

## 🛠️ Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Verify Cypress installation:
   ```bash
   npx cypress verify
   ```

## 🧪 Running Tests

### Interactive Mode (Cypress Test Runner)
```bash
npm run cy:open
```

### Headless Mode
```bash
npm run cy:run
```

### Browser-Specific Testing
```bash
npm run cy:run:chrome
npm run cy:run:firefox
```

### With Debug Output
```bash
npm run test:headed
```

## 📝 Writing Tests

### Basic Test Structure

```typescript
describe('Test Suite Name', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should do something', () => {
    cy.get('[data-testid="element"]').should('be.visible');
  });
});
```

### Using Custom Commands

```typescript
// Login using custom command with environment variables
cy.login(Cypress.env('TEST_EMAIL'), Cypress.env('TEST_PASSWORD'));

// Get element by test ID
cy.getByTestId('submit-button').click();

// Wait for API response
cy.waitForApi('getUsers');
```

### Using Environment Variables in Tests

```typescript
// Access environment variables
const apiUrl = Cypress.env('API_URL');
const baseUrl = Cypress.config('baseUrl');

// Use in API intercepts
cy.intercept('GET', `${apiUrl}/users`).as('getUsers');

// Use in visits
cy.visit('/dashboard'); // Uses baseUrl from .env
```

### API Testing

```typescript
// Intercept and mock API calls
cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');

// Test API responses
cy.waitForApi('getUsers');
```

## 🔧 Configuration

### Environment Variables (`.env`)

The project uses environment variables for flexible configuration:

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Update values** in `.env`:
   ```env
   CYPRESS_baseUrl=http://localhost:3000
   CYPRESS_API_URL=http://localhost:3001/api
   CYPRESS_TEST_EMAIL=your-test@example.com
   CYPRESS_TEST_PASSWORD=your-test-password
   ```

### Cypress Configuration (`cypress.config.ts`)

- **baseUrl**: Read from `CYPRESS_baseUrl` environment variable
- **viewport**: Configurable via `CYPRESS_viewportWidth` and `CYPRESS_viewportHeight`
- **retries**: Test retry configuration
- **timeouts**: Configurable via environment variables

### TypeScript Configuration (`tsconfig.json`)

- Configured for Cypress environment
- Custom path mappings for easy imports
- Strict type checking enabled

### ESLint Configuration (`.eslintrc.js`)

- TypeScript and Cypress specific rules
- Code quality enforcement
- Cypress best practices

## 🌍 Environment Variables

The project supports environment-based configuration through `.env` files:

### Available Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `CYPRESS_baseUrl` | Application base URL | `http://localhost:3000` |
| `CYPRESS_API_URL` | API endpoint URL | `http://localhost:3001/api` |
| `CYPRESS_TEST_EMAIL` | Test user email | `user@example.com` |
| `CYPRESS_TEST_PASSWORD` | Test user password | `password123` |
| `CYPRESS_ENV` | Environment name | `development` |
| `CYPRESS_viewportWidth` | Default viewport width | `1280` |
| `CYPRESS_viewportHeight` | Default viewport height | `720` |
| `CYPRESS_defaultCommandTimeout` | Command timeout (ms) | `10000` |
| `CYPRESS_requestTimeout` | Request timeout (ms) | `10000` |
| `CYPRESS_responseTimeout` | Response timeout (ms) | `10000` |

### Setup Instructions

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Update values for your environment**:
   ```env
   CYPRESS_baseUrl=http://your-app.local:3000
   CYPRESS_API_URL=http://your-api.local:3001/api
   CYPRESS_TEST_EMAIL=test@your-domain.com
   ```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `cy:open` | Open Cypress Test Runner |
| `cy:run` | Run tests in headless mode |
| `cy:run:headless` | Run tests completely headless |
| `cy:run:chrome` | Run tests in Chrome |
| `cy:run:firefox` | Run tests in Firefox |
| `test` | Default test command |
| `test:headed` | Run tests with browser visible |
| `lint` | Run ESLint |
| `lint:fix` | Fix ESLint issues |
| `type-check` | Run TypeScript type checking |

## 🎯 Best Practices

### Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Keep tests independent and isolated

### Selectors
- Use `data-testid` attributes for reliable element selection
- Avoid using CSS classes or IDs that might change
- Use the custom `getByTestId` command

### API Testing
- Mock external API calls using `cy.intercept()`
- Test both success and error scenarios
- Use fixtures for consistent test data

### Custom Commands
- Create reusable commands for common actions
- Add proper TypeScript definitions
- Document command usage

## 🔍 Debugging

### Debug Mode
Run tests with `--headed` flag to see browser interactions:
```bash
npm run test:headed
```

### Cypress Debug Commands
```typescript
cy.debug()      // Pause test execution
cy.pause()      // Pause with Cypress UI
cy.screenshot() // Take screenshot
```

### Browser DevTools
- Tests run in a real browser with full DevTools access
- Set breakpoints in test code
- Inspect DOM and network requests

## 📊 Test Reports

Cypress generates test results in multiple formats:
- **Videos**: Recorded in `cypress/videos/`
- **Screenshots**: Saved in `cypress/screenshots/` on failures
- **Console output**: Real-time test progress

## 🚀 CI/CD Integration

For continuous integration, use:
```bash
npm run cy:run
```

This runs tests in headless mode suitable for CI environments.

## 🤝 Contributing

1. Write tests following the established patterns
2. Ensure TypeScript types are properly defined
3. Run linting before committing: `npm run lint`
4. Add appropriate test data to fixtures

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [TypeScript with Cypress](https://docs.cypress.io/guides/tooling/typescript-support)

## 🐛 Troubleshooting

### Common Issues

1. **Cypress not opening**: Verify installation with `npx cypress verify`
2. **TypeScript errors**: Check `tsconfig.json` configuration
3. **Test timeouts**: Increase timeout values in `cypress.config.ts`
4. **Element not found**: Use `data-testid` attributes and wait for elements

### Getting Help

- Check Cypress documentation
- Review test examples in `cypress/e2e/`
- Examine custom commands in `cypress/support/commands.ts`