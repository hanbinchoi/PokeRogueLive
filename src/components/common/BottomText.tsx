import { DefaultProps } from '@/types/common';
import { twJoin } from 'tailwind-merge';

/**
 * 아랫글 Component
 *
 * 페이지 하단의 안내를 위한 글 컴포넌트입니다.
 *
 */
export const BottomText = ({ className }: DefaultProps) => {
  return (
    <div
      className={twJoin(
        'flex flex-col items-center pt-8 text-gray-90 font-light text-sm sm:text-base',
        className,
      )}>
      <p>서비스 관련 문의 혹은 오류제보는 아래 메일로 부탁드립니다.</p>
      <p>wkghskak@naver.com</p>
      <p>
        <a href="https://kr.freepik.com/icons/%ED%8F%AC%EC%BC%93%EB%AA%AC">
          Nikita Golubev 제작 아이콘
        </a>
      </p>
    </div>
  );
};
