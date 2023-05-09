/// <reference types="cypress"/>

import BasePage from "./BasePage";

class SchedulingPage extends BasePage {

    getFbaField(){
        return cy.get('[data-label="FBA?"]');
    }

    getRow(orderNumber){
        return cy.get(`tr:contains(${orderNumber})`);
    }
    // From or To
    getOrderDate(fieldType){
        return cy.get('.columns').eq(2).find(`[placeholder="${fieldType}"]`);
    }

    getOrderDateColumn(i){
        return cy.get('[data-label="Order Purchase Date"]').eq(i)
        .find(`span`);
    }

    getOrderDateColumns(){
        return cy.get('[data-label="Order Purchase Date"]');
    }

    getTotalOrders(){
        return cy.get('strong').last();
    }

    inputDate(fieldType,date){
        this.getOrderDate(fieldType).type(date);
    }

    clickTotalOrders(){
        this.getTotalOrders().click({force:true});
    }

}

export default new SchedulingPage();