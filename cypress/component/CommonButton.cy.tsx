import { CommonButton } from '@/components/common';

describe('CommonButton.cy.tsx', () => {
  it('should render and display expected content', () => {
    // About 페이지의 React 컴포넌트를 마운트합니다.
    cy.mount(<CommonButton type="button" label="test" />);

    // 새 페이지에 "About page"를 포함하는 h1이 있어야 합니다.
    cy.get('a').contains('test');
  });
});
