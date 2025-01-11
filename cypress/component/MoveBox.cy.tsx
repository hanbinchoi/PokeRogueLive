import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MoveBox } from '../../src/components/pokemon/MoveBox';

describe('<MoveBox />', () => {
  const mockMoves = [
    {
      move: {
        name: 'pound',
        url: 'https://pokeapi.co/api/v2/move/1/',
      },
      version_group_details: [
        {
          level_learned_at: 9,
          move_learn_method: {
            name: 'level-up',
            url: 'https://pokeapi.co/api/v2/move-learn-method/1/',
          },
          version_group: {
            name: 'red-blue',
            url: 'https://pokeapi.co/api/v2/version-group/1/',
          },
        },
      ],
    },
    {
      move: {
        name: 'pound',
        url: 'https://pokeapi.co/api/v2/move/1/',
      },
      version_group_details: [
        {
          level_learned_at: 9,
          move_learn_method: {
            name: 'level-up',
            url: 'https://pokeapi.co/api/v2/move-learn-method/1/',
          },
          version_group: {
            name: 'red-blue',
            url: 'https://pokeapi.co/api/v2/version-group/1/',
          },
        },
      ],
    },
    {
      move: {
        name: 'pound',
        url: 'https://pokeapi.co/api/v2/move/1/',
      },
      version_group_details: [
        {
          level_learned_at: 9,
          move_learn_method: {
            name: 'level-up',
            url: 'https://pokeapi.co/api/v2/move-learn-method/1/',
          },
          version_group: {
            name: 'red-blue',
            url: 'https://pokeapi.co/api/v2/version-group/1/',
          },
        },
      ],
    },
    {
      move: {
        name: 'pound',
        url: 'https://pokeapi.co/api/v2/move/1/',
      },
      version_group_details: [
        {
          level_learned_at: 9,
          move_learn_method: {
            name: 'level-up',
            url: 'https://pokeapi.co/api/v2/move-learn-method/1/',
          },
          version_group: {
            name: 'red-blue',
            url: 'https://pokeapi.co/api/v2/version-group/1/',
          },
        },
      ],
    },
    {
      move: {
        name: 'pound',
        url: 'https://pokeapi.co/api/v2/move/1/',
      },
      version_group_details: [
        {
          level_learned_at: 9,
          move_learn_method: {
            name: 'level-up',
            url: 'https://pokeapi.co/api/v2/move-learn-method/1/',
          },
          version_group: {
            name: 'red-blue',
            url: 'https://pokeapi.co/api/v2/version-group/1/',
          },
        },
      ],
    },
  ];

  const queryClient = new QueryClient();

  it('첫 번째 페이지에서 올바른 수의 기술이 렌더링되는지 확인', () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <MoveBox moves={mockMoves} />
      </QueryClientProvider>,
    );
    cy.get('.move-component').should('have.length', 4); // mockMoves에 기반
  });

  it('기술 이름과 배우는 레벨이 제대로 표시되는지 확인', () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <MoveBox moves={mockMoves} />
      </QueryClientProvider>,
    );

    // 기술 이름과 레벨이 제대로 표시되는지 확인
    cy.get('.move-component').first().contains('막치기');
    cy.get('.move-component').first().contains('Lv9');
  });

  it('페이지네이션 컨트롤이 제대로 표시되는지 확인', () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <MoveBox moves={mockMoves} />
      </QueryClientProvider>,
    );

    cy.get('ul>li').first().should('have.text', '1');
    cy.get('ul>li').eq(1).should('have.text', '2'); // 2번째 자식
  });
});
