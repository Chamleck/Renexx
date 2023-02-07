/// <reference types="cypress"/>

import {login,createCampaign,removeCampaign} from '../support/helper.js';
import campaignsPage from '../support/Pages/CampaignsPage';
import campaignEditorPage from '../support/Pages/CampaignEditorPage';
import btns from '../fixtures/radioBtns.json';

describe("create Company", function () {
    before(() => {
        cy.login('testId');
    });

  


    it("Тест создания компании", () => {
    cy.login('testId');
    cy.visit('https://emails-dev.alpha-pram.com/');
    createCampaign('Test','Template','Description','chamlecks@gmail.com')
})

it("Тест редактирования кампании", ()=>{
    cy.login('testId');
    cy.visit('https://emails-dev.alpha-pram.com/campaigns/');
    campaignsPage.pushEditCampaignButton('Test')
    campaignEditorPage.selectDelay('1 day')
    campaignEditorPage.selectTiming('12:00 PM')
    campaignEditorPage.clickAddRule()
    campaignEditorPage.clickSpecificBrandRule()
    campaignEditorPage.addSpecificBrand('DEWALT')
    campaignEditorPage.clickAddRule()
    campaignEditorPage.clickSpecificProductRule()
    campaignEditorPage.addSpecificProduct('AC123')
    campaignEditorPage.selectRadioBtn(btns.contain)
    campaignEditorPage.getRadioBtn(btns.contain)
    .should('be.enabled')
    campaignEditorPage.clickSaveBtn()
    
})

it("Тест удаления компании", () => {
    cy.login('testId');
    cy.visit('https://emails-dev.alpha-pram.com/campaigns/');
    removeCampaign('Test')
})
})