'use client';

import { useEffect } from 'react';

import { twMerge } from 'tailwind-merge';

import useModalStore from '@/stores/modalStore';

import { DefaultProps } from '@/types/common';

interface ModalProps extends DefaultProps {
  children: React.ReactNode;
}

export default function Modal({ children, className }: ModalProps) {
  const { close } = useModalStore();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  const handleClick = () => close();

  return (
    <>
      <div
        aria-hidden
        onClick={() => {
          handleClick();
        }}
        className="fixed top-0 left-0 w-screen h-screen bg-black-30/[.9] backdrop-blur-sm z-50"
      />
      <main
        className={twMerge(
          `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-xl z-50`,
          className,
        )}>
        {children}
      </main>
    </>
  );
}
