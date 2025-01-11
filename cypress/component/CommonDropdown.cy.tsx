import React from 'react';
import { CommonDropdown } from '../../src/components/common/CommonDropdown';

describe('<CommonDropdown />', () => {
  it('드롭다운 항목을 선택하면, 선택된 항목이 반영된다', () => {
    const handleSelect = cy.stub().as('handleSelect'); // stub으로 이벤트 핸들러를 추적

    cy.mount(
      <CommonDropdown
        dropdownRef={React.createRef()}
        filteredOptions={['Option 1', 'Option 2', 'Option 3']}
        selectedIndex={null}
        handleSelect={handleSelect}
        showDropdown={true}
        noFoundMessage="No options found"
      />,
    );

    cy.get('div').contains('Option 2').click(); // Option 2를 클릭
    cy.get('@handleSelect').should('have.been.calledWith', 'Option 2'); // 선택된 옵션이 handleSelect에 전달되었는지 확인
  });

  it('옵션이 없을 때 "No options found" 메시지가 표시된다', () => {
    cy.mount(
      <CommonDropdown
        dropdownRef={React.createRef()}
        filteredOptions={[]}
        selectedIndex={null}
        handleSelect={() => {}}
        showDropdown={true}
        noFoundMessage="No options found"
      />,
    );

    cy.get('div').should('contain.text', 'No options found');
  });

  it('드롭다운이 표시되지 않으면 아무것도 렌더링되지 않는다', () => {
    cy.mount(
      <CommonDropdown
        dropdownRef={React.createRef()}
        filteredOptions={['Option 1', 'Option 2']}
        selectedIndex={null}
        handleSelect={() => {}}
        showDropdown={false} // 드롭다운이 표시되지 않도록 설정
        noFoundMessage="No options found"
      />,
    );

    // 드롭다운이 렌더링되지 않았는지 확인
    cy.get('div').should('not.be.visible');
  });
});
