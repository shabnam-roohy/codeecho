// ***********************************************
// Custom commands for Cypress
// ***********************************************

/// <reference types="cypress" />

// Import project commands
import './commands/projects-commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with email and password
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>
      
      /**
       * Custom command to login using API
       * @example cy.apiLogin('user@example.com', 'password123')
       */
      apiLogin(email: string, password: string): Chainable<void>
      apiLoginviaui(email: string, password: string): Chainable<void>
      /**
       * Generate random email
       * @example cy.generateRandomEmail()
       */

      
      /**
       * Generate random password
       * @example cy.generateRandomPassword()
       */
     
      
      /**
       * Add project command
       * @example cy.Addproject('project-name')
       */
      Repo(projectName: string): Chainable<void>
      Addproject(): Chainable<null>
        TotalCommitsnotchanged(): Chainable<null>
    }
  }
}

// Custom login command
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('apiLogin', (email: string, password: string) => {
    // Get API URL from environment variable
    const apiUrl = Cypress.env('API_URL') || 'https://codeecho.io/api';
    
    // Make API request using environment variable
    cy.request({
        method: 'POST',
        url: `${apiUrl}/auth/login`,
        body: {
            email: email,
            password: password
        },
        failOnStatusCode: false
    }).then((response) => {
        if (response.status === 200) {
            expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('user');
            expect(response.body.user.email).to.eq(email);
            cy.log(`✅ Login successful using API: ${apiUrl}/auth/login`);
        } else {
            cy.log(`⚠️ API endpoint not available: ${apiUrl}/auth/login`);
            cy.log(`Response status: ${response.status}`);
            cy.log(`Response body: ${JSON.stringify(response.body)}`);
        }
    });
});

Cypress.Commands.add('apiLoginviaui', (email: string, password: string) => {
    // Get API URL from environment variable
    const apiUrl = Cypress.env('API_URL') || 'https://codeecho.io/api';

    // Set up intercept to capture the login API request
    cy.intercept('POST', `**/auth/login`, {
        statusCode: 200,
        body: {
            token: 'mock-jwt-token-ui-12345',
            user: {
                email: email,
                id: 1,
                name: 'Test User'
            },
            message: 'Login successful via UI'
        }
    }).as('loginRequest');

    // Visit login page and perform UI login
    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
});





Cypress.Commands.add('Repo', (repositoryName: string) => {
  
    cy.get('div.grid button').each(($el, index, $list) => {
        const text = $el.text().trim();
        cy.log(`Button ${index + 1}: ${text}`);
        if (text === repositoryName[0]) {
            cy.wrap($el).click();
        }
    });
});

// Export to prevent TS errors
export {};
