import { usePagination } from '@/hooks/usePagination';

import usePokemonsStore from '@/stores/pokemonsStore';

import { IconButton, PageButton } from '../PageButton/PageButton';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from 'react-icons/fa6';

export const PagingDocuments = () => {
  const { now, last, setNow, total, setLast } = usePokemonsStore();

  const { pages, goToPage } = usePagination(
    total,
    now,
    PAGE_ITEM_SIZE,
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
            onClick={() => goToPage(Math.ceil(total / PAGE_ITEM_SIZE))}
          />
        </>
      )}
    </ul>
  );
};

export const PAGE_ITEM_SIZE = 10;
