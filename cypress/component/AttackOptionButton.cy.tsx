import { AttackOptionButton } from '../../src/components/type-calculator/AttackOptionButton';
import { AttackOptionUsage, SpecialAttackAbility } from '@/constants/contents';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('AttackOptionButton', () => {
  const options = [
    SpecialAttackAbility.GLASSES,
    SpecialAttackAbility.PERSEVERANCE,
  ];

  const createQueryClient = () => new QueryClient();
  beforeEach(() => {
    cy.mount(
      <QueryClientProvider client={createQueryClient()}>
        <AttackOptionButton
          title="Attack Type"
          options={options}
          usage={AttackOptionUsage.MOVE}
        />
      </QueryClientProvider>,
    );
  });

  it('제공된 옵션과 제목이 화면에 렌더링 됩니다.', () => {
    cy.get('p').should('contain', 'Attack Type'); // 제목 확인
    cy.get('input[type="radio"]').should('have.length', options.length); // 라디오 버튼 수 확인
    cy.get('label').each((label, index) => {
      cy.wrap(label).should('contain', options[index]); // 각 옵션이 제대로 렌더링되는지 확인
    });
  });

  it('버튼 체크 시 화면에 반영됩니다.', () => {
    cy.get('input[type="radio"]').first().check();
    cy.get('input[type="radio"]').first().should('be.checked');
  });
});
