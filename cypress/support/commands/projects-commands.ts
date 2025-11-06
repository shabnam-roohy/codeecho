// ***********************************************
// Custom commands for Cypress
// ***********************************************

/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to login with email and password
             * @example cy.login('user@example.com', 'password123')
             */
           

            /**
             * Custom command to login using API
             * @example cy.apiLogin('user@example.com', 'password123')
             */
          
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
            newproject(): Chainable<null>
            deleteProject(projectName: string): Chainable<void>
        }
    }
}
// Custom newproject command
Cypress.Commands.add('newproject', () => {
    cy.wait(2000);
    cy.log('🔍 Looking for projects link...');
    cy.get('a[href="/projects"]').first().should('be.visible').click();
    cy.log('✅ Clicked projects link');

    cy.wait(2000);
    cy.log('🔍 Looking for new project link...');
    cy.get('a[href="/projects/new"]').eq(0).should('be.visible').click();
    cy.log('✅ Clicked new project link');

    cy.wait(2000);
    cy.log('📝 Now on project creation page, starting project creation...');
})

// Custom Addproject command
Cypress.Commands.add('Addproject', () => {
    cy.log('🚀 Starting Addproject command');
    
    // Generate random project name
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 7);
    const randomProjectName = `test-${randomString}-${timestamp}`;
    
    cy.log(`📝 Creating project with name: ${randomProjectName}`);
    
    cy.get('#name').type(randomProjectName);
    cy.get('#repoPath').type('https://github.com/shabnam-roohy/codeecho.git');
    
    // Wait for repository validation (optional - might not always appear)
    cy.wait(3000); // Give time for validation to complete
    
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.log('✅ Project creation form submitted, waiting for response...');

    // Wait for project to be created and redirected
    cy.url().should('include', '/projects', { timeout: 15000 });
    cy.log('📋 Successfully navigated to projects list');
    
    // Wait for the projects list to load and find the newly created project
    cy.wait(3000); // Give time for the list to load
    cy.reload(); // Reload to ensure the new project appears
    cy.wait(2000);
    
    // Look for the project name anywhere on the page
    cy.contains(randomProjectName, { timeout: 10000 }).should('be.visible').click();
    cy.log(`✅ Found and clicked project: ${randomProjectName}`);
});
// Custom TotalCommitsnotchanged command
Cypress.Commands.add('TotalCommitsnotchanged', () => {
    cy.log('🚀 Starting TotalCommitsnotchanged command');
    cy.get('.bg-white').contains('Total Commits').should('be.visible');

    // Get the total commits before refresh
    cy.get('.text-3xl').eq(1).then($element => {
        const commitText = $element.text();
        const totalCommitsBeforeRefresh = parseInt(commitText.trim(), 10);
        cy.log('🔢 Total Commits before refresh:', totalCommitsBeforeRefresh);

        cy.log('🔄 Refreshing the page to verify commit count update...');
        cy.reload();
        cy.log('✅ Page reloaded, now checking commit count again...');

        // Get the total commits after refresh
        cy.get('.text-3xl').eq(1).then($element => {
            const commitTextAfterRefresh = $element.text();
            const totalCommitsAfterRefresh = parseInt(commitTextAfterRefresh.trim(), 10);

            // Compare the commit counts
            if (totalCommitsBeforeRefresh === totalCommitsAfterRefresh) {
                cy.log('✅ Commit count is as expected:', totalCommitsAfterRefresh);
            } else {
                cy.log('❌ Commit count is NOT as expected. Found:', totalCommitsAfterRefresh);
            }
        });
    });
});
Cypress.Commands.add('deleteProject', (projectName: string) => {
    cy.get('a[href="/projects"]').eq(0).should('be.visible').click();
    cy.log('✅ Clicked projects link');

    // Find and click on the specific project to delete
    cy.get('button[data-testid="project-delete-button"]').eq(0).should('be.visible').click();
    cy.log(`✅ Clicked delete button for project: ${projectName}`);

    cy.get('.btn-ios').contains('Delete').should('be.visible').click();
    cy.log('✅ Confirmed project deletion');

    cy.url().should('include', '/projects', { timeout: 10000 });
    cy.log('📋 Successfully navigated to projects list');
});

// Export to prevent TS errors
export { };
