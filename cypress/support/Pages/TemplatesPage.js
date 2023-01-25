/// <reference types="cypress"/>

import BasePage from "./BasePage";

class TemplatesPage extends BasePage{
    getNewTemplateBtn(){
        return cy.get('span:contains("New Template")');
    }

    getDefaultTemplate(){
        return cy.get('div:contains("Template")')
        .find('.label-default');
    }

    getCustomTemplate(templateName){
        return cy.get(`tbody>tr:contains("${templateName}")`);
    }

    getCustomTemplateEditBtn(templateName){
        return cy.get(`tbody>tr:contains("${templateName}")`)
        .find('.mdi-pencil');
    }

    getEditTemplateBtn(templateName){
        return cy.get(`tbody>tr:contains("${templateName}")`)
        .find('.mdi-pencil');
    }

    getDeleteTemplateBtn(templateName){
        return cy.get(`tbody>tr:contains("${templateName}")`)
        .find('.mdi-delete');
    }

    getDeleteBtn(){
        return cy.get('button:contains("Delete")');
    }

    addNewTemplate(){
        cy.log('**Clicking "New Template" btn**');
        this.getNewTemplateBtn().click();
    }

    editTemplate(templateName){
        cy.log(`**Editing ${templateName} template**`);
        this.getEditTemplateBtn(templateName).click();
    }

    removeTemplate(templateName){
        cy.log(`**Removing ${templateName} template**`);
        this.getDeleteTemplateBtn(templateName).click();
        cy.log(`**Pushing Delete Btn**`);
        this.getDeleteBtn().click();

    }

    clickEditBtn(templateName){
        cy.log(`**Clicking edit button of template**`);
        this.getCustomTemplateEditBtn(templateName).click();
    }

}
export default new TemplatesPage();