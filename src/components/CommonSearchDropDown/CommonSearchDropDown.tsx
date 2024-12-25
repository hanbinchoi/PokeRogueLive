import { useRef, useState } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

export interface CommonSearchDropDownProps {
  label: string;
  options: string[];
}

export const CommonSearchDropDown = ({
  label,
  options,
}: CommonSearchDropDownProps) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { setField, setWeather } = usePowerCalculatorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  const updateState = (value: string | null) => {
    if (label === '날씨') {
      return setWeather(value);
    } else if (label === '필드') {
      return setField(value);
    }
    return;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    setFilteredOptions(options.filter((opt) => opt.includes(value)));
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
    updateState(option);
  };

  const clearSearch = () => {
    setInputValue('');
    setFilteredOptions(options);
    updateState(null);
  };

  return (
    <div className="w-full">
      <label className="text-lg mb-1" htmlFor={`dropdown-${label}`}>
        {label}
      </label>
      <div className="relative w-[240px]" ref={dropdownRef}>
        <input
          id={`dropdown-${label}`}
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
        {showDropdown && filteredOptions && (
          <div className="absolute z-10 w-full bg-white rounded shadow max-h-40 overflow-y-auto bg-white border-2">
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
