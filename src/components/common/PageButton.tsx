import { PageNumber } from './PageNumber';

interface PageButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}

/**
 * 페이지 번호 컴포넌트
 */
export const PageButton = ({
  children,
  onClick,
  primary = false,
}: PageButtonProps) => {
  return (
    <PageNumber primary={primary} onClick={onClick}>
      {children}
    </PageNumber>
  );
};

/**
 * 페이지 이동 아이콘 컴포넌트
 */
export const IconButton = ({
  Icon,
  onClick,
  primary = false,
}: {
  Icon: React.ComponentType;
  onClick: () => void;
  primary: boolean;
}) => (
  <PageNumber primary={primary} onClick={onClick}>
    <Icon />
  </PageNumber>
);
