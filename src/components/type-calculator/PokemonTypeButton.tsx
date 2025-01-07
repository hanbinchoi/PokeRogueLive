import { twJoin } from 'tailwind-merge';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { PokemonType } from '@/types/common';

import { POKEMON_TYPE_INFO } from '@/constants/contents';

interface PokemonTypeButtonProps {
  type: PokemonType;
  index: number;
  checked: boolean;
}

/**
 * 타입 계산기 버튼 컴포넌트
 *
 * 타입 버튼을 클릭하면 공격/방어 모드에 따라 타입 선택 상태를 변경합니다.
 *
 * @param type 포켓몬 타입 (`PokemonType`)
 * @param index 방어 모드에서 사용되는 옵션 인덱스 (`number`)
 * @param checked 선택 여부 (`boolean | null`)
 */
export const PokemonTypeButton = ({
  type,
  index,
  checked,
}: PokemonTypeButtonProps) => {
  const {
    checkedAttackOptions,
    checkedDefendOptions,
    setTypeCalcAttackOptions,
    setTypeCalcDefendOptions,
    mode,
  } = useTypeCalculatorStore();

  const pokemonType = POKEMON_TYPE_INFO[type];

  const handleClick = () => {
    if (mode === 'attack') {
      const newOptions = checkedAttackOptions ?? [];

      // 클릭한 타입이 현재 옵션 목록에 있으면 제거, 없으면 추가
      return setTypeCalcAttackOptions(
        newOptions.includes(type)
          ? newOptions.filter((option) => option !== type)
          : [...newOptions, type],
      );
    }

    if (mode === 'defend') {
      // 현재 index의 옵션과 해당 옵션이 일치하면 제거, 일치하지 않으면 해당 옵션으로 적용
      const newOptions = checkedDefendOptions.map((item, i) =>
        i === index ? (type === item ? null : type) : item,
      );
      return setTypeCalcDefendOptions(newOptions);
    }
  };

  return (
    <button
      className={twJoin(
        'flex items-center gap-2 w-[82px] md:w-[102px] px-2 py-1 text-sm md:text-base border rounded-3xl hover:opacity-70',
        checked
          ? `${pokemonType.backgroundColor} text-white-100`
          : 'bg-white-100',
      )}
      onClick={handleClick}>
      <div
        className={twJoin(
          'w-[16px] h-[16px] rounded-full flex justify-center items-center',
          checked ? 'bg-white-100' : pokemonType.backgroundColor,
        )}>
        {checked && (
          <div
            className={twJoin(
              pokemonType.backgroundColor,
              'w-[10px] h-[10px] rounded-full',
            )}></div>
        )}
      </div>
      <div className="font-semibold">{pokemonType.name}</div>
    </button>
  );
};
