import React from 'react';
import { CommonSearchDropDown } from './CommonSearchDropDown';

describe('<CommonSearchDropDown />', () => {
  it('사용자가 입력하면 드롭다운 옵션이 필터링된다', () => {
    cy.mount(
      <CommonSearchDropDown
        label="기술"
        options={['Option 1', 'Option 2', 'Option 3']}
      />,
    );

    cy.get('input').type('Option 2'); // Option 2를 입력
    cy.get('input').should('have.value', 'Option 2'); // 입력값 확인

    cy.get('div').contains('Option 2').should('exist'); // 필터링된 옵션 확인
    cy.get('div').contains('Option 1').should('not.exist'); // 다른 옵션이 없도록 확인
  });

  it('드롭다운 항목을 선택하면, 선택된 항목이 반영된다', () => {
    cy.mount(<CommonSearchDropDown label="test" options={['1', '2', '3']} />);
    cy.get('input').click();
    cy.get('#dropdown-option-2').click(); // Option 2를 클릭

    cy.get('input').should('have.value', '2'); // 선택된 옵션이 handleSelect에 전달되었는지 확인
  });

  it('잘못된 값을 선택하면, 에러 메시지가 표시된다', () => {
    cy.mount(
      <CommonSearchDropDown
        label="기술"
        options={['Option 1', 'Option 2', 'Option 3']}
      />,
    );

    cy.get('input').type('Invalid Option'); // 존재하지 않는 옵션 입력
    cy.get('input').type('{Enter}');

    cy.get('#error-message').should('have.text', '옵션을 찾을 수 없어요.');
  });

  it('키보드로 드롭다운 항목을 선택할 수 있다', () => {
    cy.mount(
      <CommonSearchDropDown
        label="기술"
        options={['Option 1', 'Option 2', 'Option 3']}
      />,
    );

    cy.get('input').type('Option');
    cy.get('input').trigger('keydown', { key: 'ArrowDown' });
    cy.get('input').trigger('keydown', { key: 'ArrowDown' });
    cy.get('input').trigger('keydown', { key: 'Enter' });

    cy.get('input').should('have.value', 'Option 2'); // 두 번째 옵션이 선택되었는지 확인
  });

  it('입력값을 지우면, 입력값이 초기화된다', () => {
    cy.mount(
      <CommonSearchDropDown
        label="기술"
        options={['Option 1', 'Option 2', 'Option 3']}
      />,
    );

    cy.get('input').type('Option 2');
    cy.get('button').contains('✕').click();

    cy.get('input').should('have.value', '');
  });
});
