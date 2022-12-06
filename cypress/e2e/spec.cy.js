  it('passes', () => {
    cy.visit('https://auto.ria.com/uk/add_auto.html');
    cy.get('#addPhotoInput').selectFile('cypress/fixtures/909641.png', {force:true})
  })
