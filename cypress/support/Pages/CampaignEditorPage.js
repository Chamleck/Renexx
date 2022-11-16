import BasePage from "./BasePage";
import campaignsPage from "./CampaignsPage";

class CampaignEditorPage extends BasePage{

    getDescriptionField(){
        return  cy.get('div>textarea')
    }

    getRecieverEmailField(){
        return cy.get('div>input').eq(1)
    }

    getSaveBtn(){
        return cy.get('span:contains("Save")')
    }

    getYesSaveBtn(){
        return cy.get('span:contains("Yes, Save")')
    }

    getNotSaveBtn(){
        return cy.get('span:contains("Leave without saving")')
    }

    getModalCancelBtn(){
        return cy.get('.modal-card')
        .find('span:contains("Cancel")')
    }

    getCancelBtn(){
        return cy.get('span:contains("Cancel")')
    }

    getModalWindowWithOptions(){
        return cy.get('.modal-card')
    }

    getTemplateSelector(){
        return cy.get('select').eq(0)
    }

    getDelayRangeSelector(){
        return cy.get('select').eq(1)
    }

    getSendTimeSelector(){
        return cy.get('select').eq(2)
    }

    getAddRuleBtn(){
        return cy.get ('span:contains("Add rule")')
    }

    getSpecificProductRule(){
        return cy.get('a:contains("Send for specific product")')
    }

    getSpecificBrandRule(){
        return cy.get('a:contains("Send for specific brand")')
    }

    getBrandsContainer(){
        return cy.get('div .campaign-rule-wrap:contains("Send orders for brands")')
        .find('.taginput')
    }

    getSkuAsinContainer(){
        return cy.get('div .skus')
        .find('.taginput')
    }

    getSkuContainer(){
        return cy.get('div:contains("Send orders that")')
        .find('.taginput')
    }

    getTag(tagName){
        return cy.get(`[title="${tagName}"]`)
        .find('.delete')
    }

    getCampaignEditorPage(){
        return cy.get('p:contains("Campaign editor")')
    }

    getRadioBtn(btnName){
        return cy.contains(`${btnName}`)
        .find('input')
    }

    removeTag(tagName){
        cy.log(`**removing tag ${tagName} **`)
        this.getTag(tagName).click()
    }

    clickModalCancelBtn(){
        cy.log(`**clicking cancel button **`)
        this.getModalCancelBtn().click()
    }

    clickCancelBtn(){
        cy.log(`**clicking cancel button **`)
        this.getCancelBtn().click()
    }

    clickYesSaveBtn(){
        cy.log(`**clicking yes save button**`)
        this.getYesSaveBtn().click()
    }

    selectDelay(delay){
        cy.log(`**Selecting ${delay} **`)
        this.getDelayRangeSelector().select(delay)
    }

    selectTiming(timing){
        cy.log(`**Selecting ${timing} **`)
        this.getSendTimeSelector().select(timing)
    }

    clickAddRule(){
        cy.log(`**Pushing add rule btn**`)
        this.getAddRuleBtn().click()
    }

    clickSpecificBrandRule(){
        cy.log(`**Pushing specific brand rule btn**`)
        this.getSpecificBrandRule().click()
    }

    addSpecificBrand(brand){
        cy.log(`**Adding ${brand} to rule**`)
        this.getBrandsContainer().type(brand)
    }

    clickSpecificProductRule(){
        cy.log(`**Pushing specific product btn**`)
        this.getSpecificProductRule().click()
    }

    addSpecificProduct(skuAsin){
        cy.log(`**Adding ${skuAsin} to rule**`)
        this.getSkuAsinContainer().type(skuAsin)
    }

    selectRadioBtn(btnName){
        cy.log(`**Selecting radiobutton ${btnName}**`)
        this.getRadioBtn(btnName).click({force:true})
    }

    clickSaveBtn(){
        cy.log('**Pushing save button**')
        this.getSaveBtn().click()
    }


    submitCampaignCreationForm(description,email){
        cy.log(`**Filling ${description} field**`)
        this.getDescriptionField().type(description)

        cy.log(`**Typing ${email} to email field **`)
        this.getRecieverEmailField().type(email)

        cy.log('**Pushing save button**')
        this.getSaveBtn().click()
    }

}


export default new CampaignEditorPage();