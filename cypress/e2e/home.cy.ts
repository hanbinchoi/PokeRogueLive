describe('사이드바 네비게이션 테스트', () => {
  it('사이드바 메뉴 중 "포켓몬 도감" 클릭 시 포켓몬 도감 페이지 이동', () => {
    cy.visit('http://localhost:3000/');

    cy.get('nav>li>a[href*="pokemon"]').click();

    cy.url().should('include', '/pokemon');

    cy.get('h1').contains('포켓몬 목록');
  });

  it('사이드바 메뉴 중 "타입 계산기" 클릭 시 타입 계산기 페이지 이동', () => {
    cy.visit('http://localhost:3000/');

    cy.get('nav>li>a[href*="type-calculator"]').click();

    cy.url().should('include', '/type-calculator');

    cy.get('h1').contains('타입 계산기');
  });

  it('사이드바 메뉴 중 "위력 계산기" 클릭 시 위력 계산기 페이지 이동', () => {
    cy.visit('http://localhost:3000/');

    cy.get('nav>li>a[href*="power-calculator"]').click();

    cy.url().should('include', '/power-calculator');

    cy.get('h1').contains('위력 계산기');
  });
});
