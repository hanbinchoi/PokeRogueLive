'use client';

import { RefObject, useEffect } from 'react';

import { twJoin, twMerge } from 'tailwind-merge';

import { DefaultProps } from '@/types/common';

interface DropDownProps extends DefaultProps {
  dropdownRef: RefObject<HTMLDivElement>;
  selectedIndex: number | null;
  filteredOptions: string[];
  handleSelect: (option: string) => void;
  showDropdown: boolean;
  noFoundMessage: string;
}

/**
 * 드롭다운 컴포넌트.
 *
 * 사용자가 검색한 내용을 바탕으로 드롭다운 메뉴를 표시하고, 키보드나 클릭으로 항목을 선택할 수 있습니다.
 * - 선택된 항목은 자동으로 스크롤됩니다.
 * - 항목을 클릭하면 `handleSelect` 함수가 호출됩니다.
 * - 옵션이 없으면 `noFoundMessage`가 표시됩니다.
 *
 * @param {RefObject<HTMLDivElement>} dropdownRef - 드롭다운 메뉴의 DOM Ref
 * @param {number | null} selectedIndex - 선택된 항목의 인덱스
 * @param {string[]} filteredOptions - 필터링된 옵션 목록
 * @param {(option: string) => void} handleSelect - 옵션 선택 시 호출되는 함수
 * @param {boolean} showDropdown - 드롭다운 표시 여부
 * @param {string} noFoundMessage - 옵션이 없을 때 표시할 메시지
 * @param {string} className - 추가적인 스타일을 위한 클래스명
 */
export const CommonDropdown = ({
  dropdownRef,
  filteredOptions,
  selectedIndex,
  handleSelect,
  showDropdown,
  noFoundMessage,
  className,
}: DropDownProps) => {
  // 드롭다운 메뉴 키보드로 제어 시 자동으로 스크롤 되도록 이벤트 설정
  useEffect(() => {
    if (dropdownRef.current && selectedIndex !== null) {
      const selectedElement = dropdownRef.current.children[selectedIndex];

      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
        });
      }
    }
  }, [selectedIndex]);

  if (!showDropdown) return null;

  return (
    <div
      ref={dropdownRef}
      className={twJoin(
        'absolute z-10 w-full min-w-[120px] max-w-[162px] text-sm lg:text-[14px] bg-white-100 border-2 border-t rounded shadow max-h-20 sm:max-h-40 overflow-y-auto ',
        className,
      )}>
      {filteredOptions.length === 0 && (
        <div className="p-2 text-gray-50">{noFoundMessage}</div>
      )}
      {filteredOptions.map((option, index) => (
        <div
          key={option}
          id={`dropdown-option-${option}`}
          className={twMerge(
            'p-1 cursor-pointer hover:bg-gray-100 border-b border-gray-20',
            selectedIndex === index && 'bg-blue-10',
          )}
          onClick={() => handleSelect(option)}>
          {option}
        </div>
      ))}
    </div>
  );
};
