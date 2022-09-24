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

    });

    it("Тест создания 2 компании",() => {

        cy.get('.navbar-item.has-dropdown').first().click();

        cy.get('a:contains("Campaigns")').click();

        cy.get('span:contains("Create new campaign")').click();

        cy.get('[placeholder="Campaign Name"]').type('quest');

        //Выбор нужного темплейта
        cy.get('select').select('Template');

        cy.get('button[type="submit"]').click();

        cy.get('div>textarea').type('Testing description');

        cy.get('div>input').last().type('nickolas.kolotkov@gmail.com');

        cy.get('span:contains("Save")').click();

        cy.get('p.text:contains("Campaign created")');

        cy.get('span:contains("quest")');

    });

    it("Тест фильтрации через окошко",() => {
            
        cy.get('[autocomplete="on"]')
        .type('quest')
        .should('contain.value', 'quest')

        //находим слово Campaign в теге span 
        cy.get('span:contains("Campaign")')
        //указываем в каком родительском элементе есть это слово
        .parents('.table-wrapper')
        //пробуем найти указанные слова в тегах span
        .find('span.has-text-weight-bold:contains("Campaign"),span:contains("Test")',)
        //и создаем условия что они не должны быть найдены
        .should('not.exist')

        cy.get('[autocomplete="on"]').clear()

    });

        it("Тест фильтрации активных компаний",() => {

            cy.get('.button>span:contains("Active")').click();

            //находим слово Campaign в теге span 
            cy.get('span:contains("Campaign")')
            //указываем в каком родительском элементе есть это слово
            .parents('.table-wrapper')
            //пробуем найти указанные слова в тегах span
            .find('span:contains("Test"), span:contains("quest")')
            //и создаем условия что они не должны быть найдены
            .should('not.exist');
            

    });

    it("Тест фильтрации не активных компаний",() => {

        cy.get('.mdi.mdi-close-circle').first().click()

        cy.get('.button>span:contains("Inactive")').click()

        //находим слово Campaign в теге span 
        cy.get('span:contains("Campaign")')
        //указываем в каком родительском элементе есть это слово
        .parents('.table-wrapper')
        //пробуем найти указанные слова в тегах span
        .find('span.has-text-weight-bold:contains("Campaign")')
        //и создаем условия что они не должны быть найдены
        .should('not.exist')
        //Ищем две кампании с соответствующими названиями
        cy.get('span:contains("Test"), span:contains("quest")')
    });

    it("Тест фильтрации дефолтных компаний",() => {

        cy.get('.mdi.mdi-close-circle').first().click()

        cy.get('.button>span:contains("Default")').click()

        //находим слово Campaign в теге span 
        cy.get('span:contains("Campaign")')
        //указываем в каком родительском элементе есть это слово
        .parents('.table-wrapper')
        //пробуем найти указанные слова в тегах span
        .find('span.has-text-weight-bold:contains("Campaign")')
        
    });

    it("Тест фильтрации кастомных компаний",() => {

        cy.get('.mdi.mdi-close-circle').first().click()

        cy.get('.button>span:contains("Custom")').click()

        //находим слово Campaign в теге span 
        cy.get('span:contains("Campaign")')
        //указываем в каком родительском элементе есть это слово
        .parents('.table-wrapper')
        //пробуем найти указанные слова в тегах span
        .find('span.has-text-weight-bold:contains("Campaign")')

        .should('not.exist')
        //Ищем две кампании с соответствующими названиями
        cy.get('span:contains("Test"), span:contains("quest")')

        cy.get('.mdi.mdi-close-circle').first().click()
        
    });

    it("Деактивация/Активация",() => {

        /*cy.get('span:contains("Campaign")')
        //указываем родительский элемент для искомой кнопки
        .parents ('tr')
        //находим тег отвечающий за искомую кнопку
        .find('.check')
    
        .click()

        
*/
        cy.get('span.has-text-weight-bold:contains("Campaign")')
        //указываем в каком родительском элементе есть это слово
        .parents('tr')
        //пробуем найти указанные слова в тегах span
        .find('span.check')

        .click()

        cy.get('p.text:contains("Campaign edited")')

        cy.get('p.text:contains("Campaign edited")');
       });

    it("Удаление компани Test",() => {
        cy.get('span:contains("Test")')
        .parents('tr')
        .find('.icon.cursor-pointer').eq(0)
        .invoke('attr', 'style', 'visibility: visible')
        .click();

        cy.get('span:contains("Delete")').click();
    
        cy.get('p.text:contains("Campaign deleted")');

    });

    it("Удаление компани quest",() => {

        cy.get('span:contains("quest")').parents('tr').click().find('.icon.cursor-pointer').click();

        cy.get('span:contains("Delete")').click();
    
        cy.get('p.text:contains("Campaign deleted")');

    
        });
});
