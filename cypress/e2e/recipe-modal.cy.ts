describe('Recipe Modal', () => {
  beforeEach(() => {
    cy.visit('/categories');
    cy.get('.category__card')
      .eq(2)
      .click();
    cy.get('.category__card--selected').should('exist');
    cy.get('.nav-arrow--right').click();
    cy.get('.nav-arrow--right').click();
    cy.get('.nav-arrow--right').click();
    cy.get('.product__card')
      .eq(1)
      .click();
    cy.get('.product__card')
      .eq(4)
      .click();
    cy.get('.nav-arrow--right').click();
    cy.get('.nav-arrow--right').click();
  });
  it('opens and closes recipe modal', () => {
    cy.get('#recipe-list-ul li').first().click();
    cy.get('.modal').should('be.visible');
    cy.get('#modal-recipe-title').should('be.visible');
    cy.get('#modal-recipe-content').should('be.visible');
    cy.get('.modal-close-button').click();
    cy.get('.modal').should('not.exist');
  });
  it('toggles favorite status from modal', () => {
    cy.get('#recipe-list-ul li').first().click();
    cy.get('.modal .favorite-icon').click();
    cy.get('.modal .favorite-icon.favorited').should('exist');
    cy.get('.modal .favorite-icon.favorited').click();
    cy.get('.modal .favorite-icon.favorited').should('not.exist');
  });
});