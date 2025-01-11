import React from 'react';
import { PokemonCard } from './PokemonCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('PokemonCard 컴포넌트', () => {
  const createQueryClient = () => new QueryClient();

  const WrappedEvolutionChain = ({ id }: { id: number }) => (
    <QueryClientProvider client={createQueryClient()}>
      <PokemonCard id={id} />
    </QueryClientProvider>
  );

  it('로딩 중일 때 LoadingComponent가 표시되는지 확인', () => {
    cy.mount(<WrappedEvolutionChain id={1} />);

    // 로딩 중일 때 로딩 컴포넌트가 표시되는지 확인
    cy.get('.loading-component').should('exist'); // 이 부분은 LoadingComponent의 내용을 반영해야 합니다.
  });

  it('포켓몬 정보가 올바르게 표시되는지 확인', () => {
    cy.mount(<WrappedEvolutionChain id={1} />);

    // 포켓몬 이름, ID, 이미지, 타입 정보가 올바르게 표시되는지 확인
    cy.get('div').contains(`No. ${String(1).padStart(3, '0')}`);
    cy.get('img').should(
      'have.attr',
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    );
    cy.get('.pokemon-name').should('have.text', '이상해씨');
    cy.get('span').contains('풀');
  });
});
