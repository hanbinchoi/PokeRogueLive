import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeCalcButton } from '../TypeCalcButton/TypeCalcButton';

import { PokemonType } from '@/types/common';

import { EXCLUDED_TYPES, PokemonTypeName } from '@/constants/contents';

interface TypeCalcOptionProps {
  index: number;
  title: string;
}

export const TypeCalcOption = ({ index, title }: TypeCalcOptionProps) => {
  const { checkedAttackOptions, checkedDefendOptions, mode } =
    useTypeCalculatorStore();

  const filteredTypes = Object.values(PokemonTypeName).filter(
    (type) => !EXCLUDED_TYPES.has(type),
  );

  const checkedType = (type: PokemonType) => {
    const options =
      mode === 'defend' ? checkedDefendOptions : checkedAttackOptions;
    return (
      options &&
      (mode === 'attack' ? options.includes(type) : options[index] === type)
    );
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <p className="text-sm sm:text-base md:text-lg font-semibold">{title}</p>
      <div className="flex gap-x-2 gap-y-3 sm:gap-y-4 flex-wrap">
        {filteredTypes.map((type) => (
          <TypeCalcButton
            key={type}
            type={type}
            index={index}
            checked={checkedType(type)}
          />
        ))}
      </div>
    </div>
  );
};
