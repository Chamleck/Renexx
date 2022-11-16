/// <reference types="cypress"/>

it("Вивчення Локаторів CSS",() => {

    cy.visit ('https://sanitarskyi-cypress-g2.herokuapp.com/commands/querying');

    // локатор css по названию тега
    cy.get('nav');

    // локатор css по назві атрибуту
    cy.get('[placeholder]');

    // локатор по назві атрибуту зі значенням
    cy.get('[placeholder="Email"]');

    // пошук елемента по id
    cy.get('#query-btn');
    cy.get('[id="query-btn"]');
    

    // пошук елементу за значенням класу
    cy.get('.btn-default');
    cy.get('[class="btn btn-default"]');
    cy.get('.btn.btn-default');


    cy.get('.nav.navbar-nav.pull-right');

    // пошук елементу по назві тегу та атрибуту
    cy.get('input[placeholder]');

     // пошук елементу по назві тегу та атрибуту зі значенням
     cy.get('input[placeholder="Email"]');

})


