describe('Project Compass', () => {
  it('lists all 21 projects on a phone-width viewport', () => {
    cy.viewport(390, 844);
    cy.visit('/');

    cy.get('h1').should('contain', 'What is actually in motion');
    cy.contains('PIGU/Gaochao').should('be.visible');
    cy.contains('GaoChao').should('not.exist');
    cy.contains('21 projects on this page').should('be.visible');
    cy.get('input[type="password"]').should('not.exist');

    cy.get('[data-project-card]').then($cards => {
      const slugs = new Set<string>();
      $cards.each((_index, card) => {
        const slug = card.getAttribute('data-project-slug');
        if (slug) {
          slugs.add(slug);
        }
      });
      expect(slugs.size).to.eq(21);
    });
  });

  it('opens a project without a password gate', () => {
    cy.viewport(390, 844);
    cy.visit('/projects/gaochao');

    cy.get('h1').should('contain', 'Gaochao');
    cy.contains('Gaochao LLC').should('be.visible');
    cy.contains('GaoChao').should('not.exist');
    cy.get('input[type="password"]').should('not.exist');
    cy.contains('button', 'Save answers').should('be.visible');
    cy.contains('button', 'Save note').should('be.visible');
  });
});
