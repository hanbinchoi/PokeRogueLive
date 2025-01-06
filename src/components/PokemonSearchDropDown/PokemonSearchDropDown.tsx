import useDropdown from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { Dropdown } from '../Dropdown/Dropdown';

import { POKEMON_LIST_IN_KOREAN } from '@/constants/contents';
import { ErrorComponent } from '../ErrorComponent/ErrorComponent';
import { useState } from 'react';

export interface PokemonSearchDropDownProps {
  usage: 'attack' | 'defend';
}

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
    usage === 'attack'
      ? usePowerCalculatorStore((state) => state.setAttackPokemon)
      : usePowerCalculatorStore((state) => state.setDefendPokemon);
  const setPokemonId =
    usage === 'attack'
      ? usePowerCalculatorStore((state) => state.setAttackPokemonId)
      : usePowerCalculatorStore((state) => state.setDefendPokemonId);

  const [error, setError] = useState<boolean>();

  const { setDamages, setMove } = usePowerCalculatorStore();

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    dropdownHandleKeydown(key);
    if (key === 'Enter') {
      e.preventDefault();
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
    usage === 'attack' && setMove(null);
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
      <Dropdown
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
