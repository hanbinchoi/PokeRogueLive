import React from 'react';
import { PokemonList } from '../../src/components/pokemons/PokemonList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('PokemonList 컴포넌트', () => {
  const createQueryClient = () => new QueryClient();
  const WrappedPokemonList = () => (
    <QueryClientProvider client={createQueryClient()}>
      <PokemonList />
    </QueryClientProvider>
  );

  it('로딩 중에는 LoadingComponent가 보여야 한다', () => {
    cy.mount(<WrappedPokemonList />);
    cy.get('.loading-component').should('exist'); // Loading component 존재 확인
  });

  it('포켓몬 목록이 정상적으로 표시된다', () => {
    cy.mount(<WrappedPokemonList />);

    cy.get('.pokemon-card').should('have.length', 4);

    cy.get('.pokemon-card')
      .first()
      .within(() => {
        cy.get('img').should(
          'have.attr',
          'src',
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        );
        cy.get('.pokemon-name').should('contain', '이상해씨');
      });
  });

  it('페이지네이션 컨트롤이 제대로 표시되는지 확인', () => {
    cy.mount(<WrappedPokemonList />);

    cy.get('ul>li').first().should('have.text', '1');
    cy.get('ul>li').eq(1).should('have.text', '2'); // 2번째 자식
  });
});
