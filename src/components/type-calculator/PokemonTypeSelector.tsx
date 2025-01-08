import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { PokemonTypeButton } from './PokemonTypeButton';

import { PokemonType } from '@/types/common';

import { EXCLUDED_TYPES, PokemonTypeName } from '@/constants/contents';

interface PokemonTypeSelectorProps {
  index: number;
  title: string;
}

/**
 * 타입 계산 옵션 컴포넌트
 *
 * 공격/방어 모드에 따라 타입 버튼 목록을 생성하며, 사용자가 선택한 타입을 표시합니다.
 *
 * @param index 타입 버튼의 index. 방어 모드의 경우 index 체크가 필요 (`number`)
 * @param title 옵션의 제목 (`string`)
 */
export const PokemonTypeSelector = ({
  index,
  title,
}: PokemonTypeSelectorProps) => {
  const { checkedAttackTypes, checkedDefendTypes, mode } =
    useTypeCalculatorStore();

  // 포켓몬 타입 목록에서 실제 계산에 필요하지 않는 타입들은 제외
  const filteredTypes = Object.values(PokemonTypeName).filter(
    (type) => !EXCLUDED_TYPES.has(type),
  );

  /**
   * 현재 옵션 버튼이 체크 된 상태인지 확인하는 함수.
   *
   * @param type 포켓몬 타입 (`PokemonType`)
   * @returns 선택 상태 (`boolean`)
   */
  const isTypeChecked = (type: PokemonType) => {
    const options = mode === 'defend' ? checkedDefendTypes : checkedAttackTypes;

    if (!options) return false;

    // 공격 모드 : 타입이 체크된 타입 목록에 포함되어 있는지 확인
    // 방어 모드 : 체크된 타입과 현재 타입을 비교
    return mode === 'attack' ? options.includes(type) : options[index] === type;
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <p className="text-sm sm:text-base md:text-lg font-semibold">{title}</p>
      <div className="flex gap-x-2 gap-y-3 sm:gap-y-4 flex-wrap">
        {filteredTypes.map((type) => (
          <PokemonTypeButton
            key={type}
            type={type}
            index={index}
            checked={isTypeChecked(type)}
          />
        ))}
      </div>
    </div>
  );
};
