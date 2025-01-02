import { useMemo, useRef, useState } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';

export interface UseDropdownProps {
  options: string[];
}

const useDropdown = ({ options }: UseDropdownProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(
    () => options.filter((opt) => opt.includes(inputValue)),
    [inputValue, options],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
    setSelectedIndex(null);
  };

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
