import {loginPage} from '../../../support/pageObject/auth/login-PO';

describe('Login Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('should login with data from fixture file using page object', () => {
    // Use environment variables if available, otherwise use fixture
    const email = Cypress.env('TEST_EMAIL');
    const password = Cypress.env('TEST_PASSWORD');
    
    if (email && password) {
      // Use credentials from environment (CI/CD)
      cy.log('Using credentials from environment variables');
      loginPage.fillEmail(email);
      loginPage.fillPassword(password);
      loginPage.submit();
      cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
    } else {
      // Use credentials from fixture (local development)
      cy.fixture('test-data').then((testData) => {
        const user = testData.validUser;
        loginPage.fillEmail(user.email);
        loginPage.fillPassword(user.password);
        loginPage.submit();
        cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
      });
    }
  });
});