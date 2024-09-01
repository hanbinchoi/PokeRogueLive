import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';
import '../../styles/globals.css';

import { twJoin } from 'tailwind-merge';
import calcDefendType from '@/utils/calcDefendType';
import { PokemonType } from '@/types/common';

export interface TypeCalcButtonProps {
  type: PokemonType;
  index: number;
  checked: boolean;
}
export interface TypeCalcButtonStyleProps {
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
  const { setTypeCalcOptions, typeCalcOptions, setDefendResult } =
    useTypeCalculatorStore();
  const { backgroundColor, name } = TYPE_BADGE_STYLES[type];

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

const TYPE_BADGE_STYLES: TypeCalcButtonStyleProps = {
  normal: {
    backgroundColor: 'bg-type-normal',
    textColor: 'text-type-normal',
    name: '노말',
  },
  fighting: {
    backgroundColor: 'bg-type-fighting',
    textColor: 'text-type-fighting',
    name: '격투',
  },
  flying: {
    backgroundColor: 'bg-type-flying',
    textColor: 'text-type-flying',
    name: '비행',
  },
  poison: {
    backgroundColor: 'bg-type-poison',
    textColor: 'text-type-poison',
    name: '독',
  },
  ground: {
    backgroundColor: 'bg-type-ground',
    textColor: 'text-type-ground',
    name: '땅',
  },
  rock: {
    backgroundColor: 'bg-type-rock',
    textColor: 'text-type-rock',
    name: '바위',
  },
  bug: {
    backgroundColor: 'bg-type-bug',
    textColor: 'text-type-bug',
    name: '벌레',
  },
  ghost: {
    backgroundColor: 'bg-type-ghost',
    textColor: 'text-type-ghost',
    name: '고스트',
  },
  steel: {
    backgroundColor: 'bg-type-steel',
    textColor: 'text-type-steel',
    name: '강철',
  },
  fire: {
    backgroundColor: 'bg-type-fire',
    textColor: 'text-type-fire',
    name: '불꽃',
  },
  water: {
    backgroundColor: 'bg-type-water',
    textColor: 'text-type-water',
    name: '물',
  },
  grass: {
    backgroundColor: 'bg-type-grass',
    textColor: 'text-type-grass',
    name: '풀',
  },
  electric: {
    backgroundColor: 'bg-type-electric',
    textColor: 'text-type-electric',
    name: '전기',
  },
  psychic: {
    backgroundColor: 'bg-type-psychic',
    textColor: 'text-type-psychic',
    name: '에스퍼',
  },
  ice: {
    backgroundColor: 'bg-type-ice',
    textColor: 'text-type-ice',
    name: '얼음',
  },
  dragon: {
    backgroundColor: 'bg-type-dragon',
    textColor: 'text-type-dragon',
    name: '드래곤',
  },
  dark: {
    backgroundColor: 'bg-type-dark',
    textColor: 'text-type-dark',
    name: '악',
  },
  fairy: {
    backgroundColor: 'bg-type-fairy',
    textColor: 'text-type-fairy',
    name: '페어리',
  },
  stellar: {
    backgroundColor: 'bg-type-stellar',
    textColor: 'text-type-stellar',
    name: '스텔라',
  },
  unknown: {
    backgroundColor: 'bg-type-unknown',
    textColor: 'text-type-unknown',
    name: '???',
  },
};
