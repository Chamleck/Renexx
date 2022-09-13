// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const LOCAL_STORAGE_MEMORY = {};

function localStorageRestore() {

    Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
}

Cypress.Commands.add("saveLocalStorage", (localStorage) => {
    Object.keys(localStorage).forEach((key) => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add('restoreLocalStorage', () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

Cypress.on('window:before:load', () => {
    localStorageRestore();
});

Cypress.on('url:changed', () => {
    localStorageRestore();
});

Cypress.on('before:url:changed', () => {
    localStorageRestore();
});

Cypress.Commands.add('RemoveCampaign', () => {

cy.get('span:contains("Test")').parents('tr').find('.icon.cursor-pointer').click();

cy.get('span:contains("Delete")').click();

cy.get('p.text:contains("Campaign deleted")');

    });
