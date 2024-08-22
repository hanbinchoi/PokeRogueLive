import '../../styles/globals.css';

import { twJoin } from 'tailwind-merge';

import { ButtonSize } from '@/types/common';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: ButtonSize;
  type: 'button' | 'submit' | 'reset';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  type = 'button',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const ButtonStyle: string = primary
    ? 'text-white-10 bg-blue-30'
    : 'text-gray-70 bg-gray-30';

  const ButtonSize: Record<ButtonSize, string> = {
    small: 'min-w-[62px] px-2 py-1 rounded text-sm font-bold',
    medium: 'px-4 py-2 rounded',
    large: 'px-5 py-2 rounded text-lg',
  };
  return (
    <button
      type={type}
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
