import { twJoin } from 'tailwind-merge';

export interface ErrorComponentProps {
  message: string;
  size?: 'small' | 'medium' | 'xsmall';
}

export const ErrorComponent = ({
  message,
  size = 'medium',
}: ErrorComponentProps) => {
  const SIZE = {
    medium: {
      div: 'gap-2',
      img: 'max-w-[320px]',
      title: 'text-lg sm:text-2xl lg:text-3xl',
      desc: 'text-base sm:text-lg lg:text-xl',
    },
    small: {
      div: 'gap-0 sm:gap-1',
      img: 'max-w-[72px] sm:max-w-[140px]',
      title: 'text-[14px] sm:text-base  lg:text-lg',
      desc: 'text-[10px] sm:text-[12px] lg:text-[14px]',
    },
    xsmall: {
      div: 'gap-0 sm:gap-1',
      img: 'max-w-[52px] sm:max-w-[70px]',
      title: 'text-[14px] sm:text-base  lg:text-lg',
      desc: 'text-[10px] sm:text-[12px] lg:text-[14px]',
    },
  };
  return (
    <div
      className={twJoin(
        `overflow-hidden self-center flex flex-col  items-center w-full h-full`,
        SIZE[size].div,
      )}>
      <img
        src="/assets/img/error.png"
        className={twJoin('w-full h-[50%] object-cover', SIZE[size].img)}
        alt="에러 이미지"
      />
      <p
        className={twJoin(
          ' text-black-10 break-words overflow-wrap break-word leading-relaxed text-center ',
          SIZE[size].title,
        )}>
        {message}
      </p>
      {size !== 'xsmall' && (
        <>
          <p></p>
          <p
            className={twJoin(
              'text-gray-50 break-words overflow-wrap break-word leading-relaxed text-center',
              SIZE[size].desc,
            )}>
            포켓몬 api에서 제공되지 않은 데이터이거나,
            <br /> 네트워크 상태가 불안정하다면 사용할 수 없습니다.
            <br /> 다시 한번 확인해주세요.
          </p>
        </>
      )}
    </div>
  );
};
