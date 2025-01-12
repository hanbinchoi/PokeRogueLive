import Link from 'next/link';

import { MenuItemProps } from '@/types/menus';

/**
 * 사이드바를 구성하는 메뉴 컴포넌트.
 *
 * - title : 이동 할 메뉴의 title(url) (`string`)
 * - label : 메뉴의 text (`string`)
 * - icon : 메뉴 Icon (`ICON`)
 */
export const SidebarMenu = ({
  title,
  label,
  icon: Icon,
  images,
}: MenuItemProps) => {
  return (
    <li>
      <Link
        href={`/${title}`}
        className="flex items-center group rounded-md cursor-pointer hover:bg-blue-70/[.3] sm:text-xs md:px-2 md:py-1 md:gap-2 lg:px-3 lg:py-2 lg:gap-2">
        <Icon className="text-gray-100 group-hover:text-blue-70 sm:text-xs md:w-[14px] md:h-[14px] lg:w-[20px] lg:h-[20px]" />

        <p className="text-xs font-bold text-gray-100 group-hover:text-blue-70 sm:text-xs md:text-sm lg:text-lg">
          {label}
        </p>
      </Link>
    </li>
  );
};
