import { usePagination } from '@/hooks/usePagination';

import { IconButton, PageButton } from './PageButton';

import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from 'react-icons/fa6';

export interface PagingDocumentsProps {
  now: number;
  total: number;
  pageSize: number;

  setNow: (now: number) => void;
}

export const PagingDocuments = ({
  now,
  total,
  pageSize,
  setNow,
}: PagingDocumentsProps) => {
  const { pages, goToPage } = usePagination(total, now, pageSize, setNow);
  const lastPage = Math.ceil(total / pageSize);

  return (
    <ul className="flex justify-center items-center mt-5 px-14 text-lg gap-2">
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

      {now < lastPage && (
        <>
          <IconButton
            primary={false}
            Icon={FaAngleRight}
            onClick={() => goToPage(now + 5)}
          />
          <IconButton
            primary={false}
            Icon={FaAnglesRight}
            onClick={() => goToPage(lastPage)}
          />
        </>
      )}
    </ul>
  );
};
