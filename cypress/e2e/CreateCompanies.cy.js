/// <reference types="cypress"/>

import {login, loginViaAPI} from '../support/helper.js';
import campaignsPage from '../support/Pages/CampaignsPage';
import campaignEditorPage from '../support/Pages/CampaignEditorPage';
import btns from '../fixtures/radioBtns.json';
import mainPage from '../support/Pages/MainPage';

describe("Companies test", ()=> {

    before(() => {

    cy.login('testId')
  })
        
        
    

    describe("Creating companies",  () => {

    it("Тест создания 1 компании", () => {

        cy.login('testId');
        cy.visit('https://emails-dev.alpha-pram.com/');

        campaignsPage.submitPopUpForm('Test','Template');
        campaignEditorPage.submitCampaignCreationForm('Testing description','chamlecks@gmail.com');
        campaignsPage.getPopUpMessage()
        .should('contain', "Campaign created");
        campaignsPage.getCampaignNameHolder('Test')
        .should('contain', "Test" );

    });
    
    it("Тест создания 2 компании", () => {

        cy.login('testId');
        cy.visit('https://emails-dev.alpha-pram.com/');

        campaignsPage.submitPopUpForm('quest','Template');
        campaignEditorPage.submitCampaignCreationForm('Testing description','nickolas.kolotkov@gmail.com');
        campaignsPage.getPopUpMessage()
        .should('contain', "Campaign created");
        campaignsPage.getCampaignNameHolder('quest')
        .should('contain', "quest" );

    });

})

describe("Editing companies",  () => {

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
    campaignsPage.getPopUpMessage()
    .should('contain', "Campaign edited");   
});

it("Тест редактирования отмена сохранения, вызов предложения сохранения переходом на другую страницу, сохранение", ()=>{

    cy.login('testId');  
    cy.visit('https://emails-dev.alpha-pram.com/campaigns/');

    campaignsPage.pushEditCampaignButton('Test')
    campaignEditorPage.selectDelay('2 days')
    campaignEditorPage.selectTiming('11:00 PM')
    campaignEditorPage.addSpecificBrand('Bonide')
    campaignEditorPage.addSpecificProduct('AC122')
    campaignEditorPage.selectRadioBtn(btns.asin)
    campaignEditorPage.getRadioBtn(btns.asin)
    .should('be.enabled')
    campaignEditorPage.clickCancelBtn()
    campaignEditorPage.getModalWindowWithOptions().should('exist')
    campaignEditorPage.clickModalCancelBtn()
    campaignEditorPage.getModalWindowWithOptions().should('not.exist')
    campaignEditorPage.getCampaignEditorPage().should('exist')
    mainPage.openDashboardPage()
    campaignEditorPage.getModalWindowWithOptions().should('exist')
    campaignEditorPage.clickYesSaveBtn()
    campaignsPage.getPopUpMessage()
    .should('contain', "Campaign edited");
    mainPage.openCampaignsPage()

    
});

it("Удаление тегов, проверка всех полей", ()=>{
cy.wait(1000)
    //cy.get('tr:contains("Test")',{timeout:2000});

    cy.login('testId');  
    cy.visit('https://emails-dev.alpha-pram.com/campaigns/');

    campaignsPage.pushEditCampaignButton('Test')
    campaignEditorPage.getDescriptionField()
    .should('have.value', 'Testing description')
    campaignEditorPage.getRecieverEmailField()
    .should('have.value', 'chamlecks@gmail.com')
    campaignEditorPage.getTemplateSelector().should('contain','Template')
    campaignEditorPage.getDelayRangeSelector()
    .should('have.value', '2')
    campaignEditorPage.getSendTimeSelector()
    .should('have.value', '23')
    campaignEditorPage.getBrandsContainer()
    .should('contain', 'Bonide','DEWALT')
    campaignEditorPage.getSkuAsinContainer()
    .should('contain', 'AC123', 'AC122')
    campaignEditorPage.getRadioBtn(btns.asin)
    .should('be.enabled')
    campaignEditorPage.getRadioBtn(btns.contain)
    .should('be.enabled')
    campaignEditorPage.removeTag('Bonide')
    campaignEditorPage.getBrandsContainer()
    .should('not.contain', 'Bonide')
    campaignEditorPage.removeTag('AC123')
    campaignEditorPage.getSkuAsinContainer()
    .should('not.contain', 'AC123')
    campaignEditorPage.clickSaveBtn()
    campaignsPage.getPopUpMessage()
    .should('contain', "Campaign edited");
    
});


})

describe("Filtrations",  () => {

    it("Тест фильтрации через поисковое окно", () => {

        cy.login('testId');  
        cy.visit('https://emails-dev.alpha-pram.com/campaigns/');

        cy.wait(1000)
        
        cy.location().then(location=>{
            //перевірка локейшн (урл)
            expect(location.href).to.eq('https://emails-dev.alpha-pram.com/campaigns/')
        })

        campaignsPage.performSearch('quest');

        campaignsPage.getSearchField()
        .should('contain.value','quest');

        campaignsPage.getTableForCompanies()
        .contains("Campaign").should('not.exist');

        campaignsPage.getCampaignNameHolder('Test')
        .should('not.exist');
    
        campaignsPage.getCampaignNameHolder('quest')
        .should('exist');

        campaignsPage.clearSearchField();

    });

    it("Тест фильтрации активных компаний с помощью фильтров", () => {

        cy.login('testId');  
        cy.visit('https://emails-dev.alpha-pram.com/campaigns/');

        campaignsPage.selectCampaignFilter('Active');
        campaignsPage.getCampaignNameHolder('Test')
        .should('not.exist');
        campaignsPage.getCampaignNameHolder('quest')
        .should('not.exist');
        campaignsPage.getTableForCompanies()
        .should('contain', "Campaign");
        campaignsPage.selectCampaignFilter('Active');

    });

    it("Тест фильтрации не активных компаний с помощью фильтров", () => {

        cy.login('testId');  
        cy.visit('https://emails-dev.alpha-pram.com/campaigns/');

        campaignsPage.enableDisableCampaign('Test');
        campaignsPage.selectCampaignFilter('Inactive');
        
        //почемуто такой формат не работает с should(exist)
        //campaignsPage.getTableForCompanies()
        //.find(campaignsPage.getCampaignNameHolder('Test'),campaignsPage.getCampaignNameHolder('quest'))
        campaignsPage.getCampaignNameHolder('Test')
        .should('not.exist');
        campaignsPage.getCampaignNameHolder('quest')
        .should('exist');
        campaignsPage.getTableForCompanies()
        .contains("Campaign")
        .should('not.exist');
        campaignsPage.selectCampaignFilter('Inactive');
        campaignsPage.enableDisableCampaign('Test');
        

    });

    it("Тест фильтрации дефолтных компаний", () => {

        cy.login('testId');  
        cy.visit('https://emails-dev.alpha-pram.com/campaigns/');

        campaignsPage.selectCampaignFilter('Default');
        campaignsPage.getCampaignNameHolder('Test')
        .should('not.exist');
        campaignsPage.getCampaignNameHolder('quest')
        .should('not.exist');
        campaignsPage.getCampaignNameHolder('Campaign')
        .should('exist');
        campaignsPage.selectCampaignFilter('Default');
    });

    it("Тест фильтрации кастомных компаний", () => {

        cy.login('testId');  
        cy.visit('https://emails-dev.alpha-pram.com/campaigns/');

        campaignsPage.selectCampaignFilter('Custom');
        campaignsPage.getCampaignNameHolder('Test')
        .should('exist');
        campaignsPage.getCampaignNameHolder('quest')
        .should('exist');
        campaignsPage.getTableForCompanies()
        .contains("Campaign")
        .should('exist');
        campaignsPage.selectCampaignFilter('Custom');

    });
})
describe("Activation/Deactivation of companies",  () => {

    it("Деактивация/Активация", () => {

        cy.login('testId');  
        cy.visit('https://emails-dev.alpha-pram.com/campaigns/');

        campaignsPage.enableDisableCampaign('Test');
        campaignsPage.getPopUpMessage()
        .should('be.visible')
        .and('contain', "Campaign edited");
        campaignsPage.enableDisableCampaign('Test');
        campaignsPage.getPopUpMessage()
        .should('contain', "Campaign edited");

    });

})

describe("Removing of companies",  () => {

    it("Удаление компани Test", () => {

        cy.login('testId');  
        cy.visit('https://emails-dev.alpha-pram.com/campaigns/');

        cy.get('.campaign-default.text-white.is-align-self-flex-start.is-size-7',{timeout:2000});
        campaignsPage.removeCampaign('Test');
        campaignsPage.getPopUpMessage()
        .should('contain', "Campaign deleted");

    });

    it("Удаление компани quest", () => {

        cy.login('testId');  
        cy.visit('https://emails-dev.alpha-pram.com/campaigns/');

        campaignsPage.removeCampaign('quest');
        campaignsPage.getPopUpMessage()
        .should('contain', "Campaign deleted");


    });
})

});
