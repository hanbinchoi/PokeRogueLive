import { Tooltip } from './Tooltip';

describe('Tooltip 컴포넌트 테스트', () => {
  it('툴팁이 마우스 호버 시 보이는지 확인', () => {
    const tooltipText = '이것은 툴팁입니다';

    cy.mount(<Tooltip text={tooltipText} />);

    // 툴팁이 처음에는 보이지 않아야 함
    cy.get('div').contains(tooltipText).should('not.be.visible');

    // 툴팁 아이콘에 마우스를 올리면 툴팁이 보이게 되어야 함
    cy.get('svg[aria-label="Tooltip trigger"]').trigger('mouseenter');
    cy.get('div').contains(tooltipText).should('be.visible');

    // 마우스를 툴팁 아이콘에서 뗄 때 툴팁이 사라져야 함
    cy.get('svg[aria-label="Tooltip trigger"]').trigger('mouseleave');
    cy.get('div').contains(tooltipText).should('not.be.visible');
  });

  it('툴팁에 텍스트가 제대로 렌더링되는지 확인', () => {
    const tooltipText = '이것은 툴팁입니다';

    cy.mount(<Tooltip text={tooltipText} />);

    // 툴팁 텍스트가 제대로 렌더링되는지 확인
    cy.get('div').contains(tooltipText).should('not.be.visible'); // 호버 전에는 보이지 않음
    cy.get('svg[aria-label="Tooltip trigger"]').trigger('mouseenter'); // 호버 시 나타남
    cy.get('div').contains(tooltipText).should('be.visible');
  });
});
