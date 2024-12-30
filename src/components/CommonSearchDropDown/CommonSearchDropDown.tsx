import useDropdown from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { DropDown } from '../Dropdown/Dropdown';

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
      <label className="text-base md:text-lg" htmlFor={`dropdown-${label}`}>
        {label}
      </label>
      <div
        className="relative w-full min-w-[120px] max-w-[200px]"
        ref={dropdownRef}>
        <input
          id={`dropdown-${label}`}
          type="text"
          className="w-full mt-1 border rounded py-1 px-2 text-sm lg:text-base"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="기술 선택"
          autoComplete="off"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-md text-gray-90 hover:bg-gray-20">
            ✕
          </button>
        )}
        <DropDown
          filteredOptions={filteredOptions}
          handleSelect={handleSelect}
          showDropdown={showDropdown}
          noFoundMessage="옵션을 찾을 수 없어요"
        />
      </div>
    </div>
  );
};
