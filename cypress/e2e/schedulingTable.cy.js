/// <reference types="cypress"/>

import {
  mockSchedulingTable,
  filterDates,
  checkData,
  checkStatus
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

    schedulingPage.inputDate('From', '22.05.2023', '2');
    schedulingPage.inputDate('To', '23.05.2023', '2');
    schedulingPage.clickTotalOrders();
    cy.wait(500);
    cy.exist('[data-label="Order Purchase Date"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Order Purchase Date').then(element => {
          const count = element.length;
          checkData(count, 'Order Purchase Date', '22.05.2023', '23.05.2023');
          schedulingPage.clearInputDate('From', '2');
          schedulingPage.clearInputDate('To', '2');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.inputDate('From', '22.05.2023', '3');
    schedulingPage.inputDate('To', '23.05.2023', '3');
    schedulingPage.clickTotalOrders();
    cy.wait(500);
    cy.exist('[data-label="Order Delivery Date"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Order Delivery Date').then(element => {
          const count = element.length;
          checkData(count, 'Order Delivery Date', '22.05.2023', '23.05.2023');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.inputDate('From', '22.05.2023', '4');
    schedulingPage.inputDate('To', '23.05.2023', '4');
    schedulingPage.clickTotalOrders();
    cy.wait(500);
    cy.exist('[data-label="Order Imported Date"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Order Imported Date').then(element => {
          const count = element.length;
          checkData(count, 'Order Imported Date', '22.05.2023', '23.05.2023');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.inputDate('From', '22.05.2023', '5');
    schedulingPage.inputDate('To', '23.05.2023', '5');
    schedulingPage.clickTotalOrders();
    cy.wait(500);
    cy.exist('[data-label="Order Earliest Ship Date"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Order Earliest Ship Date').then(element => {
          const count = element.length;
          checkData(count, 'Order Earliest Ship Date', '22.05.2023', '23.05.2023');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.inputDate('From', '22.05.2023', '6');
    schedulingPage.inputDate('To', '23.05.2023', '6');
    schedulingPage.clickTotalOrders();
    cy.wait(500);
    cy.exist('[data-label="Order Latest Ship Date"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Order Latest Ship Date').then(element => {
          const count = element.length;
          checkData(count, 'Order Latest Ship Date', '22.05.2023', '23.05.2023');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.inputDate('From', '22.05.2023', '7');
    schedulingPage.inputDate('To', '23.05.2023', '7');
    schedulingPage.clickTotalOrders();
    cy.wait(500);
    cy.exist('[data-label="Mail Date To Send"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Mail Date To Send').then(element => {
          const count = element.length;
          checkData(count, 'Mail Date To Send', '22.05.2023', '23.05.2023');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.clickCheckbox('Pending');
    cy.wait(500);
    cy.exist('[data-label="Mail Status"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Mail Status').then(element => {
          const count = element.length;
          checkStatus(count, 'Mail Status', 'Pending');
          schedulingPage.clickCheckbox('Pending');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        schedulingPage.clickCheckbox('Pending');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.clickCheckbox('Delivery');
    cy.wait(500);
    cy.exist('[data-label="Mail Status"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Mail Status').then(element => {
          const count = element.length;
          checkStatus(count, 'Mail Status', 'Delivery');
          schedulingPage.clickCheckbox('Delivery');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        schedulingPage.clickCheckbox('Delivery');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.clickCheckbox('Open');
    cy.wait(500);
    cy.exist('[data-label="Mail Status"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Mail Status').then(element => {
          const count = element.length;
          checkStatus(count, 'Mail Status', 'Open');
          schedulingPage.clickCheckbox('Open');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        schedulingPage.clickCheckbox('Open');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.clickCheckbox('Bounce');
    cy.wait(500);
    cy.exist('[data-label="Mail Status"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Mail Status').then(element => {
          const count = element.length;
          checkStatus(count, 'Mail Status', 'Bounce');
          schedulingPage.clickCheckbox('Bounce');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        schedulingPage.clickCheckbox('Bounce');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.clickCheckbox('Complaint');
    cy.wait(500);
    cy.exist('[data-label="Mail Status"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Mail Status').then(element => {
          const count = element.length;
          checkStatus(count, 'Mail Status', 'Complaint');
          schedulingPage.clickCheckbox('Complaint');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        schedulingPage.clickCheckbox('Complaint');
        cy.log("**Orders not found**")
      }
    });

    schedulingPage.clickCheckbox('Send');
    cy.wait(500);
    cy.exist('[data-label="Mail Status"]').then(exists => {
      if (exists) {
        schedulingPage.getRows('Mail Status').then(element => {
          const count = element.length;
          checkStatus(count, 'Mail Status', 'Send');
          schedulingPage.clickCheckbox('Send');
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        schedulingPage.clickCheckbox('Send');
        cy.log("**Orders not found**")
      }
    });

  });
});