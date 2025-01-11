import { Ability, AbilityProps } from '../../src/components/pokemon/Ability';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('<Ability />', () => {
  const mockAbility = {
    ability: {
      name: 'test-ability',
      url: '/test/ability',
    },
    slot: 1,
    is_hidden: false,
  };

  const mockAbilityResponse = {
    names: [{ language: { name: 'ko' }, name: '테스트 능력' }],
    flavor_text_entries: [
      {
        flavor_text: '이 능력은 포켓몬의 특성을 향상시킵니다.',
        language: { name: 'ko' },
      },
    ],
  };

  const createQueryClient = () => new QueryClient();

  const WrappedAbility = ({ ability, id, hidden }: AbilityProps) => (
    <QueryClientProvider client={createQueryClient()}>
      <Ability ability={ability} id={id} hidden={hidden} />
    </QueryClientProvider>
  );

  it('API 요청 중 로딩 상태를 표시', () => {
    // mock API 응답 설정
    cy.intercept('GET', '/test/ability', {
      statusCode: 200,
      body: mockAbilityResponse,
    }).as('getAbility');

    // 컴포넌트 마운트
    cy.mount(<WrappedAbility ability={mockAbility} id={1} hidden={false} />);

    // 로딩 컴포넌트가 화면에 보일 때까지 기다리기
    cy.get('.loading-component', { timeout: 5000 }).should('exist');

    // mock 응답이 완료된 후 로딩 컴포넌트가 사라져야 함
    cy.wait('@getAbility'); // 네트워크 응답 기다리기

    // 로딩 컴포넌트가 사라졌는지 확인
    cy.get('.loading-component').should('not.exist');
  });

  it('API 에러 발생 시 에러를 표시', () => {
    cy.mount(<WrappedAbility ability={mockAbility} id={1} hidden={false} />);
    cy.wait(5000);
    cy.get('.error-title').should('have.text', '특성을 불러올 수 없어요.');
  });

  it('API 요청 성공 시 응답 데이터를 정확히 렌더링 합니다.', () => {
    cy.intercept('GET', '/test/2322/', {
      statusCode: 200,
      body: mockAbilityResponse,
    }).as('getAbility');

    cy.mount(<WrappedAbility ability={mockAbility} id={1} hidden={false} />);

    // 응답 받은 데이터가 화면에 표시되는지 확인
    cy.contains('테스트 능력').should('be.visible');
    cy.contains('이 능력은 포켓몬의 특성을 향상시킵니다.').should('be.visible');
  });
});
