import Link from 'next/link';

import { SidebarMenuItemProps } from '@/types/common';

export const SidebarMenu = ({ title, label, icon }: SidebarMenuItemProps) => {
  return (
    <li>
      <Link
        href={`/${title}`}
        className="group px-3 py-2 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-blue-70/[.3]">
        {icon}
        <div className="text-lg font-bold text-gray-100 group-hover:text-blue-70">
          {label}
        </div>
      </Link>
    </li>
  );
};
