describe('Favorites Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('nav').contains('Избранное').click();
  });

  it('shows empty favorites message', () => {
    cy.contains('Избранных рецептов не найдено').should('be.visible');
  });

  it('adds recipe to favorites', () => {
    cy.visit('/categories');

    cy.get('.category__card')
      .eq(2)
      .click();

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
    cy.get('#recipe-list-ul li')
      .should('have.length.at.least', 1)
      .first()
      .within(() => {
        cy.get('.favorite-icon').click();
      });

    cy.get('nav').contains('Избранное').click();

    cy.get('#favorites-list-ul li').should('have.length.at.least', 1);

    cy.contains('Избранных рецептов не найдено').should('not.exist');
  });
});