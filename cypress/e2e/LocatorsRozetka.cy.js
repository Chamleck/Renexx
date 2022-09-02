/// <reference types="cypress"/>

it.skip("Вивчення Локаторів CSS",() => {

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

it.skip("Вивчення локаторів CSS на Rozetka", () => {
    cy.visit('https://rozetka.com.ua/');

    // пошук елементу за назвою тегу та двома атрибутами
    cy.get('div[class="tile__inner"][data-goods-id="347871891"]');

    // пошук елементу за його дочірніми елементами
    cy.get('rz-sidebar-fat-menu > div > ul > li');
})

it("Вивчення локаторів CSS на automation", () => {
    cy.visit('https://automationteststore.com/');

    // пошук елементу за його дочірніми елементами не по порядку
    cy.get('#featured div.col-md-3.col-sm-6.col-xs-12');

    // пошук по першій частині значення атрибуту
    cy.get('a[title^="BeneFit"]');

    // пошук по всьому значенню атрибута
    cy.get('a[title*="Girl"]');

    // пошук по останній частині значення атрибуту
    cy.get('a > img[src$=".jpg"]');
    
    // пошук першого елементу серед інших такого ж типу
    cy.get('#featured div.col-md-3.col-sm-6.col-xs-12:first-of-type')

    // пошук першого елементу серед інших такого ж типу
    cy.get('#featured div.col-md-3.col-sm-6.col-xs-12:last-of-type')

    // пошук елементу за номером серед інших такого ж типу
    cy.get('#featured div.col-md-3.col-sm-6.col-xs-12:nth-child(4)')

    // пошук елементу за текстом що міститься в середині тегу
    cy.get('a:contains("Skinsheen")')
})

it.skip("Примеры поиска элементов",() => {
    // находим кнопку с помощью уникального айди который находится в дом структуре где есть искомая кнопка.
    cy.get('#inputEmail13')
    //указываем родительский элемент для искомой кнопки
    .parents ('form')
    //находим тег отвечающий за искомую кнопку
    .find('button')
    //Удостоверимся что эта кнопка содержит сайн ин
    .should('contain','Sign in')
    //указываем родителя снова для поиска еще одного элемента
    .parents('form') 
    // Ищем этот элемент
    .find('nb-checkbox')
    // нажимаем
    .click()
    //Тут ищем по названию блока горизонтал форм и внутри него ищем атрибут с значением имейл правда не понятно зачем тут тег нб кард
    cy.contains('Horizontal form','nb-card').find([type="Email"])
