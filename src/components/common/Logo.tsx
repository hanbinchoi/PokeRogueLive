import Link from 'next/link';

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
