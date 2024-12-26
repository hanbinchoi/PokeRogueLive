import { useMemo, useRef, useState } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';

export interface UseDropdownProps {
  options: string[];
}

export const useDropdown = ({ options }: UseDropdownProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(
    () => options.filter((opt) => opt.includes(inputValue)),
    [inputValue, options],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const handleOptionSelect = (
    option: string,
    callback?: (option: string) => void,
  ) => {
    setInputValue(option);
    setShowDropdown(false);
    if (callback) callback(option);
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
    clearSearch,
  };
};
