import {loginPage} from '../../../support/pageObject/auth/login-PO';

describe('Login Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('should login with data from fixture file using page object', () => {
    cy.fixture('test-data').then((testData) => {
      const user = testData.validUser;
      loginPage.fillEmail(user.email);
      loginPage.fillPassword(user.password);
      loginPage.submit();
      cy.contains('Dashboard').should('be.visible');
    });
  });
});