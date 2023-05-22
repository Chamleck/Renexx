/// <reference types="cypress"/>

import {
  mockSchedulingTable,
  filterDates,
  checkData,
  invokeText
} from '../support/helper.js';
import mainPage from '../support/Pages/MainPage';
import schedulingPage from '../support/Pages/SchedulingPage.js';
import scheduling from '../fixtures/schedulingTableMock.json';


describe("Testing of scheduling table", () => {
  before(() => {
    cy.login('testId');
  });


  it('Mocking Scheduling table', () => {
    cy.login('testId');
    cy.visit('https://emails-dev.alpha-pram.com/');

    mainPage.openSchedulingPage();
    mockSchedulingTable(scheduling);
    schedulingPage.getRow('111-3262999-0163439').should('have.class', 'has-background-danger');
    schedulingPage.getRow('112-7243026-8181036').should('have.class', 'has-background-danger');

  })

  it('Getting original table', () => {
    cy.login('testId');
    cy.visit('https://emails-dev.alpha-pram.com/scheduling/');


    schedulingPage.inputDate('From', '17.05.2023');
    schedulingPage.inputDate('To', '19.05.2023');
    schedulingPage.clickTotalOrders();
    cy.exist('[data-label="Order Purchase Date"]').then(exists => {
      if (exists) {
        schedulingPage.getOrderDateColumns().then(element => {
          const count = element.length;
          checkData(count, '17.05.2023', '19.05.2023');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        cy.log("**Orders not found**")
      }
    });
    cy.intercept('GET', '**/scheduling/orders?page=1**').as('data');
    cy.reload();
    cy.wait('@data').then((request) => {
      const data = request.response.body.data;
      const date = '02.05.2023'
      const date1 = '02.05.2023'
      let expectedData = filterDates(data, date, date1, 'orderDate');
      cy.log(JSON.stringify(data));
      cy.log(JSON.stringify(expectedData));
      //return(expectedData);
    }) //.then(expectedData =>{
    schedulingPage.inputDate('From', '02.05.2023');
    schedulingPage.inputDate('To', '02.05.2023');
    schedulingPage.clickTotalOrders();
    //cy.log(JSON.stringify(expectedData));

    // cy.wait('@data').then((request) => {
    // let data1 = request.response.body.data;
    //  expect(expectedData).to.deep.equal(data1);
  })
})
// }) 
//})