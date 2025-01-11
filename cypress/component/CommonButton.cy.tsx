import React from 'react';

import { CommonButton } from '../../src/components/common/CommonButton';

describe('<CommonButton />', () => {
  it('label이 제대로 적용되는지 확인', () => {
    cy.mount(<CommonButton label="label-test" primary={true} />);
    cy.get('button').should('have.text', 'label-test');
  });

  it('primary가 true일 때, primary 스타일이 적용되는지 확인', () => {
    cy.mount(<CommonButton label="Click Me" primary={true} type="button" />);
    cy.get('button').should('have.class', 'text-white-10 bg-blue-30');
  });

  it('size가 잘 적용되는지 확인', () => {
    cy.mount(<CommonButton label="Click Me" size="small" type="button" />);
    cy.get('button').should(
      'have.class',
      'text-xs min-[480px]:text-sm px-2 py-1 font-bold rounded',
    );
    cy.mount(<CommonButton label="Click Me" size="medium" type="button" />);
    cy.get('button').should('have.class', 'px-4 py-2 rounded');
    cy.mount(<CommonButton label="Click Me" size="large" type="button" />);
    cy.get('button').should('have.class', 'px-5 py-2 rounded text-lg');
  });

  it('disabled 상태일 때, 버튼이 비활성화 되는지 확인', () => {
    cy.mount(<CommonButton label="Click Me" disabled={true} type="button" />);

    cy.get('button').should('be.disabled');
    cy.get('button').should('have.class', 'opacity-50 cursor-not-allowed');
  });

  it('onClick 이벤트가 실행된다', () => {
    const onClick = cy.stub().as('onClick'); // stub으로 onClick 함수를 생성

    cy.mount(<CommonButton label="Click Me" onClick={onClick} type="button" />);

    cy.get('button')
      .contains('Click Me') // 'Click Me' 텍스트를 가진 버튼 찾기
      .click(); // 버튼 클릭

    cy.get('@onClick') // Cypress stub을 호출한 기록을 확인
      .should('have.been.calledOnce'); // onClick 함수가 한 번 호출되었는지 확인
  });
});
