class LogoutPage {
  logout() {
     cy.get('button[aria-haspopup="menu"]').click();
    cy.get('button').contains('Sign Out').click();

  }
}
export const logoutPage = new LogoutPage();