import { TypeCalcOption } from '../TypeCalcOption/TypeCalcOption';
import { TypeCalcAttackResult } from '../TypeCalcAttackResult/TypeCalcAttackResult';
import { CommonRadioButton } from '../CommonRadioButton/CommonRadioButton';

import {
  ATTACK_SPECIAL_ABILITIES,
  ATTACK_SPECIAL_MOVES,
} from '@/constants/contents';

export const TypeCalcAttack = () => {
  const specialMoves = ATTACK_SPECIAL_MOVES;
  const specialAbilities = ATTACK_SPECIAL_ABILITIES;

  return (
    <div className="grid grid-cols-2 gap-8 md:gap-16">
      <div className="flex flex-col gap-4 sm:gap-8">
        <TypeCalcOption title="타입" index={0} />
        <CommonRadioButton title="기술" usage="move" options={specialMoves} />
        <CommonRadioButton
          title="특성"
          usage="ability"
          options={specialAbilities}
        />
      </div>
      <TypeCalcAttackResult />
    </div>
  );
};
