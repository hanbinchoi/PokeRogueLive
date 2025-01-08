import { useEffect, useState } from 'react';

import useDropdown from '@/hooks/useDropDown';
import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';
import usePowerCalculatorPokemon from '@/hooks/usePowerCalculatorPokemon';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { CommonDropdown, ErrorComponent, LoadingComponent } from '../common';

import { BattleRoleType } from '@/types/common';

import extractPokemonDetails from '@/utils/extractPokemonDetails';

import { BattleRole, POKEMON_LIST_IN_KOREAN } from '@/constants/contents';

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
  const [error, setError] = useState(false);
  const { setDamages, setMove } = usePowerCalculatorStore();

  // 공격 또는 방어에 따른 Store 상태 가져오기
  const { pokemonId, setPokemon, setPokemonId } =
    usePowerCalculatorPokemon(usage);

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

  const {
    pokemonData,
    speciesData,
    isLoadingPokemon,
    isLoadingSpecies,
    isErrorPokemon,
    isErrorSpecies,
  } = usePokemonDetailQuery(pokemonId);

  const isLoading = isLoadingPokemon || isLoadingSpecies;

  useEffect(() => {
    if (pokemonData && speciesData)
      return setPokemon(extractPokemonDetails(pokemonData, speciesData)); // 요청받은 데이터를 usage를 참조하여 공격, 방어 포켓몬으로 설정함.

    setError(isErrorPokemon || isErrorSpecies); // 데이터 중 1개라도 에러가 발생하면 에러처리
  }, [pokemonData, speciesData]);

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
      setPokemon(null);
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
      {inputValue && !isLoading && (
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
      {isLoading && (
        <div className="p-12">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
};
