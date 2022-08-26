/// <reference types="cypress"/>

it("Тест логина",() => {

    cy.visit ('https://emails-dev.alpha-pram.com/login');

    cy.get('[type="email"]').type('admin@gmail.com');

    cy.get('[type="password"]').type('vI3iT581Lrh&');

    cy.get('span:contains(" LOG IN ")').click();

})

it("Тест создания компании",() => {

    cy.get('.navbar-item.has-dropdown').first().click();

    cy.get('a:contains("Campaigns")').click();

    cy.get('span:contains("Create new campaign")').click();

    cy.get('[placeholder="Campaign Name"]').type('Test');

    //cy.get('span.select').click();
    cy.get('select').select('Template');

    cy.get('button[type="submit"]').click();

    cy.get('div>textarea').type('Testing description');

    cy.get('div>input').last().type('chamlecks@gmail.com');

    cy.get('span:contains("Save")').click();

})