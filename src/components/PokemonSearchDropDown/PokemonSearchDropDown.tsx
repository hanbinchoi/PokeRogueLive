import useDropdown from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { POKEMON_LIST_IN_KOREAN } from '@/constants/contents';
import { DropDown } from '../DropDown/DropDown';

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
    clearSearch,
  } = useDropdown({ options: POKEMON_LIST_IN_KOREAN });

  const setPokemon =
    usage === 'attack'
      ? usePowerCalculatorStore((state) => state.setAttackPokemon)
      : usePowerCalculatorStore((state) => state.setDefendPokemon);
  const setPokemonId =
    usage === 'attack'
      ? usePowerCalculatorStore((state) => state.setAttackPokemonId)
      : usePowerCalculatorStore((state) => state.setDefendPokemonId);

  const { setDamages, setMove } = usePowerCalculatorStore();

  const handleSelect = (option: string) => {
    handleOptionSelect(option);
    setPokemonId(POKEMON_LIST_IN_KOREAN.indexOf(option) + 1);
  };

  const handleClear = () => {
    clearSearch();
    setPokemon(null);
    setPokemonId(null);
    setDamages([]);
    usage === 'attack' && setMove(null);
  };

  return (
    <div className="relative w-fit" ref={dropdownRef}>
      <input
        type="text"
        className="w-full min-w-[120px] max-w-[162px] border rounded py-1 px-2 text-sm lg:text-base"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        placeholder="포켓몬 입력"
        autoComplete="off"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute m-2 p-2 right-1 inset-y-0 flex items-center rounded-md text-gray-90 hover:bg-gray-20">
          ✕
        </button>
      )}
      <DropDown
        filteredOptions={filteredOptions}
        handleSelect={handleSelect}
        showDropdown={showDropdown}
        noFoundMessage="포켓몬을 찾을 수 없어요"
      />
    </div>
  );
};
