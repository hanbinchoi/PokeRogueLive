import '../../styles/globals.css';

import { twJoin } from 'tailwind-merge';

import { PokemonType } from '@/types/common';

import { POKEMON_TYPE } from '@/constants/contents';

interface TypeBadgeProps {
  type: PokemonType;
  size: 'small' | 'medium';
}

interface TypeBadgeSizeProps {
  small: string;
  medium: string;
}

export const TypeBadge = ({ type, size }: TypeBadgeProps) => {
  const { backgroundColor, name } = POKEMON_TYPE[type];

  if (type === 'stellar') {
    return (
      <span
        className={twJoin(
          'rainbow-bg',
          'text-white-100',
          TYPE_BADGE_SIZE[size],
        )}>
        {name}
      </span>
    );
  }

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
  medium: 'text-[16px] px-4 py-2 rounded-lg font-bold w-fit',
};
