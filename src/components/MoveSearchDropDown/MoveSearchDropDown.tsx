import { useEffect, useRef, useState } from 'react';

import { MoveInfoProps } from '@/types/common';

import extractPokemonMoves from '@/utils/extractPokemonMoves';
import usePowerCalculatorStore from '@/stores/powerCalculatorStore';
import useOutsideClick from '@/hooks/useOutsideClick';

export interface MoveSearchDropDownProps {
  moves: MoveInfoProps[] | undefined;
}

export const MoveSearchDropDown = ({ moves }: MoveSearchDropDownProps) => {
  if (!moves) return;

  const [options, setOptions] = useState<MoveInfoProps[] | null>();
  const [filteredOptions, setFilteredOptions] = useState<
    MoveInfoProps[] | null
  >();
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { setMove } = usePowerCalculatorStore();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  useEffect(() => {
    if (moves) {
      const extractedMoves = extractPokemonMoves(moves);
      setOptions(extractedMoves);
      setFilteredOptions(extractedMoves);
    } else {
      setOptions(null);
      setFilteredOptions(null);
      setInputValue('');
      setShowDropdown(false);
    }
  }, [moves]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(
      options?.filter((opt) =>
        opt.krName.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
    setMove(options?.find((opt) => opt.krName === option) ?? null);
  };

  const clearSearch = () => {
    setInputValue('');
    setFilteredOptions(options);
    setMove(null);
  };

  return (
    <div className="w-full">
      <div className="text-lg mb-1">기술</div>
      <div className="relative w-[240px]" ref={dropdownRef}>
        <input
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
            className="absolute m-2 p-2 right-1 inset-y-0 flex items-center rounded-md text-gray-90 hover:bg-gray-20">
            ✕
          </button>
        )}
        {showDropdown && filteredOptions && (
          <div className="absolute z-10 w-full bg-white rounded shadow max-h-40 overflow-y-auto bg-white-100 border-2">
            {filteredOptions?.map((option) => (
              <div
                key={option.krName}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionSelect(option.krName)}>
                {option.krName}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-2 text-gray-500">No options found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
