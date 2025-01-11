import React from 'react';
import { LoadingComponent } from '../../src/components/common/LoadingComponent';

describe('<LoadingComponent />', () => {
  it('애니메이션 적용 여부', () => {
    cy.mount(<LoadingComponent />);
    cy.get('div').should('have.class', 'animate-spin');
  });
});
