import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TypeModeToggle } from './TypeModeToggle';
import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';
import { BattleRole } from '@/constants/contents';
import { BattleRoleType } from '@/types/common';

describe('TypeModeToggle', () => {
  let setModeSpy: (mode: BattleRoleType) => void;

  const createQueryClient = () => new QueryClient();

  it('공격 클릭 시 공격모드로 변경', () => {
    setModeSpy = cy.spy(useTypeCalculatorStore.getState(), 'setMode');

    cy.mount(
      <QueryClientProvider client={createQueryClient()}>
        <TypeModeToggle />
      </QueryClientProvider>,
    );
    // 공격 버튼 클릭
    cy.get('button').contains('공격').click();

    // setMode가 ATTACK으로 호출되었는지 확인
    cy.wrap(setModeSpy).should('have.been.calledWith', BattleRole.ATTACK);
  });

  it('현재 모드는 버튼 비활성화', () => {
    cy.mount(
      <QueryClientProvider client={createQueryClient()}>
        <TypeModeToggle />
      </QueryClientProvider>,
    );

    cy.get('button')
      .contains('공격')
      .should('have.class', 'cursor-not-allowed');
  });
});
