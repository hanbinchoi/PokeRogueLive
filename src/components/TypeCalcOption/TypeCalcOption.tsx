import '../../styles/globals.css';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeCalcButton } from '../TypeCalcButton/TypeCalcButton';

import { POKEMON_TYPE_ARRAY } from '@/constants/contents';
import { PokemonType } from '@/types/common';

interface TypeCalcOptionProps {
  index: number;
  title: string;
}

export const TypeCalcOption = ({ index, title }: TypeCalcOptionProps) => {
  const { typeCalcAttackOptions, typeCalcDefendOptions, mode } =
    useTypeCalculatorStore();
  const checkedType = (type: PokemonType) => {
    if (mode === 'defend') {
      return typeCalcDefendOptions[index] === type;
    }
    if (mode === 'attack' && typeCalcAttackOptions)
      return typeCalcAttackOptions?.includes(type);

    return false;
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[16px] font-semibold">{title}</p>
      <div className="flex gap-x-2 gap-y-4 flex-wrap">
        {POKEMON_TYPE_ARRAY.map((type) =>
          type === 'stellar' || type === 'unknown' ? null : (
            <TypeCalcButton
              key={type}
              type={type}
              index={index}
              checked={checkedType(type)}
            />
          ),
        )}
      </div>
    </div>
  );
};
