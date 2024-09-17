import '../../styles/globals.css';

import { useForm } from 'react-hook-form';
import { TypeCalcOption } from '../TypeCalcOption/TypeCalcOption';
import { TypeCalcAttackResult } from '../TypeCalcAttackResult/TypeCalcAttackResult';
import { CommonRadioButton } from '../CommonCheckbox/CommonRadioButton';
import { InputValues } from '@/types/common';
import {
  ATTACK_SPECIAL_ABILITIES,
  ATTACK_SPECIAL_MOVES,
} from '@/constants/contents';

export const TypeCalcAttack = () => {
  const { register } = useForm<InputValues>();

  const specialMoves = ATTACK_SPECIAL_MOVES;
  const specialAbilities = ATTACK_SPECIAL_ABILITIES;

  return (
    <div className="grid grid-cols-2 gap-16">
      <div className="flex flex-col px-2 gap-8">
        <TypeCalcOption title="타입" index={0} />
        <CommonRadioButton
          title="기술"
          watch="move"
          options={specialMoves}
          register={register}
        />
        <CommonRadioButton
          title="특성"
          watch="ability"
          options={specialAbilities}
          register={register}
        />
      </div>
      <TypeCalcAttackResult />
    </div>
  );
};
