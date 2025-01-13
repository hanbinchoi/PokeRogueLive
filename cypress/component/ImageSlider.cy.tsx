import ImageSlider from '../../src/components/common/ImageSlider';

describe('ImageSlider Component', () => {
  const images = [
    '/assets/img/slide1.png',
    '/assets/img/slide2.png',
    '/assets/img/slide3.png',
  ];

  beforeEach(() => {
    cy.mount(<ImageSlider images={images} />);
  });

  it('이미지 슬라이드가 렌더링되는지 확인합니다', () => {
    cy.get('img').should('have.length', images.length);
    cy.get('img').each((image, index) => {
      cy.wrap(image).should('have.attr', 'src', images[index]);
    });
    cy.get('.slide-dot').should('have.length', images.length);
  });

  it('슬라이드 "이전" 버튼 동작을 확인합니다.', () => {
    cy.get('.image-wrap').should(
      'have.css',
      'transform',
      'matrix(1, 0, 0, 1, 0, 0)',
    );

    // 첫번째에서 이전 클릭 시 마지막으로
    cy.get('.image-prev').click();
    cy.get('.image-wrap').should(
      'have.css',
      'transform',
      'matrix(1, 0, 0, 1, -968, 0)',
    );

    cy.get('.image-prev').click().click();
    cy.get('.image-wrap').should(
      'have.css',
      'transform',
      'matrix(1, 0, 0, 1, 0, 0)', // translateX(0%)에 해당
    );
  });

  it('슬라이드 "다음" 버튼 동작을 확인합니다.', () => {
    cy.get('.image-wrap').should(
      'have.css',
      'transform',
      'matrix(1, 0, 0, 1, 0, 0)',
    );

    cy.get('.image-next').click();
    cy.get('.image-wrap').should(
      'have.css',
      'transform',
      'matrix(1, 0, 0, 1, -484, 0)',
    );

    // 마지막 슬라이드에서 다시 첫 번째로 돌아가는지 확인
    cy.get('.image-next').click().click();
    cy.get('.image-wrap').should(
      'have.css',
      'transform',
      'matrix(1, 0, 0, 1, 0, 0)', // translateX(0%)에 해당
    );
  });
});
