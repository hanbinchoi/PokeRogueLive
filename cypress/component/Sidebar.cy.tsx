import { MENUS } from '@/types/menus';
import { Sidebar } from '../../src/components/common/Sidebar';

describe('Sidebar 컴포넌트 테스트', () => {
  beforeEach(() => {
    cy.mount(<Sidebar className="test-sidebar" />);
  });

  it('사이드바에 모든 메뉴가 렌더링되는지 확인', () => {
    MENUS.forEach((menu) => {
      // 메뉴 제목이 화면에 보이는지 확인
      cy.get('nav > li').contains(menu.label).should('be.visible');
    });
  });

  it('아이콘이 렌더링되는지 확인', () => {
    cy.get('nav svg').should('have.length', MENUS.length); // 아이콘 수 확인
  });
});
