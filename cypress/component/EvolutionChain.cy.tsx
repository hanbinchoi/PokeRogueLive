import {
  EvolutionChain,
  EvolutionChainProps,
} from '../../src/components/pokemon/EvolutionChain';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock 데이터
const mockEvolutionChainResponse = {
  baby_trigger_item: null,
  chain: {
    evolution_details: [],
    evolves_to: [
      {
        evolution_details: [
          {
            gender: null,
            held_item: null,
            item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_affection: null,
            min_beauty: null,
            min_happiness: null,
            min_level: 16,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: null,
            time_of_day: '',
            trade_species: null,
            trigger: {
              name: 'level-up',
              url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
            },
            turn_upside_down: false,
          },
        ],
        evolves_to: [
          {
            evolution_details: [
              {
                gender: null,
                held_item: null,
                item: null,
                known_move: null,
                known_move_type: null,
                location: null,
                min_affection: null,
                min_beauty: null,
                min_happiness: null,
                min_level: 32,
                needs_overworld_rain: false,
                party_species: null,
                party_type: null,
                relative_physical_stats: null,
                time_of_day: '',
                trade_species: null,
                trigger: {
                  name: 'level-up',
                  url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
                },
                turn_upside_down: false,
              },
            ],
            evolves_to: [],
            is_baby: false,
            species: {
              name: 'venusaur',
              url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
            },
          },
        ],
        is_baby: false,
        species: {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
        },
      },
    ],
    is_baby: false,
    species: {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
    },
  },
  id: 1,
};

const createQueryClient = () => new QueryClient();

const WrappedEvolutionChain = ({ url, pokedex }: EvolutionChainProps) => (
  <QueryClientProvider client={createQueryClient()}>
    <EvolutionChain url={url} pokedex={pokedex} />
  </QueryClientProvider>
);

describe('<EvolutionChain />', () => {
  it('로딩 상태를 표시 후 진화 정보를 렌더링 합니다.', () => {
    // mock API 응답 지연
    cy.intercept('GET', 'https://pokeapi.co/api/v2/evolution-chain/1/', {
      delay: 1000, // 1초 지연
      statusCode: 200,
      body: mockEvolutionChainResponse,
    }).as('getEvolutionChain');

    // 컴포넌트 마운트
    cy.mount(
      <WrappedEvolutionChain
        url="https://pokeapi.co/api/v2/evolution-chain/1/"
        pokedex={1}
      />,
    );

    cy.get('.loading-component', { timeout: 5000 }).should('exist');
    cy.wait('@getEvolutionChain');
    cy.get('.loading-component').should('not.exist');
  });

  it('API 요청이 오류를 반환할 경우 에러를 표시', () => {
    cy.mount(
      <WrappedEvolutionChain
        url="https://pokeapi.co/api/v2/evolution-chain/not-found"
        pokedex={1}
      />,
    );
    cy.wait(5000);
    cy.get('.error-title').should('be.visible');
    cy.get('.error-title').should('have.text', '진화 정보를 찾을 수 없습니다.');
  });
});
