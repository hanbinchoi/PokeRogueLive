import React from 'react';
import { CommonCheckBox } from './CommonCheckBox';

describe('<CommonCheckBox />', () => {
  it('체크박스의 label이 제대로 렌더링되는지 확인', () => {
    cy.mount(
      <CommonCheckBox label="test" isChecked={false} setIsChecked={() => {}} />,
    );

    cy.get('label').should('have.text', 'test');
  });
});
