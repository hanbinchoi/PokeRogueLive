import React from 'react';
import { Header } from '../../src/components/common/Header';

describe('<Header />', () => {
  it('아이콘 클릭 시 메뉴 열기', () => {
    cy.mount(<Header />);
    cy.get('button').click();
    cy.get('.header-menu-container').should('have.class', 'translate-x-0');
  });

  it('외부를 클릭하면 메뉴가 닫힌다.', () => {
    cy.mount(<Header />);
    cy.get('body').click();
    cy.get('.header-menu-container').should('have.class', 'translate-x-full');
  });
});
