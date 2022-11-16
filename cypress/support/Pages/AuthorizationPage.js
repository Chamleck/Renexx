import BasePage from "./BasePage";

class AuthorizationPage extends BasePage{
    visit(){
        cy.log('**Open login page**');
        cy.visit ('/');
    }
    //елементи
    getEmailField(){
        return cy.get('[type="email"]');
    }

    getPasswordField(){
        return cy.get('[type="password"]');
    }

    getLogInButton(){
        return cy.get('.button');
    }

    getPopUpNotification(){
       return cy.get('.notification');
    }

    getValidationMessage(){
       return cy.get('.help');
    }


    //дії з елементами
   
    submitLogInForm(email, password){
        cy.log(`Fill login form`);
        this.getEmailField().type(email);
        this.getPasswordField().type(password);

        cy.log(`Click login button`);
        this.getLogInButton().click();

        
    
    }

    NegativeSubmitLogInForm(email, password){
        cy.log(`**Fill login form with wrong data**`);
        this.getEmailField()
        .clear()
        .type(email);
        cy.log(`**Fill password form with wrong data**`);
        this.getPasswordField()
        .clear()
        .type(password);

        cy.log(`Click login button`);
        this.getLogInButton()
        .click();
    }

    
}
export default new AuthorizationPage();