import { addPrefixToHandler, DefaultProps } from '@/types/common';
import { MouseEventHandler } from 'react';

export interface PageNumberProps
  extends addPrefixToHandler<any, 'on'>,
    DefaultProps {
  children: React.ReactNode;
  primary: boolean;
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
