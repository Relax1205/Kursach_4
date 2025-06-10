describe('Recipe Selection Flow', () => {
  beforeEach(() => {
    cy.visit('/categories');
  });
  it('selects a category and navigates through the flow', () => {
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
    cy.get('#recipe-list-ul')
      .should('exist')
      .within(() => {
        cy.get('li').should('have.length.greaterThan', 0);
      });
  });
  it('shows warning when trying to proceed without selecting category', () => {
    cy.get('.nav-arrow--right').click();
    cy.get('#category-warning').should('be.visible');
  });
});