import { POKEMON_TYPE_INFO, PokemonTypeName } from '@/constants/contents';
import { PokemonOverview } from '../../src/components/pokemon/PokemonOverview';

describe('PokemonOverview 컴포넌트', () => {
  const mockPokemon = {
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
  it('포켓몬 이름, 타입, 도감 설명이 올바르게 표시되는지 확인', () => {
    cy.mount(<PokemonOverview pokemon={mockPokemon} />);

    // 포켓몬 이름이 제대로 표시되는지 확인
    cy.get('h1').should('have.text', mockPokemon.name);

    // 포켓몬 타입이 제대로 표시되는지 확인
    cy.get('span')
      .first()
      .should('have.text', POKEMON_TYPE_INFO[mockPokemon.type[0]].name);

    // 도감 설명이 제대로 표시되는지 확인
    cy.get('.flavor-text').should('have.text', mockPokemon.flavor_text);
  });
});
