import { twJoin } from 'tailwind-merge';

import { SidebarMenu } from './SidebarMenu';

import { DefaultProps } from '@/types/common';
import { MENUS } from '@/types/menus';

/**
 * 사이드바 컴포넌트.
 * 반응형 구현되어 있어 일정 너비에서는 보이지 않음.
 */
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
          images={menu.images}
        />
      ))}
    </nav>
  );
};
