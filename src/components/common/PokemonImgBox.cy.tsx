import { PokemonDetailProps } from '@/types/common';
import { PokemonImgBox } from './PokemonImgBox';
import { PokemonTypeName } from '@/constants/contents';

describe('<PokemonImgBox />', () => {
  const mockPokemon: PokemonDetailProps = {
    type: [PokemonTypeName.FIRE, PokemonTypeName.DARK],
    pokedex: 25,
    name: 'test',
    cries: 'https://example.com/test',
    imageUrl: 'https://example.com/test.png',
    abilitiesInfo: [
      {
        ability: { name: 'ability', url: 'test' },
        is_hidden: false,
        slot: 0,
      },
    ],
    base_experience: 0,
    height: 180,
    weight: 70,
    moves: [
      {
        move: { name: 'move', url: 'test' },
        version_group_details: [
          {
            level_learned_at: 0,
            move_learn_method: { name: 'moveLearnMethod', url: 'test' },
            version_group: { name: 'versionGroup', url: 'test' },
          },
        ],
      },
    ],
    stats: [
      {
        base_stat: 0,
        effort: 0,
        stat: { name: 'hp', url: 'test' },
      },
    ],
    capture_rate: 10,
    evolution_chain: 'test',
    flavor_text: 'test',
    genera: 'test',
    is_legendary: false,
    is_mythical: false,
  };

  it('detail 모드에서 포켓몬 이미지와 정보가 렌더링되는지 확인', () => {
    cy.mount(<PokemonImgBox pokemon={mockPokemon} usage="detail" />);

    // 포켓몬 번호 확인
    cy.contains('No. 025').should('exist');

    // 오디오 버튼 확인
    cy.get('svg[role="button"]').should('exist');

    // 이미지 확인
    cy.get('img')
      .should('have.attr', 'src', mockPokemon.imageUrl)
      .and('have.attr', 'alt', mockPokemon.name);
  });

  it('오디오 버튼 클릭 시 재생이 호출되는지 확인', () => {
    cy.mount(<PokemonImgBox pokemon={mockPokemon} usage="detail" />);

    // 오디오 객체의 play 메서드를 모의로 대체
    const audioMock = {
      play: cy.stub(),
    };
    cy.stub(window, 'Audio').returns(audioMock);

    // 오디오 버튼 클릭
    cy.get('svg[role="button"]').click();

    // play 메서드가 호출되었는지 확인
    cy.wrap(audioMock.play).should('have.been.calledOnce');
  });

  it('power 모드에서 포켓몬 이미지와 타입이 렌더링되는지 확인', () => {
    cy.mount(<PokemonImgBox pokemon={mockPokemon} usage="power" />);

    // 포켓몬 이름 확인
    cy.contains(mockPokemon.name).should('exist');

    // 이미지 확인
    cy.get('img')
      .should('have.attr', 'src', mockPokemon.imageUrl)
      .and('have.attr', 'alt', mockPokemon.name);

    // 타입 배지 확인
    cy.get('.bg-type-fire').should('exist');
    cy.get('.bg-type-dark').should('exist');
  });
});
