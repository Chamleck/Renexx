/// <reference types="cypress"/>

import BasePage from "./BasePage";

class SchedulingPage extends BasePage {

    getFbaField(){
        return cy.get('[data-label="FBA?"]');
    }

    getNoRecords(){
        return cy.get('div:contains("No records")');
    }

    getRow(orderNumber){
        return cy.get(`tr:contains(${orderNumber})`);
    }
    // fieldType is => From or To, dateType is 2 = Order Date and so on
    getDataInput(fieldType,dateType){
        return cy.get('.columns').eq(`${dateType}`).find(`[placeholder="${fieldType}"]`);
    }


    getDataRow(i,columnType){
        return cy.get(`[data-label="${columnType}"]`).eq(i)
        .find(`span`);
    }

    getSearchInput(){
        return cy.get('[placeholder="Search..."]');
    }

    getColumnRowContent(columnType,i){
        return cy.get(`td[data-label="${columnType}"]>div>p>span`).eq(i);
    }

    getRows(columnType){
        return cy.get(`[data-label="${columnType}"]`);
    }

    getCheckBox(checkType){
        return cy.get(`[value="${checkType}"]`);
    }

    getTotalOrders(){
        return cy.get('strong').last();
    }

    getFilterOptionBtn(){
        return cy.get('button.is-dark').eq(0);
    }
    // Order # or SKUs 
    getFilterType(filterType){
        return cy.get(`a:contains(${filterType})`).eq(0);
    }

    selectFilterType(filterType){
        cy.log(`**Clicking the filter options button**`);
        this.getFilterOptionBtn().click();
        cy.log(`**Selecting ${filterType} search option**`);
        this.getFilterType(filterType).click();
    }

    inputSearchData(data){
        cy.log(`**Inputing ${data} to search field**`);
        this.getSearchInput().type(data);
    }

    clickCheckbox(checkType){
        cy.log(`**Checking ${checkType}**`);
        this.getCheckBox(checkType).click({force:true});
    }

    inputDate(fieldType,date,dateType){
        cy.log(`**Inputing ${date} in ${fieldType} field for date field with index ${dateType}**`);
        this.getDataInput(fieldType,dateType).type(date);
    }

    clearInputDate(fieldType, dateType){
        cy.log(`**Clearing input date in ${fieldType} field for date field with index ${dateType}**`);
        this.getDataInput(fieldType, dateType).clear();
    }

    clearSearchInput(){
        cy.log(`**Clearing search input**`);
        this.getSearchInput().clear();
    }

    clickTotalOrders(){
        cy.log(`**Clicking total orders writing**`);
        this.getTotalOrders().click({force:true});
    }

}

export default new SchedulingPage();