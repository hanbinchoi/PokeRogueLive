import {
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

import useDropdown from '@/hooks/useDropDown';

import { DropDown } from '../DropDown/DropDown';

import { DefaultProps, InputValues, SearchInputSize } from '@/types/common';

import { POKEMON_LIST_IN_KOREAN } from '@/constants/contents';

export interface SearchInputProps extends DefaultProps {
  size?: SearchInputSize;
  placeholder?: string;
  register: UseFormRegister<InputValues>;
  reset: UseFormReset<InputValues>;
  setValue: UseFormSetValue<InputValues>;
  watch: UseFormWatch<InputValues>;
}

export const SearchInput = ({
  size = 'medium',
  placeholder,
  className,
  register,
  reset,
  setValue,
  watch,
}: SearchInputProps) => {
  const {
    dropdownRef,
    showDropdown,
    filteredOptions,
    handleInputChange: dropdownHandleInputChange,
    handleOptionSelect,
    setShowDropdown,
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
    reset();
  };

  const SearchInputSize: Record<SearchInputSize, string> = {
    small: 'px-1 sm:px-2 sm:py-1 rounded-lg text-xs border',
    medium: 'px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-sm border',
  };
  return (
    <div ref={dropdownRef}>
      <input
        className={twJoin(
          'min-w-[166px] min-[480px]:min-w-[244px] h-[32px] min-h-[32px] border-gray-30 focus:outline-blue-30 font-light shadow-md ',
          SearchInputSize[size],
          className,
        )}
        placeholder={placeholder}
        onFocus={() => setShowDropdown(true)}
        autoComplete="off"
        {...register('keyword', {
          required: '포켓몬을 입력해주세요.',
          validate: (value) =>
            value.trim() !== '' || '공백은 검색할 수 없어요.',
          onChange: handleInputChange,
        })}
      />
      {keyword && (
        <button
          onClick={handleClear}
          className="absolute right-4 inset-y-0 flex items-center rounded-md text-gray-90 ">
          ✕
        </button>
      )}
      <DropDown
        filteredOptions={filteredOptions}
        handleSelect={handleSelect}
        showDropdown={showDropdown}
        noFoundMessage="포켓몬을 찾을 수 없어요"
      />
    </div>
  );
};
