export default class BasePage {

   getDashboardButton(){
       return cy.get('a:contains("Dashboard")')
   }

   getOrdersDropdown(){
       return cy.get('a:contains("Orders")')
   }

    getUserInfoPanel(){
        return cy.get('.cursor-pointer.header-user-block');
    }

    getEmailsDropdown(){
        return cy.get('.navbar-item.has-dropdown').eq(0)
    }

    getCampaignsButton(){
        return cy.get('a:contains("Campaigns")')
    }

    openCampaignsPage(){
        cy.log('**Clicking on Emails dropdown**')
        this.getEmailsDropdown().click()
        cy.log('**Clicking on Campaigns button**')
        this.getCampaignsButton().click()
    }

    openDashboardPage(){
        this.getDashboardButton().click()
    }




}