import { PowerDamageValue } from '../../src/components/power-calculator/PowerDamageValue';

describe('PowerDamageValue', () => {
  it('HP가 주어졌을 때 위력/HP 비율이 0.66 초과하면 빨간색으로 표시한다', () => {
    cy.mount(<PowerDamageValue damage={50} hp={60} />);
    cy.get('p').should('have.class', 'text-red-30').and('contain', '50');
  });

  it('HP가 주어졌을 때 위력/HP 비율이 0.33 초과 0.66 이하이면 회색으로 표시한다', () => {
    cy.mount(<PowerDamageValue damage={50} hp={150} />);
    cy.get('p').should('have.class', 'text-gray-70').and('contain', '50');
  });

  it('HP가 주어졌을 때 위력/HP 비율이 0.33 미만이면 파란색으로 표시한다', () => {
    cy.mount(<PowerDamageValue damage={50} hp={200} />);
    cy.get('p').should('have.class', 'text-blue-30').and('contain', '50');
  });

  it('HP가 제공되지 않으면 아무것도 표시되지 않는다', () => {
    cy.mount(<PowerDamageValue damage={50} />);
    cy.get('p').should('not.exist');
  });
});
