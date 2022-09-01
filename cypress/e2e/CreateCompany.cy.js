/// <reference types="cypress"/>

it("Тест логина",() => {

    cy.visit ('/');

    cy.get('[type="email"]').type('admin@gmail.com');

    cy.get('[type="password"]').type('vI3iT581Lrh&');

    cy.get('span:contains(" LOG IN ")').click();

})

it("Тест создания компании",() => {

    cy.get('.navbar-item.has-dropdown').first().click();

    cy.get('a:contains("Campaigns")').click();

    cy.get('span:contains("Create new campaign")').click();

    cy.get('[placeholder="Campaign Name"]').type('Test');

    //Выбор нужного темплейта
    cy.get('select').select('Template');

    cy.get('button[type="submit"]').click();

    cy.get('div>textarea').type('Testing description');

    cy.get('div>input').last().type('chamlecks@gmail.com');

    cy.get('span:contains("Save")').click();

    cy.get('p.text:contains("Campaign created")');
})
    it("Удаление компании",() => {

     //удаление кампании
    cy.get('span:nth-child(4)').click();

    cy.get('span:contains("Delete")').click();

    cy.get('p.text:contains("Campaign deleted")');

    })

    