import '../../styles/globals.css';

import { twJoin } from 'tailwind-merge';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { PokemonType } from '@/types/common';

import { POKEMON_TYPE } from '@/constants/contents';

interface TypeCalcButtonProps {
  type: PokemonType;
  index: number;
  checked: boolean;
}
interface TypeCalcButtonStyleProps {
  [key: string]: {
    backgroundColor: string;
    name: string;
    textColor: string;
  };
}

export const TypeCalcButton = ({
  type,
  index,
  checked,
}: TypeCalcButtonProps) => {
  const { setTypeCalcOptions, typeCalcOptions } = useTypeCalculatorStore();
  const { backgroundColor, name } = POKEMON_TYPE[type];

  const selectType = (index: number) => {
    setTypeCalcOptions(
      typeCalcOptions.map((item, i) =>
        i === index ? (type === item ? null : type) : item,
      ),
    );
  };

  return checked ? (
    <button
      className={twJoin(
        backgroundColor,
        'flex items-center gap-2 w-[98px] p-2 border rounded-3xl hover:opacity-70 text-white-100',
      )}
      onClick={() => selectType(index)}>
      <div
        className={
          'w-[20px] h-[20px] rounded-full bg-white-100 flex justify-center items-center'
        }>
        <div
          className={twJoin(
            backgroundColor,
            'w-[10px] h-[10px] rounded-full',
          )}></div>
      </div>
      <div className="font-semibold">{name}</div>
    </button>
  ) : (
    <button
      className="flex items-center gap-2 w-[98px] p-2 bg-white-100 border rounded-3xl hover:opacity-70"
      onClick={() => selectType(index)}>
      <div
        className={twJoin(
          backgroundColor,
          'w-[20px] h-[20px] rounded-full',
        )}></div>
      <div className="font-semibold">{name}</div>
    </button>
  );
};
