/// <reference types="cypress"/>

import {login,mockSchedulingTable} from '../support/helper.js';
import mainPage from '../support/Pages/MainPage';
import scheduling from'../fixtures/schedulingTableMock.json';


describe("Actions with Companies", () => {
  before(() => {
    cy.login('testId');
  });


  it('Mocking Scheduling table', () => {
       cy.login('testId');
       cy.visit('https://emails-dev.alpha-pram.com/');

        mainPage.openSchedulingPage();
        mockSchedulingTable(scheduling);
        
        
    })
     
    
    
    
  });



