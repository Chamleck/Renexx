/// <reference types="cypress"/>

import {login,mockStatistics,changeValues} from '../support/helper.js';
import mainPage from '../support/Pages/MainPage';



describe("Actions with Companies", () => {
  beforeEach(() => {
  cy.restoreLocalStorage();
  });

  it("login", login);

  it('Mocking', () => {
    const newValues = changeValues();
    mockStatistics(newValues);
    cy.log(JSON.stringify(newValues));
    mainPage.getEmailsSent().should('contain', newValues[0].value);
    mainPage.getEmailsDelivery().should('contain', newValues[1].value);
    mainPage.getEmailsOpen().should('contain', newValues[2].value);
    mainPage.getEmailsBounced().should('contain', newValues[3].value);
    mainPage.getEmailsComplaint().should('contain', newValues[4].value);
    mainPage.getEmailsDelayed().should('contain', newValues[5].value);
    mainPage.getOrdersImported().should('contain', newValues[6].value);
    mainPage.getEmailsIssued().should('contain', newValues[7].value);
  });
});

