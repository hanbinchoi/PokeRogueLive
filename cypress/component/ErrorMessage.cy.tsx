import React from 'react';
import { ErrorMessage } from '../../src/components/common/ErrorMessage';

describe('<ErrorMessage />', () => {
  it('메시지가 잘 반영되는지 확인', () => {
    cy.mount(<ErrorMessage message="test" />);
    cy.get('p').should('have.text', 'test');
  });
});
