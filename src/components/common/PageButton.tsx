import { PageNumber } from './PageNumber';

interface PageButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}

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
