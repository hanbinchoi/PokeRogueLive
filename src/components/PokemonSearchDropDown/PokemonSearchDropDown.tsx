import { useDropdown } from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { POKEMON_LIST_IN_KOREAN } from '@/constants/contents';

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
    <div className="relative w-[200px]" ref={dropdownRef}>
      <input
        type="text"
        className="w-full border rounded p-2"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        placeholder="포켓몬 입력"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute m-2 p-2 right-1 inset-y-0 flex items-center rounded-md text-gray-90 hover:bg-gray-20">
          ✕
        </button>
      )}
      {showDropdown && (
        <div className="absolute z-10 w-full bg-white rounded shadow max-h-40 overflow-y-auto bg-white-100 border-2">
          {filteredOptions.map((option) => (
            <div
              key={option}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}>
              {option}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};
