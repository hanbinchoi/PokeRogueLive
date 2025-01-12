import Link from 'next/link';

import ImageSlider from './ImageSlider';

import { MenuItemProps } from '@/types/menus';

export default function HomeMenu({ label, images, title }: MenuItemProps) {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-8">
      <div className="h-1 w-8 md:w-12 rounded bg-gray-50" />
      <Link
        href={title}
        className="font-bold text-2xl text-blue-30 transition duration-100 ease-in-out transform hover:scale-105 hover:text-blue-50">
        {label}
      </Link>
      <div className="block md:hidden">
        <ImageSlider images={images.mobile} />
      </div>
      <div className="hidden md:block">
        <ImageSlider images={images.desktop} />
      </div>
    </div>
  );
}
