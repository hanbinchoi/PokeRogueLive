import '../../styles/globals.css';

import { twMerge } from 'tailwind-merge';

import { SidebarMenu } from '../SidebarMenu/SidebarMenu';

import { DefaultProps, sidebarMenu } from '@/types/common';

export const Sidebar = ({ className }: DefaultProps) => {
  const sideBarMenus: sidebarMenu[] = [
    'pokemon',
    'type-calculator',
    'power-calculator',
  ];
  return (
    <ul
      className={twMerge(
        'bg-white-100 px-4 py-8 border-r border-r-gray-20 flex flex-col gap-4',
        className,
      )}>
      {sideBarMenus.map((menu) => (
        <SidebarMenu menu={menu} />
      ))}
    </ul>
  );
};
