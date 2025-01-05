import { twJoin } from 'tailwind-merge';

import { PokemonType } from '@/types/common';

import { POKEMON_TYPE_INFO } from '@/constants/contents';

interface TypeBadgeProps {
  type: PokemonType;
  size: 'small' | 'medium';
}

interface TypeBadgeSizeProps {
  small: string;
  medium: string;
}

export const TypeBadge = ({ type, size }: TypeBadgeProps) => {
  const { backgroundColor, name } = POKEMON_TYPE_INFO[type];

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
  small: 'text-xs font-bold px-2 lg:px-3 py-1 rounded-lg',
  medium:
    'text-sm sm:text-md md:text-base px-2 md:px-3 lg:px-4 py-1 rounded-lg font-bold w-fit',
};
