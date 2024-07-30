import { twJoin } from 'tailwind-merge';

import '../../styles/globals.css';

import { DefaultProps, InputValues, SearchInputSize } from '@/types/common';
import { UseFormRegister } from 'react-hook-form';

export interface SearchInputProps extends DefaultProps {
  required?: boolean;
  size?: SearchInputSize;
  placeholder?: string;
  register: UseFormRegister<InputValues>;
  onClick?: () => void;
}

export const SearchInput = ({
  required = false,
  size = 'medium',
  placeholder,
  className,
  register,
}: SearchInputProps) => {
  const SearchInputSize: Record<SearchInputSize, string> = {
    small: 'px-2 py-1 rounded-lg text-xs border',
    medium: 'px-3 py-2 rounded-lg text-sm border',
  };

  return (
    <input
      placeholder={placeholder}
      required={required}
      className={twJoin(
        'w-full border-gray-30 focus:outline-blue-30 font-light shadow-md',
        SearchInputSize[size],
        className,
      )}
      {...register('keyword')}
    />
  );
};
