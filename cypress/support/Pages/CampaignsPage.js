/// <reference types="cypress"/>

import BasePage from "./BasePage";


class CampaignsPage extends BasePage {

    getCreateCampaignButton() {
        return cy.get('span:contains("Create new campaign")');
    }

    getCampaignNameField() {
        return cy.get('[placeholder="Campaign Name"]');
    }

    getSelectTemplateMenu() {
        return cy.get('select');
    }

    getCreateButton() {
        return cy.get('button[type="submit"]');
    }

    getPopUpMessage() {
        return cy.get('p.text');
    }

    getCampaignNameHolder(campaignName) {
        return cy.get(`tr:contains("${campaignName}")`);
    }

    getDeleteCampaignIcon(campaignName){
        return cy.get(`tr:contains("${campaignName}")`)
        .find('.icon-delete')
        .invoke('attr', 'style', 'visibility: visible');
    }

    getEditCampaignIcon(campaignName){
        return cy.get(`tr:contains("${campaignName}")`)
        .find('.has-text-primary').eq(0)
        .invoke('attr', 'style', 'visibility: visible');
    }

    getDeleteCampaignBtn(){
        return cy.get('span:contains("Delete")');
    }

    getSearchField() {
        return cy.get('[autocomplete="on"]');
    }

    getTableForCompanies() {
        return cy.get('tbody');
    }

    getFiltersHolder(filterName) {
        return cy.get(`button:contains("${filterName}")`);
    }

    getCampaignActivationBtn(campaign) {
        return cy.get(`tr:contains("${campaign}")`)
        .find('.check');
    }

    pushEditCampaignButton(campaignName){
        cy.log('**Clicking edit icon**');
        this.getEditCampaignIcon(campaignName).click();
    }

    

    submitPopUpForm(campaignName, template) {
        cy.log('**Opening Campaigns Page**');
        new BasePage().openCampaignsPage();

        cy.log('**Clicking on create campaign button**');
        this.getCreateCampaignButton().click();

        cy.log('**Filling Campaign Name field**');
        this.getCampaignNameField().type(campaignName);

        cy.log('**Selecting template**');
        this.getSelectTemplateMenu().select(template);

        cy.log('**Clicking create button**');
        this.getCreateButton().click();

    }

    performSearch(campaignName) {
        cy.log(`**Typing ${campaignName} in search field**`);
        this.getSearchField().type(campaignName);
    }

    clearSearchField() {
        cy.log(`**Clearing campaign name from search field**`);
        this.getSearchField().clear();
    }

    selectCampaignFilter(filterName) {
        cy.log(`**Selecting filter ${filterName}**`);
        this.getFiltersHolder(filterName).click();
    }

    enableDisableCampaign(campaign){
        cy.log(`**Activating/Disactivating ${campaign}**`);
        //добавил {force:true} потому что иначе не работало
        this.getCampaignActivationBtn(campaign).click({force:true});
    }

    removeCampaign(campaign){
        cy.log(`**Pushing delete icon for ${campaign}**`);
        this.getDeleteCampaignIcon(campaign).click();
        cy.log(`**Pushing delete button for ${campaign}**`);
        this.getDeleteCampaignBtn().click();
    }

}

export default new CampaignsPage();