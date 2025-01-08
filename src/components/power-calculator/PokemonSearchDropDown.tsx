import { useState } from 'react';

import useDropdown from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { CommonDropdown, ErrorComponent } from '../common';

import { BattleRole, POKEMON_LIST_IN_KOREAN } from '@/constants/contents';
import { BattleRoleType } from '@/types/common';

export interface PokemonSearchDropDownProps {
  usage: BattleRoleType;
}

/**
 * 포켓몬 검색 드롭다운 컴포넌트
 *
 * - 사용자가 포켓몬 이름을 검색하거나 선택할 수 있도록 지원합니다.
 */
export const PokemonSearchDropDown = ({
  usage,
}: PokemonSearchDropDownProps) => {
  const {
    dropdownRef,
    inputValue,
    showDropdown,
    filteredOptions,
    handleInputChange,
    handleOptionSelect,
    setShowDropdown,
    selectedIndex,
    handleKeyDown: dropdownHandleKeydown,
    clearSearch,
  } = useDropdown(POKEMON_LIST_IN_KOREAN);

  const setPokemon =
    usage === BattleRole.ATTACK
      ? usePowerCalculatorStore((state) => state.setAttackPokemon)
      : usePowerCalculatorStore((state) => state.setDefendPokemon);
  const setPokemonId =
    usage === BattleRole.ATTACK
      ? usePowerCalculatorStore((state) => state.setAttackPokemonId)
      : usePowerCalculatorStore((state) => state.setDefendPokemonId);

  const [error, setError] = useState<boolean>();

  const { setDamages, setMove } = usePowerCalculatorStore();

  /**
   * 포켓몬 선택 처리
   *
   * - 선택한 포켓몬 이름을 통해 ID를 계산하고, Store에 저장합니다.
   * - 유효하지 않은 포켓몬 선택 시 에러 상태를 활성화합니다.
   */
  const handleSelect = (option: string) => {
    const pokemonId = POKEMON_LIST_IN_KOREAN.indexOf(option) + 1;

    if (!pokemonId) {
      setPokemonId(null);
      return setError(true);
    }

    handleOptionSelect(option);
    setPokemonId(pokemonId);
    setError(false);
  };

  /**
   * 키보드 이벤트 처리
   *
   * 드롭다운에서 선택된 포켓몬을 처리하거나, 현재 입력값을 처리합니다.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    dropdownHandleKeydown(key);
    if (key === 'Enter') {
      e.preventDefault();
      // 현재 포커싱 된 옵션이 있으면 그 옵션을 선택, 없으면 입력값을 선택
      selectedIndex !== null
        ? handleSelect(filteredOptions[selectedIndex])
        : handleSelect(inputValue);
    }
  };

  const handleClear = () => {
    clearSearch();
    setPokemon(null);
    setPokemonId(null);
    setDamages([]);
    usage === BattleRole.ATTACK && setMove(null);
  };
  return (
    <div className="relative w-fit">
      <input
        type="text"
        className="w-full min-w-[120px] max-w-[162px] border rounded py-1 px-2 text-sm lg:text-base"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(true)}
        placeholder="포켓몬 입력"
        autoComplete="off"
        tabIndex={0}
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute m-2 p-2 right-1 inset-y-0 flex items-center rounded-md text-gray-90 hover:bg-gray-20">
          ✕
        </button>
      )}
      <CommonDropdown
        dropdownRef={dropdownRef}
        selectedIndex={selectedIndex}
        filteredOptions={filteredOptions}
        handleSelect={handleSelect}
        showDropdown={showDropdown}
        noFoundMessage="포켓몬을 찾을 수 없어요"
      />
      {error && (
        <ErrorComponent message="포켓몬을 찾을 수 없어요" size="small" />
      )}
    </div>
  );
};
