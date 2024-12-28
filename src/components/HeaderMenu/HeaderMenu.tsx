import Link from 'next/link';

import { MenuItemProps } from '@/types/menus';
import { twMerge } from 'tailwind-merge';

export const HeaderMenu = ({
  title,
  label,
  icon: Icon,
  className,
}: MenuItemProps) => {
  return (
    <li>
      <Link
        className={twMerge(
          'group flex items-center gap-2 text-sm font-bold text-gray-100 md:w-[14px] md:h-[14px] lg:w-[20px] lg:h-[20px]',
          className,
        )}
        href={`/${title}`}>
        <Icon className="group-hover:text-blue-70" />
        <p className="group-hover:text-blue-70">{label}</p>
      </Link>
    </li>
  );
};
