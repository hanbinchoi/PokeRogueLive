describe('포켓몬 목록 페이지 테스트', () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.visit('http://localhost:3000/pokemon');
  });

  it('포켓몬 목록이 화면 크기에 비례하여 렌더링되는지 확인합니다.', () => {
    cy.get('.pokemon-card').should('have.length', 10);

    cy.viewport(1024, 1024);
    cy.get('.pokemon-card').should('have.length', 8);

    cy.viewport(640, 1024);
    cy.get('.pokemon-card').should('have.length', 6);

    cy.viewport(480, 1024);
    cy.get('.pokemon-card').should('have.length', 4);

    cy.viewport(360, 1024);
    cy.get('.pokemon-card').should('have.length', 2);

    cy.get('.pokemon-card')
      .first()
      .within(() => {
        cy.get('img').should(
          'have.attr',
          'src',
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        );
        cy.get('.pokemon-name').should('contain', '이상해씨');
      });
  });

  it('포켓몬 검색 시 해당 키워드를 포함하는 이름을 가진 포켓몬을 렌더링합니다.', () => {
    cy.get('input').type('이상해{downarrow}{enter}');
    cy.get('.pokemon-name').eq(0).should('have.text', '이상해씨');
    cy.get('.pokemon-name').eq(1).should('have.text', '이상해풀');
    cy.get('.pokemon-name').eq(2).should('have.text', '이상해꽃');
  });

  it('포켓몬 검색 중 키보드 입력을 통해 드롭다운 옵션을 선택할 수 있습니다.', () => {
    cy.get('input')
      .type('이상해{downarrow}{downarrow}{enter}')
      .should('have.value', '이상해풀');
  });

  it('포켓몬 검색 중 x 버튼을 클릭하면 검색 키워드가 초기화 된 후 전체 포켓몬 목록을 렌더링합니다.', () => {
    cy.get('input').type('이상해{enter}{enter}');
    cy.contains('button', '✕').click();
    cy.get('.pokemon-card').should('have.length', 10);
  });

  it('페이지 목록에 있는 번호 클릭 시 해당 페이지 번호로 이동합니다.', () => {
    cy.get('.page-number-button').eq(1).click();
    cy.get('.pokemon-name').first().should('have.text', '단데기');
    cy.get('.page-number-button.text-blue-30').should('have.text', '2');
  });

  it('페이지 목록에 있는 화살표 아이콘 클릭으로 페이지를 5칸 씩 이동할 수 있습니다.', () => {
    cy.get('.page-number-button').eq(5).click();
    cy.get('.page-number-button.text-blue-30').should('have.text', '6');
    cy.get('.page-number-button').eq(1).click();
    cy.get('.page-number-button.text-blue-30').should('have.text', '1');
  });

  it('페이지 목록에 있는 더블 화살표 아이콘 클릭 시 맨앞 혹은 맨뒤 페이지로 이동합니다.', () => {
    cy.get('.page-number-button').eq(6).click();
    cy.get('.page-number-button.text-blue-30').should('have.text', '103');
    cy.get('.page-number-button').eq(0).click();
    cy.get('.page-number-button.text-blue-30').should('have.text', '1');
  });

  it('포켓몬 카드 클릭 시 해당 포켓몬 상세 정보 페이지로 이동합니다.', () => {
    cy.get('.pokemon-card').first().click();
    cy.url().should('include', '/pokemon/1');
  });
});
