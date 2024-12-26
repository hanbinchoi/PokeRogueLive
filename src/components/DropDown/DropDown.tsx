import { DefaultProps } from '@/types/common';
import { twMerge } from 'tailwind-merge';

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
      className={twMerge(
        'absolute z-10 w-full bg-white rounded shadow max-h-40 overflow-y-auto bg-white-100 border-2',
        className,
      )}>
      {filteredOptions.map((option) => (
        <div
          key={option}
          className="p-2 cursor-pointer hover:bg-gray-100"
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
