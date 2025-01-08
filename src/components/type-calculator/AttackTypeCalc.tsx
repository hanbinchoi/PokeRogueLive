import { AttackOptionButton } from './AttackOptionButton';
import { PokemonTypeSelector } from './PokemonTypeSelector';
import { TypeCalcAttackResult } from './TypeCalcAttackResult';

import {
  AttackOptionUsage,
  SpecialAttackAbility,
  SpecialAttackMove,
} from '@/constants/contents';

/**
 * 타입 계산기 - 공격 모드를 위한 컴포넌트
 *
 * 포켓몬 타입, 기술, 특성을 선택하고 결과를 확인할 수 있도록 구성된 UI를 제공합니다.
 */
export const AttackTypeCalc = () => {
  return (
    <div className="grid grid-cols-2 gap-8 md:gap-16">
      <div className="flex flex-col gap-4 sm:gap-8">
        <PokemonTypeSelector title="타입" index={0} />
        <AttackOptionButton
          title="기술"
          usage={AttackOptionUsage.MOVE}
          options={Object.values(SpecialAttackMove)}
        />
        <AttackOptionButton
          title="특성"
          usage={AttackOptionUsage.ABILITY}
          options={Object.values(SpecialAttackAbility)}
        />
      </div>
      <TypeCalcAttackResult />
    </div>
  );
};
