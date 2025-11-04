import { loginPage } from '../../../support/pageObject/auth/login-PO';
import { logoutPage } from '../../../support/pageObject/auth/logout_PO';

describe('Logout Functionality', () => {
  beforeEach(() => {
    // Visit the login page using baseUrl from .env
    loginPage.visit();
    cy.fixture('test-data').then((testData) => {
        const user = testData.validUser;
        loginPage.fillEmail(user.email);
        loginPage.fillPassword(user.password);
        loginPage.submit();
    })
  });
it('user should be log out after login', () => {
        // Try to logout (skip the menu button click for now)
        logoutPage.logout();
        cy.contains('Sign in').should('be.visible');
      
   });
})