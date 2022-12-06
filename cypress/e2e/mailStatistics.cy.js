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
    

  })
});

