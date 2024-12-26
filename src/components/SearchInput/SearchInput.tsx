import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

import { DefaultProps, InputValues, SearchInputSize } from '@/types/common';

export interface SearchInputProps extends DefaultProps {
  size?: SearchInputSize;
  placeholder?: string;
  register: UseFormRegister<InputValues>;
  setValue: UseFormSetValue<InputValues>; // react-hook-form의 setValue 추가
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({
  size = 'medium',
  placeholder,
  className,
  register,
  setValue,
  onChange,
}: SearchInputProps) => {
  const SearchInputSize: Record<SearchInputSize, string> = {
    small: 'px-2 py-1 rounded-lg text-xs border',
    medium: 'px-3 py-2 rounded-lg text-sm border',
  };

  return (
    <input
      className={twJoin(
        'w-full border-gray-30 focus:outline-blue-30 font-light shadow-md',
        SearchInputSize[size],
        className,
      )}
      placeholder={placeholder}
      autoComplete="off"
      {...register('keyword', {
        required: '포켓몬을 입력해주세요.',
        validate: (value) => value.trim() !== '' || '공백은 검색할 수 없어요.',
        onChange: (e) => {
          // react-hook-form의 동작과 커스텀 핸들러 병합
          setValue('keyword', e.target.value); // react-hook-form 상태 업데이트
          onChange?.(e); // 커스텀 onChange 실행
        },
      })}
    />
  );
};
