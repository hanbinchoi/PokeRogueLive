import { TypeCalcOption } from '../TypeCalcOption/TypeCalcOption';
import { TypeCalcAttackResult } from '../TypeCalcAttackResult/TypeCalcAttackResult';
import { AttackOptionButton } from '../AttackOptionButton/AttackOptionButton';

import {
  ATTACK_SPECIAL_ABILITIES,
  ATTACK_SPECIAL_MOVES,
} from '@/constants/contents';

export const TypeCalcAttack = () => {
  return (
    <div className="grid grid-cols-2 gap-8 md:gap-16">
      <div className="flex flex-col gap-4 sm:gap-8">
        <TypeCalcOption title="타입" index={0} />
        <AttackOptionButton
          title="기술"
          usage="move"
          options={ATTACK_SPECIAL_MOVES}
        />
        <AttackOptionButton
          title="특성"
          usage="ability"
          options={ATTACK_SPECIAL_ABILITIES}
        />
      </div>
      <TypeCalcAttackResult />
    </div>
  );
};
