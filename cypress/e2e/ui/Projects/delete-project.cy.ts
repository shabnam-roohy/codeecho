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
      
      // generate a project name in scope and delete it
      const randomProjectName = `project-${Date.now()}`;
      cy.deleteProject(randomProjectName);
    });
  });
});