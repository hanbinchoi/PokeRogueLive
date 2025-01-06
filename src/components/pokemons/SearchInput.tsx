import {
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

import { CommonDropdown } from './common/CommonDropdown';

import { DefaultProps, InputValues } from '@/types/common';

interface UseDropdownReturn {
  dropdownRef: React.RefObject<HTMLDivElement>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  filteredOptions: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOptionSelect: (option: string) => void;
  handleKeyDown: (key: string) => void;
  clearSearch: () => void;
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface SearchInputProps extends DefaultProps {
  placeholder?: string;
  register: UseFormRegister<InputValues>;
  handleReset: UseFormReset<InputValues>;
  setValue: UseFormSetValue<InputValues>;
  watch: UseFormWatch<InputValues>;
  onSubmit: (input: InputValues) => void;
  dropdownControls: UseDropdownReturn;
}

export const SearchInput = ({
  placeholder,
  className,
  register,
  handleReset,
  setValue,
  watch,
  onSubmit,
  dropdownControls,
}: SearchInputProps) => {
  const {
    selectedIndex,
    filteredOptions,
    dropdownRef,
    setShowDropdown,
    showDropdown,
    handleInputChange: dropdownHandleInputChange,
    handleOptionSelect,
    clearSearch,
    setSelectedIndex,
    handleKeyDown: dropdownHandleKeydown,
  } = dropdownControls;

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

    dropdownHandleKeydown(key);

    if (key === 'Enter') {
      e.preventDefault();
      selectedIndex !== null
        ? handleSelect(filteredOptions[selectedIndex])
        : onSubmit(watch());
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
          type="reset"
          className="absolute right-4 inset-y-0 flex items-center rounded-md text-gray-90 ">
          ✕
        </button>
      )}
      <CommonDropdown
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
