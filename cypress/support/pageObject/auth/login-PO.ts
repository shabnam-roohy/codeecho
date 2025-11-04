class LoginPage {
    visit() {
        cy.visit('/login');
    }

    fillEmail(email: string) {
        cy.get('#email').type(email);
    }

    fillPassword(password: string) {
        cy.get('#password').type(password);
    }

    submit() {
        cy.get('button[type="submit"]').click();
    }
}

export const loginPage = new LoginPage();
