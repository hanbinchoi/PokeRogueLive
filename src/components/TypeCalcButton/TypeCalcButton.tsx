import { twMerge } from 'tailwind-merge';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { PokemonType } from '@/types/common';

import { POKEMON_TYPE } from '@/constants/contents';

interface TypeCalcButtonProps {
  type: PokemonType;
  index: number;
  checked: boolean;
}

export const TypeCalcButton = ({
  type,
  index,
  checked,
}: TypeCalcButtonProps) => {
  const {
    setTypeCalcDefendOptions,
    typeCalcDefendOptions,
    setTypeCalcAttackOptions,
    typeCalcAttackOptions,
    mode,
  } = useTypeCalculatorStore();

  const pokemonType = POKEMON_TYPE[type];

  const selectType = () => {
    if (mode === 'defend') {
      const newOptions = typeCalcDefendOptions.map((item, i) =>
        i === index ? (type === item ? null : type) : item,
      );
      setTypeCalcDefendOptions(newOptions);
    } else {
      const newOptions = typeCalcAttackOptions ?? [];
      setTypeCalcAttackOptions(
        newOptions.includes(type)
          ? newOptions.filter((option) => option !== type)
          : [...newOptions, type],
      );
    }
  };

  return (
    <button
      className={twMerge(
        'flex items-center gap-2 w-[82px] md:w-[102px] px-2 py-1 text-sm md:text-base border rounded-3xl hover:opacity-70',
        checked
          ? `${pokemonType.backgroundColor} text-white-100`
          : 'bg-white-100',
      )}
      onClick={selectType}>
      <div
        className={twMerge(
          'w-[16px] h-[16px] rounded-full flex justify-center items-center',
          checked ? 'bg-white-100' : pokemonType.backgroundColor,
        )}>
        {checked && (
          <div
            className={twMerge(
              pokemonType.backgroundColor,
              'w-[10px] h-[10px] rounded-full',
            )}></div>
        )}
      </div>
      <div className="font-semibold">{pokemonType.name}</div>
    </button>
  );
};
