import { twJoin } from 'tailwind-merge';

import { SidebarMenu } from '../SidebarMenu/SidebarMenu';

import { DefaultProps } from '@/types/common';
import { MENUS } from '@/types/menus';

export const Sidebar = ({ className }: DefaultProps) => {
  return (
    <nav
      className={twJoin(
        'bg-white-100 border-r border-r-gray-20  md:py-6 lg:py-8',
        className,
      )}>
      {MENUS.map((menu, i) => (
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
