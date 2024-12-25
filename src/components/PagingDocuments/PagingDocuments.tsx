import { usePagination } from '@/hooks/usePagination';

import { IconButton, PageButton } from '../PageButton/PageButton';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from 'react-icons/fa6';

export interface PagingDocumentsProps {
  now: number;
  last: boolean;
  total: number;
  pageSize: number;

  setNow: (now: number) => void;
  setLast: (last: boolean) => void;
}

export const PagingDocuments = ({
  now,
  last,
  total,
  pageSize,
  setNow,
  setLast,
}: PagingDocumentsProps) => {
  const { pages, goToPage } = usePagination(
    total,
    now,
    pageSize,
    setNow,
    setLast,
  );
  return (
    <ul className="mt-5 px-14 text-lg flex justify-center items-center gap-2">
      {now > 1 && (
        <>
          <IconButton
            primary={false}
            Icon={FaAnglesLeft}
            onClick={() => goToPage(1)}
          />
          <IconButton
            primary={false}
            Icon={FaAngleLeft}
            onClick={() => goToPage(now - 5)}
          />
        </>
      )}

      {pages.map((pageNum) => (
        <PageButton
          key={pageNum}
          primary={pageNum === now}
          onClick={() => goToPage(pageNum)}>
          {pageNum}
        </PageButton>
      ))}

      {!last && (
        <>
          <IconButton
            primary={false}
            Icon={FaAngleRight}
            onClick={() => goToPage(now + 5)}
          />
          <IconButton
            primary={false}
            Icon={FaAnglesRight}
            onClick={() => goToPage(Math.ceil(total / pageSize))}
          />
        </>
      )}
    </ul>
  );
};
