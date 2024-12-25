import { twMerge } from 'tailwind-merge';

import { SidebarMenu } from '../SidebarMenu/SidebarMenu';

import { FaBook } from 'react-icons/fa';
import { BsCalculatorFill, BsFire } from 'react-icons/bs';

import { DefaultProps, SidebarMenuItemProps } from '@/types/common';

export const Sidebar = ({ className }: DefaultProps) => {
  return (
    <nav
      className={twMerge(
        'bg-white px-4 py-8 border-r border-r-gray-20 flex flex-col gap-4',
        className,
      )}>
      {SIDEBAR_MENUS.map((menu, i) => (
        <SidebarMenu
          key={`${i}-${menu.title}`}
          title={menu.title}
          label={menu.label}
          icon={menu.icon}
        />
      ))}
    </nav>
  );
};

const SIDEBAR_MENUS: SidebarMenuItemProps[] = [
  {
    title: 'pokemon',
    label: '포켓몬 도감',
    icon: (
      <FaBook className="w-[20px] h-[24px] text-gray-100 group-hover:text-blue-70" />
    ),
  },

  {
    title: 'type-calculator',
    label: '타입 계산기',
    icon: (
      <BsFire className="w-[24px] h-[24px] text-gray-100 group-hover:text-blue-70" />
    ),
  },

  {
    title: 'power-calculator',
    label: '기술 위력 계산기',
    icon: (
      <BsCalculatorFill className="  w-[24px] h-[24px] text-gray-100 group-hover:text-blue-70" />
    ),
  },
];
