import useDropdown from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { CommonDropdown, ErrorMessage } from '../common';

import { MoveDataProps } from '@/types/data';

import extractMoveList from '@/utils/extractMoveList';
import { useState } from 'react';

export interface MoveSearchDropDownProps {
  moves: MoveDataProps[] | undefined;
}

/**
 * 포켓몬 기술 목록 드롭다운 컴포넌트.
 *
 * 클릭 이벤트, 키보드 네비게이션 등을 지원합니다. 선택된 기술은 store에 저장합니다.
 *
 * @param moves 포켓몬 기술 목록 (`MoveDataProps`)
 * @returns
 */
export const MoveSearchDropDown = ({ moves }: MoveSearchDropDownProps) => {
  if (!moves) return;

  const { setMove, setDamages } = usePowerCalculatorStore();
  const [error, setError] = useState(false);

  const extractMoves = extractMoveList(moves);

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
  } = useDropdown(extractMoves.map((m) => m.krName));

  const handleSelect = (option: string) => {
    const move = extractMoves?.find((moves) => moves.krName === option);

    // 기술이 있으면 store에 저장, 없으면 에러 처리
    if (!move) {
      handleOptionSelect('');
      setMove(null);
      setError(true);
    } else {
      handleOptionSelect(option);
      setMove(move);
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
    setMove(null);
    setDamages([]);
  };

  return (
    <div className="w-full">
      <label className="text-base md:text-lg" htmlFor="dropdown-move">
        기술
      </label>
      <div className="relative w-full min-w-[120px] max-w-[200px]">
        <input
          id="dropdown-move"
          type="text"
          className="w-full mt-1 md:mt-2 border rounded py-1 px-2 text-sm lg:text-base"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          placeholder="기술 선택"
          autoComplete="off"
          tabIndex={1}
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-md text-gray-90 hover:bg-gray-20">
            ✕
          </button>
        )}
        {error && <ErrorMessage message="기술을 찾을 수 없어요." />}
        <CommonDropdown
          dropdownRef={dropdownRef}
          selectedIndex={selectedIndex}
          filteredOptions={filteredOptions}
          handleSelect={handleSelect}
          showDropdown={showDropdown}
          noFoundMessage="기술을 찾을 수 없어요"
        />
      </div>
    </div>
  );
};
