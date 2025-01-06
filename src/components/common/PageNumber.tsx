import { MouseEventHandler } from 'react';

import { DefaultProps } from '@/types/common';

export interface PageNumberProps extends DefaultProps {
  children: React.ReactNode;
  primary: boolean;
  onClick: () => void;
}

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
