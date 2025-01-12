import HomeMenu from '@/components/common/HomeMenu';

import { MENUS } from '@/types/menus';

export default function Home() {
  return (
    <div className="p-8 flex flex-col items-center bg-gray-10">
      <h1 className="sr-only">PokeRogue Live Home</h1>
      <div className="p-8 bg-white-100  flex flex-col items-center rounded-2xl shadow-md gap-4">
        <div className="w-[122px] -mb-2">
          <img
            src="/assets/img/logo.png"
            className="w-full h-full object-cover"
            alt="로고"
          />
        </div>
        <p className="text-center text-gray-70 leading-7 mb-4">
          <strong>PokeRogue Live</strong>는 포켓몬 공식 API를 기반으로
          <br /> 포켓몬 도감, 타입 상성 계산, 기술 위력 계산 등 <br />
          다양한 기능을 제공하는 포켓몬 정보 플랫폼입니다.
        </p>
        <div className="flex flex-col gap-8">
          {MENUS.map((menu) => (
            <HomeMenu
              key={menu.title}
              label={menu.label}
              images={menu.images}
              title={menu.title}
              icon={menu.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
