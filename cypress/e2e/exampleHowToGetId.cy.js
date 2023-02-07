/// <reference types="cypress"/>

import {html,text,textCheck} from '../fixtures/htmlTemplate.js'
import mainPage from '../support/Pages/MainPage';
import templatesPage from '../support/Pages/TemplatesPage';
import templateEditorPage from '../support/Pages/TemplateEditorPage.js';
import settings from '../fixtures/templateSettings.json';


describe("Templates", function () {

    before(() => {

    cy.login('testId')
  })

    it("Создание темплейта",()=>{
        cy.login('testId')
        cy.visit('https://emails-dev.alpha-pram.com/');
        mainPage.openTemplatesPage();
        templatesPage.getDefaultTemplate().should('exist');
        templatesPage.addNewTemplate();
        //перехоплюємо запит який буде містити айді темплейту у респонсі і передаємо
        //його далі за допомогою .as('id') під id розуміється весь респонс
        cy.intercept('POST','**/templates').as('id')
        templateEditorPage.createTemplate('abc123','Custom');
        templatesPage.getCustomTemplate('Custom').should('exist');
    //чекаємо коли з'явиться наш запит .then беремо цей реквест
    //і дістаємо з нього що потрібно , тільки через cy.wait можна дістати
    //з інтерсепту тіло респонсу   
    cy.wait('@id').then((request)=>{
    cy.log(JSON.stringify(request.response.body.id))
    let id = request.response.body.id
   // cy.task('setMyUniqueId', id)
   cy.setId(id)
})
    });

    

    it("Открытие созданного темплейта",()=>{
        cy.login('testId')
        //команди по збереженню змінної та передачї її в інше місце працюють тільки 
        // з .then мабуть тому що пов'язано з резолвом промісу
        cy.getId().then((id)=>{
       // cy.task('getMyUniqueId').then((id)=>{
        cy.visit(`https://emails-dev.alpha-pram.com/templates/${id}`)
        templatesPage.getCustomTemplate('Custom').should('exist');
        templatesPage.editTemplate('Custom');
        templateEditorPage.unwarpHeader();
   // })
})

    settings.forEach(({font, allign, list, size, allignCheck, listCheck}, index) =>{


        cy.log(`**Редактирование темплейта # ${index}, проверка элементов**`)

    
        templateEditorPage.editHeader(font, allign, list, size);

        templateEditorPage.getHeaderText('abc123').then(text=>{

            expect(text).to.have.css('text-align').to.eq(allignCheck);    
        })
        templateEditorPage.getSpanWithSettings('abc123').then(text=>{

            expect(text).to.have.css('font-size').to.eq(size);
            expect(text).to.have.css('font-family').to.eq(font);
        })
        templateEditorPage.getListTagInHeader(listCheck).then(listType=>{

            expect(listType).to.exist;
        })


      })
   

    settings.forEach(({heading},index) =>{

    cy.log(`**Редактирование и проверка хединга # ${index}**`)

        templateEditorPage.editHeading(heading);
        
        templateEditorPage.getHeadingTag(heading).then(headingTag=>{

            expect(headingTag).to.exist;
        })
      })
   

   cy.log(`**Применение настроек к тексту**`)
    

    templateEditorPage.editTextStyle('5');

    templateEditorPage.getHeadingTag('5').then(tag=>{
       cy.wrap(tag).find('strong').should('exist');
       cy.wrap(tag).find('em').should('exist');
       cy.wrap(tag).find('s').should('exist');
       cy.wrap(tag).find('u').should('exist');
       expect(tag).to.have.css('direction').to.eq('rtl');
    })

    templateEditorPage.clickQuotesBtn();
    templateEditorPage.getQuotesTag().should('exist');
    templateEditorPage.clickHighlightingBtn();
    templateEditorPage.getHighlightedTag().should('exist');
    templateEditorPage.clickHighlightingBtn();
    templateEditorPage.typeTextInHeader('abc123');
    templateEditorPage.clickFirstXSetting();
    templateEditorPage.getHeaderInput().find('sub').should('exist')
    templateEditorPage.clickSecondXSetting();
    templateEditorPage.getHeaderInput().find('sup').should('exist')
    //templateEditorPage.activatingLink();

   


   cy.log("**Сохранение отредактированного темплейта, затем удаление**")

    mainPage.openTemplatesPage();
    templateEditorPage.savingTemplateByLeavingPage();
    templatesPage.removeTemplate('Custom');
    templatesPage.getCustomTemplate('Custom').should('not.exist');

});

 it("**Создание темплейта с помощью HTML, добавление шорткатов, проверка превью**",()=>{

    cy.login('testId')
    cy.visit('https://emails-dev.alpha-pram.com/templates/')
    templatesPage.getDefaultTemplate().should('exist');
    templatesPage.addNewTemplate();
    templateEditorPage.createTemplateWithHtml(html.header,html.body,html.footer,'Custom');
    templateEditorPage.getHeaderInput().should('contain', text.header);
    templateEditorPage.getBodyInput().should('contain', text.body);
    templateEditorPage.getFooterInput().should('contain', text.footer);
    templateEditorPage.addShortcut('Contact Us','Contact Us 1');
    templateEditorPage.addShortcut('Amazon Order Link','Amazon Order 1');
    templateEditorPage.addShortcut('Feedback Link','Leave your feedback 1');
    templateEditorPage.openPreview();
    templateEditorPage.getLetterInfoContainer(0).should('contain', 'Renex- Amazon Marketplace  * All test emails will be sent from support@pramsystem.com ');
    templateEditorPage.getLetterInfoContainer(2).should('contain', 'admin@gmail.com');
    templateEditorPage.getLetterInfoContainer(3).should('contain', 'Hello');
    templateEditorPage.getShortcutInPreview('Contact Us 1').should('exist');
    templateEditorPage.getShortcutInPreview('Amazon Order 1').should('exist');
    templateEditorPage.getShortcutInPreview('Leave your feedback 1').should('exist');
    templateEditorPage.getGreetingInPreview('Hello Dear Customer!').should('exist');
    templateEditorPage.getTextInPreview(textCheck.header).should('exist');
    templateEditorPage.getTextInPreview(textCheck.body1).should('exist');
    templateEditorPage.getTextInPreview(textCheck.body2).should('exist');
    templateEditorPage.getTextInPreview(textCheck.footer).should('exist');
    templateEditorPage.closePreview();
    templateEditorPage.savingEditedHeader();
    templateEditorPage.saveTemplate('Custom');
    templatesPage.getCustomTemplate('Custom').should('exist');
    templatesPage.clickEditBtn('Custom');
    templateEditorPage.addImage('cypress/fixtures/testFiles/testPic.jpg');
    cy.wait(10000);
    cy.get('[title="testPic.jpg"]',{timeout:2000});

});

});
