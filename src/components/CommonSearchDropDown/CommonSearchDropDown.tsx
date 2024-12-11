import { useState } from 'react';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

export interface CommonSearchDropDownProps {
  label: string;
  options: string[];
  pokemonId: number | null;
}

export const CommonSearchDropDown = ({
  label,
  options,
  pokemonId,
}: CommonSearchDropDownProps) => {
  if (!pokemonId) return;

  const [filteredOptions, setFilteredOptions] = useState<string[] | null>(
    options,
  );
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { setField, setWeather } = usePowerCalculatorStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter((opt) => opt.toLowerCase().includes(value.toLowerCase())),
    );

    if (label === '날씨') return setWeather(value);
    if (label === '필드') return setField(value);
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setInputValue('');
    setFilteredOptions(options);
  };

  return (
    <div className="w-full">
      <div className="text-lg mb-1">{label}</div>
      <div className="relative w-[240px]">
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
            {filteredOptions?.map((option, i) => (
              <div
                key={i}
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
    </div>
  );
};
