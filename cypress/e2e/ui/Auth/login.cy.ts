import {loginPage} from '../../../support/pageObject/auth/login-PO';

describe('Login Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('should login with data from fixture file using page object', () => {
    // Use environment variables if available, otherwise use fixture
    const email = Cypress.env('TEST_EMAIL');
    const password = Cypress.env('TEST_PASSWORD');
    
 
      cy.log('Using credentials from environment variables');
      loginPage.fillEmail(email);
      loginPage.fillPassword(password);
      loginPage.submit();
      cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');

    
  });
});