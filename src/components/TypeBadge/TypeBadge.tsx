import '../../styles/globals.css';

import { twJoin } from 'tailwind-merge';

export interface TypeBadgeProps {
  type: string;
  size: 'small' | 'medium';
}
export interface TypeBadgeStyleProps {
  [key: string]: {
    name: string;
    backgroundColor: string;
    textColor: string;
  };
}

export interface TypeBadgeSizeProps {
  small: string;
  medium: string;
}

export const TypeBadge = ({ type, size }: TypeBadgeProps) => {
  const { backgroundColor, textColor, name } = TYPE_BADGE_STYLES[type];

  return (
    <span className={twJoin(backgroundColor, textColor, TYPE_BADGE_SIZE[size])}>
      {name}
    </span>
  );
};

const TYPE_BADGE_SIZE: TypeBadgeSizeProps = {
  small: 'text-[12px] font-bold px-2 py-1 rounded-lg',
  medium: '',
};

const TYPE_BADGE_STYLES: TypeBadgeStyleProps = {
  normal: {
    backgroundColor: 'bg-type-normal',
    textColor: 'text-white-100',
    name: '노말',
  },
  fighting: {
    backgroundColor: 'bg-type-fighting',
    textColor: 'text-white-100',
    name: '격투',
  },
  flying: {
    backgroundColor: 'bg-type-flying',
    textColor: 'text-white-100',
    name: '비행',
  },
  poison: {
    backgroundColor: 'bg-type-poison',
    textColor: 'text-white-100',
    name: '독',
  },
  ground: {
    backgroundColor: 'bg-type-ground',
    textColor: 'text-white-100',
    name: '땅',
  },
  rock: {
    backgroundColor: 'bg-type-rock',
    textColor: 'text-white-100',
    name: '바위',
  },
  bug: {
    backgroundColor: 'bg-type-bug',
    textColor: 'text-white-100',
    name: '벌레',
  },
  ghost: {
    backgroundColor: 'bg-type-ghost',
    textColor: 'text-white-100',
    name: '고스트',
  },
  steel: {
    backgroundColor: 'bg-type-steel',
    textColor: 'text-white-100',
    name: '강철',
  },
  fire: {
    backgroundColor: 'bg-type-fire',
    textColor: 'text-white-100',
    name: '불꽃',
  },
  water: {
    backgroundColor: 'bg-type-water',
    textColor: 'text-white-100',
    name: '물',
  },
  grass: {
    backgroundColor: 'bg-type-grass',
    textColor: 'text-white-100',
    name: '풀',
  },
  electric: {
    backgroundColor: 'bg-type-electric',
    textColor: 'text-white-100',
    name: '전기',
  },
  psychic: {
    backgroundColor: 'bg-type-psychic',
    textColor: 'text-white-100',
    name: '에스퍼',
  },
  ice: {
    backgroundColor: 'bg-type-ice',
    textColor: 'text-white-100',
    name: '얼음',
  },
  dragon: {
    backgroundColor: 'bg-type-dragon',
    textColor: 'text-white-100',
    name: '드래곤',
  },
  dark: {
    backgroundColor: 'bg-type-dark',
    textColor: 'text-white-100',
    name: '악',
  },
  fairy: {
    backgroundColor: 'bg-type-fairy',
    textColor: 'text-white-100',
    name: '페어리',
  },
  stellar: {
    backgroundColor: 'bg-type-stellar',
    textColor: 'text-white-100',
    name: '스텔라',
  },
  unknown: {
    backgroundColor: 'bg-type-unknown',
    textColor: 'text-white-100',
    name: '???',
  },
};
