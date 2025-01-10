import { FaBook } from '@react-icons/all-files/fa/FaBook';
import { FaFire } from '@react-icons/all-files/fa/FaFire';
import { FaDumbbell } from '@react-icons/all-files/fa/FaDumbbell';

import { DefaultProps } from './common';

export interface MenuItemProps extends DefaultProps {
  title: 'pokemon' | 'type-calculator' | 'power-calculator';
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export const MENUS: MenuItemProps[] = [
  {
    title: 'pokemon',
    label: '포켓몬 도감',
    icon: FaBook,
  },
  {
    title: 'type-calculator',
    label: '타입 계산기',
    icon: FaFire,
  },
  {
    title: 'power-calculator',
    label: '위력 계산기',
    icon: FaDumbbell,
  },
];
