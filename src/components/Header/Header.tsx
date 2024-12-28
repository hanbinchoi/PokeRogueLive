'use client';
import { useRef, useState } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';

import { Logo } from '../Logo/Logo';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import { MdMenu } from 'react-icons/md';

import { MENUS } from '@/types/menus';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <header className="border-b border-b-gray-20 w-full bg-white px-3 py-2  h-[64px]">
      <div className="flex justify-between items-center">
        <Logo />
        <button
          onClick={() => setIsOpen(true)}
          className={`md:hidden z-10 p-2 ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
          <MdMenu className="w-6 h-6" />
        </button>
      </div>

      {/* 어두운 배경 오버레이 */}
      <div
        className={`fixed inset-0 bg-black-50 bg-opacity-50 z-30 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}></div>

      {/* 메뉴 */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-48 bg-white-100 shadow-lg z-40 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-all duration-300 md:hidden`}>
        <ul className="px-4 py-6 space-y-4 flex flex-col gap-4">
          {MENUS.map((menu, i) => (
            <HeaderMenu
              key={i}
              title={menu.title}
              label={menu.label}
              icon={menu.icon}
              className="text-lg text-gray-70"
            />
          ))}
        </ul>
      </div>
    </header>
  );
};
