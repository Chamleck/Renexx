/// <reference types="cypress"/>

import {html, text, textCheck} from '../fixtures/htmlTemplate.js'
import mainPage from '../support/Pages/MainPage';
import templatesPage from '../support/Pages/TemplatesPage';
import templateEditorPage from '../support/Pages/TemplateEditorPage.js';
import settings from '../fixtures/templateSettings.json';


describe("Templates", () => {

    before(() => {
        cy.login('testId');
    })

    it("Создание темплейта", () => {
        cy.login('testId');
        cy.visit('https://emails-dev.alpha-pram.com/');

        mainPage.openTemplatesPage();
        templatesPage.getDefaultTemplate().should('exist');
        templatesPage.addNewTemplate();
        templateEditorPage.createTemplate('abc123', 'Custom');
        templatesPage.getCustomTemplate('Custom').should('exist');
    });


    it("Открытие созданного темплейта и редактирование", () => {
        cy.login('testId');
        cy.visit(`https://emails-dev.alpha-pram.com/templates`);

        templatesPage.getCustomTemplate('Custom').should('exist');
        templatesPage.editTemplate('Custom');
        templateEditorPage.unwarpHeader();


        settings.forEach(({font, allign, list, size, allignCheck, listCheck}, index) => {


            cy.log(`**Редактирование темплейта # ${index}, проверка элементов**`)


            templateEditorPage.editHeader(font, allign, list, size);

            templateEditorPage.getHeaderText('abc123').then(text => {
                expect(text).to.have.css('text-align').to.eq(allignCheck);
            })
            templateEditorPage.getSpanWithSettings('abc123').then(text => {
                expect(text).to.have.css('font-size').to.eq(size);
                expect(text).to.have.css('font-family').to.eq(font);
            })
            templateEditorPage.getListTagInHeader(listCheck).then(listType => {
                expect(listType).to.exist;
            })

        })


        settings.forEach(({heading}, index) => {

            cy.log(`**Редактирование и проверка хединга # ${index}**`)

            templateEditorPage.editHeading(heading);

            templateEditorPage.getHeadingTag(heading).then(headingTag => {
                expect(headingTag).to.exist;
            })
        })


        cy.log(`**Применение настроек к тексту**`)


        templateEditorPage.editTextStyle('5');

        templateEditorPage.getHeadingTag('5').then(tag => {
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
        templateEditorPage.removeLastHeader();
        templateEditorPage.removeLastFooter();
        mainPage.openTemplatesPage();
        templateEditorPage.savingTemplateByLeavingPage();
        templatesPage.removeTemplate('Custom');
        templatesPage.getCustomTemplate('Custom').should('not.exist');

    });

    it("Создание темплейта с помощью HTML, добавление шорткатов, проверка превью", () => {

        cy.login('testId');
        cy.visit('https://emails-dev.alpha-pram.com/templates/');

        templatesPage.getDefaultTemplate().should('exist');
        templatesPage.addNewTemplate();
        templateEditorPage.createTemplateWithHtml(html.header, html.body, html.footer, 'Custom');
        templateEditorPage.getHeaderInput().should('contain', text.header);
        templateEditorPage.getBodyInput().should('contain', text.body);
        templateEditorPage.getFooterInput().should('contain', text.footer);
        templateEditorPage.addShortcut('Contact Us', 'Contact Us 1');
        templateEditorPage.addShortcut('Amazon Order Link', 'Amazon Order 1');
        templateEditorPage.addShortcut('Feedback Link', 'Leave your feedback 1');
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

    })

    it("Добавление файлов в HTML темплейт, проверка наличия файлов в превью", () => {

        cy.login('testId');
        cy.visit('https://emails-dev.alpha-pram.com/templates/');

        templatesPage.getCustomTemplate('Custom').should('exist');
        templatesPage.clickEditBtn('Custom');
        templateEditorPage.addImage('cypress/fixtures/testFiles/testPic.png');
        templateEditorPage.addDoc('cypress/fixtures/testFiles/testDoc.pdf');
        templateEditorPage.clickPic();
        templateEditorPage.clickDoc();
        templateEditorPage.getPic().should('exist');
        templateEditorPage.getDoc().should('exist');
        templateEditorPage.openPreview();
        templateEditorPage.getDocInPreview('testDoc.pdf').should('exist');
        templateEditorPage.getPicInPreview().should('exist');
        templateEditorPage.closePreview();
        templateEditorPage.removePicOrDoc(1);
        templateEditorPage.removePicOrDoc(0);
        templateEditorPage.getToastr('File Deleted!').should('exist');
        mainPage.openTemplatesPage();
        templateEditorPage.savingTemplateByLeavingPage();

    });

    it("Добавление кастомных шорткатов и проверка их отображения в темплейтах", () => {

        cy.login('testId');
        cy.visit('https://emails-dev.alpha-pram.com/templates/');
        templatesPage.addNewTemplate();
        templateEditorPage.createTemplate('Shortcut test', 'Custom1');
        templatesPage.editTemplate('Custom1');
        templateEditorPage.unwarpHeader();
        templateEditorPage.unwarpFooter();
        templateEditorPage.addShortcut('Contact Us', 'Contact Us 0');
        templateEditorPage.addShortcut('Amazon Order Link', 'Amazon Order 0');
        templateEditorPage.addShortcut('Feedback Link', 'Leave your feedback 0');
        templateEditorPage.savingEditedHeader();
        templateEditorPage.openPreview();
        templateEditorPage.getShortcutInPreview('Contact Us 0').should('exist');
        templateEditorPage.getShortcutInPreview('Amazon Order 0').should('exist');
        templateEditorPage.getShortcutInPreview('Leave your feedback 0').should('exist');
        templateEditorPage.closePreview();
        templateEditorPage.selectTemplate('Custom');
        templateEditorPage.savingTemplateByLeavingPage();
        templateEditorPage.openPreview();
        templateEditorPage.getShortcutInPreview('Contact Us 1').should('exist');
        templateEditorPage.getShortcutInPreview('Amazon Order 1').should('exist');
        templateEditorPage.getShortcutInPreview('Leave your feedback 1').should('exist');
        templateEditorPage.closePreview();
        templateEditorPage.removeHeader('Custom1');
        templateEditorPage.getToastr('Failed! header not deleted').should('exist');
        templateEditorPage.removeFooter('Custom1');
        templateEditorPage.getToastr('Failed! footer not deleted').should('exist');
        templateEditorPage.editTemplateName('Custom0');
        templateEditorPage.editHeaderName('Custom0');
        templateEditorPage.editFooterName('Custom0');
        templateEditorPage.getTemplateSelector().should('contain', 'Custom0');
        templateEditorPage.getHeaderSelect().should('contain', 'Custom0');
        templateEditorPage.getFooterSelect().should('contain', 'Custom0');
        templateEditorPage.editTextInTemplate('Edited text');
        templateEditorPage.saveTemplateAsCopy('Save');
        templateEditorPage.getHeaderSelect().should('contain', 'Custom0:copy');
        templateEditorPage.getFooterSelect().should('contain', 'Custom0:copy');
        templateEditorPage.saveTemplate('Custom:copy');
        templatesPage.removeTemplate('Custom1');
        templatesPage.removeTemplate('Custom0');
        templatesPage.removeTemplate('Custom:copy');
        templatesPage.editTemplate('Template');
        templateEditorPage.removeHeader('Custom1');
        templateEditorPage.removeHeader('Custom0');
        templateEditorPage.removeHeader('Custom0:copy');
        templateEditorPage.removeFooter('Custom1');
        templateEditorPage.removeFooter('Custom0');
        templateEditorPage.removeFooter('Custom0:copy');
    });

});
