import { MouseEventHandler } from 'react';

import { DefaultProps } from '@/types/common';

export interface PageNumberProps extends DefaultProps {
  children: React.ReactNode;
  primary: boolean;
  onClick: () => void;
}

/**
 * 페이징 처리에 사용되는 버튼 컴포넌트
 *
 * - primary: 버튼 스타일 지정 (`boolean`)
 * - children: 보여줄 children element (일반적으로 text or icon)
 * - onClick: 클릭 이벤트
 */
export const PageNumber = ({
  children,
  primary,
  ...props
}: PageNumberProps) => {
  const handleClick = Object.values(props)[0];

  return primary ? (
    <li
      className="text-blue-30 font-bold cursor-pointer"
      onClick={handleClick as MouseEventHandler}>
      {children}
    </li>
  ) : (
    <li
      className="hover:text-blue-10 cursor-pointer"
      onClick={handleClick as MouseEventHandler}>
      {children}
    </li>
  );
};
