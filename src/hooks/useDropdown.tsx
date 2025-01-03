import { useMemo, useRef, useState } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';

/**
 * 드롭다운 기능을 관리하기 위한 커스텀 훅
 *
 * 이 훅은 다음과 같은 상태와 기능을 제공합니다:
 * - 사용자 입력의 따른 옵션을 필터링 합니다
 * - 드롭다운의 노출 여부를 제어합니다
 * - 키보드 네비게이션을 제공합니다
 * - 드롭다운 컨테이너 밖의 클릭을 감지합니다
 * - 검색입력 초기화 기능을 제공합니다
 *
 * ```tsx
 * const {
 *   dropdownRef,
 *   inputValue,
 *   handleInputChange,
 *   filteredOptions,
 *   handleOptionSelect
 * } = useDropdown({ options: ['옵션 1', '옵션 2', '옵션 3'] });
 * ```
 *
 * @param options - 전체 아이템 개수
 * @return 드롭다운 관련 상태 및 유틸 함수
 *
 */
const useDropdown = (options: string[]) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 드롭다운 컨테이너 Ref
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log(options);

  // 입력값에 의해 필터링된 옵션
  const filteredOptions = useMemo(
    () => options.filter((opt) => opt.includes(inputValue)),
    [inputValue, options],
  );

  // input change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  // option 선택(클릭) 이벤트
  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
    setSelectedIndex(null);
  };

  /**
   * 드롭다운 키보드 네비게이션 함수
   *
   * key에 따른 동작
   * - Backspace: 포커싱 옵션 초기화
   * - esc: 포커싱 옵션 초기화 및 드롭다운 닫기
   * - ArrowDown: 포커싱 옵션 밑으로 이동
   * - ArrowUp: 포커싱 옵션 위로 이동
   * - Enter: 포커싱 옵션 선택 및 드롭다운 닫기
   *
   * @param key - 키보드에 입력 된 키
   */
  const handleKeyDown = (key: string) => {
    if (key === 'Backspace') {
      setSelectedIndex(null);
    }

    if (key === 'Escape') {
      setSelectedIndex(null);
      setShowDropdown(false);
    }

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      const direction = key === 'ArrowDown' ? 1 : -1;
      const newIndex =
        selectedIndex === null
          ? 0
          : Math.min(
              Math.max(selectedIndex + direction, 0),
              filteredOptions.length - 1,
            );

      setSelectedIndex(newIndex);
      setShowDropdown(true);
    }

    if (key === 'Enter') {
      setShowDropdown(false);
      setSelectedIndex(null);
    }
  };

  const clearSearch = () => {
    setInputValue('');
    setShowDropdown(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  return {
    dropdownRef,
    inputValue,
    setInputValue,
    showDropdown,
    setShowDropdown,
    filteredOptions,
    handleInputChange,
    handleOptionSelect,
    handleKeyDown,
    clearSearch,
    selectedIndex,
    setSelectedIndex,
  };
};

export default useDropdown;
