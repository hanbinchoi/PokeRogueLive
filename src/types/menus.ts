import { FaBook } from 'react-icons/fa';
import { BsFire, BsCalculatorFill } from 'react-icons/bs';
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
    icon: FaBook, // 아이콘 컴포넌트 자체를 전달
  },
  {
    title: 'type-calculator',
    label: '타입 계산기',
    icon: BsFire,
  },
  {
    title: 'power-calculator',
    label: '위력 계산기',
    icon: BsCalculatorFill,
  },
];
