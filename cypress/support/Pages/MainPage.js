
import BasePage from "./BasePage";

class MainPage extends BasePage{

    getOrdersImported(){
        return cypress.get('.column.is-6.is-4-widescreen').eq(0);
    }

    getEmailsSent(){
        return cy.get('.column.is-6.is-4-widescreen').eq(1);
    }

    getEmailsComplaint(){
        return cy.get('.column.is-6.is-4-widescreen').eq(2);
    }

    getEmailsBounced(){
        return cy.get('.column.is-6.is-4-widescreen').eq(3);
    }

    getEmailsOpen(){
        return cy.get('.column.is-6.is-4-widescreen').eq(4);
    }

    getEmailsDelivery(){
        return cy.get('.column.is-6.is-4-widescreen').eq(5);
    }

    getEmailsDelayed(){
        return cy.get('.column.is-6.is-4-widescreen').eq(6);
    }

    getEmailsIssued(){
        return cy.get('.column.is-6.is-4-widescreen').eq(7);
    }
}

export default new MainPage();