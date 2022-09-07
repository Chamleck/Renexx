import login from "./logIn.cy";
describe("createCompanies", function () {
    beforeEach(() => {
        cy.restoreLocalStorage();
    });

it("login", login);

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
     //
    cy.get('span:contains("Test")').parents('tr').find('.icon.cursor-pointer').click();

    cy.get('span:contains("Delete")').click();

    cy.get('p.text:contains("Campaign deleted")');

    })

    it("Деактивация/Активация",() => {

        cy.get('span:contains("Campaign")')
        //указываем родительский элемент для искомой кнопки
        .parents ('tr')
        //находим тег отвечающий за искомую кнопку
        .find('.check')
        
        .click()

        //cy.get('span:contains("Campaign")').find('.check').click()

        
        
   
       })
    })
    