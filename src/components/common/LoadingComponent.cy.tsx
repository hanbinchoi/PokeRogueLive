import React from 'react';
import { LoadingComponent } from './LoadingComponent';

describe('<LoadingComponent />', () => {
  it('렌더링과 애니메이션 적용 여부', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoadingComponent />);
    cy.get('div').should('have.class', 'animate-spin');
  });
});
