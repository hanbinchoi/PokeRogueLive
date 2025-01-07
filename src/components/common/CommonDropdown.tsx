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
