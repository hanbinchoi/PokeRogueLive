import { useEffect, useRef, useState } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { MoveInfoProps, MoveProps } from '@/types/common';

import extractPokemonMoves from '@/utils/extractPokemonMoves';

export interface MoveSearchDropDownProps {
  moves: MoveProps[] | undefined;
}

export const MoveSearchDropDown = ({ moves }: MoveSearchDropDownProps) => {
  if (!moves) return;

  const [options, setOptions] = useState<MoveInfoProps[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<MoveInfoProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { setMove, setDamages } = usePowerCalculatorStore();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  useEffect(() => {
    if (moves) {
      const extractedMoves = extractPokemonMoves(moves);
      setOptions(extractedMoves);
      setFilteredOptions(extractedMoves);
    } else {
      clearSearch();
    }
  }, [moves]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === '') clearSearch();
    setInputValue(value);
    setFilteredOptions(
      options?.filter((opt) => opt.krName.includes(value.toLowerCase())),
    );
  };

  const handleOptionSelect = (selectedOption: string) => {
    setInputValue(selectedOption);
    setShowDropdown(false);
    setMove(options?.find((opt) => opt.krName === selectedOption) ?? null);
  };

  const clearSearch = () => {
    setInputValue('');
    setFilteredOptions(options);
    setMove(null);
    setDamages([]);
    setShowDropdown(false);
  };

  return (
    <div className="w-full">
      <label className="text-lg mb-1" htmlFor="dropdown-move">
        기술
      </label>
      <div className="relative w-[240px]" ref={dropdownRef}>
        <input
          id="dropdown-move"
          type="text"
          className="w-full border rounded p-2"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="기술 선택"
        />
        {inputValue && (
          <button
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-md text-gray-90 hover:bg-gray-20">
            ✕
          </button>
        )}
        {showDropdown && (
          <div className="absolute z-10 w-full bg-white  shadow max-h-40 overflow-y-auto bg-white border border-t-0">
            {filteredOptions?.map((option) => (
              <div
                key={option.krName}
                className="p-2 cursor-pointer hover:bg-gray-50"
                onClick={() => handleOptionSelect(option.krName)}>
                {option.krName}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-2 text-gray-500">
                검색한 옵션을 찾을 수 없어요.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
