# Project Structure Documentation

## 📁 Organized E2E Test Architecture

This project follows a scalable, maintainable architecture for large-scale e2e testing with clear separation between UI and API tests.

```
cypress/
├── e2e/                           # Test specifications
│   ├── ui/                        # UI/Frontend tests
│   │   └── auth.smoke.cy.ts       # Authentication UI smoke tests
│   ├── api/                       # API/Backend tests
│   │   └── auth.smoke.cy.ts       # Authentication API smoke tests
│   ├── config-test.cy.ts          # Configuration tests
│   ├── environment.cy.ts          # Environment variable tests
│   └── example.cy.ts              # Basic example tests
│
├── fixtures/                      # Test data files
│   ├── api/                       # API-specific fixtures
│   │   └── responses.json         # Mock API responses
│   ├── ui/                        # UI-specific fixtures
│   │   └── auth-data.json         # UI test data
│   ├── test-data.json            # General test data
│   └── users.json                # User data
│
└── support/                       # Support files and utilities
    ├── api/                       # API helper classes
    │   ├── base-api.ts            # Base API class with common methods
    │   ├── auth-api.ts            # Authentication API operations
    │   └── users-api.ts           # User management API operations
    │
    ├── page-objects/              # Page Object Models
    │   ├── base-page.ts           # Base page with common functionality
    │   ├── login-page.ts          # Login page object
    │   └── dashboard-page.ts      # Dashboard page object
    │
    ├── utils/                     # Utility classes
    │   ├── data-generator.ts      # Test data generation utilities
    │   └── test-utils.ts          # Common test helper functions
    │
    ├── commands.ts                # Custom Cypress commands
    ├── e2e.ts                     # Global configuration
    └── index.ts                   # Export central hub
```

## 🏗️ Architecture Patterns

### 1. Page Object Model (POM)
- **Location**: `cypress/support/page-objects/`
- **Purpose**: Encapsulate page elements and actions
- **Benefits**: Maintainable, reusable, reduces code duplication

```typescript
// Example usage
const loginPage = new LoginPage();
loginPage.visit();
loginPage.login(email, password);
```

### 2. API Helper Classes
- **Location**: `cypress/support/api/`
- **Purpose**: Structured API testing with proper abstraction
- **Benefits**: Type-safe, reusable, consistent error handling

```typescript
// Example usage
const authAPI = new AuthAPI();
authAPI.login(email, password).then((response) => {
  authAPI.validateStatus(response, 200);
});
```

### 3. Utility Classes
- **Location**: `cypress/support/utils/`
- **Purpose**: Common functionality and test helpers
- **Benefits**: DRY principle, consistent behavior

```typescript
// Example usage
const userData = DataGenerator.generateUserData();
TestUtils.logStep('Performing login');
```

## 📝 Test Organization

### Smoke Tests
- **Naming**: `*.smoke.cy.ts`
- **Purpose**: Critical path testing
- **Scope**: Essential functionality verification

### Regression Tests
- **Naming**: `*.regression.cy.ts`
- **Purpose**: Comprehensive feature testing
- **Scope**: Detailed functionality verification

### UI Tests (`cypress/e2e/ui/`)
- Focus on user interactions
- Visual validation
- Responsive design testing
- Accessibility testing

### API Tests (`cypress/e2e/api/`)
- HTTP status codes
- Request/response validation
- Error handling
- Performance testing

## 🚀 Available Scripts

### Test Execution
```bash
# Run all tests
npm run cy:run

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Open Cypress Test Runner for UI tests
npm run test:ui:open

# Open Cypress Test Runner for API tests
npm run test:api:open
```

### Development
```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

## 🔧 Configuration

### Environment Variables
Configure different environments using `.env` files:

```env
# Base application URL
CYPRESS_baseUrl=http://localhost:3000

# API endpoint
CYPRESS_API_URL=http://localhost:3001/api

# Test credentials
CYPRESS_TEST_EMAIL=test@example.com
CYPRESS_TEST_PASSWORD=password123
```

### Test Data Management
- **Fixtures**: Static test data in JSON files
- **Generated Data**: Dynamic data using `DataGenerator`
- **Environment-specific**: Data varies by environment

## 🛠️ Development Workflow

### 1. Adding New UI Tests
1. Create page object in `cypress/support/page-objects/`
2. Add test data in `cypress/fixtures/ui/`
3. Write test in `cypress/e2e/ui/`
4. Export page object in `cypress/support/index.ts`

### 2. Adding New API Tests
1. Create API class in `cypress/support/api/`
2. Add mock responses in `cypress/fixtures/api/`
3. Write test in `cypress/e2e/api/`
4. Export API class in `cypress/support/index.ts`

### 3. Adding Utilities
1. Create utility in `cypress/support/utils/`
2. Write comprehensive documentation
3. Add unit-like tests if complex
4. Export in `cypress/support/index.ts`

## 📊 Best Practices

### Test Structure
```typescript
describe('Feature Name', () => {
  let pageObject: SomePage;
  let testData: any;

  beforeEach(() => {
    // Setup
    pageObject = new SomePage();
    cy.fixture('test-data').then((data) => {
      testData = data;
    });
  });

  it('should perform specific action', () => {
    TestUtils.logStep('Step description');
    // Test implementation
  });
});
```

### Error Handling
- Use proper assertions
- Validate both success and failure scenarios
- Include meaningful error messages

### Data Management
- Use fixtures for static data
- Generate dynamic data for each test run
- Clean up test data after tests

### Maintenance
- Regular review of page objects
- Update selectors when UI changes
- Refactor common patterns into utilities

## 🔍 Debugging

### Test Failures
1. Check screenshots in `cypress/screenshots/`
2. Review videos in `cypress/videos/`
3. Use `cy.debug()` for interactive debugging
4. Check network requests in Cypress UI

### Development Tips
- Use `TestUtils.logStep()` for clear test flow
- Take screenshots at key points
- Use `data-testid` attributes for stable selectors
- Mock external dependencies

## 📈 Scaling Considerations

### Performance
- Use `cy.session()` for login state management
- Implement parallel test execution
- Optimize test data setup/teardown

### Maintenance
- Regular dependency updates
- Code review process for test changes
- Automated test health monitoring

### Team Collaboration
- Clear naming conventions
- Comprehensive documentation
- Shared utilities and patterns
- Regular knowledge sharing sessions