import {
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

import useDropdown from '@/hooks/useDropDown';

import { Dropdown } from '../Dropdown/Dropdown';

import { DefaultProps, InputValues } from '@/types/common';

import { POKEMON_LIST_IN_KOREAN } from '@/constants/contents';

export interface SearchInputProps extends DefaultProps {
  placeholder?: string;
  register: UseFormRegister<InputValues>;
  handleReset: UseFormReset<InputValues>;
  setValue: UseFormSetValue<InputValues>;
  watch: UseFormWatch<InputValues>;
  onSubmit: (input: InputValues) => void; // onSubmit prop 추가
}

export const SearchInput = ({
  placeholder,
  className,
  register,
  handleReset,
  setValue,
  watch,
  onSubmit,
}: SearchInputProps) => {
  const {
    dropdownRef,
    showDropdown,
    filteredOptions,
    handleInputChange: dropdownHandleInputChange,
    handleOptionSelect,
    setShowDropdown,
    selectedIndex,
    setSelectedIndex,
    clearSearch,
  } = useDropdown({ options: POKEMON_LIST_IN_KOREAN });

  const keyword = watch('keyword');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dropdownHandleInputChange(e);
    setValue('keyword', value);
  };

  const handleSelect = (option: string) => {
    handleOptionSelect(option);
    setValue('keyword', option);
  };

  const handleClear = () => {
    clearSearch();
    setSelectedIndex(null);
    handleReset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

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
      e.preventDefault();

      selectedIndex !== null
        ? handleSelect(filteredOptions[selectedIndex])
        : onSubmit(watch());

      setSelectedIndex(null);
    }
  };

  return (
    <div ref={dropdownRef}>
      <input
        className={twJoin(
          'px-2 py-1 sm:px-3 sm:py-2 rounded text-sm border min-w-[166px] min-[480px]:min-w-[244px] h-[32px] min-h-[32px] border-gray-30 focus:outline-blue-30 font-light shadow-md ',
          className,
        )}
        placeholder={placeholder}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        {...register('keyword', {
          required: '포켓몬을 입력해주세요.',
          validate: (value) =>
            value.trim() !== '' || '공백은 검색할 수 없어요.',
          onChange: handleInputChange,
        })}
        tabIndex={0}
      />
      {keyword && (
        <button
          onClick={handleClear}
          className="absolute right-4 inset-y-0 flex items-center rounded-md text-gray-90 ">
          ✕
        </button>
      )}
      <Dropdown
        dropdownRef={dropdownRef}
        selectedIndex={selectedIndex}
        filteredOptions={filteredOptions}
        handleSelect={handleSelect}
        showDropdown={showDropdown}
        noFoundMessage="포켓몬을 찾을 수 없어요"
        className="min-w-[166px] min-[480px]:min-w-[244px] "
      />
    </div>
  );
};
