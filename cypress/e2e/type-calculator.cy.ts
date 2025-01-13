describe('포켓몬 목록 페이지 테스트', () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.visit('http://localhost:3000/type-calculator');
  });

  it('초기 모드는 방어모드로 렌더링됩니다.', () => {
    cy.get('.current').should('have.text', '방어');
    cy.get('.type-selector').should('have.length', 2);
  });

  it('방어 모드에서 타입 버튼 클릭 시 타입이 체크되며 해당 타입에 받는 피해 맵을 렌더링합니다.', () => {
    cy.get('.type-selector').eq(0).find('button').eq(0).click();
    cy.get('.type-selector').eq(1).find('button').eq(1).click();
    cy.get('.type-defend-result').should('contain', '2x 피해 (4)');
    cy.get('.type-defend-result').should('contain', '1x 피해 (11)');
    cy.get('.type-defend-result').should('contain', '0.5x 피해 (3)');
    cy.get('.type-defend-result').should('contain', '0x 피해 (1)');
  });

  it('타입 버튼을 한번 더 클릭하면 체크가 해제됩니다.', () => {
    cy.get('.type-selector').find('button').eq(0).click().click();
    cy.get('.type-defend-result').should('not.exist');
  });

  it('방어 모드에서 특성과 테라타입을 선택하면 해당 옵션에 맞추어 새로운 받는 피해 맵을 렌더링합니다.', () => {
    cy.get('.type-selector').eq(0).find('button').eq(0).click();
    cy.get('.type-selector').eq(1).find('button').eq(1).click();
    cy.get('select[aria-label="특성"]').select('건조피부');
    cy.get('.type-defend-result').should('contain', '1.25x 피해 (1)');
    cy.get('select[aria-label="테라 타입"]').select('페어리');
    cy.get('.type-defend-result').should('contain', '0x 피해 (2)');
  });

  it('방어모드 선택 옵션에서 "없음"을 선택하면 해당 옵션을 제외하고 새로운 받은 피해 맵을 렌더링합니다.', () => {
    cy.get('.type-selector').eq(0).find('button').eq(0).click();
    cy.get('.type-selector').eq(1).find('button').eq(1).click();
    cy.get('select[aria-label="특성"]').select('건조피부');
    cy.get('.type-defend-result').should('contain', '1x 피해 (9)');
    cy.get('select[aria-label="특성"]').select('없음');
    cy.get('.type-defend-result').should('contain', '1x 피해 (11)');
  });

  it('공격 클릭 시 공격모드로 토글됩니다.', () => {
    cy.contains('공격').click();
    cy.get('.current').should('have.text', '공격');
  });

  it('공격 모드에서 타입 버튼 클릭 시 해당 타입에 데미지 맵을 렌더링합니다..', () => {
    cy.contains('공격').click();
    cy.get('.type-selector').find('button').eq(0).click();
    cy.get('.type-selector').find('button').eq(1).click();
    cy.get('.type-selector').find('button').eq(2).click();
    cy.get('.type-attack-result').should('contain', '2x 데미지 (8)');
    cy.get('.type-attack-result').should('contain', '1x 데미지 (10)');
  });

  it('공격 모드에서 옵션 버튼 클릭 시 옵션이 체크되며 해당 옵션을 포함해서 계산 된 데미지 맵을 렌더링합니다.', () => {
    cy.contains('공격').click();
    cy.get('.type-selector').find('button').eq(1).click();
    cy.get('input[name="move"]').first().click();
    cy.get('input[name="move"]').first().should('be.checked');
    cy.get('.type-attack-result').should('contain', '1x 데미지 (8)');
  });

  it('공격 모드 옵션은 한번 더 클릭 시 체크가 해제되며 같은 분류의 옵션은 다른 옵션을 클릭 시 자동으로 체크가 해제됩니다. (1개의 분류당 1개의 옵션만 가질 수 있음)', () => {
    cy.contains('공격').click();
    cy.get('.type-selector').find('button').eq(1).click();
    cy.get('input[name="move"]').first().click();
    cy.get('input[name="move"]').first().should('be.checked');
    cy.get('input[name="move"]').first().click();
    cy.get('input[name="move"]').first().should('not.be.checked');
    cy.get('input[name="move"]').first().click();
    cy.get('input[name="move"]').first().should('be.checked');
    cy.get('input[name="move"]').eq(1).click();
    cy.get('input[name="move"]').first().should('not.be.checked');
  });
});
