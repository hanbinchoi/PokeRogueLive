import Link from 'next/link';

import { twJoin } from 'tailwind-merge';

import { MenuItemProps } from '@/types/menus';

/**
 * 헤더에 포함되는 메뉴 컴포넌트.
 *
 * - title : 이동 할 메뉴의 title(url) (`string`)
 * - label : 메뉴 text (`string`)
 * - icon : 메뉴 아이콘 (`ICON`)
 */
export const HeaderMenu = ({
  title,
  label,
  icon: Icon,
  onClick,
  className,
}: MenuItemProps) => {
  return (
    <li>
      <Link
        className={twJoin(
          'group flex items-center gap-2 text-sm font-bold text-gray-100 md:w-[14px] md:h-[14px] lg:w-[20px] lg:h-[20px]',
          className,
        )}
        href={`/${title}`}
        onClick={onClick}>
        <Icon className="group-hover:text-blue-70" />
        <p className="group-hover:text-blue-70">{label}</p>
      </Link>
    </li>
  );
};
