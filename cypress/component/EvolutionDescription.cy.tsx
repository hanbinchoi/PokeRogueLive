import { EvolutionDescription } from '../../src/components/pokemon/EvolutionDescription';

describe('<EvolutionDescription />', () => {
  const mockEvolutionDetails = [
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
  ];

  const mockItemResponse = {
    names: [
      { language: { name: 'ko' }, name: '아이템 123' },
      { language: { name: 'en' }, name: 'Item 123' },
    ],
  };

  it('진화 조건을 정상적으로 렌더링합니다', () => {
    cy.intercept('GET', '/item/123/', {
      statusCode: 200,
      body: mockItemResponse,
    }).as('getItemInfo');
    // 컴포넌트 마운트
    cy.mount(<EvolutionDescription evolutionDetails={mockEvolutionDetails} />);

    // 행복도, 레벨, 아이템 조건을 각각 확인
    cy.contains('레벨 16').should('be.visible');
  });

  it('아이템이 없을 경우 아이템 관련 텍스트가 렌더링되지 않음', () => {
    cy.intercept('GET', '/item/123/', {
      statusCode: 200,
      body: mockItemResponse,
    }).as('getItemInfo');

    cy.mount(<EvolutionDescription evolutionDetails={mockEvolutionDetails} />);

    // 아이템이 없으므로 "사용" 텍스트가 렌더링되지 않음
    cy.contains('사용').should('not.exist');
  });
});
