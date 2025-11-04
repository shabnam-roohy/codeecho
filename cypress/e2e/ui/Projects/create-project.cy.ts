import { loginPage } from '../../../support/pageObject/auth/login-PO';

describe('Create Project Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it.only('create new project', () => {
    cy.fixture('test-data').then((testData) => {
      const user = testData.validUser;
      loginPage.fillEmail(user.email);
      loginPage.fillPassword(user.password);
      loginPage.submit();
      // Verify successful login
      cy.contains('Dashboard').should('be.visible');
      cy.log('✅ Login successful, now navigating to projects');
    });
    
    // Navigate to new project page
    cy.newproject();
    
    // Create project using the custom command
    cy.log('🚀 About to call cy.Addproject()');
    cy.Addproject();
    
    // Verify commits haven't changed
    cy.TotalCommitsnotchanged();
 
    
    // Create the project (without deletion for now)
    
  });
});