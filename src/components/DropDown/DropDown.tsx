import { twJoin } from 'tailwind-merge';

import { DefaultProps } from '@/types/common';

interface DropDownProps extends DefaultProps {
  filteredOptions: string[];
  handleSelect: (option: string) => void;
  showDropdown: boolean;
  noFoundMessage: string;
}
export const DropDown = ({
  filteredOptions,
  handleSelect,
  showDropdown,
  noFoundMessage,
  className,
}: DropDownProps) => {
  if (!showDropdown) return null;

  return (
    <div
      className={twJoin(
        'absolute z-10 w-full min-w-[120px] max-w-[162px] text-sm lg:text-base bg-white-100 border-2 border-t rounded shadow max-h-20 sm:max-h-40 overflow-y-auto ',
        className,
      )}>
      {filteredOptions.map((option) => (
        <div
          key={option}
          className="p-1 cursor-pointer hover:bg-gray-100 border-b border-gray-20"
          onClick={() => handleSelect(option)}>
          {option}
        </div>
      ))}
      {filteredOptions.length === 0 && (
        <div className="p-2 text-gray-50">{noFoundMessage}</div>
      )}
    </div>
  );
};
