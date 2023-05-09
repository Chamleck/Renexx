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
import sessionData from '../fixtures/sessionData.json'
//додаємо команду логін яка буде зберігати данні сесії, в дужках треба додати id як аргумент
// а також юзернейм та пароль
Cypress.Commands.add('login', (id, username = 'admin@gmail.com', password = 'vI3iT581Lrh&') => {
//создаем объект который называем requestBody в этом объекте есть значение user: в котором хранится еще один объект с пустыми email: и password:
let requestBody = {email: "", password: ""};
//тут обращаемся к значению email в созданной переменной requestBody и задаем значение из файла user
     requestBody.email = username;
     requestBody.password = password;  
//в cy.session передаэмо id
  cy.session(id, () => {
 //тут делаем реквест с методом POST, с эндпоинтом /api/users/login и с нашим объектом который хранится в переменной requestBody
  cy.request('POST', 'https://emails-dev-api.alpha-pram.com/user/auth/login', requestBody).then( response => {
  // тут создаем переменную token которая получит значение из тела ответа в котором у юзера есть еще токен
  let token = response.body.accessToken;
  // сетим этот токен в localStorage
  window.localStorage.setItem('accessToken', token)
    
  // командой window обращаемся к localStorage, командой setItem в скобках указываем ключ и значение которое из джейсона преобразуем в строку
  window.localStorage.setItem('storeId', sessionData.storeId);  
  }, {
    //вмикаэмо налаштування щоб кеш зберігався поміж сесіями
    cacheAcrossSpecs: true,
  })
 })
});

//команди аналогічні тасці яка знаходиться в сайпрес конфіг
//об'являємо порожню змінну 
let id
//в цій команді присвоюємо змінній id значання яке в аргументі команди
Cypress.Commands.add('setId',(value) =>{
 id = value
 //повертаємо id
 return id
});
//команда щоб дістати id просто повертає id який був наданий в попередній команді
Cypress.Commands.add('getId',() =>{
 return id
});

let data

Cypress.Commands.add('setData',(value) =>{
 data = value
 //повертаємо id
 return data
});

Cypress.Commands.add('getData',() =>{
 return data
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
