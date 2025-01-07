import {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

import useDropdown from '@/hooks/useDropDown';

import { CommonDropdown, ErrorMessage } from '../common';

import { DefaultProps, InputValues } from '@/types/common';

import { POKEMON_LIST_IN_KOREAN } from '@/constants/contents';

export interface SearchInputProps extends DefaultProps {
  placeholder?: string;
  errors: FieldErrors<InputValues>;
  register: UseFormRegister<InputValues>;
  handleReset: UseFormReset<InputValues>;
  setValue: UseFormSetValue<InputValues>;
  watch: UseFormWatch<InputValues>;
  onSubmit: (input: InputValues) => void;
}

/**
 * 포켓몬 검색 입력을 위한 input component.
 *
 * 사용자가 포켓몬을 검색할 수 있도록 돕는 입력창입니다.
 * - 드롭다운 메뉴로 검색 제안
 * - 입력 필드에서 자동완성 제공
 * - 오류 메시지 표시
 *
 */
export const PokemonSearchInput = ({
  placeholder,
  className,
  register,
  handleReset,
  setValue,
  watch,
  onSubmit,
  errors,
}: SearchInputProps) => {
  const {
    selectedIndex,
    setSelectedIndex,
    filteredOptions,
    dropdownRef,
    showDropdown,
    setShowDropdown,
    handleInputChange: dropdownHandleInputChange,
    handleOptionSelect,
    clearSearch,
    handleKeyDown: dropdownHandleKeydown,
  } = useDropdown(POKEMON_LIST_IN_KOREAN);

  const keyword = watch('keyword');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 빈 값일 경우 clear 처리
    if (value === '') handleClear();

    // input 값에 따라 dropdown 메뉴 필터링
    dropdownHandleInputChange(e);
  };

  const handleSelect = (option: string) => {
    handleOptionSelect(option);
    setValue('keyword', option); // dropdown 메뉴 선택 시 input 값으로 설정
  };

  const handleClear = () => {
    clearSearch();
    setSelectedIndex(null);
    handleReset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    dropdownHandleKeydown(key);

    /* 
      enter를 입력한 경우
        1. dropdown 메뉴에 포커싱이 되어있는 경우 -> 드롭다운 선택으로 간주 -> input에 옵션 값이 들어감
        2. dropdown 메뉴 포커싱이 없는 경우 -> 폼 제출 이벤트 발생
    */
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
          validate: (value) =>
            value.trim() !== '' || '공백은 검색할 수 없어요.',
          onChange: handleInputChange,
        })}
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
      <ErrorMessage message={errors.keyword?.message} />
    </div>
  );
};
