import React from 'react';
import { TypeBadge } from './TypeBadge';
import { POKEMON_TYPE_INFO, PokemonTypeName } from '@/constants/contents';

describe('<TypeBadge />', () => {
  it('사이즈와 타입에 맞추어 렌더링 되는지 확인합니다.', () => {
    cy.mount(<TypeBadge type={PokemonTypeName.NORMAL} size="small" />);
    cy.get('span')
      .should('have.class', 'bg-type-normal')
      .and('have.class', 'text-xs');
  });

  it('Stellar 타입이 레인보우 배경으로 렌더링되는지 확인', () => {
    const type = PokemonTypeName.STELLAR; // 특별한 Stellar 타입
    const { name } = POKEMON_TYPE_INFO[type];

    cy.mount(<TypeBadge type={type} size="medium" />);

    // 텍스트가 타입 이름과 일치하는지 확인
    cy.contains(name).should('be.visible');

    // rainbow-bg 클래스가 적용되었는지 확인
    cy.get('span')
      .should('have.class', 'rainbow-bg')
      .and('have.class', 'text-white-100')
      .and('have.class', 'text-sm') // medium 크기에서 적용
      .and('have.class', 'font-bold')
      .and('have.class', 'py-1')
      .and('have.class', 'rounded-lg');
  });
});
