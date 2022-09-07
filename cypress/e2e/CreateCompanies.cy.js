import login from "./logIn.cy";

describe("createCompanies", function () {
    beforeEach(() => {
        cy.restoreLocalStorage();
    })
    it("login", login);

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
        it("Тест фильтрации активных компаний",() => {

            cy.get('.button>span:contains("Active")').click()

            //находим слово Campaign в теге span 
            cy.get('span:contains("Campaign")')
            //указываем в каком родительском элементе есть это слово
            .parents('.table-wrapper')
            //пробуем найти указанные слова в тегах span
            .find('span:contains("Test"), span:contains("Test2")')
            //и создаем условия что они не должны быть найдены
            .should('not.exist');


        


    })
});
