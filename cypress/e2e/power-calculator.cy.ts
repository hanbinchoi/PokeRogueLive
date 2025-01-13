describe('위력 계산기 페이지 테스트', () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.visit('http://localhost:3000/power-calculator');
    cy.get('.pokemon-search-dropdown')
      .first()
      .find('input')
      .type('이상해{downarrow}{enter}');
  });

  it('초기 렌더링 시 2개의 드롭다운 컴포넌트만 렌더링됩니다.', () => {
    cy.get('.pokemon-search-dropdown').first().find('input').clear();
    cy.get('.pokemon-search-dropdown').should('have.length', 2);
    cy.get('.pokemon-stats-panel').should('not.exist');
    cy.get('.search-dropdown').should('not.exist');
    cy.get('.checkbox').should('not.exist');
    cy.get('.damage-result').should('not.exist');
  });

  it('포켓몬 검색 창에서 직접 입력하거나 드롭다운 메뉴를 선택하여 포켓몬을 설정할 수 있습니다.', () => {
    cy.get('.pokemon-search-dropdown')
      .first()
      .find('input')
      .type('{backspace}{backspace}{backspace}{downarrow}{downarrow}{enter}');
  });

  it('포켓몬 설정 후 데이터 로딩 시 로딩 컴포넌트가 렌더링됩니다.', () => {
    cy.get('.loading-component').should('exist');
  });

  it('잘못된 포켓몬 검색 시 에러 컴포넌트가 렌더링됩니다.', () => {
    cy.get('.pokemon-search-dropdown')
      .first()
      .find('input')
      .type('에러{enter}');
    cy.get('.error-title').should('exist');
  });

  it('포켓몬 설정 후 스탯 패널이 렌더링되며, 자유롭게 스탯을 수정할 수 있습니다.', () => {
    cy.get('.pokemon-stats-panel').should('exist');
    cy.get('.pokemon-stat-input').first().type('{backspace}{backspace}5');
    cy.get('.pokemon-stat-input').first().should('have.value', '5');
  });

  it('공격 측 옵션은 검색 및 드롭다운 옵션 선택 둘 다 가능합니다.', () => {
    cy.get('#dropdown-기술').click().type('칼춤{enter}');
    cy.get('#dropdown-기술').click().clear();
    cy.get('#dropdown-기술').click().type('{downarrow}{downarrow}{enter}');
  });

  it('공격 측 옵션 중 메뉴에 없는 옵션을 검색하면 에러 메시지가 출력됩니다.', () => {
    cy.get('#dropdown-기술').click().type('오류{enter}');
    cy.get('#error-message').should('be.visible');
  });

  it('급소 타격 체크박스는 클릭 시 체크되며 두번 클릭 시 체크가 해제됩니다.', () => {
    cy.get('.checkbox').click().find('input').should('be.checked');
    cy.get('.checkbox').click().find('input').should('not.be.checked');
  });

  it('공격, 방어 포켓몬이 모두 설정되어 있고 상태이상 기술을 제외한 기술이 선택되면 데미지 계산값이 렌더링됩니다.', () => {
    cy.get('.pokemon-search-dropdown')
      .eq(1)
      .find('input')
      .type('파이리{enter}');
    cy.get('#dropdown-기술').click().type('풀베기{enter}');
    cy.get('.damage-result').should('be.visible');
  });

  it('공격, 방어 포켓몬이 모두 설정되어 있고 상태이상 기술이 선택되면 에러메시지가 렌더링됩니다.', () => {
    cy.get('.pokemon-search-dropdown')
      .eq(1)
      .find('input')
      .type('파이리{enter}');
    cy.get('#dropdown-기술').click().type('칼춤{enter}');
    cy.get('.error-title').should('be.visible');
  });

  it('데미지 계산값은 hp에 비례하여 색을 다르게 렌더링합니다. ', () => {
    cy.get('.pokemon-search-dropdown')
      .eq(1)
      .find('input')
      .type('파이리{enter}');
    cy.get('#dropdown-기술').click().type('풀베기{enter}');

    // 데미지가 hp의 0.66 이상이면 red
    cy.get('.pokemon-stats-panel')
      .eq(1)
      .find('.pokemon-stat-input')
      .eq(1)
      .type('{backspace}{backspace}5');

    cy.get('.damage-result > div > p').should('have.class', 'text-red-30');

    // 데미지가 hp의 0.33 이상이면 gray
    cy.get('.pokemon-stats-panel')
      .eq(1)
      .find('.pokemon-stat-input')
      .eq(1)
      .type('{backspace}50');

    cy.get('.damage-result > div > p').should('have.class', 'text-gray-70');

    // 데미지가 hp의 0.33 이하면 gray
    cy.get('.pokemon-stats-panel')
      .eq(1)
      .find('.pokemon-stat-input')
      .eq(1)
      .type('0');

    cy.get('.damage-result > div > p').should('have.class', 'text-blue-30');
  });

  it('기술의 타입, 방어 포켓몬의 타입, 필드, 날씨 등에 영향으로 데미지가 결정되며, 결정에 영향을 끼친 요소들은 모두 데미지 결과값과 함께 렌더링됩니다.', () => {
    cy.get('.pokemon-search-dropdown')
      .eq(1)
      .find('input')
      .type('파이리{enter}');
    cy.get('#dropdown-기술').click().type('덩굴{downArrow}{enter}');
    cy.get('#dropdown-필드').click().type('그래스{enter}');
    cy.get('.checkbox').click();

    cy.get('.damage-context').contains('자속 보정');
    cy.get('.damage-context').contains('방어 측의 타입');
    cy.get('.damage-context').contains('필드의 영향');
    cy.get('.damage-context').contains('급소 타격');
    cy.get('.damage-context').contains('랜덤변수');
  });
});
