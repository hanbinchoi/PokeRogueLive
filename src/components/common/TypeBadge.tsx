import { twJoin } from 'tailwind-merge';

import { PokemonType } from '@/types/common';

import { POKEMON_TYPE_INFO, PokemonTypeName } from '@/constants/contents';

interface TypeBadgeProps {
  type: PokemonType;
  size: 'small' | 'medium';
}

interface TypeBadgeSizeProps {
  small: string;
  medium: string;
}

/**
 * 포켓몬 타입 뱃지를 그리기 위한 컴포넌트.
 *
 * 각 타입 별 스타일이 다르며 2가지 사이즈를 지정할 수 있습니다.
 *
 * - type : 포켓몬 타입 (`PokemonType`)
 * - size : 뱃지 사이즈.  (`small` | `medium(기본값)`)
 * @returns
 */
export const TypeBadge = ({ type, size = 'medium' }: TypeBadgeProps) => {
  const { backgroundColor, name } = POKEMON_TYPE_INFO[type];

  if (type === PokemonTypeName.STELLAR) {
    return (
      <span
        className={twJoin(
          'type-badge',
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
        'type-badge',
        backgroundColor,
        'text-white-100',
        TYPE_BADGE_SIZE[size],
      )}>
      {name}
    </span>
  );
};

const TYPE_BADGE_SIZE: TypeBadgeSizeProps = {
  small: 'text-xs font-bold px-2 lg:px-2 py-1 rounded-lg',
  medium:
    'text-sm sm:text-md md:text-base px-2 md:px-3 lg:px-3 py-1 rounded-lg font-bold w-fit',
};
