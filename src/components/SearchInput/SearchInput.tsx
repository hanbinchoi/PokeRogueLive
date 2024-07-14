import { twJoin } from 'tailwind-merge';

import '../../styles/globals.css';

import { InputValues, SearchInputSize } from '@/types/common';
import { UseFormRegister } from 'react-hook-form';

export interface SearchInputProps {
  required?: boolean;
  inline?: boolean;
  backgroundColor?: string;
  size?: SearchInputSize;
  placeholder: string;
  label: string;
  register?: UseFormRegister<InputValues>;
  onClick?: () => void;
}

export const SearchInput = ({
  required = false,
  inline = false,
  size = 'medium',
  placeholder,
  register,
  label,
}: SearchInputProps) => {
  const SearchInputSize: Record<SearchInputSize, string> = {
    small: 'px-2 py-1 rounded text-xs border',
    medium: 'px-3 py-2 rounded text-sm border',
  };
  const SearchLabelSize: Record<SearchInputSize, string> = {
    small: 'text-xs',
    medium: 'text-sm',
  };
  return inline ? (
    <div className="w-full flex items-center gap-3 whitespace-nowrap">
      <label
        className={twJoin(
          SearchLabelSize[size],
          'w-fit text-gray-90 font-light',
        )}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        required={required}
        className={twJoin(
          ' flex-grow border-gray-10 focus:outline-blue-30 font-light',
          SearchInputSize[size],
        )}
        {...register}
      />
    </div>
  ) : (
    <div className="flex flex-col gap-1">
      <label
        className={twJoin(SearchLabelSize[size], 'text-gray-90 font-light')}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        required={required}
        className={twJoin(
          'w-full border-gray-10 focus:outline-blue-30 font-light',
          SearchInputSize[size],
        )}
        {...register}
      />
    </div>
  );
};
