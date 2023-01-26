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
import 'cypress-file-upload'

Cypress.Commands.add('login', (
  username = 'admin@gmail.com',
  password = 'vI3iT581Lrh&'
) => {
  cy.session([username, password], () => {
    cy.visit('/')
    cy.get('[type="email"]').type(username);
    cy.get('[type="password"]').type(password);
    cy.get('span:contains(" LOG IN ")').click().wait(2000);
  },
  {
    validate(){
    cy.get('p:contains("Renex")').should('exist');
  },
  cacheAcrossSpecs: true,
 })
});

Cypress.Commands.add('uploadFile', { prevSubject: true }, (subject, fixturePath, mimeType) => {
  cy.fixture(fixturePath, 'base64').then(content => {
    Cypress.Blob.base64StringToBlob(content, mimeType).then((blob) => {
      const testfile = new File([blob], fixturePath, { type: mimeType });
      const dataTransfer = new DataTransfer();
      const fileInput = subject[0];

      dataTransfer.items.add(testfile);
      fileInput.files = dataTransfer.files;

      cy.wrap(subject).trigger('change', { force: true });
    });
  });
})

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

Cypress.Commands.add("exist", (selector) => {
    cy.get('body').should('exist').then(($body) => {
      return new Cypress.Promise((resolve, reject) => {
        if ($body.find(selector).length > 0) {
          console.log("cy.exist() - Matching element found in DOM!");
          resolve(true);
        } else {
          console.log("cy.exist() - Element did not exist!");
          resolve(false);
        }
      })
    })
  });

  

//   cy.exist('.mat-radio-outer-circle').then(exists => {
            
//     if (exists) {
        
//        //тоді клікаємо по цьому товару
       
//     } else {
//        //в іншому випадку клікаємо на кнопку яка відповідає за перехід на наступну сторінку
//     }

// })
