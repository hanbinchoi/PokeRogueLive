import { TypeCalcOption } from './TypeCalcOption';
import { TypeCalcAttackResult } from './TypeCalcAttackResult/TypeCalcAttackResult';
import { AttackOptionButton } from './AttackOptionButton';

import { SpecialAttackAbility, SpecialAttackMove } from '@/constants/contents';

export const TypeCalcAttack = () => {
  return (
    <div className="grid grid-cols-2 gap-8 md:gap-16">
      <div className="flex flex-col gap-4 sm:gap-8">
        <TypeCalcOption title="타입" index={0} />
        <AttackOptionButton
          title="기술"
          usage="move"
          options={Object.values(SpecialAttackMove)}
        />
        <AttackOptionButton
          title="특성"
          usage="ability"
          options={Object.values(SpecialAttackAbility)}
        />
      </div>
      <TypeCalcAttackResult />
    </div>
  );
};
