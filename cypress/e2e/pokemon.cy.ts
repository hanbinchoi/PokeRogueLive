describe('포켓몬 상세 정보 페이지 테스트', () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.visit('http://localhost:3000/pokemon/1');
  });

  it('데이터 로딩 시 로딩 컴포넌트가 렌더링됩니다.', () => {
    cy.get('.loading-component').should('exist');
  });

  it('데이터 요청 실패 시 에러메시지를 출력합니다.', () => {
    cy.visit('http://localhost:3000/pokemon/999123'); // 없는 포켓몬 ID로 테스트
    cy.wait(5000);
    cy.get('.error-title').should('contain', '포켓몬을 찾을 수 없어요');
  });

  it('데이터 요청 성공 시 해당 포켓몬의 정보를 렌더링합니다.', () => {
    cy.get('.detail-image')
      .should('have.attr', 'src')
      .and(
        'include',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      );
    cy.get('h1.pokemon-name').should('have.text', '이상해씨');

    cy.get('.type-badge').eq(0).should('have.text', '풀');
    cy.get('.type-badge').eq(1).should('have.text', '독');
  });

  it('소리 아이콘 클릭 시 해당 포켓몬의 울음소리를 재생합니다.', () => {
    cy.window().then((window) => {
      cy.stub(window, 'Audio').returns({
        play: cy.stub().as('playAudio'),
      });
    });

    cy.get('svg.cursor-pointer').click();
    cy.get('@playAudio').should('have.been.calledOnce');
  });

  it('스크린 크기가 작으면 맞추어 포켓몬 능력치를 표 타입으로 렌더링합니다.', () => {
    cy.viewport(760, 1024);
    cy.get('.stat-table').should('be.visible');
  });

  it('진화 정보를 체인형태로 렌더링 후 클릭 시 해당 포켓몬의 상세 정보 페이지로 이동합니다.', () => {
    cy.get('.evolution-node').should('have.length', 3);

    cy.get('.evolution-node > a > img')
      .eq(0)
      .should('have.attr', 'src')
      .and(
        'include',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      );
    cy.get('.evolution-node > a > img')
      .eq(1)
      .should('have.attr', 'src')
      .and(
        'include',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      );
    cy.get('.evolution-node > a > img')
      .eq(2)
      .should('have.attr', 'src')
      .and(
        'include',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
      );

    cy.get('.evolution-node > a > img').eq(2).click();
    cy.url().should('include', '/pokemon/3');
  });

  it('툴팁에 마우스를 올리면 툴팁 텍스트가 보입니다.', () => {
    cy.get('.tooltip-text').should('not.be.visible');
    cy.get('[aria-label="Tooltip trigger"]').first().trigger('mouseover');
    cy.get('.tooltip-text').should('be.visible');
  });

  it('숨겨진 특성과 일반 특성의 배경색이 다르게 렌더링됩니다.', () => {
    cy.get('div.bg-yellow-100').should('have.text', '엽록소');
    cy.get('div.bg-gray-50').should('have.text', '심록');
  });

  it('기술목록이 페이지네이션을 통해 동작합니다.', () => {
    cy.get('.page-number-button').eq(5).click();
    cy.get('.page-number-button.text-blue-30').should('have.text', '6');
    cy.get('.page-number-button').eq(1).click();
    cy.get('.page-number-button.text-blue-30').should('have.text', '1');
  });

  it('기술이 한 페이지당 4개씩 렌더링됩니다.', () => {
    cy.get('.move-component').should('have.length', 4);
  });
});
