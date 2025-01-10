import React from 'react';
import { PagingDocuments } from './PagingDocuments';

describe('<PagingDocuments />', () => {
  const totalItems = 100;
  const pageSize = 10;

  let mockSetNow: sinon.SinonStub;

  beforeEach(() => {
    mockSetNow = cy.stub();
  });

  const setupComponent = (initialPage: number) => {
    cy.mount(
      <PagingDocuments
        now={initialPage}
        setNow={mockSetNow}
        total={totalItems}
        pageSize={pageSize}
      />,
    );
  };

  it('페이지 버튼 렌더링 확인', () => {
    setupComponent(1); // 초기 페이지 1로 설정

    // 페이지 번호 버튼이 올바르게 렌더링되는지 확인
    cy.get('ul').find('li').and('contain.text', '1'); // 첫 번째 버튼 확인
  });

  it('아이콘 버튼 클릭 시 페이지 이동', () => {
    setupComponent(5); // 초기 페이지 5로 설정

    // 왼쪽 화살표 버튼 클릭
    cy.get('.flex > :nth-child(1)').click(); // 첫 페이지로 이동
    cy.wrap(mockSetNow).should('be.calledWith', 1);

    cy.get('.flex > :nth-child(2)').click(); // 5페이지에서 -5 페이지 이동
    cy.wrap(mockSetNow).should('be.calledWith', 1); // 페이지가 1로 설정

    // 오른쪽 화살표 버튼 클릭
    cy.get('.flex > :nth-child(8)').click(); // 5페이지에서 +5 페이지 이동
    cy.wrap(mockSetNow).should('be.calledWith', 10);

    cy.get('.flex > :nth-child(9)').click(); // 마지막 페이지로 이동
    cy.wrap(mockSetNow).should(
      'be.calledWith',
      Math.ceil(totalItems / pageSize),
    );
  });

  it('페이지 번호 클릭 시 페이지 이동', () => {
    setupComponent(3);
    cy.get('li').contains('4').click();
    cy.wrap(mockSetNow).should('be.calledWith', 4);
  });

  it('현재 페이지 버튼은 primary 스타일을 갖는다', () => {
    setupComponent(2);
    cy.get('li')
      .contains('2')
      .should('have.class', 'text-blue-30')
      .and('have.class', 'font-bold');
  });

  it('첫 페이지나 마지막 페이지에서는 아이콘 버튼 비활성화', () => {
    setupComponent(1);

    cy.get('.flex > :nth-child(1) > .svg').should('not.exist');
    cy.get('.flex > :nth-child(2) > .svg').should('not.exist');

    setupComponent(Math.ceil(totalItems / pageSize));

    cy.get('.flex > :nth-child(8) > .svg').should('not.exist');
    cy.get('.flex > :nth-child(9) > .svg').should('not.exist');
  });
});
