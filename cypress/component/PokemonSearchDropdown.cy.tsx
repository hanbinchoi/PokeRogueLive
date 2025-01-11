import { BattleRole, POKEMON_LIST_IN_KOREAN } from '@/constants/contents';
import { PokemonSearchDropdown } from '../../src/components/power-calculator/PokemonSearchDropdown';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BattleRoleType } from '@/types/common';

describe('PokemonSearchDropdown', () => {
  const validPokemon = POKEMON_LIST_IN_KOREAN[0]; // 예: '이상해씨'
  const createQueryClient = () => new QueryClient();

  const WrappedEvolutionChain = ({ usage }: { usage: BattleRoleType }) => (
    <QueryClientProvider client={createQueryClient()}>
      <PokemonSearchDropdown usage={usage} />
    </QueryClientProvider>
  );
  beforeEach(() => {
    cy.mount(<WrappedEvolutionChain usage={BattleRole.ATTACK} />);
  });

  it('드롭다운 컴포넌트가 정상적으로 렌더링된다.', () => {
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="text"]').should(
      'have.attr',
      'placeholder',
      '포켓몬 입력',
    );
  });

  it('입력값에 따라 드롭다운 옵션이 필터링된다.', () => {
    const searchQuery = validPokemon.slice(0, 2); // 포켓몬 이름 일부 입력

    cy.get('input[type="text"]').type(searchQuery);
    cy.get('.dropdown-container').should('be.visible'); // 드롭다운 표시
    cy.get('#dropdown-option-이상해씨').should('be.visible');
    cy.get('#dropdown-option-이상해풀').should('be.visible');
    cy.get('#dropdown-option-이상해꽃').should('be.visible');
  });

  it('옵션을 선택하면 상태가 변경된다.', () => {
    cy.get('input[type="text"]').type(validPokemon);
    cy.get('#dropdown-option-이상해씨').click(); // 첫 번째 옵션 선택

    cy.get('input[type="text"]').should('have.value', validPokemon); // 선택된 값 확인
  });

  it('유효하지 않은 값을 입력하면 에러 메시지가 표시된다.', () => {
    const invalidQuery = '유효하지 않은 이름';

    cy.get('input[type="text"]').type(invalidQuery).type('{enter}');
    cy.get('input[type="text"]').type(invalidQuery).type('{enter}');
    cy.get('div > p').contains('포켓몬을 찾을 수 없어요');
  });

  it('초기화 버튼(✕)을 클릭하면 입력값이 초기화된다.', () => {
    cy.get('input[type="text"]').type(validPokemon);

    cy.get('button').contains('✕').click(); // 초기화 버튼 클릭
    cy.get('input[type="text"]').should('have.value', ''); // 입력값 초기화 확인
  });
});
