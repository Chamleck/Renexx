/// <reference types="cypress"/>

import {
  invokeOrderSkuNum,
  mockSchedulingTable,
  checkSearch,
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

  describe("Mock test of AFN/MFN", () => {
    it('Mocking Scheduling table', () => {
      cy.login('testId');
      cy.visit('https://emails-dev.alpha-pram.com/');

      mainPage.openSchedulingPage();
      mockSchedulingTable(scheduling);
      schedulingPage.getRow('111-3262999-0163439').should('have.class', 'has-background-danger');
      schedulingPage.getRow('112-7243026-8181036').should('have.class', 'has-background-danger');

    })
  });

  describe("Filters Test", () => {
    it('Original table filters testing', () => {
      cy.login('testId');
      cy.visit('https://emails-dev.alpha-pram.com/scheduling/');

      schedulingPage.inputDate('From', '07.01.2023', '2');
      schedulingPage.inputDate('To', '07.01.2023', '2');
      schedulingPage.clickTotalOrders();
      cy.wait(500);
      cy.exist('[data-label="Order Purchase Date"]').then(exists => {
        if (exists) {
          schedulingPage.getRows('Order Purchase Date').then(element => {
            const count = element.length;
            checkData(count, 'Order Purchase Date', '07.01.2023', '07.01.2023');
            schedulingPage.clearInputDate('From', '2');
            schedulingPage.clearInputDate('To', '2');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          cy.log("**Orders not found**")
          schedulingPage.clearInputDate('From', '2');
          schedulingPage.clearInputDate('To', '2');
        }
      });

      schedulingPage.inputDate('From', '07.01.2023', '3');
      schedulingPage.inputDate('To', '07.01.2023', '3');
      schedulingPage.clickTotalOrders();
      cy.wait(500);
      cy.exist('[data-label="Order Delivery Date"]').then(exists => {
        if (exists) {
          schedulingPage.getRows('Order Delivery Date').then(element => {
            const count = element.length;
            checkData(count, 'Order Delivery Date', '07.01.2023', '07.01.2023');
            schedulingPage.clearInputDate('From', '3');
            schedulingPage.clearInputDate('To', '3');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          cy.log("**Orders not found**")
          schedulingPage.clearInputDate('From', '3');
          schedulingPage.clearInputDate('To', '3');
        }
      });

      schedulingPage.inputDate('From', '07.01.2023', '4');
      schedulingPage.inputDate('To', '07.01.2023', '4');
      schedulingPage.clickTotalOrders();
      cy.wait(500);
      cy.exist('[data-label="Order Imported Date"] ').then(exists => {
        if (exists) {
          schedulingPage.getRows('Order Imported Date').then(element => {
            const count = element.length;
            checkData(count, 'Order Imported Date', '07.01.2023', '07.01.2023');
            schedulingPage.clearInputDate('From', '4');
            schedulingPage.clearInputDate('To', '4');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          cy.log("**Orders not found**")
          schedulingPage.clearInputDate('From', '4');
          schedulingPage.clearInputDate('To', '4');
        }
      });

      schedulingPage.inputDate('From', '07.01.2023', '5');
      schedulingPage.inputDate('To', '07.01.2023', '5');
      schedulingPage.clickTotalOrders();
      cy.wait(500);
      cy.exist('[data-label="Order Earliest Ship Date"]').then(exists => {
        if (exists) {
          schedulingPage.getRows('Order Earliest Ship Date').then(element => {
            const count = element.length;
            checkData(count, 'Order Earliest Ship Date', '07.01.2023', '07.01.2023');
            schedulingPage.clearInputDate('From', '5');
            schedulingPage.clearInputDate('To', '5');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          cy.log("**Orders not found**")
          schedulingPage.clearInputDate('From', '5');
          schedulingPage.clearInputDate('To', '5');
        }
      });

      schedulingPage.inputDate('From', '07.01.2023', '6');
      schedulingPage.inputDate('To', '07.01.2023', '6');
      schedulingPage.clickTotalOrders();
      cy.wait(500);
      cy.exist('[data-label="Order Latest Ship Date"]').then(exists => {
        if (exists) {
          schedulingPage.getRows('Order Latest Ship Date').then(element => {
            const count = element.length;
            checkData(count, 'Order Latest Ship Date', '07.01.2023', '07.01.2023');
            schedulingPage.clearInputDate('From', '6');
            schedulingPage.clearInputDate('To', '6');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          cy.log("**Orders not found**")
          schedulingPage.clearInputDate('From', '6');
          schedulingPage.clearInputDate('To', '6');
        }
      });

      schedulingPage.inputDate('From', '07.01.2023', '7');
      schedulingPage.inputDate('To', '07.01.2023', '7');
      schedulingPage.clickTotalOrders();
      cy.wait(500);
      cy.exist('[data-label="Mail Date To Send"]').then(exists => {
        if (exists) {
          schedulingPage.getRows('Mail Date To Send').then(element => {
            const count = element.length;
            checkData(count, 'Mail Date To Send', '07.01.2023', '07.01.2023');
            schedulingPage.clearInputDate('From', '7');
            schedulingPage.clearInputDate('To', '7');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          cy.log("**Orders not found**")
          schedulingPage.clearInputDate('From', '7');
          schedulingPage.clearInputDate('To', '7');
        }
      });
    });

    it('Checkbox filters testing', () => {

      cy.login('testId');
      cy.visit('https://emails-dev.alpha-pram.com/scheduling/');
      cy.get('[data-label="Order #"]', {
        timeout: 2000
      });
      schedulingPage.clickCheckbox('AFN');
      cy.wait(500);
      cy.exist('[data-label="FBA?"]').then(exists => {
        if (exists) {
          schedulingPage.getRows('FBA?').then(element => {
            const count = element.length;
            checkStatus(count, 'FBA?', 'AFN');
            schedulingPage.clickCheckbox('AFN');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          schedulingPage.clickCheckbox('AFN');
          cy.log("**Orders not found**")
        }
      });

      schedulingPage.clickCheckbox('MFN');
      cy.wait(500);
      cy.exist('[data-label="FBA?"]').then(exists => {
        if (exists) {
          schedulingPage.getRows('FBA?').then(element => {
            const count = element.length;
            checkStatus(count, 'FBA?', 'MFN');
            schedulingPage.clickCheckbox('MFN');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          schedulingPage.clickCheckbox('MFN');
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

    it('Testing search by order number and Sku number', () => {

      cy.login('testId');
      cy.visit('https://emails-dev.alpha-pram.com/scheduling/');
      cy.get('[data-label="Order #"]', {
        timeout: 2000
      });
      cy.exist('[data-label="Order #"]').then(exists => {
        if (exists) {
          invokeOrderSkuNum(0, 'Order #').then(text => {
            const orderNum = text.trim();
            schedulingPage.inputSearchData(orderNum);
            cy.intercept('GET', '**/scheduling/orders?page=1&limit=20&orderId=*').as('request')
            schedulingPage.clickTotalOrders();
            cy.wait('@request')
            schedulingPage.getRows('Order #').then(element => {
              const count = element.length;
              cy.log(count);
              checkSearch(count, 'Order #', orderNum);
              schedulingPage.clearSearchInput();
              cy.intercept('GET', '**/scheduling/orders?page=1&limit=20').as('request')
              schedulingPage.clickTotalOrders();
              cy.wait('@request');
            });
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          schedulingPage.clearSearchInput();
          cy.log("**Orders not found**");
          cy.intercept('GET', '**/scheduling/orders?page=1&limit=20').as('request')
          schedulingPage.clickTotalOrders();
          cy.wait('@request');
        }
      });

      cy.get('[data-label="SKUs"]').then(exists => {
      if (exists) {
        invokeOrderSkuNum(0, 'SKUs').then(text => {
          const skuNum = text.trim();
          schedulingPage.selectFilterType('SKUs');
          schedulingPage.inputSearchData(skuNum);
          cy.intercept('GET', `**/scheduling/orders?page=1&limit=20&skus=${skuNum}`).as('request');
          schedulingPage.clickTotalOrders();
          cy.wait('@request');
          cy.wait(500);
          schedulingPage.getRows('SKUs').then(element => {
            const count = element.length;
            cy.log(count);
            checkSearch(count, 'SKUs', skuNum);
            schedulingPage.clearSearchInput();
          });
        });
      } else {
        schedulingPage.getNoRecords().should('exist');
        schedulingPage.clearSearchInput();
        cy.log("**Orders not found**");
      }
      });
      });

    it('Testing combination of filters', () => {
      cy.login('testId');
      cy.visit('https://emails-dev.alpha-pram.com/scheduling/');

      schedulingPage.inputDate('From', '07.01.2023', '2');
      schedulingPage.inputDate('To', '07.01.2023', '2');
      schedulingPage.inputDate('From', '07.02.2023', '4');
      schedulingPage.inputDate('To', '07.02.2023', '4');
      schedulingPage.clickCheckbox('Delivery');
      schedulingPage.clickCheckbox('Open');
      schedulingPage.clickTotalOrders();
      cy.wait(500);
      cy.exist('[data-label="Order Purchase Date"]').then(exists => {
        if (exists) {
          schedulingPage.getRows('Order Purchase Date').then(element => {
            const count = element.length;
            checkData(count, 'Order Purchase Date', '07.01.2023', '07.01.2023');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          cy.log("**Orders not found**")
        }
      })

      cy.exist('[data-label="Order Imported Date"]').then(exists => {
        if (exists) {
          schedulingPage.getRows('Order Imported Date').then(element => {
            const count = element.length;
            checkData(count, 'Order Imported Date', '07.02.2023', '07.02.2023');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          cy.log("**Orders not found**")
        }
      });

      cy.exist('[data-label="Mail Status"]').then(exists => {
        if (exists) {
          schedulingPage.getRows('Mail Status').then(element => {
            const count = element.length;
            checkStatus(count, 'Mail Status', 'Delivery', 'Open');
            schedulingPage.clearInputDate('From', '2');
            schedulingPage.clearInputDate('To', '2');
            schedulingPage.clearInputDate('From', '4');
            schedulingPage.clearInputDate('To', '4');
            schedulingPage.clickCheckbox('Delivery');
            schedulingPage.clickCheckbox('Open');
          });
        } else {
          schedulingPage.getNoRecords().should('exist');
          schedulingPage.clearInputDate('From', '2');
          schedulingPage.clearInputDate('To', '2');
          schedulingPage.clearInputDate('From', '4');
          schedulingPage.clearInputDate('To', '4');
          schedulingPage.clickCheckbox('Delivery');
          schedulingPage.clickCheckbox('Open');
          cy.log("**Orders not found**")
        }
      });
    })
  })
});