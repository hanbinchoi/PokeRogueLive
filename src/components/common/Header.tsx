'use client';
import { useRef, useState } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';

import { MdMenu } from '@react-icons/all-files/md/MdMenu';
import { Logo } from './Logo';
import { HeaderMenu } from './HeaderMenu';

import { MENUS } from '@/types/menus';

/**
 * 헤더 컴포넌트.
 *
 * 반응형 디자인으로 구현되어 있어, 메뉴가 포함될 수 있습니다.
 */
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <header className="w-full h-[64px] border-b border-b-gray-20  bg-white px-3 py-2">
      <div className="flex justify-between items-center h-full">
        <Logo />
        <button
          onClick={() => setIsOpen(true)}
          className={`md:hidden z-10 p-2 ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
          <MdMenu className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black-50 bg-opacity-50 z-30 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}></div>

      <div
        ref={menuRef}
        className={`header-menu-container fixed top-0 right-0 h-full w-48 bg-white-100 shadow-lg z-40 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-all duration-300 md:hidden`}>
        <ul className="px-4 py-6 space-y-4 flex flex-col gap-4">
          {MENUS.map((menu, i) => (
            <HeaderMenu
              key={i}
              title={menu.title}
              label={menu.label}
              icon={menu.icon}
              images={menu.images}
              onClick={() => setIsOpen(false)}
              className="text-lg text-gray-70"
            />
          ))}
        </ul>
      </div>
    </header>
  );
};
