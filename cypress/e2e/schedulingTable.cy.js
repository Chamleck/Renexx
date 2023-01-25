/// <reference types="cypress"/>

import {login,mockSchedulingTable} from '../support/helper.js';
import mainPage from '../support/Pages/MainPage';
import scheduling from'../fixtures/schedulingTableMock.json';


describe("Actions with Companies", () => {
  beforeEach(() => {
  cy.restoreLocalStorage();
  });

  it("login", login);

  it('Mocking Scheduling table', () => {
    
        mainPage.openSchedulingPage()
        mockSchedulingTable(scheduling)
        
        
    })
     
    
    
    
  });



