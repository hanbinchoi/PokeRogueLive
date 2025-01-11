import { PowerDamageContext } from './PowerDamageContext';
import { DamageContextProps } from '@/types/common';

describe('PowerDamageContext', () => {
  const mockDamageContext: DamageContextProps = {
    sameTypeEffectiveness: '자속 보정으로 인해 데미지가 1.5배 증가',
    defendTypeEffectiveness: null,
    mod1: '날씨의 영향으로 인해 데미지가 1.2배 증가',
    fieldValue: null,
    weaknessPower: null,
    random: '랜덤변수 85~100 적용',
  };

  it('데미지 컨텍스트가 제공되면 정보를 표시한다', () => {
    cy.mount(<PowerDamageContext damageContext={mockDamageContext} />);

    cy.contains('자속 보정으로 인해 데미지가 1.5배 증가').should('exist');
    cy.contains('날씨의 영향으로 인해 데미지가 1.2배 증가').should('exist');
    cy.contains('랜덤변수 85~100 적용').should('exist');
  });

  it('데미지 컨텍스트가 제공되지 않으면 아무것도 표시되지 않는다', () => {
    cy.mount(<PowerDamageContext damageContext={undefined} />);

    // 아무것도 렌더링되지 않음을 확인
    cy.get('p').should('not.exist');
  });

  it('데미지 컨텍스트의 값이 null인 항목은 렌더링되지 않는다', () => {
    cy.mount(<PowerDamageContext damageContext={mockDamageContext} />);

    cy.contains('약점 배율: 2x').should('not.exist');
  });
});
