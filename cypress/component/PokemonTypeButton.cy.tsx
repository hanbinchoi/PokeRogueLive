import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonTypeButton } from '../../src/components/type-calculator/PokemonTypeButton';
import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';
import { BattleRole, PokemonTypeName } from '@/constants/contents';
import { PokemonType } from '@/types/common';

describe('PokemonTypeButton', () => {
  let setTypeCalcAttackOptionsSpy: (
    checkedAttackTypes: PokemonType[] | null,
  ) => void;

  beforeEach(() => {
    setTypeCalcAttackOptionsSpy = cy.spy(
      useTypeCalculatorStore.getState(),
      'setTypeCalcAttackOptions',
    );
  });
  const createQueryClient = () => new QueryClient();

  it('주어진 props에 맞추어 정확히 렌더링 되는지 확인합니다.', () => {
    cy.mount(
      <QueryClientProvider client={createQueryClient()}>
        <PokemonTypeButton
          type={PokemonTypeName.FIRE}
          index={0}
          checked={true}
        />
      </QueryClientProvider>,
    );

    cy.get('button').should('have.text', '불꽃');
    cy.get('button').should('have.class', 'text-white-100');
  });

  it('공격 모드에서 버튼 클릭 시 타입이 제대로 전달되는지 확인합니다.', () => {
    useTypeCalculatorStore.getState().setMode(BattleRole.ATTACK);

    cy.mount(
      <QueryClientProvider client={createQueryClient()}>
        <PokemonTypeButton
          type={PokemonTypeName.FIRE}
          index={0}
          checked={false}
        />
      </QueryClientProvider>,
    );

    // 버튼 클릭 시 타입을 인자로 전달
    cy.get('button').click();
    cy.wrap(setTypeCalcAttackOptionsSpy).should('have.been.calledWith', [
      PokemonTypeName.FIRE,
    ]);

    // 버튼을 한번 더 클릭 시 타입을 제거
    cy.get('button').click();
    cy.wrap(setTypeCalcAttackOptionsSpy).should('have.been.calledWith', []);
  });
});
