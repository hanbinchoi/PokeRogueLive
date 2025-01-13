describe('사이드바 네비게이션 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('홈 화면에 필요한 컴포넌트들이 렌더링 되었는지 확인합니다.', () => {
    cy.get('img[alt="로고"]').should('be.visible');

    cy.contains('PokeRogue Live').should('be.visible');
    cy.contains('포켓몬 공식 API를 기반으로').should('be.visible');
    cy.get('.menu-title').should('have.length', 3);
  });

  it('홈 화면에 메뉴 타이틀 클릭 시 해당 메뉴로 이동합니다.', () => {
    cy.get('.menu-title').first().click();
    cy.url().should('include', '/pokemon');
  });

  it('사이드바 메뉴 중 "포켓몬 도감" 클릭 시 포켓몬 도감 페이지 이동합니다.', () => {
    cy.get('nav>li>a[href*="pokemon"]').click();

    cy.url().should('include', '/pokemon');

    cy.get('h1').contains('포켓몬 목록');
  });

  it('사이드바 메뉴 중 "타입 계산기" 클릭 시 타입 계산기 페이지 이동합니다.', () => {
    cy.get('nav>li>a[href*="type-calculator"]').click();

    cy.url().should('include', '/type-calculator');

    cy.get('h1').contains('타입 계산기');
  });

  it('사이드바 메뉴 중 "위력 계산기" 클릭 시 위력 계산기 페이지 이동합니다.', () => {
    cy.get('nav>li>a[href*="power-calculator"]').click();

    cy.url().should('include', '/power-calculator');

    cy.get('h1').contains('위력 계산기');
  });
});
