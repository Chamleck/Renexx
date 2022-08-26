/// <reference types="cypress"/>

it("Тест логина",() => {

    cy.visit ('https://emails-dev.alpha-pram.com/login');

    cy.get('[type="email"]').type('admin@gmail.com');

    cy.get('[type="password"]').type('vI3iT581Lrh&');

    cy.get('span:contains(" LOG IN ")').click()

})