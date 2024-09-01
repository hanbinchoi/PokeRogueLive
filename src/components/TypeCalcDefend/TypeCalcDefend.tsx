import '../../styles/globals.css';
import { TypeCalcOption } from '../TypeCalcOption/TypeCalcOption';
import { CommonSelect } from '../CommonSelect/CommonSelect';
import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';
import { POKEMON_TYPE } from '@/constants/contents';
import calcDefendType from '@/utils/calcDefendType';
import { useState } from 'react';

export const TypeCalcDefend = () => {
  const typeCalcOptions = useTypeCalculatorStore(
    (state) => state.typeCalcOptions,
  );
  const [test, setTest] = useState(
    calcDefendType(POKEMON_TYPE['fire'], POKEMON_TYPE['flying']),
  );
  if (typeCalcOptions[0])
    console.log(typeCalcOptions, POKEMON_TYPE[typeCalcOptions[0]].doubleDamage);
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col px-2 gap-6">
        <TypeCalcOption index={0} />
        <TypeCalcOption index={1} />
        <CommonSelect usage="defenceAbility" />
        <CommonSelect usage="teraType" />
      </div>
      <div>
        <div>{test.noDamage}</div>
        <div>{test.quarterDamage}</div>
        <div>{test.halfDamage}</div>
        <div>{test.damage}</div>
        <div>{test.doubleDamage}</div>
        <div>{test.quadrupleDamage}</div>
      </div>
    </div>
  );
};
