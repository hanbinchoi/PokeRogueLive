import { useDropdown } from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

export interface CommonSearchDropDownProps {
  label: string;
  options: string[];
}

export const CommonSearchDropDown = ({
  label,
  options,
}: CommonSearchDropDownProps) => {
  const {
    dropdownRef,
    inputValue,
    showDropdown,
    filteredOptions,
    handleInputChange,
    handleOptionSelect,
    setShowDropdown,
    clearSearch,
  } = useDropdown({ options });

  const { setField, setWeather } = usePowerCalculatorStore();

  const updateState = (value: string | null) => {
    if (label === '날씨') {
      return setWeather(value);
    } else if (label === '필드') {
      return setField(value);
    }
    return;
  };

  const handleSelect = (option: string) => {
    handleOptionSelect(option);
    updateState(option);
  };

  const handleClear = () => {
    clearSearch();
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
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-md text-gray-90 hover:bg-gray-20">
            ✕
          </button>
        )}
        {showDropdown && filteredOptions && (
          <div className="absolute z-10 w-full bg-white rounded shadow max-h-40 overflow-y-auto bg-white-100 border-2">
            {filteredOptions?.map((option, i) => (
              <div
                key={i}
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
    </div>
  );
};
