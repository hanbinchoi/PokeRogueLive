import { useMemo, useRef, useState } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';

import { PokemonDataProps } from '@/types/common';

import { POKEMON_LIST_IN_KOREAN } from '@/constants/contents';

export interface PokemonSearchDropDownProps {
  setPokemonId: (pokemonId: number | null) => void;
  setPokemon: (pokemon: PokemonDataProps | null) => void;
}

export const PokemonSearchDropDown = ({
  setPokemonId,
  setPokemon,
}: PokemonSearchDropDownProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const filteredOptions = useMemo(() => {
    return POKEMON_LIST_IN_KOREAN.filter((opt) => opt.includes(inputValue));
  }, [inputValue]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
    setPokemonId(POKEMON_LIST_IN_KOREAN.indexOf(option) + 1);
  };

  const clearSearch = () => {
    setInputValue('');
    setPokemonId(null);
    setPokemon(null);
  };

  return (
    <div className="relative w-[200px]" ref={dropdownRef}>
      <input
        type="text"
        className="w-[full] border rounded p-2"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        placeholder="포켓몬 입력"
      />
      {inputValue && (
        <button
          onClick={clearSearch}
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
              onClick={() => handleOptionSelect(option)}>
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
