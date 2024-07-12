import { twJoin } from 'tailwind-merge';

import '../../styles/globals.css';

import { ButtonSize } from '@/types/common';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: ButtonSize;
  label: string;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const ButtonStyle: string = primary
    ? 'text-white-10 bg-blue-30'
    : 'text-gray-70 bg-white-50';

  const ButtonSize: Record<ButtonSize, string> = {
    small: 'px-2 py-1 rounded text-xs',
    medium: 'px-4 py-2 rounded',
    large: 'px-5 py-2 rounded text-lg',
  };
  return (
    <button
      type="button"
      className={twJoin(ButtonSize[size], ButtonStyle)}
      {...props}>
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
