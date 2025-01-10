import React from 'react';
import { ErrorComponent } from './ErrorComponent';

describe('<ErrorComponent />', () => {
  it('default size가 medium인지 확인', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ErrorComponent message="test" />);
    cy.get('div').should('have.class', 'gap-2');
  });

  it('message가 잘 반영되는지 확인', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ErrorComponent message="test" />);
    cy.get('.error-title').should('have.text', 'test');
  });

  it('사이즈 별 스타일이 잘 적용되는지 확인', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ErrorComponent message="test" />);
    cy.get('div').should('have.class', 'gap-2');

    cy.mount(<ErrorComponent message="test" size="small" />);
    cy.get('img').should('have.class', 'max-w-[72px] sm:max-w-[140px]');

    cy.mount(<ErrorComponent message="test" size="xsmall" />);
    cy.get('img').should('have.class', 'max-w-[52px] sm:max-w-[70px]');
  });
});
