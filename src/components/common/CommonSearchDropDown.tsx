'use client';

import { useState } from 'react';

import useDropdown from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { CommonDropdown } from './CommonDropdown';
import { ErrorMessage } from './ErrorMessage';

import { isField, isWeather } from '@/utils/typeGuard';
import { FieldType, WeatherType } from '@/types/common';

export interface CommonSearchDropDownProps {
  label: string;
  options: string[];
}

/**
 * 공통 검색 드롭다운 컴포넌트.
 *
 * 입력값에 의해 옵션을 필터링하고 클릭 이벤트, 키보드 네비게이션 등을 지원합니다.
 *
 * @param label 드롭다운 라벨 (`string`)
 * @param options 드롭다운 옵션으로 노출 될 목록 (string[])
 * @returns
 */
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
    selectedIndex,
    handleKeyDown: dropdownHandleKeydown,
    clearSearch,
  } = useDropdown(options);

  const [error, setError] = useState(false);
  const { setField, setWeather } = usePowerCalculatorStore();

  const updateState = (value: string | null) => {
    if (label === '날씨') return setWeather(value as WeatherType);
    if (label === '필드') return setField(value as FieldType);

    return;
  };

  const handleSelect = (option: string) => {
    const item = options?.find((o) => o === option);

    // 기술이 있으면 store에 저장, 없으면 에러 처리
    if (!item) {
      handleOptionSelect('');
      setError(true);
    } else {
      handleOptionSelect(option);
      updateState(item);
      setError(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    dropdownHandleKeydown(key);

    if (key === 'Enter') {
      e.preventDefault();
      // 현재 포커싱 된 옵션이 있으면 그 옵션을 선택, 없으면 입력값을 선택
      selectedIndex !== null
        ? handleSelect(filteredOptions[selectedIndex])
        : handleSelect(inputValue);
    }
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
      <div className="relative w-full min-w-[120px] max-w-[200px]">
        <input
          id={`dropdown-${label}`}
          type="text"
          className="w-full border rounded py-1 px-2 text-sm lg:text-base"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          placeholder="기술 선택"
          autoComplete="off"
          tabIndex={2}
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md text-gray-90 ">
            ✕
          </button>
        )}
        {error && <ErrorMessage message="옵션을 찾을 수 없어요." />}
        <CommonDropdown
          dropdownRef={dropdownRef}
          selectedIndex={selectedIndex}
          filteredOptions={filteredOptions}
          handleSelect={handleSelect}
          showDropdown={showDropdown}
          noFoundMessage="옵션을 찾을 수 없어요"
        />
      </div>
    </div>
  );
};
