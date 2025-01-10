import React from 'react';
import { CommonSelect } from './CommonSelect';
import { SelectUsage } from '@/constants/contents';

describe('<CommonSelect />', () => {
  it('없음이 default값으로 선택된다.', () => {
    cy.mount(
      <CommonSelect
        label="test"
        options={['option1', 'option2', 'option3']}
        usage={SelectUsage.ABILITY}
      />,
    );

    cy.get('select').should('have.value', '');
    cy.get('option[value=""]').should('have.text', '없음');
  });

  it('옵션을 선택하면 상태가 업데이트 된다.', () => {
    cy.mount(
      <CommonSelect
        label="test"
        options={['option1', 'option2', 'option3']}
        usage={SelectUsage.ABILITY}
      />,
    );

    cy.get('select').select('option1').should('have.value', 'option1');
  });
});
