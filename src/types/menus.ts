import { FaBook } from '@react-icons/all-files/fa/FaBook';
import { FaFire } from '@react-icons/all-files/fa/FaFire';
import { FaDumbbell } from '@react-icons/all-files/fa/FaDumbbell';

import { DefaultProps } from './common';

export interface MenuItemProps extends DefaultProps {
  title: 'pokemon' | 'type-calculator' | 'power-calculator';
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  images: {
    mobile: string[];
    desktop: string[];
  };
  onClick?: () => void;
}

export const MENUS: MenuItemProps[] = [
  {
    title: 'pokemon',
    label: '포켓몬 도감',
    images: {
      mobile: [
        '/assets/img/pokemon-mobile-1.jpg',
        '/assets/img/pokemon-mobile-2.jpg',
        '/assets/img/pokemon-mobile-3.jpg',
      ],
      desktop: [
        '/assets/img/pokemon-desktop-1.jpg',
        '/assets/img/pokemon-desktop-2.jpg',
        '/assets/img/pokemon-desktop-3.jpg',
      ],
    },
    icon: FaBook,
  },
  {
    title: 'type-calculator',
    label: '타입 계산기',
    images: {
      mobile: [
        '/assets/img/type-mobile-1.jpg',
        '/assets/img/type-mobile-2.jpg',
      ],
      desktop: [
        '/assets/img/type-desktop-1.jpg',
        '/assets/img/type-desktop-2.jpg',
      ],
    },
    icon: FaFire,
  },
  {
    title: 'power-calculator',
    label: '위력 계산기',
    images: {
      mobile: [
        '/assets/img/power-mobile-1.jpg',
        '/assets/img/power-mobile-2.jpg',
      ],
      desktop: [
        '/assets/img/power-desktop-1.jpg',
        '/assets/img/power-desktop-2.jpg',
      ],
    },
    icon: FaDumbbell,
  },
];
