const projectNames = [
  'High Tide — Bula!',
  'PIGU',
  'GaoChao',
  'High Tide band photos',
  'Music for Vegans (MFV)',
  '1nvaders',
  'MFV essay',
  'EPKify',
  'Kelvin',
  'Shrimp Club',
  'Dad Bod / Pleasurable Weight Gain',
  'Bugs, Buns, and Other Crunchy Comforts',
  'holopeño',
  'Suno album factory (Clumbus)',
  'The Alameda Brief',
  'Aurelia mix',
  'Social comedy bits',
  'Sitar with Javier mixes',
  'Inbox-zero blog post',
  'MFV walkthrough site',
  'Blog book-library normalization',
];

describe('Project Compass', () => {
  it('shows the guardrail and all 21 projects', () => {
    cy.visit('/');

    cy.get('h1').should('contain', 'What is actually in motion');
    cy.contains('Guardrail');
    cy.contains('Financial');
    cy.contains('Play');
    cy.contains('21 projects on this page');

    for (const name of projectNames) {
      cy.contains('a', name).should('be.visible');
    }
  });

  it('saves Sasha’s answers in this browser', () => {
    cy.visit('/projects/kelvin');

    cy.get('h1').should('contain', 'Kelvin');
    cy.get('#why').type('Because the joke stays a joke');
    cy.contains('button', 'Save answers').click();
    cy.contains('Saved on this browser');

    cy.reload();
    cy.get('#why').should('have.value', 'Because the joke stays a joke');
  });

  it('saves a Melissa reaction without an account', () => {
    cy.visit('/projects/pigu');

    cy.contains('button', 'Keep the joy').click();
    cy.get('#comment').type('Leave the word implied.');
    cy.contains('button', 'Save note').click();
    cy.contains('Saved on this browser');

    cy.reload();
    cy.contains('button', 'Keep the joy').should('have.class', 'bg-tide');
    cy.get('#comment').should('have.value', 'Leave the word implied.');
  });
});
