import { twJoin } from 'tailwind-merge';

import { ButtonSize, DefaultProps } from '@/types/common';

export interface ButtonProps extends DefaultProps {
  primary?: boolean;
  size?: ButtonSize;
  type: 'button' | 'submit' | 'reset';
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  type = 'button',
  disabled = false,
  label,
  className,
  ...props
}: ButtonProps) => {
  const ButtonStyle: string = primary
    ? 'text-white-10 bg-blue-30'
    : 'text-gray-70 bg-gray-30';

  const buttonSizeClasses: Record<ButtonSize, string> = {
    small: 'min-w-[62px] px-2 py-1 rounded text-sm font-bold',
    medium: 'px-4 py-2 rounded',
    large: 'px-5 py-2 rounded text-lg',
  };

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      className={twJoin(
        buttonSizeClasses[size],
        ButtonStyle,
        disabledStyle,
        className,
      )}
      disabled={disabled}
      {...props}>
      {label}
    </button>
  );
};
