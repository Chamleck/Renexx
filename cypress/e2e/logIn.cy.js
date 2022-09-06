function login() {
    cy.visit ('/');

    cy.get('[type="email"]').type('admin@gmail.com');

    cy.get('[type="password"]').type('vI3iT581Lrh&');

    cy.get('span:contains(" LOG IN ")').click().wait(3000).should(() => {

        cy.saveLocalStorage(localStorage);
    });
}


export default login;