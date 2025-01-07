import Link from 'next/link';

/**
 * 로고 컴포넌트.
 *
 * 클릭 시 home 화면으로 이동합니다.
 */
export const Logo = () => {
  return (
    <Link href="/pokemon" className="h-auto w-[92px] lg:w-[122px]">
      <img
        src="/assets/img/logo.png"
        className="w-full h-full object-cover aspect-[2/1]"
        alt="로고"
      />
    </Link>
  );
};
