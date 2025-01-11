import { twJoin } from 'tailwind-merge';

import { ButtonSize, DefaultProps } from '@/types/common';

export interface ButtonProps extends DefaultProps {
  primary?: boolean;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * 버튼 Component
 *
 * 스타일과 사이즈를 제공합니다.
 *
 * - primary: 버튼의 스타일을 지정합니다. (기본값은 `false`)
 * - size: 버튼의 사이즈를 지정합니다. (기본값은 `medium`)
 * - type: 버튼의 타입을 지정합니다. (기본값은 `button`)
 * - label: 버튼의 label을 지정합니다.
 * - disabled: 버튼의 활성화 여부를 지정합니다. (기본값은 `false`)
 * - className: 버튼의 추가적인 스타일을 지정합니다.
 *
 */
export const CommonButton = ({
  primary = false,
  size = 'medium',
  type = 'button',
  disabled = false,
  label,
  className,
  ...props
}: ButtonProps) => {
  const PrimaryStyle: string = primary
    ? 'text-white-10 bg-blue-30'
    : 'text-gray-70 bg-gray-30';

  const buttonStyle: Record<ButtonSize, string> = {
    small:
      'min-w-[54px] min-[480px]:min-w-[62px] h-[32px] min-h-[32px] text-xs min-[480px]:text-sm px-2 py-1 font-bold rounded',
    medium: 'px-4 py-2 rounded',
    large: 'px-5 py-2 rounded text-lg',
  };

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      className={twJoin(
        buttonStyle[size],
        PrimaryStyle,
        disabledStyle,
        className,
      )}
      disabled={disabled}
      {...props}>
      {label}
    </button>
  );
};
