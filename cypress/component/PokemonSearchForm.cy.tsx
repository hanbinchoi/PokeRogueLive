import { usePokemonSearchForm } from '@/hooks/usePokemonSearchForm';
import { PokemonSearchForm } from '../../src/components/pokemons/PokemonSearchForm';

describe('PokemonSearchForm 컴포넌트', () => {
  beforeEach(() => {
    cy.mount(<PokemonSearchForm />);
  });

  it('초기 상태에서 검색 버튼이 활성화되어 있다', () => {
    cy.get('button[type="submit"]').should('not.be.disabled'); // 검색 버튼이 비활성화되지 않음
  });

  it('잘못된 검색값을 입력하면 에러 메시지가 표시된다', () => {
    cy.get('button[type="submit"]').click(); // 검색 버튼 클릭 (빈 값 입력 시 에러메시지 노출)
    cy.get('#error-message').should('exist');
  });

  it('검색 후 리셋 버튼을 클릭하면 입력 값이 초기화된다', () => {
    const searchQuery = 'Charmander';

    cy.get('input[name="keyword"]').type(searchQuery); // 입력 필드에 "Charmander" 입력
    cy.get('button[type="submit"]').click(); // 검색 버튼 클릭

    cy.get('button[type="reset"]').click();

    cy.get('input[name="keyword"]').should('have.value', '');
  });

  it('input이 포커싱되면 dropdown 메뉴가 노출된다.', () => {
    cy.get('input[name="keyword"]').focus();
    cy.get('.dropdown-container').should('exist');
  });
});
