import '../../styles/globals.css';

import { MenuItem } from '@/types/common';

import { FaBook } from 'react-icons/fa';
import { BsFire } from 'react-icons/bs';
import { BsCalculatorFill } from 'react-icons/bs';
import Link from 'next/link';

export interface SidebarMenuProps {
  menu: MenuItem;
}

export const SidebarMenu = ({ menu }: SidebarMenuProps) => {
  const menuStyle = {
    pokemon: {
      label: '포켓몬 도감',
      icon: (
        <FaBook className="w-[20px] h-[24px] text-gray-100 group-hover:text-blue-70" />
      ),
    },
    'type-calculator': {
      label: '타입 계산기',
      icon: (
        <BsFire className="w-[24px] h-[24px] text-gray-100 group-hover:text-blue-70" />
      ),
    },
    'power-calculator': {
      label: '기술 위력 계산기',
      icon: (
        <BsCalculatorFill className="  w-[24px] h-[24px] text-gray-100 group-hover:text-blue-70" />
      ),
    },
  };
  return (
    <li className="">
      <Link
        href={`/${menu}`}
        className="group px-3 py-2 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-blue-70/[.3]">
        {menuStyle[menu].icon}
        <div className="text-lg font-bold text-gray-100 group-hover:text-blue-70">
          {menuStyle[menu].label}
        </div>
      </Link>
    </li>
  );
};
