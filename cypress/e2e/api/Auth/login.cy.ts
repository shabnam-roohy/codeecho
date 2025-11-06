describe('Login API Tests', () => {
    
    it('should login using API with data from fixture file', () => {
        // Load data from fixture file
        cy.fixture('test-data').then((testData) => {
            const user = testData.validUser;
            
            // Call API login command with intercept
            cy.apiLogin(user.email, user.password);
            
           
        });
    });

    it('should login via UI', () => {
        // Load data from fixture file
        cy.fixture('test-data').then((testData) => {
            const user = testData.validUser;
            cy.apiLoginviaui(user.email, user.password);
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
        });
    });
})