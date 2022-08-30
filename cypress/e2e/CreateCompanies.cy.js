it("Тест логина",() => {

    cy.visit ('https://emails-dev.alpha-pram.com/login');

    cy.get('[type="email"]').type('admin@gmail.com');

    cy.get('[type="password"]').type('vI3iT581Lrh&');

    cy.get('span:contains(" LOG IN ")').click();

})


it("Тест создания 1 компании",() => {

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
setTimeout(() => {
    
  }, 1000)

it("Тест создания 2 компании",() => {

    cy.get('.navbar-item.has-dropdown').first().click();

    cy.get('a:contains("Campaigns")').click();

    cy.get('span:contains("Create new campaign")').click();

    cy.get('[placeholder="Campaign Name"]').type('Test2');

    //Выбор нужного темплейта
    cy.get('select').select('Template');

    cy.get('button[type="submit"]').click();

    cy.get('div>textarea').type('Testing description');

    cy.get('div>input').last().type('nickolas.kolotkov@gmail.com');

    cy.get('span:contains("Save")').click();

    cy.get('p.text:contains("Campaign created")');

    cy.get('span:contains("Test2")');




})