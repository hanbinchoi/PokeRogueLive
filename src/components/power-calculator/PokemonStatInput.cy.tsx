import { PokemonTypeName } from '@/constants/contents';
import { PokemonStatInput } from './PokemonStatInput';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('PokemonStatInput', () => {
  let setPokemonSpy;
  // 더미 포켓몬 데이터 설정
  const dummyPokemon = {
    type: [PokemonTypeName.NORMAL, PokemonTypeName.FAIRY],
    pokedex: 42,
    name: '푸린',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
    abilitiesInfo: [
      {
        ability: {
          name: 'cute-charm',
          url: 'https://pokeapi.co/api/v2/ability/56/',
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: 'friend-guard',
          url: 'https://pokeapi.co/api/v2/ability/132/',
        },
        is_hidden: true,
        slot: 3,
      },
    ],
    base_experience: 95,
    cries:
      'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/39.ogg',
    height: 5,
    moves: [
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
          name: 'psychic-noise',
          url: 'https://pokeapi.co/api/v2/move/917/',
        },
        version_group_details: [
          {
            level_learned_at: 0,
            move_learn_method: {
              name: 'machine',
              url: 'https://pokeapi.co/api/v2/move-learn-method/4/',
            },
            version_group: {
              name: 'scarlet-violet',
              url: 'https://pokeapi.co/api/v2/version-group/25/',
            },
          },
        ],
      },
    ],
    stats: [
      {
        base_stat: 50,
        effort: 0,
        stat: {
          name: 'lv',
          url: 'unknown',
        },
      },
      {
        base_stat: 115,
        effort: 2,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/',
        },
      },
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/',
        },
      },
      {
        base_stat: 20,
        effort: 0,
        stat: {
          name: 'defense',
          url: 'https://pokeapi.co/api/v2/stat/3/',
        },
      },
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'special-attack',
          url: 'https://pokeapi.co/api/v2/stat/4/',
        },
      },
      {
        base_stat: 25,
        effort: 0,
        stat: {
          name: 'special-defense',
          url: 'https://pokeapi.co/api/v2/stat/5/',
        },
      },
      {
        base_stat: 20,
        effort: 0,
        stat: {
          name: 'speed',
          url: 'https://pokeapi.co/api/v2/stat/6/',
        },
      },
    ],
    weight: 55,
    capture_rate: 170,
    evolution_chain: 'https://pokeapi.co/api/v2/evolution-chain/16/',
    flavor_text:
      '동그랗고 커다란 눈동자로\n유인하고 기분 좋은 노래를\n불러 상대방을 잠들게 한다.',
    genera: '풍선포켓몬',
    is_legendary: false,
    is_mythical: false,
  };

  beforeEach(() => {
    // setPokemon을 스파이로 설정
    setPokemonSpy = cy.spy().as('setPokemonSpy');

    const createQueryClient = () => new QueryClient();

    cy.mount(
      <QueryClientProvider client={createQueryClient()}>
        <PokemonStatInput
          stat={dummyPokemon.stats[0]}
          pokemon={dummyPokemon}
          setPokemon={setPokemonSpy}
        />
      </QueryClientProvider>,
    );
  });

  it('렌더링된 input 필드에 초기값이 제대로 표시된다.', () => {
    cy.contains('레벨').should('exist');
    cy.get('input[type="number"]').should('have.value', '50');
  });

  it('입력값을 변경하면 setPokemon이 호출되고 포켓몬 스탯이 업데이트된다.', () => {
    cy.get('input[type="number"]').should('have.value', '50');
    cy.get('input[type="number"]').type('1', { delay: 1000 });

    // setPokemon 함수 호출 확인
    cy.get('@setPokemonSpy').should('have.been.calledWith', {
      ...dummyPokemon,
      stats: [
        {
          base_stat: 501,
          effort: 0,
          stat: {
            name: 'lv',
            url: 'unknown',
          },
        },
        ...dummyPokemon.stats.filter((e) => e.stat.name !== 'lv'),
      ],
    });
  });
});
