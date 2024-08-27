import { POKEMON_TYPE } from '@/constants/contents';
import '../../styles/globals.css';

import { twJoin } from 'tailwind-merge';

export interface TypeBadgeProps {
  type: keyof typeof POKEMON_TYPE;
  size: 'small' | 'medium';
}
export interface TypeBadgeStyleProps {
  [key: string]: {
    name: string;
    backgroundColor: string;
  };
}

export interface TypeBadgeSizeProps {
  small: string;
  medium: string;
}

export const TypeBadge = ({ type, size }: TypeBadgeProps) => {
  const { backgroundColor, name } = POKEMON_TYPE[type];

  return (
    <span
      className={twJoin(
        backgroundColor,
        'text-white-100',
        TYPE_BADGE_SIZE[size],
      )}>
      {name}
    </span>
  );
};

const TYPE_BADGE_SIZE: TypeBadgeSizeProps = {
  small: 'text-xs font-bold px-3 py-1 rounded-lg',
  medium: '',
};
